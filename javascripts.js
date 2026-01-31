/* Floating elements */
function createFloatingElements(className, count, content = null) {
  for(let i=0;i<count;i++){
    const el = document.createElement('div');
    el.className = className;
    if(content) el.innerText = content;
    el.style.left = Math.random()*100+'vw';
    el.style.top = Math.random()*100+'vh';
    el.style.animationDuration = (1 + Math.random()*5)+'s';
    document.body.appendChild(el);
  }
}
createFloatingElements('heart', 30, '💗');
createFloatingElements('sparkle', 25);

/* Elements */
const greeting = document.getElementById('greeting');
const box = document.getElementById('questionBox');
const noButton = document.getElementById('noButton');
const yesButton = document.getElementById('yesButton');
const confession = document.getElementById('confessionMessage');
const bgMusic = document.getElementById('bgMusic');

/* Initial state */
if(box) box.style.display = 'none';
if(confession) confession.style.display = 'none';

/* Center box helper */
function centerBox() {
  if(box) {
    box.style.left = (window.innerWidth - box.offsetWidth)/2+'px';
    box.style.top = (window.innerHeight - box.offsetHeight)/2+'px';
  }
}

/* Random NO button position */
function getRandomPosition(el){
  const x = Math.random()*(window.innerWidth - el.offsetWidth - 20);
  const y = Math.random()*(window.innerHeight - el.offsetHeight - 20);
  return {x,y};
}

/* Confetti */
function createConfetti(count=40){
  for(let i=0;i<count;i++){
    const confetti = document.createElement('div');
    confetti.style.position='absolute';
    confetti.style.width='6px';
    confetti.style.height='6px';
    confetti.style.borderRadius='50%';
    confetti.style.background=['#ff5fa2','#ff85c2','#ffe0ef','#ff3d8b'][Math.floor(Math.random()*4)];
    confetti.style.left = Math.random()*window.innerWidth+'px';
    confetti.style.top = Math.random()*window.innerHeight+'px';
    confetti.style.opacity=0.9;
    confetti.style.transition='top 2s ease, opacity 2s ease';
    document.body.appendChild(confetti);
    setTimeout(()=>{ confetti.style.top = parseInt(confetti.style.top)+80+'px'; confetti.style.opacity=0; },50);
    setTimeout(()=> confetti.remove(),2500);
  }
}

/* Page logic */
if(greeting){
  greeting.addEventListener('click', ()=>{
    greeting.style.display='none';
    box.style.display='block';
    centerBox();
    if(bgMusic) bgMusic.play();
  });
}

if(noButton){
  noButton.addEventListener('click', ()=>{
    const pos = getRandomPosition(box);
    box.style.transition='left 0.3s ease, top 0.3s ease, transform 0.2s ease';
    box.style.left = pos.x+'px';
    box.style.top = pos.y+'px';
    box.style.transform='translateY(-15px)';
    setTimeout(()=> box.style.transform='translateY(0)',200);
  });
}

if(yesButton){
  yesButton.addEventListener('click', ()=>{
    if(confession){
      confession.style.display='block';
      setTimeout(()=> confession.classList.add('show'),50);
    }
    createConfetti(40);

    // Save music time to resume on second page
    if(bgMusic) localStorage.setItem('bgMusicTime', bgMusic.currentTime);

    setTimeout(()=>{
      window.location.href = 'second page.html';
    },2500);
  });
}

/* Resume music if page is secondpage */
if(bgMusic){
  const savedTime = localStorage.getItem('bgMusicTime');
  if(savedTime){
    bgMusic.currentTime = parseFloat(savedTime);
    bgMusic.play().catch(()=>{document.body.addEventListener('click', ()=>bgMusic.play(),{once:true});});
  }
}

/* Recenter box on resize */
window.addEventListener('resize', ()=>{
  if(box && box.style.display!=='none') centerBox();
});
