// --- 1. Setup Elements ---
const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicToggle');

// --- 2. Initial Load ---
// This ensures text appears as soon as the page opens
window.onload = () => {
    document.getElementById('questionText').innerText = CONFIG.questions.first.text;
    document.getElementById('yesBtn1').innerText = CONFIG.questions.first.yesBtn;
    document.getElementById('noBtn1').innerText = CONFIG.questions.first.noBtn;
};

// --- 3. First Question Logic (The Music Trigger) ---
document.getElementById('yesBtn1').onclick = () => {
    // START THE MUSIC IMMEDIATELY
    if (music) {
        music.play().catch(e => console.log("Music play blocked by browser, trying again on next click"));
        if (musicBtn) musicBtn.innerText = "⏸ Pause Music";
    }

    // Show the secret message from your config
    alert(CONFIG.questions.first.secretAnswer);

    // Transition to Love Meter
    document.getElementById('question1').classList.add('hidden');
    document.getElementById('question2').classList.remove('hidden');

    // Load second question text
    document.getElementById('question2Text').innerText = CONFIG.questions.second.text;
    document.getElementById('startText').innerText = CONFIG.questions.second.startText;
    document.getElementById('nextBtn').innerText = CONFIG.questions.second.nextBtn;
};

document.getElementById('noBtn1').onclick = () => {
    alert("Try again 😉");
};

// --- 4. Love Meter Logic ---
const loveMeter = document.getElementById('loveMeter');
const loveValue = document.getElementById('loveValue');
const extraLove = document.getElementById('extraLove');

loveMeter.oninput = () => {
    const val = loveMeter.value;
    loveValue.innerText = val;
    
    // Check values based on your config categories
    if (val > 5000) {
        extraLove.innerText = CONFIG.loveMessages.extreme;
    } else if (val > 1000) {
        extraLove.innerText = CONFIG.loveMessages.high;
    } else {
        extraLove.innerText = CONFIG.loveMessages.normal;
    }
    extraLove.classList.remove('hidden');
};

document.getElementById('nextBtn').onclick = () => {
    document.getElementById('question2').classList.add('hidden');
    document.getElementById('question3').classList.remove('hidden');
    
    // Setup final question
    document.getElementById('question3Text').innerText = `Will you be my Valentine, ${CONFIG.valentineName}?`;
    document.getElementById('yesBtn3').innerText = CONFIG.questions.third.yesBtn;
    document.getElementById('noBtn3').innerText = CONFIG.questions.third.noBtn;
};

// --- 5. Final Question (Running No Button) ---
document.getElementById('noBtn3').onclick = () => {
    const btn = document.getElementById('noBtn3');
    btn.style.position = 'absolute';
    // Randomly move within the viewport
    btn.style.top = Math.random() * 70 + "vh";
    btn.style.left = Math.random() * 70 + "vw";
};

document.getElementById('yesBtn3').onclick = celebrate;

// --- 6. Celebration & Confetti ---
function celebrate() {
    document.getElementById('question3').classList.add('hidden');
    document.getElementById('celebration').classList.remove('hidden');
    
    document.getElementById('celebrationTitle').innerText = CONFIG.celebration.title;
    document.getElementById('celebrationMessage').innerText = CONFIG.celebration.message;
    document.getElementById('celebrationEmojis').innerText = CONFIG.celebration.emojis;
    
    createConfetti();
}

function createConfetti() {
    const colors = ['#ff4757', '#ff6b6b', '#ffafbd', '#ffc3a0'];
    for (let i = 0; i < 100; i++) {
        const c = document.createElement('div');
        c.classList.add('confetti');
        c.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        c.style.left = Math.random() * 100 + 'vw';
        c.style.width = c.style.height = Math.random() * 10 + 5 + 'px';
        document.body.appendChild(c);
        
        c.animate([
            { transform: 'translateY(-10px) rotate(0deg)', opacity: 1 },
            { transform: `translateY(100vh) rotate(${Math.random() * 720}deg)`, opacity: 0 }
        ], { duration: Math.random() * 3000 + 2000 });
        
        setTimeout(() => c.remove(), 5000);
    }
}

// --- 7. Manual Music Toggle ---
if (musicBtn) {
    musicBtn.onclick = () => {
        if (music.paused) {
            music.play();
            musicBtn.innerText = "⏸ Pause Music";
        } else {
            music.pause();
            musicBtn.innerText = "🎵 Play Music";
        }
    };
}
