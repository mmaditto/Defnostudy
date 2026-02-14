const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicToggle');
let totalClicks = 0; 
let yesScale = 1;

// --- Page 0 to Page 1 Transition ---
document.getElementById('startValentine').onclick = () => {
    document.getElementById('page0').classList.add('hidden');
    document.getElementById('question1').classList.remove('hidden');
};

// --- The "Chaos" Function ---
function handleFrustration() {
    totalClicks++;
    
    if (navigator.vibrate) navigator.vibrate(50); 

    // 1. Grow the Yes Button (Capped at 2x size so it doesn't block the screen)
    if (yesScale < 2) {
        yesScale += 0.3;
        document.getElementById('yesBtn1').style.transform = `scale(${yesScale})`;
    }

    // 2. Float Buttons Randomly
    const yesBtn = document.getElementById('yesBtn1');
    const noBtn = document.getElementById('noBtn1');
    [yesBtn, noBtn].forEach(btn => {
        btn.style.position = 'fixed';
        btn.style.left = Math.random() * 60 + 20 + 'vw';
        btn.style.top = Math.random() * 60 + 20 + 'vh';
        btn.style.zIndex = "100"; 
    });

    // 3. Show Secret Button after 3 clicks
    if (totalClicks >= 3) {
        const secret = document.getElementById('secretAnswerBtn');
        secret.innerText = "I don't like you, I LOVE YOU! ❤️";
        secret.classList.remove('hidden');
        secret.style.display = "block";
        secret.style.zIndex = "1000"; // Higher than floating buttons
    }
}

document.getElementById('noBtn1').onclick = handleFrustration;
document.getElementById('yesBtn1').onclick = handleFrustration;

// --- Secret Button Proceed ---
document.getElementById('secretAnswerBtn').onclick = () => {
    if (music) {
        music.play().catch(() => console.log("Music blocked"));
    }
    alert(CONFIG.questions.first.secretAnswer);
    document.getElementById('question1').classList.add('hidden');
    document.getElementById('question2').classList.remove('hidden');
    
    document.getElementById('question2Text').innerText = CONFIG.questions.second.text;
    document.getElementById('startText').innerText = CONFIG.questions.second.startText;
};

// --- Love Meter & Final logic (Keep your existing code for these) ---
// ... (Insert your loveMeter.oninput and celebration functions here)
