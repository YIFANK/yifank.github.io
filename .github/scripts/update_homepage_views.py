"""Export only the public homepage view count from Cloudflare Web Analytics."""

import json
import os
from datetime import datetime, timedelta, timezone
from pathlib import Path
from urllib.request import Request, urlopen

QUERY = """
query HomepageViews($account: string!, $start: Time!, $end: Time!) {
  viewer {
    accounts(filter: {accountTag: $account}) {
      views: rumPageloadEventsAdaptiveGroups(
        limit: 1
        filter: {
          datetime_geq: $start
          datetime_lt: $end
          requestHost: "yifank.github.io"
          requestPath: "/"
        }
      ) {
        count
      }
    }
  }
}
"""


def main():
    token = os.environ.get("CLOUDFLARE_ANALYTICS_TOKEN")
    account = os.environ.get("CLOUDFLARE_ACCOUNT_ID")
    if not token and not account:
        print("Cloudflare homepage view count is not configured.")
        return
    if not token or not account:
        raise SystemExit("Configure both the Cloudflare analytics token and account ID.")

    end = datetime.now(timezone.utc).replace(hour=0, minute=0, second=0, microsecond=0)
    start = end - timedelta(days=30)
    request = Request(
        "https://api.cloudflare.com/client/v4/graphql",
        data=json.dumps({
            "query": QUERY,
            "variables": {"account": account, "start": start.isoformat(), "end": end.isoformat()},
        }).encode(),
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
    )
    with urlopen(request, timeout=30) as response:
        result = json.load(response)

    if result.get("errors"):
        raise SystemExit("Cloudflare rejected the homepage analytics query. Check API access.")
    accounts = result["data"]["viewer"]["accounts"]
    if len(accounts) != 1:
        raise SystemExit("Cloudflare did not return the configured account.")
    rows = accounts[0]["views"]
    count = rows[0]["count"] if rows else 0
    if type(count) is not int or count < 0:
        raise SystemExit("Cloudflare returned an invalid homepage view count.")

    Path("_data/homepage_views.json").write_text(
        json.dumps({"count": f"{count:,}"}) + "\n", encoding="utf-8"
    )


if __name__ == "__main__":
    main()
