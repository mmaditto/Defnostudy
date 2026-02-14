const music = document.getElementById('bgMusic');
let totalClicks = 0; 
let yesScale = 1;

// --- STEP 1: START & FORCE MUSIC ---
document.getElementById('startValentine').onclick = () => {
    if (music) {
        music.play().then(() => {
            console.log("Music Playing");
        }).catch(() => {
            // Fallback for strict browsers
            console.log("Music blocked, waiting for next click");
        });
    }
    document.getElementById('page0').classList.add('hidden');
    document.getElementById('question1').classList.remove('hidden');
};

// --- STEP 2: MOBILE-SAFE CHAOS ---
function handleChaos() {
    totalClicks++;
    if (navigator.vibrate) navigator.vibrate(50);

    // Force music play again in case it failed the first time
    if (music && music.paused) music.play();

    const yesBtn = document.getElementById('yesBtn1');
    const noBtn = document.getElementById('noBtn1');

    // Grow Yes but keep it reasonable for mobile
    if (yesScale < 1.6) {
        yesScale += 0.2;
        yesBtn.style.transform = `scale(${yesScale})`;
    }

    // Move buttons - Stays within the center area so they aren't lost
    [yesBtn, noBtn].forEach(btn => {
        btn.style.position = 'fixed';
        // Keeps buttons between 20% and 70% of the screen width/height
        const randomX = Math.floor(Math.random() * 50) + 20; 
        const randomY = Math.floor(Math.random() * 50) + 25;
        btn.style.left = randomX + 'vw';
        btn.style.top = randomY + 'vh';
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

// No button for final question - also stays in zone
document.getElementById('noBtn3').onclick = () => {
    const btn = document.getElementById('noBtn3');
    btn.style.position = 'fixed';
    btn.style.left = (Math.random() * 50 + 20) + 'vw';
    btn.style.top = (Math.random() * 50 + 20) + 'vh';
};

document.getElementById('yesBtn3').onclick = () => {
    document.getElementById('question3').classList.add('hidden');
    document.getElementById('celebration').classList.remove('hidden');
    document.getElementById('celebrationTitle').innerText = CONFIG.celebration.title;
    document.getElementById('celebrationMessage').innerText = CONFIG.celebration.message;
    document.getElementById('celebrationEmojis').innerText = CONFIG.celebration.emojis;
};
