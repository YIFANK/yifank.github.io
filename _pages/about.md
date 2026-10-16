---
layout: about
title: about
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
social: true # includes social icons at the bottom of the page

latest_posts:
  enabled: true
  scrollable: true # adds a vertical scroll bar if there are more than 3 new posts items
  limit: 3 # leave blank to include all the blog posts
---

Hi! I am currently a junior double majoring in AI (Course 6-4) and Math (Course 18) at MIT, where I am advised by [Leslie Kaelbling](https://people.csail.mit.edu/lpk/) in [Learning & Intelligent Systems Group](https://lis.csail.mit.edu/). I am interested in building robots that can learn efficiently at deployment time, adapting to new tasks from a handful of demonstrations. Right now I am exploring better ways to combine coding agents with robot foundation models. Outside of academics, I enjoy singing, drumming, running, and playing rhythm games.

<style>
.home-sec { margin-top: 2rem; }
.home-sec h2 { font-size: 1.05rem; font-weight: 600; margin-bottom: .7rem;
  padding-bottom: .3rem; border-bottom: 1px solid var(--global-divider-color); }
.home-sec h2 .more { float: right; font-size: .82rem; font-weight: 400; }
.hp { display: flex; gap: 1rem; align-items: flex-start; margin-bottom: 1rem; }
.hp-thumb { flex: 0 0 140px; max-width: 140px; }
.hp-thumb img { width: 100%; border-radius: 3px; display: block; }
.hp-body { flex: 1 1 auto; min-width: 0; }
.hp-title { font-weight: 600; font-size: .95rem; line-height: 1.35; margin: 0 0 .15rem; }
.hp-title a { color: inherit; }
.hp-venue { font-size: .87rem; color: #9b1d20; margin: 0; }
.hp-venue em { font-style: italic; }
.home-list { list-style: none; padding: 0; margin: 0; }
.home-list li { font-size: .93rem; margin-bottom: .45rem; line-height: 1.45; }
.home-list .when { color: var(--global-text-color-light); font-size: .87rem; }
@media (max-width: 640px) { .hp { flex-direction: column; gap: .5rem; } .hp-thumb { max-width: 60%; } }
</style>

<div class="home-sec">
<h2>Selected research <span class="more"><a href="{{ '/research/' | relative_url }}">all &rarr;</a></span></h2>

<div class="hp">
  <div class="hp-thumb"><a href="https://yifank.github.io/encore/"><img src="{{ 'assets/img/research/encore.jpg' | relative_url }}" alt="ENCORE"></a></div>
  <div class="hp-body">
    <p class="hp-title"><a href="https://yifank.github.io/encore/">ENCORE: Few-Shot Agentic Discovery of Manipulation Strategies</a></p>
    <p class="hp-venue"><strong>Oral</strong>, <em>NeurIPS 2026 Robot Learning Workshop</em></p>
  </div>
</div>

<div class="hp">
  <div class="hp-thumb"><a href="{{ 'assets/pdf/diffusion-lm-colm2026-poster.pdf' | relative_url }}"><img src="{{ 'assets/img/research/diffusion-lm.jpg' | relative_url }}" alt="Diffusion LM interpretability"></a></div>
  <div class="hp-body">
    <p class="hp-title">Interpreting Diffusion Language Models Over Denoising Time</p>
    <p class="hp-venue"><em>CoLM 2026 Workshop on Non-Autoregressive Language Models</em></p>
  </div>
</div>

<div class="hp">
  <div class="hp-thumb"><a href="https://yifank.github.io/doodle-agent/"><img src="{{ 'assets/img/research/doodle.jpg' | relative_url }}" alt="Doodle Agent"></a></div>
  <div class="hp-body">
    <p class="hp-title"><a href="https://yifank.github.io/doodle-agent/">Doodle Agent: Exploring Freeform Visual Generation with Multimodal LLMs</a></p>
    <p class="hp-venue"><em>ICCV 2025 Workshop on AI for Visual Arts</em></p>
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
