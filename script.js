// First Question
document.getElementById("question1Text").innerText = CONFIG.questions.first.text;
document.getElementById("yesBtn1").innerText = CONFIG.questions.first.yesBtn;
document.getElementById("noBtn1").innerText = CONFIG.questions.first.noBtn;

document.getElementById("yesBtn1").onclick = ()=>{
    alert(CONFIG.questions.first.secretAnswer);
    document.getElementById("question1").classList.add("hidden");
    document.getElementById("question2").classList.remove("hidden");
};

document.getElementById("noBtn1").onclick = ()=>{ alert("Try again 😏"); };

// Second Question
document.getElementById("question2Text").innerText = CONFIG.questions.second.text;
document.getElementById("startText").innerText = CONFIG.questions.second.startText;
document.getElementById("nextBtn").innerText = CONFIG.questions.second.nextBtn;

const loveMeter = document.getElementById("loveMeter");
const loveValue = document.getElementById("loveValue");
const extraLove = document.getElementById("extraLove");

loveMeter.oninput = ()=>{
    const val = loveMeter.value;
    loveValue.innerText = val;
    if(val>5000) extraLove.innerText = CONFIG.loveMessages.extreme;
    else if(val>1000) extraLove.innerText = CONFIG.loveMessages.high;
    else if(val>100) extraLove.innerText = CONFIG.loveMessages.normal;
    extraLove.classList.remove("hidden");
};

document.getElementById("nextBtn").onclick = ()=>{
    document.getElementById("question2").classList.add("hidden");
    document.getElementById("question3").classList.remove("hidden");
};

// Final Question
document.getElementById("question3Text").innerText = `Will you be my Valentine, ${CONFIG.valentineName}?`;
document.getElementById("yesBtn3").innerText = CONFIG.questions.third.yesBtn;
document.getElementById("noBtn3").innerText = CONFIG.questions.third.noBtn;

document.getElementById("noBtn3").onclick = ()=>{
    const btn = document.getElementById("noBtn3");
    btn.style.position = "absolute";
    btn.style.top = Math.random()*70 + "vh";
    btn.style.left = Math.random()*70 + "vw";
};

document.getElementById("yesBtn3").onclick = celebrate;

// Confetti
function createConfetti() {
    const colors = ['#ff4757','#ff6b6b','#ffafbd','#ffc3a0','#ff7f50','#ff1493'];
    for(let i=0;i<100;i++){
        const c = document.createElement('div');
        c.classList.add('confetti');
        c.style.backgroundColor = colors[Math.floor(Math.random()*colors.length)];
        c.style.left = Math.random()*100 + 'vw';
        c.style.width = c.style.height = Math.random()*10+5 + 'px';
        c.style.position = 'absolute';
        c.style.top = '-10px';
        c.style.opacity = Math.random();
        c.style.transform = `rotate(${Math.random()*360}deg)`;
        document.body.appendChild(c);
        const duration = Math.random()*3+2;
        c.animate([{transform:'translateY(0) rotate(0deg)'}, {transform:`translateY(100vh) rotate(${Math.random()*720}deg)`}], {duration:duration*1000, iterations:1, easing:'linear'});
        setTimeout(()=>c.remove(), duration*1000);
    }
}

// Celebrate + Spotify
function celebrate(){
    document.getElementById("question3").classList.add("hidden");
    const cDiv = document.getElementById("celebration");
    cDiv.classList.remove("hidden");
    document.getElementById("celebrationTitle").innerText = CONFIG.celebration.title;
    document.getElementById("celebrationMessage").innerText = CONFIG.celebration.message;
    document.getElementById("celebrationEmojis").innerText = CONFIG.celebration.emojis;
    createConfetti();
    if(CONFIG.music.enabled){
        const musicDiv = document.getElementById("music-container");
        musicDiv.innerHTML = `<iframe src="${CONFIG.music.spotifyEmbedUrl}" width="300" height="80" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`;
    }
}

