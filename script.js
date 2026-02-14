const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicToggle');
let noCount = 0;
let yesScale = 1;

// --- Initial Load ---
window.onload = () => {
    document.getElementById('questionText').innerText = CONFIG.questions.first.text;
    document.getElementById('yesBtn1').innerText = CONFIG.questions.first.yesBtn;
    document.getElementById('noBtn1').innerText = CONFIG.questions.first.noBtn;
};

// --- First Question Logic ---
document.getElementById('noBtn1').onclick = () => {
    noCount++;
    
    // 1. Grow the Yes Button
    yesScale += 0.4;
    const yesBtn = document.getElementById('yesBtn1');
    yesBtn.style.transform = `scale(${yesScale})`;

    // 2. Make them float randomly
    const btns = [yesBtn, document.getElementById('noBtn1')];
    btns.forEach(btn => {
        btn.classList.add('floating');
        btn.style.top = Math.random() * 70 + 15 + 'vh';
        btn.style.left = Math.random() * 70 + 15 + 'vw';
    });

    // 3. Reveal Secret Button after 3 clicks
    if (noCount >= 3) {
        const secretBtn = document.getElementById('secretAnswerBtn');
        secretBtn.classList.remove('hidden');
        secretBtn.innerText = CONFIG.questions.first.secretAnswer;
    }
};

// Handle transitions via Yes or the Secret Button
const proceedToNext = () => {
    if (music) {
        music.play().catch(e => console.log("Music blocked by browser context"));
    }
    document.getElementById('question1').classList.add('hidden');
    document.getElementById('question2').classList.remove('hidden');
    
    // Set up Love Meter text
    document.getElementById('question2Text').innerText = CONFIG.questions.second.text;
    document.getElementById('startText').innerText = CONFIG.questions.second.startText;
};

document.getElementById('yesBtn1').onclick = proceedToNext;
document.getElementById('secretAnswerBtn').onclick = proceedToNext;

// --- Love Meter Logic ---
const loveMeter = document.getElementById('loveMeter');
loveMeter.oninput = () => {
    const val = loveMeter.value;
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
    document.getElementById('question3Text').innerText = "Will you be my Valentine, " + CONFIG.valentineName + "?";
};

// --- Music Toggle ---
musicBtn.onclick = () => {
    if (music.paused) {
        music.play();
        musicBtn.innerText = "⏸ Pause Music";
    } else {
        music.pause();
        musicBtn.innerText = "🎵 Play Music";
    }
};
