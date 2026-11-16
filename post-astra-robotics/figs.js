const ZH=(document.documentElement.lang||'').startsWith('zh');
const tr=(en,zh)=>ZH?zh:en;
const NS="http://www.w3.org/2000/svg";
const el=(t,a={},p)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e};
const tip=document.getElementById('tip');
function showTip(html,ev){tip.innerHTML=html;tip.style.opacity=1;moveTip(ev)}
function moveTip(ev){const x=Math.min(ev.clientX+14,innerWidth-tip.offsetWidth-8);tip.style.left=x+'px';tip.style.top=(ev.clientY+14)+'px'}
function hideTip(){tip.style.opacity=0}
const NARROW=matchMedia('(max-width:560px)').matches;
let tipPinned=null;
function hover(node,html){
  node.addEventListener('pointerenter',e=>{if(e.pointerType!=='touch')showTip(html,e)});
  node.addEventListener('pointermove',e=>{if(e.pointerType!=='touch')moveTip(e)});
  node.addEventListener('pointerleave',e=>{if(e.pointerType!=='touch')hideTip()});
  node.addEventListener('click',e=>{e.stopPropagation();showTip(html,e);tipPinned=node})}
document.addEventListener('click',()=>{if(tipPinned){tipPinned=null;hideTip()}});
addEventListener('scroll',()=>{if(tipPinned){tipPinned=null;hideTip()}},{passive:true});
/* wide charts scroll sideways on phones */
document.querySelectorAll('#fig-none').forEach(svg=>{const w=document.createElement('div');w.className='xscroll';svg.before(w);w.appendChild(svg)});

/* AGP per-task results: [task, category, success%, score, median wall s] */
const T=[["align_blocks","Open",100,100.00,108],["arrange_largest_number","Generalization",92,93.50,428],["build_tower","Precision",68,73.80,751],["classify_objects","Long-Horizon",92,94.40,480],["classify_objects_by_language","Open",60,73.00,590],["cover_blocks","Memory",96,96.00,383],["deposit_coin","Precision",20,33.20,319],["fasten_screws","Precision",90,94.40,521],["fill_egg_holder","Long-Horizon",0,12.30,431],["fill_pen_holder","Long-Horizon",2,31.20,852],["fold_clothes","Generalization",74,78.80,294],["general_pickup","Open",96,96.00,81],["hang_mugs","Generalization",6,22.00,793],["imitate_sorting_sequence","Memory",80,87.30,650],["insert_key","Precision",0,15.00,331],["insert_tubes","Precision",44,60.80,408],["make_kong","Long-Horizon",2,2.00,483],["make_toast","Generalization",8,12.00,1394],["match_and_pick_from_conveyor","Memory",96,96.00,239],["organize_table","Long-Horizon",32,74.50,796],["pack_objects_into_box","Generalization",24,45.30,955],["pick_from_conveyor_by_image","Open",56,56.00,659],["play_Xylophone","Precision",90,90.00,270],["play_stacking_toy","Long-Horizon",6,45.80,876],["play_tic_tac_toe","Long-Horizon",62,77.00,503],["plug_in_charger","Precision",4,4.00,384],["pour_balls_into_vase","Precision",36,36.00,376],["pour_by_language","Open",2,7.20,660],["pour_liquid_into_cup","Generalization",14,14.00,467],["press_by_number","Memory",84,84.00,229],["push_T","Generalization",100,100.00,158],["put_bottles_into_dustbin","Long-Horizon",34,58.60,506],["solve_equation","Open",90,90.00,131],["sort_nesting_dolls_by_size","Generalization",74,74.00,689],["stack_blocks","Generalization",100,100.00,273],["stack_blocks_by_language","Open",94,94.80,264],["stack_bowls","Generalization",88,89.50,366],["store_laptop_and_headphones","Generalization",0,12.40,832],["store_tools_in_toolbox","Open",0,9.00,798],["swap_T","Memory",94,94.00,244],["swap_blocks","Memory",96,96.00,374],["sweep_blocks","Generalization",76,76.00,594]];
const niceEn=s=>s.replace(/_/g,' ').replace(/^./,c=>c.toUpperCase()).replace('Xylophone','xylophone').replace('push T','push-T').replace('swap T','swap-T');
const TZH={align_blocks:'对齐积木',arrange_largest_number:'拼最大的数',build_tower:'搭塔',classify_objects:'物体分类',classify_objects_by_language:'按语言分类物体',cover_blocks:'盖住积木',deposit_coin:'投硬币',fasten_screws:'拧螺丝',fill_egg_holder:'装鸡蛋托',fill_pen_holder:'装笔筒',fold_clothes:'叠衣服',general_pickup:'通用拾取',hang_mugs:'挂杯子',imitate_sorting_sequence:'模仿分拣顺序',insert_key:'插钥匙',insert_tubes:'插试管',make_kong:'Make kong',make_toast:'做吐司',match_and_pick_from_conveyor:'传送带配对拾取',organize_table:'整理桌面',pack_objects_into_box:'把物体装进箱子',pick_from_conveyor_by_image:'按图从传送带拾取',play_Xylophone:'敲木琴',play_stacking_toy:'玩叠叠乐',play_tic_tac_toe:'井字棋',plug_in_charger:'插充电器',pour_balls_into_vase:'往花瓶倒球',pour_by_language:'按语言倒',pour_liquid_into_cup:'往杯里倒液体',press_by_number:'按数字按键',push_T:'push-T',put_bottles_into_dustbin:'把瓶子扔进垃圾桶',solve_equation:'解等式',sort_nesting_dolls_by_size:'按大小排套娃',stack_blocks:'叠积木',stack_blocks_by_language:'按语言叠积木',stack_bowls:'叠碗',store_laptop_and_headphones:'收好笔记本和耳机',store_tools_in_toolbox:'把工具收进工具箱',swap_T:'交换 T',swap_blocks:'交换积木',sweep_blocks:'扫积木'};
const CZH={Memory:'记忆',Open:'开放',Generalization:'泛化',Precision:'精度','Long-Horizon':'长程'};
const nice=s=>ZH&&TZH[s]?TZH[s]:niceEn(s);
const catName=c=>ZH?CZH[c]:c;
const textW=(s,cw)=>[...s].reduce((a,ch)=>a+(/[\u3000-\u9fff\uff00-\uffef]/.test(ch)?cw*1.7:cw),0);
const CAT={"Memory":91.0,"Open":62.25,"Generalization":54.67,"Precision":44.0,"Long-Horizon":28.75};

/* Fig 1 */
(function(){
  const rows=[["GR00T 2 + agent",tr("NVIDIA, 1 of 3 layout banks","NVIDIA，三组布局中的一组"),75.8,"agent"],["Q0-Preview",tr("leaderboard agent","排行榜智能体"),74.2,"agent"],["Fable 5.2",tr("Anthropic run, max effort","Anthropic 内部评测，最高 effort"),64.9,"anth"],["GPT-6 Astra + AGP harness",tr("AGP dataset, high effort","AGP 数据集，high effort"),63.63,"agent"],["GO-3 Nano Preview",tr("leaderboard agent","排行榜智能体"),61.9,"agent"],["WALL-OSS-1.0-lite",tr("top learned policy","最强学习型策略"),42.59,"policy"],["Opus 5.5",tr("Anthropic run, max effort","Anthropic 内部评测，最高 effort"),39.4,"anth"],["GR00T 2",tr("NVIDIA, policy alone","NVIDIA，策略单独运行"),35.5,"policy"],["Gemini 4 Argon",tr("Anthropic run, high effort","Anthropic 内部评测，high effort"),34.2,"anth"],["GPT-6 Astra",tr("Anthropic run, max effort","Anthropic 内部评测，最高 effort"),29.8,"anth"],["Fable 5.1",tr("Anthropic run, max effort","Anthropic 内部评测，最高 effort"),27.6,"anth"]];
  const col={anth:'var(--accent)',agent:'var(--accent-2)',policy:'var(--gray-mark)'};
  const W=NARROW?440:640,L=NARROW?172:190,R=50,rh=28,H=rows.length*rh+30,svg=document.getElementById('fig1');
  svg.setAttribute('viewBox',`0 0 ${W} ${H}`);
  const x=v=>L+(W-L-R)*v/100;
  for(const g of [0,25,50,75,100]){el('line',{x1:x(g),x2:x(g),y1:0,y2:H-24,stroke:'var(--rule)'},svg);const t=el('text',{x:x(g),y:H-8,'text-anchor':'middle','font-size':11,fill:'var(--faint)'},svg);t.textContent=g}
  rows.forEach((r,i)=>{const y=i*rh+6;
    const n=el('text',{x:L-10,y:y+17,'text-anchor':'end','font-size':13,fill:'var(--ink)','font-weight':r[0]==='Fable 5.2'?600:400},svg);n.textContent=r[0];
    const w=x(r[2])-L;el('path',{d:`M${L} ${y+4}h${w-4}a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4h${-(w-4)}z`,fill:col[r[3]]},svg);
    const v=el('text',{x:x(r[2])+6,y:y+17,'font-size':12,fill:'var(--ink)'},svg);v.textContent=r[2].toFixed(1);
    const hit=el('rect',{x:0,y:y,width:W,height:rh,fill:'transparent'},svg);hover(hit,`<b>${r[0]}</b><br>${r[2].toFixed(2)} · ${r[1]}`);
  });
})();


/* Fig 2: paradigm timeline, one row */
(function(){
  const svg=document.getElementById('fig-eras'),box=document.getElementById('eras-cards');if(!svg||!box)return;
  const E=[
    ['media/era_unimate.jpg',tr('Hand-programmed motion','手工编程动作'),'1961–',1961,1971,tr('Motions are recorded once and played back. Most factory arms still work this way.','动作录一次、反复回放。大多数工厂机械臂至今仍这样工作。'),tr('Unimate pouring coffee, 1967','Unimate 倒咖啡，1967')],
    ['media/era_shakey.jpg',tr('Model-based planning & control','基于模型的规划与控制'),'1971–',1971,2015,tr('Plan over a geometric model, then control. IK, motion planners and controllers are now agent tools.','在几何模型上规划，再去控制。逆运动学、运动规划器和控制器现在是 agent 的工具。'),tr('Shakey, SRI, 1969','Shakey，SRI，1969')],
    ['media/era_baxter.jpg',tr('Learning from robot data','从机器人数据中学习'),'2015–',2015,2022,tr('Robots collect their own trials; grasping and control are learned with deep nets and RL.','机器人自己采试验数据，用深度网络和强化学习学抓取和控制。'),tr('Baxter, used for the 50K-grasp study','Baxter，5 万次抓取研究用的机器人')],
    ['media/era_oxe.jpg',tr('Imitation at scale, VLAs','大规模模仿学习、VLA'),'2022–',2022,2026,tr('Teleoperated demonstrations pooled across labs; pretrained vision-language models output actions.','跨实验室汇集遥操作示教，预训练视觉语言模型直接输出动作。'),tr('Open X-Embodiment episodes','Open X-Embodiment 的 episode')],
    ['media/eq_last.jpg',tr('Agentic robotics','Agentic robotics'),'2026–',2026,2027,tr('A frontier model writes programs that call perception, planning and learned skills, then checks the result.','前沿模型写程序调用感知、规划和学到的技能，再检查结果。'),tr('GPT-6 Astra + AGP, solve equation','GPT-6 Astra + AGP，解方程')]];
  const M=[
    [0,1961,'Unimate',tr('First industrial robot arm, at a GM plant.','第一台工业机械臂，用在通用汽车工厂。')],
    [1,1971,'STRIPS',tr('Fikes & Nilsson: the planner behind Shakey.','Fikes 和 Nilsson：Shakey 用的规划器。')],
    [1,1983,tr('Configuration space','构型空间'),tr('Lozano-Pérez: planning in configuration space.','Lozano-Pérez：在构型空间里规划。')],
    [1,1985,tr('Impedance control','阻抗控制'),'Hogan.'],
    [1,1989,'Handey',tr('Pick-and-place, grasps included, from a geometric model.','根据几何模型规划抓取放置，包括抓取本身。')],
    [1,1998,'RRT',tr('LaValle: rapidly-exploring random trees.','LaValle：快速扩展随机树。')],
    [1,2011,tr('Task and motion planning','任务与运动规划'),tr('Kaelbling & Lozano-Pérez, “in the now”.','Kaelbling 和 Lozano-Pérez，“in the now”。')],
    [2,2015.3,tr('Visuomotor policies','视觉运动策略'),tr('Levine et al.: end-to-end from pixels to torques.','Levine 等：从像素端到端到力矩。')],
    [2,2016.1,tr('50K grasps','5 万次抓取'),tr('Pinto & Gupta: 50K tries, 700 robot hours.','Pinto 和 Gupta：5 万次尝试、700 机器人小时。')],
    [2,2016.3,tr('800K grasps','80 万次抓取'),tr('Levine et al.: 6–14 robots over two months.','Levine 等：6–14 台机器人、两个月。')],
    [2,2017.3,'Dex-Net 2.0',tr('Grasping learned from synthetic point clouds; domain randomization for sim-to-real the same year.','从合成点云学抓取；同年出现 sim-to-real 的域随机化。')],
    [2,2018.5,'QT-Opt',tr('Deep RL on 580K real grasps.','58 万次真实抓取上的深度强化学习。')],
    [2,2019.8,tr("Rubik's cube",'魔方'),tr('OpenAI: one-handed solve, trained in simulation.','OpenAI：单手复原魔方，在仿真里训练。')],
    [4,2022.3,'SayCan',tr('An LLM picks among learned skills.','LLM 在学到的技能之间选择。')],
    [4,2022.7,'Code as Policies',tr('An LLM writes Python against perception and control APIs.','LLM 调用感知和控制 API 写 Python。')],
    [3,2022.95,'RT-1',tr('130K episodes from 13 robots.','13 台机器人、13 万条 episode。')],
    [3,2023.3,'ALOHA · Diffusion Policy',tr('Low-cost bimanual teleoperation; diffusion for actions.','低成本双臂遥操作；用扩散模型生成动作。')],
    [4,2023.5,'VoxPoser',tr('An LLM composes 3D value maps for a planner.','LLM 为规划器组合 3D 价值图。')],
    [3,2023.6,'RT-2',tr('The first model called a VLA.','第一个被称为 VLA 的模型。')],
    [3,2023.8,'Open X-Embodiment',tr('1M+ trajectories, 22 robot types.','100 万+ 条轨迹、22 种机器人。')],
    [3,2024.83,'π0','Physical Intelligence.'],
    [3,2025.25,'Gemini Robotics · π0.5',tr('VLAs built on frontier VLMs; generalization to new homes.','基于前沿 VLM 的 VLA；泛化到新家庭。')],
    [4,2026.45,'ENPIRE',tr('NVIDIA: coding agents run the real-robot learning loop themselves.','NVIDIA：编程 agent 自己跑真机学习循环。')],
    [4,2026.52,'ASPIRE',tr('NVIDIA: agents write robot programs and grow a reusable skill library.','NVIDIA：agent 写机器人程序，积累可复用的技能库。')],
    [4,2026.67,tr('GPT-6 Astra released','GPT-6 Astra 发布'),tr('September 3.','9 月 3 日。')],
    [4,2026.71,'“Goosebumps”',tr('Goldberg calls agentic robotics a third path.','Goldberg 称 agentic robotics 为第三条路。')],
    [4,2026.86,tr('RoboDojo results','RoboDojo 成绩'),tr('Fable 5.2 at 64.9; AGP (Astra) at 63.6.','Fable 5.2 64.9；AGP（Astra）63.6。')]];
  const W=980,H=124,L=14,R=14,ly=70;svg.setAttribute('viewBox',`0 0 ${W} ${H}`);
  const K=[[1960,0],[2010,.24],[2022,.56],[2026,.82],[2027,1]];
  const x=t=>{for(let i=1;i<K.length;i++)if(t<=K[i][0]){const [a,fa]=K[i-1],[b,fb]=K[i];return L+(W-L-R)*(fa+(fb-fa)*(t-a)/(b-a))}return W-R};
  const op=[.16,.3,.44,.6,.85],seg=[];
  E.forEach((e,i)=>{const r=el('rect',{x:x(e[3]),y:ly-6,width:x(e[4])-x(e[3]),height:12,fill:'var(--accent)','fill-opacity':op[i]},svg);seg.push(r)});
  [1960,1980,2000,2010,2015,2020,2022,2024,2026].forEach(t=>{el('line',{x1:x(t),x2:x(t),y1:ly+9,y2:ly+14,stroke:'var(--faint)'},svg);const q=el('text',{x:x(t),y:ly+30,'text-anchor':'middle','font-size':11,fill:'var(--faint)'},svg);q.textContent=t});
  const con=[];E.forEach((e,i)=>{const cx=(i+.5)/E.length*W,ex=x(e[3])+3;con.push(el('path',{d:`M${cx} 0 C${cx} 26 ${ex} 26 ${ex} ${ly-10}`,fill:'none',stroke:'var(--gray-mark)','stroke-width':1.3},svg))});
  // keep every dot on the line; nudge close ones apart sideways (min 13px), order preserved
  const MS=[...M].sort((a,b)=>a[1]-b[1]),xs=MS.map(m=>x(m[1]));
  for(let i=1;i<xs.length;i++)xs[i]=Math.max(xs[i],xs[i-1]+13);
  for(let i=xs.length-1;i>=0;i--)xs[i]=Math.min(xs[i],i===xs.length-1?W-R-6:xs[i+1]-13);
  MS.forEach(([pi,t,name,d],i)=>{const cx=xs[i],cy=ly;
    el('circle',{cx,cy,r:5,fill:pi===4?'var(--ink)':'var(--accent)',stroke:'var(--surface)','stroke-width':1.8},svg);
    const hit=el('circle',{cx,cy,r:8,fill:'transparent'},svg);hover(hit,`<b>${name}</b> · ${Math.floor(t)}<br>${E[pi][1]}<br>${d}`);});
  E.forEach((e,i)=>{const c=document.createElement('div');c.className='era';
    c.innerHTML=`<img src="${e[0]}" alt="${e[6]}" loading="lazy"><b>${e[1]}</b><span>${e[2]} · ${tr('demo ▸','演示 ▸')}</span>`;box.appendChild(c);
    const on=v=>{c.classList.toggle('on',v);seg[i].setAttribute('fill-opacity',v?1:op[i]);con[i].setAttribute('stroke',v?'var(--accent)':'var(--gray-mark)')};
    c.tabIndex=0;c.setAttribute('role','button');c.title=e[6];
    c.addEventListener('pointerenter',()=>on(true));c.addEventListener('pointerleave',()=>on(false));
    const go=()=>window.EraDemo&&EraDemo.open(i);c.addEventListener('click',go);c.addEventListener('keydown',ev=>{if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();go()}});
    seg[i].addEventListener('pointerenter',()=>on(true));seg[i].addEventListener('pointerleave',()=>on(false));});
})();

/* Fig 3: token strips, action chunk, code */
(function(){
  document.querySelectorAll('.tokrow').forEach(g=>{const y=+g.dataset.y,x0=+g.dataset.x0,x1=+g.dataset.x1,n=16,w=(x1-x0)/n;
    el('rect',{x:x0,y:y-9,width:x1-x0,height:18,rx:4,fill:g.dataset.accent?'var(--accent)':'var(--gray-mark)','fill-opacity':g.dataset.accent?.18:.35},g);
    for(let i=0;i<n;i++)el('rect',{x:x0+i*w+4,y:y-4,width:w-8,height:8,rx:4,fill:'var(--surface)'},g)});
  const ch=document.getElementById('chunk');
  [".12","-.40",".88",".05","-.31",".64","…"].forEach((v,i)=>{const x=46+i*58;el('rect',{x,y:212,width:50,height:28,rx:14,fill:'var(--tint)',stroke:'var(--rule)'},ch);const t=el('text',{x:x+25,y:231},ch);t.textContent=v});
  const code=document.getElementById('code');
  const L=[["1","op    = \"÷\"      # 8 ÷ 2 = 4","",""],["2","piece = ","measure","(top, 400, 320)"],["3","","run","(above(piece), ","plan",")"],["4","h     = ","measure","(wrist, piece)  # check"],["5","","run","(place(pad, h));  home()"]];
  L.forEach((ln,i)=>{const y=181+i*22;const t=el('text',{x:34,y,'xml:space':'preserve'},code);
    const n=el('tspan',{fill:'var(--faint)'},t);n.textContent=ln[0]+'  ';
    for(let j=1;j<ln.length;j++){const sp=el('tspan',(j%2===0&&ln[j])?{class:'fn'}:{},t);sp.textContent=ln[j]}});
})();

/* Fig 4: dot plot per category */
(function(){
  const cats=["Memory","Open","Generalization","Precision","Long-Horizon"];
  const LBL={solve_equation:'up',play_tic_tac_toe:'up',insert_key:'up',plug_in_charger:'down',play_Xylophone:'down',fasten_screws:'up',fill_egg_holder:'up',classify_objects:'down',organize_table:'down',swap_blocks:'down'};
  const label=new Set(Object.keys(LBL));
  const W=NARROW?380:960,L=NARROW?4:150,R=NARROW?52:76,rh=NARROW?108:70,top=NARROW?66:40,H=(cats.length-1)*rh+top+(NARROW?62:50),svg=document.getElementById('fig-all');if(!svg)return;
  svg.setAttribute('viewBox',`0 0 ${W} ${H}`);
  const x=v=>L+(W-L-R)*v/100,CW=6.6; // mono 11px ≈ 6.6px per character
  for(const g of [0,25,50,75,100]){el('line',{x1:x(g),x2:x(g),y1:top-30,y2:H-24,stroke:'var(--rule)','stroke-dasharray':g%100?'2 4':null},svg);const t=el('text',{x:x(g),y:H-6,'text-anchor':'middle','font-size':11,fill:'var(--faint)'},svg);t.textContent=g+'%'}
  cats.forEach((c,i)=>{const cy=top+i*rh;
    el('line',{x1:x(0),x2:x(100),y1:cy,y2:cy,stroke:'var(--rule)','stroke-width':1.5},svg);
    const n=el('text',{x:NARROW?L:0,y:NARROW?cy-44:cy+5,'font-size':14,'font-weight':600,fill:'var(--ink)'},svg);n.textContent=catName(c);
    const a=el('text',{x:W,y:cy+5,'text-anchor':'end','font-size':14,'font-weight':600,fill:'var(--ink)'},svg);a.textContent=Math.round(CAT[c])+'%';
    // beeswarm: exact x, ties stack vertically; highlighted tasks claim the center line first
    const ts=T.filter(t=>t[1]===c).sort((p,q)=>(label.has(q[0])-label.has(p[0]))||p[2]-q[2]),placed=[];
    ts.forEach(t=>{const px=x(t[2]);let dy=0;
      for(const d of [0,-11,11,-22,22]){if(placed.every(p=>Math.hypot(p.x-px,p.y-d)>=11)){dy=d;break}}
      placed.push({x:px,y:dy,t})});
    const lo=Math.min(0,...placed.map(p=>p.y)),hi=Math.max(0,...placed.map(p=>p.y)),boxes={up:[],down:[]};
    placed.filter(p=>label.has(p.t[0])).forEach(p=>{const s=nice(p.t[0]),w=textW(s,CW);
      const anc=p.x-w/2<x(0)-4?'start':p.x+w/2>x(100)+4?'end':'middle',x0=anc==='start'?p.x-6:anc==='end'?p.x+6-w:p.x-w/2;
      const free=side=>boxes[side].every(b=>x0+w+8<b[0]||x0>b[1]+8);
      let side=LBL[p.t[0]];if(!free(side))side=side==='up'?'down':'up';boxes[side].push([x0,x0+w]);
      const tx=el('text',{x:anc==='start'?p.x-6:anc==='end'?p.x+6:p.x,y:side==='up'?cy+lo-12:cy+hi+21,'text-anchor':anc,'font-size':11,fill:'var(--ink)'},svg);tx.textContent=s});
    placed.forEach(({x:px,y:dy,t})=>{const on=label.has(t[0]);
      el('circle',{cx:px,cy:cy+dy,r:5.5,fill:on?'var(--accent)':'var(--gray-mark)',stroke:'var(--surface)','stroke-width':2},svg);
      const hit=el('circle',{cx:px,cy:cy+dy,r:9,fill:'transparent'},svg);
      hover(hit,`<b>${nice(t[0])}</b><br>${catName(c)}<br>${tr('success','成功率')} ${t[2]}% · ${tr('score','得分')} ${t[3].toFixed(1)}<br>${tr('median wall','墙钟中位数')} ${t[4]} s`);
    });
    el('rect',{x:x(CAT[c])-1.5,y:cy-13,width:3,height:26,rx:1.5,fill:'var(--ink)',stroke:'var(--surface)','stroke-width':1.5,'paint-order':'stroke','pointer-events':'none'},svg);
  });
})();

/* Fig 5: per-category bars with toggle */
(function(){
  const svg=document.getElementById('fig-cat');if(!svg)return;
  function draw(c){
    svg.innerHTML='';
    const ts=T.filter(t=>t[1]===c).sort((a,b)=>b[2]-a[2]||b[3]-a[3]);
    const W=NARROW?440:640,L=NARROW?172:180,R=44,rh=30,H=ts.length*rh+28;svg.setAttribute('viewBox',`0 0 ${W} ${H}`);
    const x=v=>L+(W-L-R)*v/100;
    for(const g of [0,25,50,75,100]){el('line',{x1:x(g),x2:x(g),y1:0,y2:H-22,stroke:'var(--rule)'},svg);const t=el('text',{x:x(g),y:H-6,'text-anchor':'middle','font-size':11,fill:'var(--faint)'},svg);t.textContent=g}
    ts.forEach((t,i)=>{const y=i*rh+4;
      const n=el('text',{x:L-10,y:y+16,'text-anchor':'end','font-size':12.5,fill:'var(--ink)'},svg);n.textContent=nice(t[0]);
      const ws=Math.max(x(t[3])-L,0.01),wr=x(t[2])-L;
      el('path',{d:`M${L} ${y+3}h${Math.max(ws-4,0)}a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4h${-Math.max(ws-4,0)}z`,fill:'var(--accent)',opacity:.28},svg);
      if(wr>0)el('path',{d:`M${L} ${y+7}h${Math.max(wr-3,0)}a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3h${-Math.max(wr-3,0)}z`,fill:'var(--accent)'},svg);
      const v=el('text',{x:Math.max(x(t[2]),x(t[3]))+6,y:y+16,'font-size':12,fill:'var(--ink)'},svg);v.textContent=t[2]+'%';
      const hit=el('rect',{x:0,y,width:W,height:rh,fill:'transparent'},svg);hover(hit,`<b>${nice(t[0])}</b><br>${tr('success','成功率')} ${t[2]}% ${tr('(of 50)','（50 次）')}<br>${tr('score','得分')} ${t[3].toFixed(1)}`);
    });
  }
  document.querySelectorAll('.seg button').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.seg button').forEach(o=>o.setAttribute('aria-pressed',o===b));draw(b.dataset.cat)}));
  draw('Precision');
})();

/* Fig 8: time bar */
(function(){
  const svg=document.getElementById('fig-time'),W=NARROW?400:640,H=86,L=0,R=0;svg.setAttribute('viewBox',`0 0 ${W} ${H}`);
  const tot=300.6,x=v=>L+(W-L-R)*v/tot;
  const a=208.0,b=92.6,s=14.3;
  const r1=el('path',{d:`M0 14h${x(a)-1}v34h${-(x(a)-1)}z`,fill:'var(--accent)'},svg);hover(r1,tr('<b>Outside tool calls</b><br>model inference + agent runtime<br>208.0 h','<b>工具调用之外</b><br>模型推理 + agent 运行时<br>208.0 h'));
  const r2=el('path',{d:`M${x(a)+1} 14h${W-x(a)-5}a4 4 0 0 1 4 4v26a4 4 0 0 1-4 4h${-(W-x(a)-5)}z`,fill:'var(--accent-2)'},svg);hover(r2,tr('<b>Inside tool calls</b><br>simulation, rendering, motion planning<br>92.6 h','<b>工具调用之内</b><br>仿真、渲染、运动规划<br>92.6 h'));
  el('rect',{x:0,y:4,width:x(s),height:54,fill:'none',stroke:'var(--ink)','stroke-width':2},svg);
  const t1=el('text',{x:x(a)/2,y:36,'text-anchor':'middle','font-size':12.5,fill:'#fff'},svg);t1.textContent='208.0 h';
  const t2=el('text',{x:x(a)+(W-x(a))/2,y:36,'text-anchor':'middle','font-size':12.5,fill:'#fff'},svg);t2.textContent='92.6 h';
  const t3=el('text',{x:0,y:76,'font-size':11.5,fill:'var(--ink)'},svg);t3.textContent=tr('└ 14.3 h simulated robot time','└ 14.3 h 仿真中机器人实际运动时间');
})();

/* Fig 10: speed projection */
(function(){
  const svg=document.getElementById('fig-speed');if(!svg)return;
  const W=NARROW?440:640,H=NARROW?290:310,L=52,R=NARROW?80:96,T=12,B=34;svg.setAttribute('viewBox',`0 0 ${W} ${H}`);
  const t0=2026.86,t1=2030,y0=0.1,y1=10,now=5.9,robot=24.5/60;
  const x=t=>L+(W-L-R)*(t-t0)/(t1-t0),y=v=>T+(H-T-B)*(Math.log10(y1)-Math.log10(v))/(Math.log10(y1)-Math.log10(y0));
  const cp=el('clipPath',{id:'spclip'},el('defs',{},svg));el('rect',{x:L,y:T,width:W-R-L,height:H-T-B},cp);
  [[0.1,'6 s'],[0.5,'30 s'],[1,'1 min'],[5,'5 min'],[10,'10 min']].forEach(([v,l])=>{el('line',{x1:L,x2:W-R,y1:y(v),y2:y(v),stroke:'var(--rule)'},svg);const t=el('text',{x:L-8,y:y(v)+4,'text-anchor':'end','font-size':11,fill:'var(--faint)'},svg);t.textContent=l});
  [2027,2028,2029,2030].forEach(yr=>{const t=el('text',{x:x(yr),y:H-10,'text-anchor':'middle','font-size':11,fill:'var(--faint)'},svg);t.textContent=yr});
  const S=[[15,tr('fast','快'),'2 × 3 × 2.5','2 3'],[6.8,tr('middle','中'),'1.7 × 2 × 2',''],[3.4,tr('slow','慢'),'1.5 × 1.5 × 1.5','6 4']];
  const pts=r=>{const a=[];for(let t=t0;t<=t1+1e-9;t+=0.02)a.push([x(t),y(now/Math.pow(r,t-t0))]);return a};
  const g=el('g',{'clip-path':'url(#spclip)'},svg);
  el('path',{d:'M'+pts(S[2][0]).concat(pts(S[0][0]).reverse()).map(p=>p.join(' ')).join('L')+'Z',fill:'var(--accent)','fill-opacity':.12},g);
  el('line',{x1:L,x2:W-R,y1:y(robot),y2:y(robot),stroke:'var(--ink)','stroke-width':1.5,'stroke-dasharray':'5 4'},svg);
  const rl=el('text',{x:W-R+6,y:y(robot)+4,'font-size':11.5,fill:'var(--ink)'},svg);rl.textContent=tr('robot motion','机器人运动');
  const lx=x(2028.75),ly=T+22;
  S.forEach(([r,name,f,dash],i)=>{
    el('path',{d:'M'+pts(r).map(p=>p.join(' ')).join('L'),fill:'none',stroke:'var(--accent)','stroke-width':i===1?2.2:1.5,'stroke-dasharray':dash},g);
    const tc=t0+Math.log(now/robot)/Math.log(r),cx=x(tc),cy=y(robot);
    const yr=Math.floor(tc),ph=tc%1<0.33?0:tc%1<0.67?1:2,lab=ZH?yr+['年初','年中','年底'][ph]:['early ','mid-','late '][ph]+yr;
    el('circle',{cx,cy,r:5,fill:'var(--accent)',stroke:'var(--surface)','stroke-width':2},svg);
    const yy=ly+i*20;el('line',{x1:lx,x2:lx+26,y1:yy-4,y2:yy-4,stroke:'var(--accent)','stroke-width':i===1?2.2:1.5,'stroke-dasharray':dash},svg);
    const tx=el('text',{x:lx+34,y:yy,'font-size':11.5,fill:'var(--ink)'},svg);tx.textContent=`${r}×/${tr('yr','年')} → ${lab}`;
    const hit=el('circle',{cx,cy,r:11,fill:'transparent'},svg);hover(hit,`<b>${name}: ${r}× ${tr('per year','每年')}</b><br>${tr('hardware × model size × tokens','硬件 × 模型大小 × token')} = ${f}<br>${tr('reaches robot motion time','追上机器人运动时间')} ≈ ${tc.toFixed(1)}`);
  });
  el('circle',{cx:x(t0),cy:y(now),r:5,fill:'var(--ink)',stroke:'var(--surface)','stroke-width':2},svg);
  const nl=el('text',{x:x(t0)+9,y:y(now)-8,'font-size':11.5,fill:'var(--ink)'},svg);nl.textContent=tr('today: 5.9 min','现在：5.9 分钟');
})();

/* Fig 9 ticks */
(function(){const g=document.getElementById('ticks');if(!g)return;for(let x=146;x<980;x+=9){el('line',{x1:x,x2:x,y1:166,y2:186,stroke:'var(--faint)','stroke-width':1.2},g)}})();

/* videos: load + play only when visible */
(function(){
  const vids=[...document.querySelectorAll('video[data-src]')];
  const io=new IntersectionObserver(es=>es.forEach(e=>{const v=e.target;
    if(e.isIntersecting){if(!v.src){v.src=v.dataset.src}v.play().catch(()=>{})}else{v.pause()}}),{rootMargin:'200px'});
  vids.forEach(v=>{io.observe(v);v.addEventListener('click',()=>v.paused?v.play():v.pause())});
})();
