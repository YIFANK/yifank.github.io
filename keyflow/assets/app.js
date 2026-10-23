const tasks=[["TurnOnToaster","Turn On Toaster",90,78],["CloseDrawer","Close Drawer",86,84],["OpenMicrowave","Open Microwave",86,36],["CloseMicrowave","Close Microwave",84,30],["TurnOnSinkFaucet","Turn On Sink Faucet",76,64],["SlideToasterOvenRack","Slide Toaster Oven Rack",72,54],["CloseFridge","Close Fridge",60,58],["CloseOven","Close Oven",58,72],["StartCoffeeMachine","Start Coffee Machine",52,22],["TurnOnStove","Turn On Stove",52,28],["SlideDishwasherRack","Slide Dishwasher Rack",44,74],["OpenOven","Open Oven",32,2],["TurnOnBlender","Turn On Blender",22,20]];
document.getElementById('grid').innerHTML=tasks.map(([k,n,a,b])=>`<div class="cell"><div class="media"><img src="static/gif/heldout_${k}.gif" alt="${n}, held-out rollout" loading="lazy"></div><div class="name">${n}</div><div class="sr">KeyFlow <b>${a}%</b> · π<sub>0.5</sub> ${b}%</div></div>`).join('');

const copyBtn=document.getElementById('copy-bib');
if(copyBtn){copyBtn.addEventListener('click',()=>{const t=document.getElementById('bibtext').innerText;
  (navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(()=>{copyBtn.textContent='Copied'}).catch(()=>{const r=document.createRange();r.selectNodeContents(document.getElementById('bibtext'));const s=getSelection();s.removeAllRanges();s.addRange(r)})})}
document.documentElement.dataset.javascript="enabled";
// Gallery videos: play while visible, pause off-screen (some browsers block autoplay of many videos at once).
const vids=document.querySelectorAll('.vgrid video');
if('IntersectionObserver' in window){
  const io=new IntersectionObserver(es=>es.forEach(e=>{const v=e.target;if(e.isIntersecting){v.muted=true;const p=v.play();if(p)p.catch(()=>{});}else{v.pause();}}),{threshold:0.25});
  vids.forEach(v=>io.observe(v));
}
