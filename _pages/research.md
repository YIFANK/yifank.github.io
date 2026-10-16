---
layout: page
title: research
permalink: /research/
description: Papers and ongoing work.
nav: true
nav_order: 1
---

<style>
.pub-list { display: flex; flex-direction: column; gap: 2.2rem; margin-top: 1.2rem; }
.pub { display: flex; gap: 1.4rem; align-items: flex-start; }
.pub-thumb { flex: 0 0 240px; max-width: 240px; }
.pub-thumb img { width: 100%; border-radius: 4px; display: block; }
.pub-body { flex: 1 1 auto; min-width: 0; }
.pub-title { font-weight: 700; font-size: 1.02rem; line-height: 1.35; margin: 0 0 .3rem; }
.pub-title a { color: inherit; }
.pub-authors { font-size: .92rem; color: var(--global-text-color-light); margin: 0 0 .3rem; }
.pub-authors .me { color: var(--global-text-color); font-weight: 600; }
.pub-venue { font-size: .95rem; margin: 0 0 .45rem; color: #9b1d20; }
.pub-venue em { font-style: italic; }
.pub-desc { font-size: .93rem; line-height: 1.55; margin: 0 0 .45rem; color: var(--global-text-color-light); }
.pub-links { font-size: .93rem; margin: 0; }
.pub-links a { margin-right: .5rem; }
@media (max-width: 640px) {
  .pub { flex-direction: column; gap: .8rem; }
  .pub-thumb { flex-basis: auto; max-width: 100%; }
}
</style>

<div class="pub-list">

  <div class="pub">
    <div class="pub-thumb">
      <img src="{{ 'assets/img/research/encore.jpg' | relative_url }}" alt="ENCORE teaser">
    </div>
    <div class="pub-body">
      <p class="pub-title"><a href="https://yifank.github.io/encore/">ENCORE: Few-Shot Agentic Discovery of Manipulation Strategies</a></p>
      <p class="pub-authors"><span class="me">Yifan Kang</span>, Zihan Wang, Zhiwen Fan, Bangya Liu</p>
      <p class="pub-venue"><strong>Oral Presentation</strong>, <em>NeurIPS 2026 Robot Learning Workshop</em></p>
      <p class="pub-desc">A coding agent reads three demonstrations, writes an executable policy program, and repairs it from its own execution traces.</p>
      <p class="pub-links">[<a href="https://arxiv.org/abs/2609.37359">Paper</a>] [<a href="https://yifank.github.io/encore/">Website</a>] [<a href="https://github.com/YIFANK/encore">Code</a>]</p>
    </div>
  </div>

  <div class="pub">
    <div class="pub-thumb">
      <img src="{{ 'assets/img/research/diffusion-lm.jpg' | relative_url }}" alt="Interpretability pipeline for diffusion language models">
    </div>
    <div class="pub-body">
      <p class="pub-title"><a href="{{ 'assets/pdf/diffusion-lm-colm2026-poster.pdf' | relative_url }}">Interpreting Diffusion Language Models Over Denoising Time</a></p>
      <p class="pub-authors">Jingcheng Yang*, Shangtong Wu*, <span class="me">Yifan Kang</span>*, Tianhu Xiong, Mingyuan Wu, Haozhen Zheng, Alex Schwing, Klara Nahrstedt &nbsp;<em>(*equal contribution)</em></p>
      <p class="pub-venue"><em>CoLM 2026 Workshop on Non-Autoregressive Language Models</em></p>
      <p class="pub-desc">Sparse autoencoders and cross-layer transcoders for diffusion LLMs, with timestep-aware tracing and causal interventions.</p>
      <p class="pub-links">[<a href="{{ 'assets/pdf/diffusion-lm-colm2026-poster.pdf' | relative_url }}">Poster</a>]</p>
    </div>
  </div>

  <div class="pub">
    <div class="pub-thumb">
      <img src="{{ 'assets/img/research/doodle.jpg' | relative_url }}" alt="Doodle Agent">
    </div>
    <div class="pub-body">
      <p class="pub-title"><a href="https://yifank.github.io/doodle-agent/">Doodle Agent: Exploring Freeform Visual Generation with Multimodal LLMs</a></p>
      <p class="pub-authors">Dingning Cao*, <span class="me">Yifan Kang</span>*, Yael Vinker, Antonio Torralba &nbsp;<em>(*equal contribution)</em></p>
      <p class="pub-venue"><em>ICCV 2025 Workshop on AI for Visual Arts (AI4VA)</em></p>
      <p class="pub-desc">A drawing agent that turns natural-language prompts into drawing actions, iteratively choosing brushes, colors, and coordinates.</p>
      <p class="pub-links">[<a href="https://yifank.github.io/doodle-agent/">Website</a>]</p>
    </div>
  </div>

  <div class="pub">
    <div class="pub-thumb">
      <img src="{{ 'assets/img/research/cnot.jpg' | relative_url }}" alt="CNOT circuits under a topological constraint">
    </div>
    <div class="pub-body">
      <p class="pub-title"><a href="https://math.mit.edu/research/highschool/rsi/documents/2023KangY.pdf">CNOT-Optimal Circuit Synthesis</a></p>
      <p class="pub-authors"><span class="me">Yifan Kang</span></p>
      <p class="pub-venue"><strong>Top 5 Paper</strong>, <em>Research Science Institute (RSI), 2023</em></p>
      <p class="pub-desc">Synthesizing CNOT circuits under directed topological constraints, with hardness results for minimizing circuit size.</p>
      <p class="pub-links">[<a href="https://math.mit.edu/research/highschool/rsi/documents/2023KangY.pdf">Paper</a>]</p>
    </div>
  </div>

</div>
