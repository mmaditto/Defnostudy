const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicToggle');
let noCount = 0;
let yesScale = 1;

window.onload = () => {
    document.getElementById('questionText').innerText = CONFIG.questions.first.text;
    document.getElementById('yesBtn1').innerText = CONFIG.questions.first.yesBtn;
    document.getElementById('noBtn1').innerText = CONFIG.questions.first.noBtn;
};

// --- First Question: The "No" Chaos ---
document.getElementById('noBtn1').onclick = () => {
    noCount++;
    
    // 1. Grow the Yes Button
    yesScale += 0.5;
    const yesBtn = document.getElementById('yesBtn1');
    const noBtn = document.getElementById('noBtn1');
    yesBtn.style.transform = `scale(${yesScale})`;

    // 2. Make buttons float to random spots
    const moveBtn = (btn) => {
        btn.style.position = 'fixed';
        btn.style.left = Math.random() * 60 + 20 + 'vw';
        btn.style.top = Math.random() * 60 + 20 + 'vh';
    };
    moveBtn(yesBtn);
    moveBtn(noBtn);

    // 3. Reveal Secret Button after 3 attempts
    if (noCount >= 3) {
        const secret = document.getElementById('secretAnswerBtn');
        secret.innerText = "I don't like you, I LOVE YOU! ❤️";
        secret.classList.remove('hidden');
    }
};

// Transition function
const startLoveMeter = () => {
    if (music) {
        music.play().catch(() => console.log("Music play blocked"));
        musicBtn.innerText = "⏸ Pause Music";
    }
    document.getElementById('question1').classList.add('hidden');
    document.getElementById('question2').classList.remove('hidden');
    
    // Load config text for Love Meter
    document.getElementById('question2Text').innerText = CONFIG.questions.second.text;
    document.getElementById('startText').innerText = CONFIG.questions.second.startText;
};

document.getElementById('yesBtn1').onclick = startLoveMeter;
document.getElementById('secretAnswerBtn').onclick = startLoveMeter;

// --- Love Meter & Final Section ---
document.getElementById('loveMeter').oninput = (e) => {
    const val = e.target.value;
    document.getElementById('loveValue').innerText = val;
    const extra = document.getElementById('extraLove');
    extra.classList.remove('hidden');
    if (val > 5000) extra.innerText = CONFIG.loveMessages.extreme;
    else if (val > 1000) extra.innerText = CONFIG.loveMessages.high;
    else extra.innerText = CONFIG.loveMessages.normal;
};

document.getElementById('nextBtn').onclick = () => {
    document.getElementById('question2').classList.add('hidden');
    document.getElementById('question3').classList.remove('hidden');
    document.getElementById('question3Text').innerText = `Will you be my Valentine, ${CONFIG.valentineName}?`;
    document.getElementById('yesBtn3').innerText = CONFIG.questions.third.yesBtn;
    document.getElementById('noBtn3').innerText = CONFIG.questions.third.noBtn;
};

document.getElementById('noBtn3').onclick = () => {
    const btn = document.getElementById('noBtn3');
    btn.style.position = 'fixed';
    btn.style.left = Math.random() * 70 + 'vw';
    btn.style.top = Math.random() * 70 + 'vh';
};

document.getElementById('yesBtn3').onclick = () => {
    document.getElementById('question3').classList.add('hidden');
    document.getElementById('celebration').classList.remove('hidden');
    document.getElementById('celebrationTitle').innerText = CONFIG.celebration.title;
    document.getElementById('celebrationMessage').innerText = CONFIG.celebration.message;
    document.getElementById('celebrationEmojis').innerText = CONFIG.celebration.emojis;
};

// Music Toggle Logic
musicBtn.onclick = () => {
    if (music.paused) { music.play(); musicBtn.innerText = "⏸ Pause Music"; }
    else { music.pause(); musicBtn.innerText = "🎵 Play Music"; }
};
