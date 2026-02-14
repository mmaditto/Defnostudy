const music = document.getElementById('bgMusic');
let totalClicks = 0; 
let yesScale = 1;

// --- STEP 1: START VALENTINE & UNLOCK MUSIC ---
document.getElementById('startValentine').onclick = () => {
    if (music) {
        music.play().catch(() => console.log("Music waiting for interaction"));
    }
    document.getElementById('page0').classList.add('hidden');
    document.getElementById('question1').classList.remove('hidden');
};

// --- STEP 2: CHAOS LOGIC ---
function handleChaos() {
    totalClicks++;
    if (navigator.vibrate) navigator.vibrate(50);

    const yesBtn = document.getElementById('yesBtn1');
    const noBtn = document.getElementById('noBtn1');

    // Grow Yes (capped)
    if (yesScale < 1.8) {
        yesScale += 0.25;
        yesBtn.style.transform = `scale(${yesScale})`;
    }

    // Move buttons
    [yesBtn, noBtn].forEach(btn => {
        btn.style.position = 'fixed';
        btn.style.left = Math.random() * 60 + 20 + 'vw';
        btn.style.top = Math.random() * 60 + 20 + 'vh';
    });

    // Reveal Secret
    if (totalClicks >= 3) {
        const secret = document.getElementById('secretAnswerBtn');
        secret.innerText = "I don't like you, I LOVE YOU! ❤️";
        secret.classList.remove('hidden');
    }
}

document.getElementById('yesBtn1').onclick = handleChaos;
document.getElementById('noBtn1').onclick = handleChaos;

// --- STEP 3: PROCEED ---
document.getElementById('secretAnswerBtn').onclick = () => {
    alert(CONFIG.questions.first.secretAnswer);
    document.getElementById('question1').classList.add('hidden');
    document.getElementById('question2').classList.remove('hidden');
    
    document.getElementById('question2Text').innerText = CONFIG.questions.second.text;
    document.getElementById('startText').innerText = CONFIG.questions.second.startText;
};

// --- STEP 4: LOVE METER ---
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
};

// No button for final question
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
