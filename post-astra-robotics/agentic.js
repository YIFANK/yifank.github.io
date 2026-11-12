/* Fig 3: inside the agent paradigm. Cards + one-row timeline + click-to-open method figure. */
(function(){
  const box=document.getElementById('ag-cards'),svg=document.getElementById('fig-ag'),panel=document.getElementById('ag-panel');if(!box||!svg||!panel)return;
  const S=[
    {name:tr('Picks a skill','选技能'),start:2022.3,
     h:tr('The LLM picks which skill runs next','LLM 选下一步跑哪个技能'),
     p:[tr('SayCan gives the LLM a menu of skills the robot already has, each trained separately. For an instruction like “I spilled my drink, can you help?”, the LLM scores how useful each skill would be as the next step, a learned value function scores how likely it is to succeed from the current state, and the robot runs the skill with the best product.','SayCan 给 LLM 一份机器人已有技能的清单，每个技能单独训练。比如指令是“我把饮料洒了，能帮忙吗？”，LLM 给每个技能打分，看它作为下一步有多有用；一个学到的价值函数打分，看它在当前状态下有多大可能成功；机器人执行两者乘积最高的技能。'),
        tr('The LLM never touches motion. It only orders skills, and the plan can only be as good as the menu. Inner Monologue added feedback, so the LLM could see whether a step worked before choosing the next.','LLM 完全不碰动作，只负责排技能顺序，计划的上限就是这份清单。Inner Monologue 加了反馈，让 LLM 在选下一步之前能看到上一步成没成功。')],
     src:[['SayCan','https://arxiv.org/abs/2204.01691'],['Inner Monologue','https://arxiv.org/abs/2207.05608']]},
    {name:tr('Writes the program','写程序'),start:2022.7,
     h:tr('The LLM writes the program that calls perception and control','LLM 写程序，调用感知和控制'),
     p:[tr('Code as Policies has the LLM write Python against a small API: detect objects, read their positions, pick and place. Loops, arithmetic and spatial phrases like “a bit left of the bowl” become code, which is exactly what a menu of skills could not express.','Code as Policies 让 LLM 对着一个小 API 写 Python：检测物体、读位置、抓取放置。循环、算术和“碗左边一点”这类空间描述都变成代码，这正是技能清单表达不了的。'),
        tr('VoxPoser has the LLM write code that builds 3D maps of where to go and what to avoid, and a motion planner follows them. The AGP harness in this post works the same way, with a much stronger model, measurement tools, and dozens of calls per episode.','VoxPoser 让 LLM 写代码搭出 3D 地图，标出该去哪、该避开哪，再由运动规划器去执行。本文的 AGP 也是这个思路，只是模型强得多、有测量工具，每个 episode 调用几十次。')],
     src:[['Code as Policies','https://arxiv.org/abs/2209.07753'],['VoxPoser','https://arxiv.org/abs/2307.05973']]},
    {name:tr('Self-improves','自我改进'),start:2023.8,
     h:tr('Given a score, the agent improves the robot on its own','给一个评分，agent 自己把机器人改好'),
     p:[tr('This is the step from writing a controller once to improving it. Give the agent a value function, such as a success check, a reward or a test suite, and it proposes a change, runs it, scores the result and keeps what helps. In ML the same loop is called autoresearch: Karpathy’s version edits LLM training code overnight and keeps whatever lowers validation loss. Eureka (2023) was an early robotics case, writing reward functions for RL.','这一步是从“写一次控制器”变成“持续改进它”。给 agent 一个价值函数，比如成功判定、奖励或一组测试，它就会提出修改、运行、打分，保留有用的改动。在机器学习里这个循环叫 autoresearch：Karpathy 的版本整夜修改 LLM 训练代码，保留能降低验证损失的改动。Eureka（2023）是机器人里的早期例子，让 LLM 写强化学习的奖励函数。'),
        tr('ENPIRE runs this loop on real robots. Each round resets the scene, runs the policy and checks the outcome; coding agents read the logs, consult the literature and change the training code to fix failure modes, reaching 99% on dexterous tasks like fastening a zip tie. ASPIRE keeps the programs that work as a skill library, and Waddle Labs sells the loop as a product that writes and debugs control code for a new arm in about 20 minutes.','ENPIRE 在真机上跑这个循环：每轮重置场景、运行策略、检查结果；编程 agent 读日志、查文献、改训练代码去修失败模式，在扎扎带这类灵巧任务上做到 99%。ASPIRE 把有效的程序留成技能库；Waddle Labs 把这个循环做成产品，约 20 分钟为新机械臂写好并调通控制代码。')],
     src:[['Eureka','https://arxiv.org/abs/2310.12931'],['autoresearch','https://github.com/karpathy/autoresearch'],['ENPIRE','https://arxiv.org/abs/2606.19980'],['ASPIRE','https://arxiv.org/abs/2607.00272'],['Waddle Labs','https://www.ycombinator.com/companies/waddle-labs']]},
    {name:tr('Drives the robot','直接控制机器人'),start:2026.52,
     h:tr('The LLM outputs the actions itself','LLM 自己输出动作'),
     p:[tr('The newest step skips the learned layer. In NVIDIA’s Astranomy study, GPT-6 Astra outputs end-effector or joint targets in chunks at 15 Hz, with the simulation paused while it thinks. A call takes about 18.6 seconds on average.','最新的一步跳过了学到的那一层。在 NVIDIA 的 Astranomy 研究里，GPT-6 Astra 以 15 Hz 分段输出末端或关节目标，思考时仿真暂停。每次调用平均约 18.6 秒。'),
        tr('It works better than expected, 66% on their 120-task suite, but the same model reached 75% when it could call tools instead. Anthropic’s July study found Claude models still mostly fail when they must drive the joints themselves, though newer models are improving.','效果比预想的好，在他们 120 个任务的测试集上是 66%；但同一个模型在能调用工具时达到 75%。Anthropic 7 月的研究发现，Claude 模型自己驱动关节时大多还是失败，不过新模型在进步。')],
     src:[['Astranomy','https://research.nvidia.com/labs/srl/projects/astranomy/'],[tr('Anthropic, July 2026','Anthropic，2026 年 7 月'),'https://www.anthropic.com/research/claude-plays-robotics']]}];
  const M=[[0,2022.3,'SayCan',tr('LLM scores × learned affordances pick the next skill.','LLM 打分 × 学到的可行性，选出下一个技能。')],
    [0,2022.55,'Inner Monologue',tr('Adds success feedback between steps.','在步骤之间加入成功与否的反馈。')],
    [1,2022.7,'Code as Policies',tr('The LLM writes Python against perception and control APIs.','LLM 调用感知和控制 API 写 Python。')],
    [1,2023.5,'VoxPoser',tr('LLM code composes 3D value maps for a planner.','LLM 写代码组合 3D 价值图，交给规划器。')],
    [2,2023.8,'Eureka',tr('The LLM writes reward functions; RL trains the policy.','LLM 写奖励函数，强化学习训练策略。')],
    [2,2026.2,'autoresearch',tr('Karpathy: an agent edits LLM training code overnight and keeps changes that lower validation loss. Not robotics, same loop.','Karpathy：agent 整夜修改 LLM 训练代码，保留能降低验证损失的改动。不是机器人，但是同一个循环。')],
    [2,2026.45,'ENPIRE',tr('Real-robot self-improvement: agents verify each rollout and rewrite the training code; 99% on dexterous tasks.','真机自我改进：agent 检查每次执行，改写训练代码；灵巧任务做到 99%。')],
    [2,2026.52,'ASPIRE',tr('Agents write programs and grow a skill library.','agent 写程序，积累技能库。')],
    [2,2026.57,'Waddle Labs',tr('Agents write and debug control code for a new arm in ~20 min.','agent 约 20 分钟为新机械臂写好并调通控制代码。')],
    [3,2026.52,tr('Anthropic study','Anthropic 研究'),tr('Claude models on direct joint control: mostly failing, improving.','Claude 模型直接控制关节：大多失败，但在进步。')],
    [3,2026.67,tr('GPT-6 Astra released','GPT-6 Astra 发布'),tr('September 3.','9 月 3 日。')],
    [3,2026.79,'Astranomy',tr('Astra as a native policy at 15 Hz: 66% direct, 75% with tools.','Astra 直接当策略，15 Hz：直接控制 66%，用工具 75%。')]];

  /* ---------- timeline ---------- */
  const W=980,H=124,L=14,R=14,ly=70;svg.setAttribute('viewBox',`0 0 ${W} ${H}`);
  const K=[[2022,0],[2023,.2],[2024,.42],[2026,.56],[2027,1]];
  const x=t=>{for(let i=1;i<K.length;i++)if(t<=K[i][0]){const [a,fa]=K[i-1],[b,fb]=K[i];return L+(W-L-R)*(fa+(fb-fa)*(t-a)/(b-a))}return W-R};
  const op=[.2,.38,.58,.85],seg=[];
  S.forEach((s,i)=>{const e=i<S.length-1?S[i+1].start:2027;seg.push(el('rect',{x:x(s.start),y:ly-6,width:x(e)-x(s.start),height:12,fill:'var(--accent)','fill-opacity':op[i]},svg))});
  el('line',{x1:x(2024),x2:x(2026),y1:ly+11,y2:ly+11,stroke:'var(--faint)','stroke-dasharray':'2 3'},svg);
  [2022,2023,2024,2026,2027].forEach(t=>{el('line',{x1:x(t),x2:x(t),y1:ly+9,y2:ly+14,stroke:'var(--faint)'},svg);const q=el('text',{x:x(t),y:ly+30,'text-anchor':t===2027?'end':'middle','font-size':11,fill:'var(--faint)'},svg);q.textContent=t});
  const con=S.map((s,i)=>{const cx=(i+.5)/S.length*W,ex=x(s.start)+3;return el('path',{d:`M${cx} 0 C${cx} 26 ${ex} 26 ${ex} ${ly-10}`,fill:'none',stroke:'var(--gray-mark)','stroke-width':1.3},svg)});
  const MS=[...M].sort((a,b)=>a[1]-b[1]),xs=MS.map(m=>x(m[1]));
  for(let i=1;i<xs.length;i++)xs[i]=Math.max(xs[i],xs[i-1]+13);
  for(let i=xs.length-1;i>=0;i--)xs[i]=Math.min(xs[i],i===xs.length-1?W-R-6:xs[i+1]-13);
  MS.forEach(([si,t,name,d],i)=>{el('circle',{cx:xs[i],cy:ly,r:5,fill:'var(--ink)',stroke:'var(--surface)','stroke-width':1.8},svg);
    const hit=el('circle',{cx:xs[i],cy:ly,r:8,fill:'transparent'},svg);hover(hit,`<b>${name}</b> · ${Math.floor(t)}<br>${S[si].name}<br>${d}`)});

  /* ---------- drawing helpers for thumbnails and method figures ---------- */
  const T=(p,x0,y0,s,o={})=>{const t=el('text',Object.assign({x:x0,y:y0,'font-size':12,fill:'var(--ink)'},o),p);t.textContent=s;return t};
  const B=(p,x0,y0,w,h,o={})=>el('rect',Object.assign({x:x0,y:y0,width:w,height:h,rx:7,fill:'var(--surface)',stroke:'var(--rule)'},o),p);
  const A=(p,x1,y1,x2,y2)=>{el('line',{x1,y1,x2,y2,stroke:'var(--muted)','stroke-width':1.5},p);const a=Math.atan2(y2-y1,x2-x1),k=6;
    el('path',{d:`M${x2} ${y2} L${x2-k*Math.cos(a-.45)} ${y2-k*Math.sin(a-.45)} L${x2-k*Math.cos(a+.45)} ${y2-k*Math.sin(a+.45)}z`,fill:'var(--muted)'},p)};
  const LLM=(p,x0,y0,w=70,h=40)=>{B(p,x0,y0,w,h,{fill:'var(--accent)',stroke:'none'});T(p,x0+w/2,y0+h/2+4,'LLM',{'text-anchor':'middle',fill:'#fff','font-weight':600})};
  const ARM=(p,bx,by,pts,o={})=>{const [a,b]=pts;el('path',{d:`M${bx} ${by} L${a[0]} ${a[1]} L${b[0]} ${b[1]}`,fill:'none',stroke:o.c||'var(--ink)','stroke-width':o.w||7,'stroke-linecap':'round','stroke-linejoin':'round'},p);
    el('circle',{cx:bx,cy:by,r:(o.w||7)*.9,fill:o.c||'var(--ink)'},p)};

  const THUMB=[
    p=>{[[18,62,.45],[18,46,.3],[18,30,.95],[18,14,.6]].forEach(([x0,w,f],i)=>{const y0=22+i*22;el('rect',{x:x0,y:y0,width:124,height:12,rx:6,fill:'var(--gray-mark)','fill-opacity':.35},p);el('rect',{x:x0,y:y0,width:124*f,height:12,rx:6,fill:i===2?'var(--accent)':'var(--gray-mark)'},p)})},
    p=>{[[18,70,0],[30,50,1],[30,84,0],[18,40,1],[30,64,0]].forEach(([x0,w,a],i)=>el('rect',{x:x0,y:18+i*18,width:w,height:9,rx:4.5,fill:a?'var(--accent)':'var(--gray-mark)'},p));el('path',{d:'M120 30 l14 0 m-7 -7 l7 7 l-7 7',stroke:'var(--muted)','stroke-width':2,fill:'none'},p);ARM(p,124,104,[[124,74],[146,60]],{w:5})},
    p=>{const cx=62,cy=60,r=34;el('circle',{cx,cy,r,fill:'none',stroke:'var(--gray-mark)','stroke-width':3},p);el('path',{d:`M${cx+r} ${cy} l-6 -8 m6 8 l7 -7`,stroke:'var(--gray-mark)','stroke-width':3,fill:'none','stroke-linecap':'round'},p);
      [0,1,2,3].forEach(k=>{const a=k*Math.PI/2-Math.PI/2;el('circle',{cx:cx+r*Math.cos(a),cy:cy+r*Math.sin(a),r:8,fill:k===0?'var(--accent)':'var(--ink)'},p)});
      el('path',{d:'M110 96 L120 90 L128 92 L136 74 L144 70 L152 46',fill:'none',stroke:'var(--accent)','stroke-width':3,'stroke-linejoin':'round','stroke-linecap':'round'},p)},
    p=>{[[60,28],[84,36],[104,50],[118,66]].forEach(([a,b],i)=>el('circle',{cx:a,cy:b,r:4,fill:'var(--accent)','fill-opacity':.35+i*.2},p));ARM(p,40,104,[[40,64],[118,66]]);el('rect',{x:112,y:70,width:14,height:12,rx:2,fill:'var(--accent)'},p)}];

  const FIG=[
    p=>{ // SayCan
      B(p,14,30,150,44);T(p,24,50,tr('“I spilled my drink,','“我把饮料洒了，'));T(p,24,66,tr('can you help?”','能帮忙吗？”'));
      A(p,89,74,89,102);LLM(p,54,104);
      const rows=[[tr('find a sponge','找海绵'),.8,.9],[tr('pick up the sponge','拿起海绵'),.7,.2],[tr('go to the table','走到桌边'),.3,.9],[tr('pick up the apple','拿起苹果'),.1,.8]];
      T(p,336,24,tr('useful','有用'),{'font-size':11,fill:'var(--muted)'});T(p,394,24,tr('possible','可行'),{'font-size':11,fill:'var(--muted)'});
      rows.forEach(([s,u,f],i)=>{const y0=34+i*34,on=i===0;B(p,176,y0,290,28,on?{stroke:'var(--accent)','stroke-width':2}:{});T(p,186,y0+18,s,{'font-size':11.5});
        el('rect',{x:336,y:y0+9,width:40*u,height:10,rx:3,fill:'var(--accent)'},p);el('rect',{x:394,y:y0+9,width:40*f,height:10,rx:3,fill:'var(--ink)'},p);
        T(p,381,y0+18,'×',{'font-size':12,fill:'var(--muted)'})});
      A(p,124,124,176,62);A(p,468,48,486,48);B(p,488,30,62,58,{fill:'var(--tint)'});T(p,519,54,tr('run','执行'),{'text-anchor':'middle','font-size':11.5});T(p,519,70,tr('skill','技能'),{'text-anchor':'middle','font-size':11.5});
      T(p,176,196,tr('LLM: useful next step?  ×  value fn: can it succeed here?','LLM：这一步有用吗？ × 价值函数：从这里能成功吗？'),{'font-size':11,fill:'var(--muted)','xml:space':'preserve'})},
    p=>{ // Code as Policies
      B(p,14,40,128,44);T(p,24,60,tr('“stack the blocks','“把积木按大小'));T(p,24,76,tr('by size”','叠起来”'));A(p,78,84,78,112);LLM(p,43,114);
      B(p,170,24,230,150,{fill:'var(--tint)'});
      ['blocks = detect("block")','blocks.sort(key=size)','base = blocks.pop()','for b in reversed(blocks):','  put_on(b, base)','  base = b'].forEach((s,i)=>{const t=T(p,182,48+i*21,s,{'font-size':11.5,'xml:space':'preserve'});if(/detect|put_on/.test(s))t.setAttribute('fill','var(--accent)')});
      A(p,113,134,166,110);
      [[tr('perception','感知'),44],[tr('pick & place','抓放'),94]].forEach(([s,y0])=>{B(p,428,y0,110,34);T(p,483,y0+21,s,{'text-anchor':'middle','font-size':11.5})});
      A(p,402,70,426,62);A(p,402,110,426,110);ARM(p,483,200,[[483,160],[520,150]],{w:6})},
    p=>{ // self-improvement loop
      const cx=170,cy=110,r=80,N=[[tr('propose a','提出修改'),tr('change','（代码、奖励）')],[tr('run on robot','在真机或'),tr('or in sim','仿真上运行')],[tr('score it with','用价值函数'),tr('the value fn','打分')],[tr('keep it if','更好就保留，'),tr('better','否则回退')]];
      el('circle',{cx,cy,r,fill:'none',stroke:'var(--gray-mark)','stroke-width':2,'stroke-dasharray':'5 5'},p);
      [.25,.75,1.25,1.75].forEach(f=>{const a=f*Math.PI-Math.PI/2+.1;A(p,cx+r*Math.cos(a),cy+r*Math.sin(a),cx+r*Math.cos(a+.25),cy+r*Math.sin(a+.25))});
      N.forEach((n,k)=>{const a=k*Math.PI/2-Math.PI/2,nx=cx+r*Math.cos(a),ny=cy+r*Math.sin(a),hi=k===2;B(p,nx-56,ny-20,112,40,hi?{fill:'var(--ink)',stroke:'none'}:k===0?{fill:'var(--accent)',stroke:'none'}:{});
        const c=(hi||k===0)?'#fff':'var(--ink)';T(p,nx,ny-3,n[0],{'text-anchor':'middle','font-size':11,fill:c});T(p,nx,ny+12,n[1],{'text-anchor':'middle','font-size':11,fill:c})});
      T(p,cx,cy+4,tr('agent','agent'),{'text-anchor':'middle','font-weight':600,fill:'var(--accent)'});
      const gx=330,gy=40,gw=210,gh=130;B(p,gx,gy-16,gw+16,gh+50,{fill:'var(--tint)'});T(p,gx+10,gy+2,tr('score by round (schematic)','每轮得分（示意）'),{'font-size':11,'font-weight':600});
      const v=[.32,.30,.45,.44,.58,.57,.70,.78,.77,.88,.94,.99];let d='';v.forEach((q,i)=>{const px=gx+14+i*(gw-20)/(v.length-1),py=gy+gh-q*(gh-24);d+=(i?'L':'M')+px+' '+py;
        const kept=i===0||q>v[i-1];el('circle',{cx:px,cy:py,r:3.5,fill:kept?'var(--accent)':'var(--gray-mark)'},p)});
      el('path',{d,fill:'none',stroke:'var(--accent)','stroke-width':1.5,'stroke-opacity':.5},p);
      T(p,gx+10,gy+gh+24,tr('gray: change reverted','灰色：改动被回退'),{'font-size':10.5,fill:'var(--muted)'})},
    p=>{ // direct control
      B(p,14,56,96,72,{fill:'var(--tint)'});el('circle',{cx:44,cy:100,r:9,fill:'var(--accent)'},p);el('rect',{x:62,y:86,width:30,height:24,rx:3,fill:'var(--gray-mark)'},p);T(p,62,76,tr('camera','相机'),{'text-anchor':'middle','font-size':11,fill:'var(--muted)'});
      A(p,112,92,140,92);LLM(p,142,72);A(p,214,92,240,92);
      B(p,242,30,150,126,{fill:'var(--tint)'});T(p,252,50,tr('targets, one chunk','目标点，一段'),{'font-size':11,fill:'var(--muted)'});
      ['x  y  z  grip',' .41 .12 .30  1',' .42 .12 .27  1',' .42 .13 .24  0','  …'].forEach((s,i)=>T(p,252,72+i*19,s,{'font-size':11.5,'xml:space':'preserve',fill:i?'var(--ink)':'var(--muted)'}));
      A(p,394,92,420,92);ARM(p,450,180,[[450,120],[510,100]]);el('rect',{x:502,y:104,width:18,height:16,rx:3,fill:'var(--accent)'},p);
      el('circle',{cx:178,cy:160,r:16,fill:'none',stroke:'var(--ink)','stroke-width':1.5},p);el('path',{d:'M178 150 V160 H186',stroke:'var(--ink)','stroke-width':1.5,fill:'none'},p);
      T(p,200,158,tr('~18.6 s per call,','每次调用约 18.6 秒，'),{'font-size':11});T(p,200,173,tr('sim paused meanwhile','期间仿真暂停'),{'font-size':11});
      T(p,242,200,tr('15 Hz targets · no learned policy underneath','15 Hz 目标点 · 底下没有学到的策略'),{'font-size':11,fill:'var(--muted)'})}];

  /* ---------- cards + panel ---------- */
  const cards=[];let cur=-1;
  S.forEach((s,i)=>{const c=document.createElement('div');c.className='era';c.tabIndex=0;c.setAttribute('role','button');
    const th=document.createElementNS(NS,'svg');th.setAttribute('viewBox','0 0 160 120');th.setAttribute('class','ag-thumb');THUMB[i](th);c.appendChild(th);
    c.insertAdjacentHTML('beforeend',`<b>${s.name}</b><span>${Math.floor(s.start)}– · ${tr('method ▸','方法 ▸')}</span>`);box.appendChild(c);cards.push(c);
    const on=v=>{c.classList.toggle('on',v);seg[i].setAttribute('fill-opacity',v?1:op[i]);con[i].setAttribute('stroke',v?'var(--accent)':'var(--gray-mark)')};
    c.addEventListener('pointerenter',()=>on(true));c.addEventListener('pointerleave',()=>on(false));
    const go=()=>open(i);c.addEventListener('click',go);c.addEventListener('keydown',ev=>{if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();go()}})});
  function open(i){
    if(cur===i){cur=-1;panel.hidden=true;panel.innerHTML='';cards.forEach(c=>c.classList.remove('sel'));return}
    cur=i;panel.hidden=false;cards.forEach((c,k)=>c.classList.toggle('sel',k===i));panel.innerHTML='';const s=S[i];
    const d=document.createElement('div');d.className='era-demo';const f=document.createElementNS(NS,'svg');f.setAttribute('viewBox','0 0 560 220');f.setAttribute('role','img');f.setAttribute('aria-label',s.h);FIG[i](f);d.appendChild(f);
    const t=document.createElement('div');t.className='era-text';
    t.innerHTML=`<h5>${s.h}</h5>`+s.p.map(q=>`<p>${q}</p>`).join('')+`<p class="ag-src">${s.src.map(([n,u])=>`<a href="${u}">${n}</a>`).join(' · ')}</p>`;
    panel.append(d,t);
    if(panel.getBoundingClientRect().bottom>innerHeight)panel.scrollIntoView({block:'nearest',behavior:'smooth'})}
})();
