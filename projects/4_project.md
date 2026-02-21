
---
layout: page
title: Sniff - Your Personal Shopping Agent
description: An LLM-powered shopping agent, made at *TreeHacks 2026*.
img: assets/img/sniff.jpg
importance: 1
category: work
permalink: /projects/sniff/
---

**Teammates:**  
_Yifan Kang, Aswin Surya, Davyn Paringkoan, Manraj Mondair_  

<div class="ratio ratio-16x9 my-4">
  <iframe src="https://www.youtube.com/embed/JK2X10VwiBE" title="Sniff - Your Personal Shopping Agent" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Inspiration

Online shopping has become a high-stakes trust decision made in seconds with almost no usable information. Is this store real? Is this "sale" legitimate? Is the seller verified?

The penalty for guessing wrong isn't a mild inconvenience — it's a drained bank account, identity theft, or a package that never ships.

And the impacts are very real:

- **$12.5B** lost to fraud in 2024 (25% increase year-to-year)
- **859,000** complaints with $16B in losses recorded by the Internet Crime Complaint Center
- **1 in 5** US adults have lost money to an online scam
- **75%** of victims never report it to law enforcement
- People over 60 suffered nearly **$5B** in losses alone

What makes this uniquely dangerous is that scam sites don't look like scams anymore. They have polished storefronts, convincing checkout flows, and social proof indistinguishable from the real thing. "Safe shopping" today requires the user to cross-reference domain age, SSL validity, safety databases, community sentiment, and seller verification — work most people don't have the time or expertise to do under pressure from countdown timers and urgency language.

We built **Sniff** to close that gap: turn safety from a burden into an automatic agentic layer of commerce without sacrificing price intelligence.

---

## What It Does

**Just tell Sniff what you want. It goes to work.**

- **Guided Discovery:** Sniff starts a conversation, not a search. It asks the right clarifying questions (gender, style, budget, brand) to understand exactly what you need before searching.
- **Multi-Retailer Search:** Searches across Google Shopping, pulling real product listings from Amazon, Best Buy, Walmart, Nordstrom, and dozens more. Dead links get filtered out before you ever see them.
- **5 Parallel Fraud Checks per Listing:**
  - *Retailer Reputation:* WHOIS domain age, registrar signals, suspicious TLDs
  - *Safety Database:* Google Safe Browsing + ScamAdviser threat intelligence
  - *Community Sentiment:* Reddit post mentions, scam reports, real user experiences
  - *Brand Impersonation:* Detects typosquatting and lookalike domains
  - *Page Red Flags:* Urgency tactics, missing policies, suspicious payment methods
- **Live-Streaming Results:** Products appear, fraud checks fill in, verdicts land — all in real time via Server-Sent Events. You watch the investigation happen.
- **Trust Verdict:** Every listing gets a verdict (trusted/caution/danger) and a trust score (0–100). Sniff recommends the best pick — the cheapest option among the safest options.
- **Dramatic Cleanup:** Tap "PURGE CURSED" and flagged listings get eliminated in a black hole animation. Remaining safe results shuffle into price order. The best deal gets crowned.

---

## How We Built It

- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS, Framer Motion, Zustand, Vercel
- **Backend:** Next.js API Routes with Server-Sent Events streaming. Each investigation spawns a parallel tool pipeline — WHOIS lookup, Google Safe Browsing, ScamAdviser, Reddit search, brand impersonation detection, page scraping — that streams structured findings as they complete.
- **AI:** OpenAI powers the core agent loop. gpt-5-mini handles structured fraud analysis and tool orchestration via function calling. gpt-4o-mini drives the multi-turn query refinement engine. Every tool call returns structured output that the agent reasons over before deciding what to do next.
- **Web Data:** Bright Data SERP API for Google Shopping results with real product images and prices. Browserbase + Stagehand for AI-powered browser automation — navigating real retailer pages, extracting structured product data, and verifying prices without brittle CSS selectors. Perplexity Sonar for cross-retailer price research when SERP data isn't enough.
- **Fraud Scoring:** 150+ verified retailers allowlist for instant trust decisions. Weighted scoring with normalization across 5 independent signals. Fatal flags for malware/phishing short-circuit to danger regardless of other signals. Early URL validation filters dead links before users ever see them.

---

## The Agent Loop

Sniff is a multi-turn agent that accumulates context and adapts across steps.

**Turn 1 — Understand Intent:** The query refiner decides if the user's request is specific enough to search, or asks the highest-information-gain clarifying question. Each user answer is fed back as context for the next decision. The agent tracks which dimensions it's already covered (budget, brand, style) and picks the most useful unanswered one.

**Turn 2 — Search & Validate:** Once intent is clear, the agent searches across retailers, validates every URL for reachability, and streams results. It holds all products in working memory while fraud checks run in parallel.

**Turn 3 — Investigate & Score:** For each listing, the agent orchestrates 5 independent tools concurrently, collects their structured outputs, and computes a weighted trust verdict. It uses the full set of results as context — price anomaly detection compares each listing against the trusted-retailer median, so a $49 pair of headphones only gets flagged if trusted retailers sell it for $250+.

**Turn 4 — Recommend:** The agent synthesizes everything — trust scores, prices, fraud signals — and recommends the best deal. The entire chain streams to the frontend as it happens.

---

## Challenges We Ran Into

- **Unreliable web data:** Listings vary by site and many are JS-rendered, so we had to combine search APIs, scraping, proxies, and browser automation while still normalizing everything into clean, typed results.
- **Real-time agent orchestration:** Coordinating a multi-step pipeline (search → checks → verdict → stream) to stay fast, stable, and understandable under SSE was non-trivial.
- **Animation under React Compiler:** With `reactCompiler: true`, re-render-based animations broke, forcing us to re-engineer complex sequences (BlackHoleWipe, ShuffleSort) in pure CSS keyframes.

---

## Accomplishments We're Proud Of

- End-to-end agentic commerce pipeline: multi-turn clarify → streaming search → parallel fraud validation → price-optimized recommendation
- Modular fraud toolkit (WHOIS, SSL, Safe Browsing, Reddit, seller verification, brand impersonation) wired through a shared type contract
- Real-time SSE streaming where users watch the investigation happen, not just a loading spinner
- Polished pixel-art UI with a persistent saved-items dashboard that stores full fraud-report snapshots across sessions

---

## What We Learned

- Fraud detection is fundamentally a calibration problem — the hard part isn't catching scams, it's not flagging legitimate businesses
- Multi-turn query refinement dramatically improves search relevance vs. raw keyword search
- Real-time SSE streaming with complex frontend state machines requires careful orchestration — out-of-order events and race conditions are the norm
- Pixel art is surprisingly time-consuming

---

## What's Next for Sniff

- **Chrome Extension** — Investigate any link in browser before you buy
- **Image Search** — Snap a photo, Sniff finds it and validates sellers
- **Deeper Seller Verification** — Crawl seller profiles with Stagehand and Browserbase, verify physical addresses, extract business registration data
- **Price Tracking** — Monitor prices over time and alert when trusted deals drop