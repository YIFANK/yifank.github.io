---
layout: about
title: About
permalink: /
# subtitle: <a href='#'>Massachusetts Institute of Technology</a>.

profile:
  align: right
  image: new_pfp.jpg
  image_circular: false # crops the image to make it circular
  # more_info: >
  #   <p>555 your office number</p>
  #   <p>123 your address street</p>
  #   <p>Your City, State 12345</p>

selected_papers: false # includes a list of papers marked as "selected={true}"
social: false # icons are rendered inline under the bio instead

latest_posts:
  enabled: true
  scrollable: true # adds a vertical scroll bar if there are more than 3 new posts items
  limit: 3 # leave blank to include all the blog posts
---

I'm a junior at MIT, double-majoring in Artificial Intelligence (Course 6-4) and Mathematics (Course 18). I'm advised by [Leslie Kaelbling](https://people.csail.mit.edu/lpk/) in the [Learning & Intelligent Systems Group](https://lis.csail.mit.edu/).

Robots deployed in the real world encounter novel environments and unseen tasks beyond their training distribution, often leading to policy failures. I want to build robots that can turn these experiences into new capabilities—not just execute what they learned during training. My research asks how robots can adapt after deployment: infer useful structure from a few demonstrations, diagnose failures through interaction, and revise their behavior without collecting large datasets or retraining from scratch.

Currently, I’m working on robot-use agents that improve their policies from demonstrations. In [ENCORE](https://yifank.github.io/encore/), I explored how a coding agent can use demonstrations directly in context to generate executable manipulation programs and refine them through execution feedback. In [KeyFlow](https://yifank.github.io/keyflow/), I explored how an agent can optimize a non-parametric flow field constructed from a few demonstrations by revising the keypoints and retrieval programs that define it.

Outside the lab, I enjoy long-distance running, watching anime, rhythm games (Arcaea and Maimai), and singing.

<div class="top-socials">{% include social.liquid %}</div>

<style>
.top-socials { margin: 1.1rem 0 .4rem; }
.top-socials .fa-solid, .top-socials .fab, .top-socials .fa-brands,
.top-socials a { font-size: 1.35rem; }
.top-socials a { margin-right: .85rem; color: var(--global-text-color-light); }
.top-socials a:hover { color: var(--global-theme-color); }
.home-sec { margin-top: 2rem; }
.home-sec h2 { font-size: 1.05rem; font-family: var(--display-font); font-weight: 600; margin-bottom: .7rem;
  padding-bottom: .3rem; border-bottom: 1px solid var(--global-navy-rule);
  color: var(--global-navy-color); }
.home-sec h2 .more { float: right; font-size: .82rem; font-weight: 400; }
.hp { display: flex; gap: 1.2rem; align-items: flex-start; margin-bottom: 1.7rem; }
.hp-thumb { flex: 0 0 200px; max-width: 200px; }
.hp-thumb img { width: 100%; border-radius: 3px; display: block; }
.hp-body { flex: 1 1 auto; min-width: 0; }
.hp-title { font-weight: 700; font-size: 1.05rem; line-height: 1.32; margin: 0 0 .3rem; }
.hp-title a { color: inherit; }
.hp-authors { font-size: .92rem; line-height: 1.5; color: var(--global-text-color-light); margin: 0 0 .3rem; }
.hp-authors .me { color: var(--global-navy-color); font-weight: 600; }
.home-sec .hp-venue { font-size: .95rem; color: var(--global-theme-color); margin: 0 0 .45rem; }
.hp-links { font-size: .93rem; margin: 0; word-spacing: .25rem; }
.home-sec .hp-venue em { font-style: italic; font-weight: 700; }
.home-list { list-style: none; padding: 0; margin: 0; }
.home-list li { font-size: .93rem; margin-bottom: .45rem; line-height: 1.45; }
.home-list .when { color: var(--global-text-color-light); font-size: .87rem; }
@media (max-width: 640px) { .hp { flex-direction: column; gap: .5rem; } .hp-thumb { max-width: 60%; } }
</style>

<div class="home-sec">
<h2>Selected research <span class="more"><a href="{{ '/research/' | relative_url }}">all &rarr;</a></span></h2>

  <div class="hp">
    <div class="hp-thumb">
      <img src="{{ 'assets/img/research/keyflow-teaser.jpg' | relative_url }}" alt="Demonstrations in episodic memory and an agent-revised policy closing an oven in a new scene">
    </div>
    <div class="hp-body">
      <p class="hp-title"><a href="https://yifank.github.io/keyflow/">KeyFlow: Agentic Policy Adaptation with Episodic Memory</a></p>
      <p class="hp-authors">Ben Zandonati*, <span class="me">Yifan Kang</span>*, Tomás Lozano-Pérez, Leslie Pack Kaelbling &nbsp;<em>(*equal contribution; co-first authors)</em></p>
      <p class="hp-venue"><em>CoRL 2026 Workshop Learn@Deploy</em></p>
      <p class="hp-links">[<a href="https://openreview.net/pdf?id=q9pu4hBd2X">Paper</a>] [<a href="https://yifank.github.io/keyflow/">Website</a>]</p>
    </div>
  </div>

  <div class="hp">
    <div class="hp-thumb">
      <img src="{{ 'assets/img/research/gpi-teaser.jpg' | relative_url }}" alt="Generalized Planning Interfaces: behavior specifications, agent feedback, and graph synthesis for robot execution">
    </div>
    <div class="hp-body">
      <p class="hp-title"><a href="https://openreview.net/pdf?id=sU18hA2zbD">Generalized Planning Interfaces for Agentic Robotics</a></p>
      <p class="hp-authors">Ben Zandonati, <span class="me">Yifan Kang</span>, Tomás Lozano-Pérez, Leslie Pack Kaelbling</p>
      <p class="hp-venue"><em>CoRL 2026 Workshop on Agentic Robotics</em></p>
      <p class="hp-links">[<a href="https://openreview.net/pdf?id=sU18hA2zbD">Paper</a>]</p>
    </div>
  </div>

  <div class="hp">
    <div class="hp-thumb">
      <img src="{{ 'assets/img/research/encore.jpg' | relative_url }}" alt="ENCORE teaser">
    </div>
    <div class="hp-body">
      <p class="hp-title"><a href="https://yifank.github.io/encore/">ENCORE: Few-Shot Agentic Discovery of Manipulation Strategies</a></p>
      <p class="hp-authors"><span class="me">Yifan Kang</span>, Zihan Wang, Zhiwen Fan, Bangya Liu</p>
      <p class="hp-venue"><strong>Oral Presentation</strong>, <em>NeurIPS 2026 Robot Learning Workshop</em></p>
      <p class="hp-links">[<a href="https://arxiv.org/abs/2609.37359">Paper</a>] [<a href="https://yifank.github.io/encore/">Website</a>] [<a href="https://github.com/YIFANK/encore">Code</a>]</p>
    </div>
  </div>

  <div class="hp">
    <div class="hp-thumb">
      <img src="{{ 'assets/img/research/diffusion-lm.jpg' | relative_url }}" alt="Interpretability pipeline for diffusion language models">
    </div>
    <div class="hp-body">
      <p class="hp-title"><a href="{{ 'assets/pdf/diffusion-lm-colm2026-poster.pdf' | relative_url }}">Interpreting Diffusion Language Models Over Denoising Time</a></p>
      <p class="hp-authors">Jingcheng Yang*, Shangtong Wu*, <span class="me">Yifan Kang</span>, Tianhu Xiong, Mingyuan Wu, Haozhen Zheng, Alex Schwing, Klara Nahrstedt &nbsp;<em>(*equal contribution)</em></p>
      <p class="hp-venue"><em>CoLM 2026 Workshop on Non-Autoregressive Language Models</em></p>
      <p class="hp-links">[<a href="{{ 'assets/pdf/diffusion-lm-colm2026-poster.pdf' | relative_url }}">Poster</a>]</p>
    </div>
  </div>

  <div class="hp">
    <div class="hp-thumb">
      <img src="{{ 'assets/img/research/doodle.jpg' | relative_url }}" alt="Doodle Agent">
    </div>
    <div class="hp-body">
      <p class="hp-title"><a href="https://yifank.github.io/doodle-agent/">Doodle Agent: Exploring Freeform Visual Generation with Multimodal LLMs</a></p>
      <p class="hp-authors">Dingning Cao*, <span class="me">Yifan Kang</span>*, Yael Vinker, Antonio Torralba &nbsp;<em>(*equal contribution)</em></p>
      <p class="hp-venue"><em>ICCV 2025 Workshop on AI for Visual Arts (AI4VA)</em></p>
      <p class="hp-links">[<a href="https://yifank.github.io/doodle-agent/">Website</a>]</p>
    </div>
  </div>
</div>

<div class="home-sec">
<h2>Experience</h2>
<ul class="home-list">
  <li><strong>Research Intern</strong>, 2077AI <span class="when">— Jun 2026 to present</span></li>
  <li><strong>Student Researcher</strong>, MIT, with Leslie Pack Kaelbling <span class="when">— Jun 2025 to present</span></li>
  <li><strong>Student Researcher</strong>, MIT, with Antonio Torralba <span class="when">— summer 2025</span></li>
</ul>
</div>

<div class="home-sec">
<h2>Elsewhere</h2>
<ul class="home-list">
  <li><a href="{{ '/writing/' | relative_url }}">Writing</a> — course surveys, final projects and lecture notes.</li>
  <li><a href="{{ '/coursework/' | relative_url }}">Coursework</a> — what I have taken at MIT, by term.</li>
</ul>
</div>
