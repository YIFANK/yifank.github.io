/* Fig 2 expandable era demos. Uses el, tr, ZH from figs.js. */
(function(){
  const panel=document.getElementById('era-panel');if(!panel)return;
  const TXT=[
    {t:tr('Hand-programmed motion','手工编程动作'),
     p:[tr('Unimate went to work at a General Motors plant in 1961. An operator guided the arm through a motion once, and it replayed that motion for as long as it ran.','Unimate 1961 年进了通用汽车的工厂。操作员带着机械臂走一遍动作，它就一直回放这个动作。'),
        tr('This works as long as every part arrives in exactly the same place, which is why factories spend so much on fixtures. Move the block before you press play.','只要每个零件都出现在完全相同的位置，这就行得通，所以工厂在夹具上花了大量的钱。按播放之前，先把积木拖到别处试试。')]},
    {t:tr('Model-based planning & control','基于模型的规划与控制'),
     p:[tr('With a geometric model of the scene, the robot can compute its motion instead of replaying it. Shakey planned with STRIPS in the early 1970s, and configuration-space planning, compliance control and sampling planners such as RRT followed.','有了场景的几何模型，机器人就可以算出动作，而不是回放。Shakey 在 70 年代初用 STRIPS 做规划，之后有了构型空间规划、柔顺控制，以及 RRT 这样的采样规划器。'),
        tr('The weak point is the model. Someone has to write it for every task, and it is never quite right about contact. In the demo, put the block anywhere and the planner finds a way over the wall.','弱点在模型本身。每个任务都得有人写模型，而且它对接触的描述永远不太准。在演示里，积木放在哪里，规划器都能找到越过墙的路径。')]},
    {t:tr('Learning from robot data','从机器人数据中学习'),
     p:[tr('Around 2015, researchers started letting robots collect their own training data. Pinto and Gupta logged 50,000 grasp attempts over 700 robot hours, and Levine and colleagues collected 800,000 on up to 14 arms.','2015 年前后，研究者开始让机器人自己采训练数据。Pinto 和 Gupta 用 700 个机器人小时记录了 5 万次抓取，Levine 等人在最多 14 台机械臂上采了 80 万次。'),
        tr('In the demo the camera is miscalibrated and nobody tells the robot. It finds the correction from whether each grasp held. The catch is the cost: each new skill needs its own pile of trials.','演示里相机标定有偏差，没人告诉机器人。它靠每次抓取成没成功自己找到了修正量。代价是数据：每个新技能都要单独攒一大堆试验。')]},
    {t:tr('Imitation at scale, VLAs','大规模模仿学习、VLA'),
     p:[tr('Instead of trial and error, collect human demonstrations across many labs and train one large model on all of them. RT-2 started from a pretrained vision-language model, so instructions and some web knowledge came along.','不再靠试错，而是在很多实验室收集人类示教，用全部数据训练一个大模型。RT-2 从预训练的视觉语言模型出发，于是指令理解和一部分网络知识也一起带了过来。'),
        tr('These policies move fluently on tasks that resemble their data. There is no step where they plan or check, so an instruction that needs reasoning gets smooth motion toward the wrong goal. Try the third instruction.','这类策略在和训练数据相似的任务上动作很流畅。但它们没有规划或检查的环节，所以需要推理的指令会得到一段很顺、但目标错了的动作。试试第三条指令。')]},
    {t:tr('Agents calling tools','调用工具的 agent'),
     p:[tr('A frontier model writes a program against perception, planning and learned skills, runs it, checks the result and tries again. Code as Policies showed the idea in 2022. In 2026, ENPIRE and ASPIRE had coding agents improve real-robot policies and grow skill libraries, and GPT-6 Astra and Fable 5.2 made the approach competitive on RoboDojo.','前沿模型针对感知、规划和学到的技能写程序，运行它，检查结果，失败了就再试。Code as Policies 在 2022 年展示了这个思路。2026 年，ENPIRE 和 ASPIRE 让编程 agent 改进真机策略、积累技能库，GPT-6 Astra 和 Fable 5.2 让这条路在 RoboDojo 上有了竞争力。'),
        tr('Watch the two clocks. Most of the time goes to thinking, and the hard part is still the grasp itself.','注意那两个计时器。大部分时间花在思考上，而难的部分仍然是抓取本身。')]}];

  const W=440,H=250,B={x:60,y:212},L1=150,L2=140,TY=207,GY=191,UP=130;
  let tok=0,S=null,cur=-1;
  const sleep=(ms,t)=>new Promise((res,rej)=>setTimeout(()=>t===tok?res():rej('stop'),ms));
  const ease=u=>u<.5?2*u*u:1-Math.pow(-2*u+2,2)/2;
  let seed=7;const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;
  const gauss=()=>{let u=0,v=0;while(!u)u=rnd();while(!v)v=rnd();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v)};

  function ik(x,y){let dx=x-B.x,dy=y-B.y,d=Math.hypot(dx,dy);const m=L1+L2-1;if(d>m){dx*=m/d;dy*=m/d;d=m}
    const c=Math.max(-1,Math.min(1,(d*d-L1*L1-L2*L2)/(2*L1*L2))),q2=Math.acos(c),q1=Math.atan2(dy,dx)-Math.atan2(L2*Math.sin(q2),L1+L2*Math.cos(q2));
    return {ex:B.x+L1*Math.cos(q1),ey:B.y+L1*Math.sin(q1),wx:B.x+dx,wy:B.y+dy}}

  function build(i){
    panel.innerHTML='';const T=TXT[i];
    const demo=document.createElement('div');demo.className='era-demo';
    const txt=document.createElement('div');txt.className='era-text';
    txt.innerHTML=`<h5>${T.t}</h5>`+T.p.map(p=>`<p>${p}</p>`).join('');
    panel.append(demo,txt);
    const svg=el('svg',{viewBox:`0 0 ${W} ${H}`,role:'img','aria-label':T.t},demo);
    const ctl=document.createElement('div');ctl.className='era-ctl';demo.appendChild(ctl);
    const st=document.createElement('div');st.className='era-status';demo.appendChild(st);
    el('rect',{x:0,y:218,width:W,height:32,fill:'var(--rule)'},svg);
    const bg=el('g',{},svg),fx=el('g',{},svg),bl=el('g',{},svg),ar=el('g',{},svg),fg=el('g',{},svg);
    el('rect',{x:B.x-18,y:B.y-4,width:36,height:10,rx:3,fill:'var(--ink)'},svg);
    const l1=el('line',{stroke:'var(--ink)','stroke-width':9,'stroke-linecap':'round'},ar),l2=el('line',{stroke:'var(--ink)','stroke-width':7,'stroke-linecap':'round'},ar);
    const j1=el('circle',{r:6,fill:'var(--surface)',stroke:'var(--ink)','stroke-width':2.5},ar),j0=el('circle',{cx:B.x,cy:B.y,r:7,fill:'var(--surface)',stroke:'var(--ink)','stroke-width':2.5},ar);
    const palm=el('line',{stroke:'var(--ink)','stroke-width':4,'stroke-linecap':'round'},ar),f1=el('line',{stroke:'var(--ink)','stroke-width':3.5,'stroke-linecap':'round'},ar),f2=el('line',{stroke:'var(--ink)','stroke-width':3.5,'stroke-linecap':'round'},ar);
    S={svg,bg,fx,bl,fg,ctl,st,w:{x:170,y:110},open:1,blocks:[],held:null,
      draw(){const k=ik(this.w.x,this.w.y);this.w.x=k.wx;this.w.y=k.wy;
        l1.setAttribute('x1',B.x);l1.setAttribute('y1',B.y);l1.setAttribute('x2',k.ex);l1.setAttribute('y2',k.ey);
        l2.setAttribute('x1',k.ex);l2.setAttribute('y1',k.ey);l2.setAttribute('x2',k.wx);l2.setAttribute('y2',k.wy);
        j1.setAttribute('cx',k.ex);j1.setAttribute('cy',k.ey);
        const o=11+5*this.open;palm.setAttribute('x1',k.wx-o-2);palm.setAttribute('x2',k.wx+o+2);palm.setAttribute('y1',k.wy);palm.setAttribute('y2',k.wy);
        [[f1,-o],[f2,o]].forEach(([f,d])=>{f.setAttribute('x1',k.wx+d);f.setAttribute('x2',k.wx+d);f.setAttribute('y1',k.wy);f.setAttribute('y2',k.wy+20)});
        if(this.held){this.held.x=k.wx;this.held.y=k.wy+16}
        this.blocks.forEach(b=>{b.g.setAttribute('transform',`translate(${b.x-11},${b.y-11})`)})},
      block(x,fill,label){const g=el('g',{style:'cursor:grab'},bl);el('rect',{width:22,height:22,rx:3,fill},g);
        if(label){const t=el('text',{x:11,y:16,'text-anchor':'middle','font-size':13,'font-weight':600,fill:'#fff'},g);t.textContent=label}
        const b={x,y:TY,g,fill,label};this.blocks.push(b);return b},
      async move(x,y,ms,t){const x0=this.w.x,y0=this.w.y,t0=performance.now();
        await new Promise((res,rej)=>{const f=now=>{if(t!==tok)return rej('stop');const u=Math.min(1,(now-t0)/ms),e=ease(u);this.w.x=x0+(x-x0)*e;this.w.y=y0+(y-y0)*e;this.draw();u<1?requestAnimationFrame(f):res()};requestAnimationFrame(f)})},
      async grip(close,t,tol=9){this.open=close?0:1;this.draw();
        if(close){const b=this.blocks.find(b=>Math.abs(b.x-this.w.x)<tol&&Math.abs(b.y-(this.w.y+16))<12);this.held=b||null}
        else if(this.held){const b=this.held;this.held=null;const under=this.blocks.find(o=>o!==b&&Math.abs(o.x-b.x)<20);b.y=under?under.y-22:TY;this.draw()}
        await sleep(160,t);return this.held},
      drag(b,lo,hi,ok){b.g.addEventListener('pointerdown',ev=>{if(!ok())return;ev.preventDefault();b.g.setPointerCapture(ev.pointerId);
        const mv=e=>{const p=svg.createSVGPoint();p.x=e.clientX;p.y=e.clientY;const q=p.matrixTransform(svg.getScreenCTM().inverse());b.x=Math.max(lo,Math.min(hi,q.x));this.draw();this.onDrag&&this.onDrag()};
        const up=()=>{b.g.removeEventListener('pointermove',mv);b.g.removeEventListener('pointerup',up)};
        b.g.addEventListener('pointermove',mv);b.g.addEventListener('pointerup',up)})},
      button(label,fn,primary){const bt=document.createElement('button');bt.textContent=label;if(primary)bt.className='primary';bt.onclick=fn;ctl.appendChild(bt);return bt},
      say(h){st.innerHTML=h}};
    DEMOS[i]();
    S.draw();
  }
  const bin=(x)=>{el('path',{d:`M${x-20} 196V218H${x+20}V196`,fill:'none',stroke:'var(--muted)','stroke-width':2},S.fx)};
  const run=fn=>async()=>{const t=++tok;S.busy=true;try{await fn(t)}catch(e){if(e!=='stop')throw e}finally{if(t===tok)S.busy=false}};

  const DEMOS=[
    /* 1: replay */
    ()=>{const b=S.block(250,'var(--accent-2)');bin(345);
      el('rect',{x:239,y:196,width:22,height:22,rx:3,fill:'none',stroke:'var(--faint)','stroke-dasharray':'3 3'},S.fx);
      const tl=el('text',{x:250,y:240,'text-anchor':'middle','font-size':11,fill:'var(--muted)'},S.fx);tl.textContent=tr('recorded spot','录制时的位置');
      S.drag(b,140,310,()=>!S.busy);S.draw();
      S.say(tr('Drag the block, then press Play.','拖动积木，然后按播放。'));
      S.button(tr('▶ Play recording','▶ 播放录制动作'),run(async t=>{S.say(tr('Replaying…','回放中…'));
        await S.move(250,UP,500,t);await S.move(250,GY,350,t);const h=await S.grip(true,t);await S.move(250,UP,350,t);
        await S.move(345,UP,500,t);await S.move(345,GY,350,t);await S.grip(false,t);await S.move(345,UP,300,t);await S.move(170,110,500,t);
        S.say(h?tr('Worked, because the block was exactly where it was during recording.','成功了，因为积木正好在录制时的位置。'):tr('<b>Missed.</b> The recording still points at the old spot; nothing in the program looks at the block.','<b>抓空了。</b>录制的动作还指向原来的位置，程序里没有任何东西会去看积木在哪。'))}),true);
      S.button(tr('Reset','重置'),()=>{tok++;S.busy=false;b.x=250;b.y=TY;S.held=null;S.open=1;S.w={x:170,y:110};S.draw();S.say(tr('Drag the block, then press Play.','拖动积木，然后按播放。'))});
    },
    /* 2: RRT planning */
    ()=>{const b=S.block(200,'var(--accent-2)');bin(332);
      const WL={x0:262,x1:278,y0:150};el('rect',{x:WL.x0,y:WL.y0,width:WL.x1-WL.x0,height:218-WL.y0,fill:'var(--gray-mark)'},S.fx);
      S.drag(b,140,225,()=>!S.busy);
      const free=(x,y)=>{if(x>WL.x0-18&&x<WL.x1+18&&y>WL.y0-32)return false;const d=Math.hypot(x-B.x,y-B.y);return d<L1+L2-8&&d>30&&y<200&&y>60&&x>110&&x<400};
      const seg=(a,c)=>{const n=Math.ceil(Math.hypot(c.x-a.x,c.y-a.y)/4);for(let k=0;k<=n;k++){if(!free(a.x+(c.x-a.x)*k/n,a.y+(c.y-a.y)*k/n))return false}return true};
      S.say(tr('Drag the block anywhere left of the wall, then press Plan.','把积木拖到墙左边任意位置，然后按规划。'));
      S.button(tr('▶ Plan and execute','▶ 规划并执行'),run(async t=>{S.bg.innerHTML='';
        await S.move(b.x,UP,450,t);await S.move(b.x,GY,300,t);await S.grip(true,t);await S.move(b.x,150,300,t);
        const start={x:b.x,y:150},goal={x:332,y:150},N=[{...start,p:-1}];let found=-1,it=0;
        for(;it<1500&&found<0;it++){const s=rnd()<.15?goal:{x:110+rnd()*290,y:60+rnd()*140};
          let bi=0,bd=1e9;N.forEach((n,k)=>{const d=Math.hypot(n.x-s.x,n.y-s.y);if(d<bd){bd=d;bi=k}});
          const n=N[bi],st=Math.min(16,bd);if(st<1)continue;const q={x:n.x+(s.x-n.x)/bd*st,y:n.y+(s.y-n.y)/bd*st,p:bi};
          if(!free(q.x,q.y)||!seg(n,q))continue;N.push(q);
          el('line',{x1:n.x,y1:n.y,x2:q.x,y2:q.y,stroke:'var(--faint)','stroke-width':1},S.bg);
          if(Math.hypot(q.x-goal.x,q.y-goal.y)<16&&seg(q,goal)){N.push({...goal,p:N.length-1});found=N.length-1}
          if(it%25===0)await sleep(16,t)}
        if(found<0){S.say(tr('No path found within the sample budget.','在采样预算内没找到路径。'));return}
        const P=[];for(let k=found;k>=0;k=N[k].p)P.unshift(N[k]);
        el('polyline',{points:P.map(p=>p.x+','+p.y).join(' '),fill:'none',stroke:'var(--accent)','stroke-width':2.5},S.bg);
        S.say(tr(`Path found after ${it} samples.`,`采样 ${it} 次后找到路径。`));
        for(const p of P.slice(1))await S.move(p.x,p.y,90,t);
        await S.move(332,GY,300,t);await S.grip(false,t);await S.move(332,UP,300,t);await S.move(170,110,450,t);
        S.say(tr(`Planned around the wall in ${it} samples. The plan is only as good as the model of the wall.`,`采样 ${it} 次绕过了墙。规划的好坏完全取决于对墙的建模。`))}),true);
      S.button(tr('Reset','重置'),()=>{tok++;S.busy=false;S.bg.innerHTML='';b.x=200;b.y=TY;S.held=null;S.open=1;S.w={x:170,y:110};S.draw();S.say('')});
    },
    /* 3: learning from trials */
    ()=>{const b=S.block(240,'var(--accent-2)'),BIAS=17,TOL=7,NT=30;
      const ch=el('g',{},S.fx);const cam=el('g',{},S.fx);
      const cx0=300,cy0=16,cw=128,chh=56;el('rect',{x:cx0,y:cy0,width:cw,height:chh,rx:4,fill:'var(--surface)',stroke:'var(--rule)'},S.fx);
      const lab=el('text',{x:cx0+6,y:cy0+13,'font-size':10.5,fill:'var(--muted)'},S.fx);lab.textContent=tr('success, last 5 tries','成功率（最近 5 次）');
      S.say(tr('The camera reports every block 17 px to the right of where it really is. Press Train.','相机报告的每个积木位置都比真实位置偏右 17 像素。按训练。'));
      S.button(tr('▶ Train 30 tries','▶ 训练 30 次'),run(async t=>{ch.innerHTML='';seed=11;let mu=0,sig=16;const R=[],good=[];
        for(let n=0;n<NT;n++){b.x=170+rnd()*150;b.y=TY;S.held=null;S.draw();const seen=b.x+BIAS;
          cam.innerHTML='';el('path',{d:`M${seen} 186v40M${seen-6} 206h12`,stroke:'var(--bad)','stroke-width':1.5},cam);
          const o=mu+sig*gauss(),gx=seen+o;
          await S.move(gx,UP,170,t);await S.move(gx,GY,130,t);const h=await S.grip(true,t,TOL);await S.move(gx,UP,130,t);
          if(h){good.push(o);await S.grip(false,t)}else{S.open=1;S.draw()}
          R.push(h?1:0);const last=R.slice(-5),rate=last.reduce((a,c)=>a+c,0)/last.length;
          const bw=cw/NT;el('rect',{x:cx0+n*bw+1,y:cy0+chh-4-rate*34,width:bw-2,height:Math.max(rate*34,1),rx:1,fill:'var(--accent)'},ch);
          if((n+1)%5===0&&good.length){mu=good.slice(-6).reduce((a,c)=>a+c,0)/Math.min(6,good.length);sig=Math.max(4,sig*.72)}
          S.say(tr(`Try ${n+1}/${NT} · learned correction ${mu.toFixed(0)} px · ${h?'held':'missed'}`,`第 ${n+1}/${NT} 次 · 学到的修正 ${mu.toFixed(0)} 像素 · ${h?'抓住了':'抓空了'}`))}
        cam.innerHTML='';
        S.say(tr(`After ${NT} tries it shifts every grasp by ${mu.toFixed(0)} px. No one wrote that correction; the success labels supplied it.`,`${NT} 次之后，它把每次抓取都平移 ${mu.toFixed(0)} 像素。这个修正量没人写过，是成功与否的标签给的。`))}),true);
    },
    /* 4: VLA */
    ()=>{const r=S.block(200,'var(--bad)','3'),u=S.block(300,'var(--accent)','7');
      const reset=()=>{tok++;S.busy=false;S.bg.innerHTML='';r.x=200;r.y=TY;u.x=300;u.y=TY;S.held=null;S.open=1;S.w={x:170,y:110};S.draw()};
      const traces=pts=>{for(let k=0;k<3;k++)el('polyline',{points:pts.map(p=>(p[0]+gauss()*4)+','+(p[1]+gauss()*4)).join(' '),fill:'none',stroke:'var(--accent)','stroke-opacity':.25,'stroke-width':2},S.bg)};
      const pick=async(b,t)=>{await S.move(b.x+gauss()*1.5,UP,420,t);await S.move(b.x,GY,260,t);await S.grip(true,t)};
      const stack=async t=>{await pick(r,t);await S.move(250,90,380,t);await S.move(u.x,150,380,t);await S.move(u.x,GY-22,220,t);await S.grip(false,t);await S.move(u.x,110,300,t)};
      S.say(tr('Pick an instruction.','选一条指令。'));
      S.button(tr('“pick up the red block”','“拿起红色积木”'),()=>{reset();seed=3;traces([[170,110],[200,UP],[200,GY],[200,UP]]);run(async t=>{S.say(tr('Seen in training. Following the demonstrations…','训练里见过，跟着示教动作走…'));await pick(r,t);await S.move(200,UP,300,t);S.say(tr('Done, smoothly: this is close to its demonstrations.','流畅地完成了：这和它的示教很接近。'))})()});
      S.button(tr('“put red on blue”','“把红色放到蓝色上”'),()=>{reset();seed=5;traces([[170,110],[200,UP],[200,GY],[250,90],[300,150],[300,GY-22]]);run(async t=>{S.say(tr('Seen in training. Following the demonstrations…','训练里见过，跟着示教动作走…'));await stack(t);S.say(tr('Done, smoothly.','流畅地完成了。'))})()});
      S.button(tr('“put the larger number on the left”','“把数字大的放到左边”'),()=>{reset();seed=9;run(async t=>{S.say(tr('No demonstrations of this. Producing the most familiar motion…','没有这条指令的示教，输出最熟悉的动作…'));await stack(t);
        S.say(tr('<b>Fluent motion, wrong goal.</b> It stacked 3 on 7, the closest thing it had seen. Nothing in the loop reads the digits or checks the result.','<b>动作流畅，目标错了。</b>它把 3 叠到了 7 上，这是它见过最接近的动作。回路里没有任何环节去读数字或检查结果。'))})()});
    },
    /* 5: agent */
    ()=>{const r=S.block(220,'var(--bad)','3'),u=S.block(300,'var(--accent)','7');
      S.drag(r,160,330,()=>!S.busy);S.drag(u,160,330,()=>!S.busy);
      const code=document.createElement('pre');code.className='era-code';S.ctl.before(code);
      const LN=['blocks = measure("blocks")','hi, lo = sorted(blocks, key=number)[::-1]','run(pick(hi))','assert measure(wrist).holding','run(pick(hi, grip="narrow"))','run(place(left_of(lo)))','check(measure("blocks"))'];
      code.innerHTML=LN.map((l,k)=>`<span data-k="${k}">${l}</span>`).join('\n');
      const hl=k=>code.querySelectorAll('span').forEach(s=>s.classList.toggle('cur',+s.dataset.k===k));
      const clk=el('text',{x:430,y:22,'text-anchor':'end','font-size':11.5,fill:'var(--ink)'},S.fg);
      let th=0,mv=0;const show=()=>{clk.textContent=tr(`thinking ${th.toFixed(1)} s · moving ${mv.toFixed(1)} s`,`思考 ${th.toFixed(1)} 秒 · 运动 ${mv.toFixed(1)} 秒`)};show();
      const think=async(ms,t)=>{const t0=performance.now();S.say(tr('<i>thinking…</i>','<i>思考中…</i>'));while(performance.now()-t0<ms){await sleep(50,t);th+=.05;show()}};
      const moving=async(p,t)=>{const t0=performance.now();await p;mv+=(performance.now()-t0)/1000;show()};
      S.say(tr('Task: put the larger number on the left. You can drag the blocks first.','任务：把数字大的放到左边。可以先拖动积木。'));
      S.button(tr('▶ Run agent','▶ 运行 agent'),run(async t=>{th=0;mv=0;show();seed=2;
        const hi=u,lo=r;
        hl(0);await think(900,t);S.say(tr(`→ 3 at x=${r.x.toFixed(0)}, 7 at x=${u.x.toFixed(0)}`,`→ 3 在 x=${r.x.toFixed(0)}，7 在 x=${u.x.toFixed(0)}`));await sleep(500,t);
        hl(1);await think(700,t);
        if(hi.x<lo.x-20){hl(6);S.say(tr('→ 7 is already left of 3. Nothing to do.','→ 7 已经在 3 左边了，不用动。'));return}
        hl(2);await think(800,t);await moving((async()=>{await S.move(hi.x,UP,400,t);await S.move(hi.x,GY,260,t);await S.grip(true,t);await S.move(hi.x,GY-20,200,t);S.held=null;hi.y=TY;S.open=1;S.draw();await S.move(hi.x,UP,260,t)})(),t);
        hl(3);await think(700,t);S.say(tr('→ <b>holding: False.</b> The block slipped.','→ <b>holding: False。</b>积木滑掉了。'));await sleep(700,t);
        hl(4);await think(1100,t);await moving((async()=>{await S.move(hi.x,GY,260,t);await S.grip(true,t);await S.move(hi.x,UP,260,t)})(),t);
        hl(5);await think(800,t);const tx=Math.max(140,lo.x-48);await moving((async()=>{await S.move(tx,UP,450,t);await S.move(tx,GY,260,t);await S.grip(false,t);await S.move(tx,UP,260,t);await S.move(170,110,400,t)})(),t);
        hl(6);await think(700,t);S.say(tr('→ ✓ 7 is left of 3. Most of the run was spent thinking.','→ ✓ 7 在 3 左边。整次运行大部分时间都在思考。'))}),true);
      S.button(tr('Reset','重置'),()=>{tok++;S.busy=false;r.x=220;r.y=TY;u.x=300;u.y=TY;S.held=null;S.open=1;S.w={x:170,y:110};th=0;mv=0;show();hl(-1);S.draw();S.say('')});
    }];

  window.EraDemo={open(i){
    const cards=[...document.querySelectorAll('#eras-cards .era')];
    if(cur===i){tok++;cur=-1;panel.hidden=true;panel.innerHTML='';cards.forEach(c=>c.classList.remove('sel'));return}
    tok++;cur=i;panel.hidden=false;cards.forEach((c,k)=>c.classList.toggle('sel',k===i));seed=7;build(i);
    if(panel.getBoundingClientRect().bottom>innerHeight)panel.scrollIntoView({block:'nearest',behavior:'smooth'})}};
})();
