/* Fig 5: scrubbable episode player synced to the call list */
(function(){
  const v=document.getElementById('tp-video'),bar=document.getElementById('tp-bar'),list=document.getElementById('tp-list');if(!v||!bar||!list)return;
  const btn=document.getElementById('tp-play'),stepEl=document.getElementById('tp-step'),actEl=document.getElementById('tp-act'),badge=document.getElementById('tp-badge');
  const IC={play:'<svg viewBox="0 0 16 16" width="14" height="14"><path d="M4 2.5v11l9-5.5z" fill="currentColor"/></svg>',pause:'<svg viewBox="0 0 16 16" width="14" height="14"><path d="M4 2.5h3v11H4zM9 2.5h3v11H9z" fill="currentColor"/></svg>',again:'<svg viewBox="0 0 16 16" width="14" height="14"><path d="M8 3a5 5 0 1 0 5 5h-2a3 3 0 1 1-3-3v2l3.5-3L8 1z" fill="currentColor"/></svg>'};
  const FPS=25,SPF=2/FPS,TOTAL_ACT=157; // half speed: 0.08 s per robot action
  const rows=[...list.children];
  const R=rows.map(li=>{const f0=+li.dataset.f0,f1=+li.dataset.f1,h=+li.dataset.hold,k=li.querySelector('.k');
    const type=k.classList.contains('say')?'say':/measure|测量/.test(k.textContent)?'meas':'run';
    return {li,f0,f1,type,d:h||Math.max((f1-f0)*SPF,.3)}});
  let acc=0;R.forEach(r=>{r.t0=acc;acc+=r.d;r.t1=acc});const T=acc;
  R.forEach((r,i)=>{const s=document.createElement('div');s.className='tp-seg '+r.type;s.style.left=(r.t0/T*100)+'%';s.style.width=(r.d/T*100)+'%';s.title=(i+1)+'. '+r.li.querySelector('.k').textContent;bar.appendChild(s)});
  const head=document.createElement('div');head.className='tp-head';bar.appendChild(head);
  let t=0,playing=false,last=0,cur=-1,lastFrame=-1;
  function frameAt(t){const r=R.find(r=>t<r.t1)||R[R.length-1];const u=Math.min(1,Math.max(0,(t-r.t0)/r.d));return {r,f:Math.round(r.f0+(r.f1-r.f0)*u)}}
  function render(){const {r,f}=frameAt(t),i=R.indexOf(r);
    head.style.left=(t/T*100)+'%';
    if(f!==lastFrame&&v.readyState>=1){v.currentTime=Math.min((f+.5)/FPS,v.duration-.01);lastFrame=f}
    if(i!==cur){rows.forEach((li,k)=>{li.classList.toggle('cur',k===i);li.classList.toggle('past',k<i)});cur=i}
    stepEl.textContent=tr(`call ${i+1} of ${R.length}`,`第 ${i+1} 次调用，共 ${R.length} 次`);actEl.textContent=tr(`robot action ${f} / ${TOTAL_ACT}`,`机器人动作 ${f} / ${TOTAL_ACT}`);
    badge.textContent=r.type==='run'?'':r.type==='say'?tr('paused · agent writes a message','暂停 · agent 在写消息'):tr('paused · agent measures','暂停 · agent 在测量');badge.hidden=r.type==='run'}
  function tick(now){if(!playing)return;t+=(now-last)/1000;last=now;if(t>=T){t=T;playing=false;btn.innerHTML=IC.again;btn.setAttribute('aria-label',tr('Replay','重播'))}render();if(playing)requestAnimationFrame(tick)}
  function play(){if(t>=T)t=0;playing=true;last=performance.now();btn.innerHTML=IC.pause;btn.setAttribute('aria-label',tr('Pause','暂停'));requestAnimationFrame(tick)}
  function pause(){playing=false;btn.innerHTML=IC.play;btn.setAttribute('aria-label',tr('Play','播放'))}
  btn.addEventListener('click',()=>playing?pause():play());
  const seekX=e=>{const b=bar.getBoundingClientRect();t=Math.min(T,Math.max(0,(e.clientX-b.left)/b.width*T));render()};
  bar.addEventListener('pointerdown',e=>{pause();bar.setPointerCapture(e.pointerId);seekX(e);const mv=ev=>seekX(ev),up=()=>{bar.removeEventListener('pointermove',mv);bar.removeEventListener('pointerup',up)};bar.addEventListener('pointermove',mv);bar.addEventListener('pointerup',up)});
  bar.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){pause();t=Math.min(T,Math.max(0,t+(e.key==='ArrowRight'?.5:-.5)));render();e.preventDefault()}});
  rows.forEach((li,i)=>{li.addEventListener('click',()=>{pause();t=R[i].t0+.001;render()})});
  v.addEventListener('loadedmetadata',()=>{lastFrame=-1;render()});
  // load as a blob so seeking works on any static host
  fetch(v.dataset.blob).then(r=>r.blob()).then(b=>{v.src=URL.createObjectURL(b)}).catch(()=>{v.src=v.dataset.blob});
  btn.innerHTML=IC.play;
  render();
  // start once the figure is on screen
  let started=false;new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&!started){started=true;play()}}),{threshold:.6}).observe(v);
})();
