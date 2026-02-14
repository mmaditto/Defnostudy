// --- 1. Audio Logic ---
const music = document.getElementById('bgMusic');

function playMusic() {
    if (music) {
        music.muted = false;
        music.volume = 1.0;
        music.play().then(() => {
            console.log("Music playing successfully");
        }).catch(e => {
            console.log("Music play blocked, retrying on next click...");
        });
    }
}

// --- 2. State Management ---
let totalClicks = 0;
let yesScale = 1;

// --- 3. Page Transitions ---
document.addEventListener('DOMContentLoaded', () => {
    // START BUTTON (ENTER)
    const startBtn = document.getElementById('startValentine');
    startBtn.onclick = () => {
        playMusic(); // Attempt to unlock audio on first click
        document.getElementById('page0').classList.add('hidden');
        document.getElementById('question1').classList.remove('hidden');
        
        // Populate first question from config
        document.getElementById('questionText').innerText = CONFIG.questions.first.text;
        document.getElementById('yesBtn1').innerText = CONFIG.questions.first.yesBtn;
        document.getElementById('noBtn1').innerText = CONFIG.questions.first.noBtn;
    };

    // --- 4. Question 1 Chaos Logic ---
    const yesBtn1 = document.getElementById('yesBtn1');
    const noBtn1 = document.getElementById('noBtn1');

    function handleChaos() {
        totalClicks++;
        playMusic(); // Keep trying to play music if it hasn't started
        
        if (navigator.vibrate) navigator.vibrate(50);

        // Grow the Yes button, but keep it tap-able
        if (yesScale < 1.7) {
            yesScale += 0.25;
            yesBtn1.style.transform = `scale(${yesScale})`;
        }

        // Move buttons within a safe mobile "Portrait" zone (20% to 70% of screen)
        [yesBtn1, noBtn1].forEach(btn => {
            btn.style.position = 'fixed';
            const randomX = Math.floor(Math.random() * 50) + 20; 
            const randomY = Math.floor(Math.random() * 40) + 30;
            btn.style.left = randomX + 'vw';
            btn.style.top = randomY + 'vh';
            btn.style.zIndex = "100";
        });

        // Show Secret Button after 3 clicks of ANY button
        if (totalClicks >= 3) {
            const secret = document.getElementById('secretAnswerBtn');
            secret.innerText = "I don't like you, I LOVE YOU! ❤️";
            secret.classList.remove('hidden');
            secret.style.display = "block"; 
            secret.style.zIndex = "1000"; // Ensure it's on top
        }
    }

    yesBtn1.onclick = handleChaos;
    noBtn1.onclick = handleChaos;

    // --- 5. Proceed to Love Meter ---
    document.getElementById('secretAnswerBtn').onclick = () => {
        alert(CONFIG.questions.first.secretAnswer);
        document.getElementById('question1').classList.add('hidden');
        document.getElementById('question2').classList.remove('hidden');
        
        // Initialize Love Meter text
        document.getElementById('question2Text').innerText = CONFIG.questions.second.text;
        document.getElementById('startText').innerText = CONFIG.questions.second.startText;
    };

    // --- 6. Love Meter Slider ---
    const loveMeter = document.getElementById('loveMeter');
    loveMeter.oninput = (e) => {
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

    // --- 7. Final Question ---
    document.getElementById('noBtn3').onclick = () => {
        const btn = document.getElementById('noBtn3');
        btn.style.position = 'fixed';
        btn.style.left = (Math.random() * 60 + 20) + 'vw';
        btn.style.top = (Math.random() * 60 + 20) + 'vh';
    };

    document.getElementById('yesBtn3').onclick = () => {
        document.getElementById('question3').classList.add('hidden');
        document.getElementById('celebration').classList.remove('hidden');
        document.getElementById('celebrationTitle').innerText = CONFIG.celebration.title;
        document.getElementById('celebrationMessage').innerText = CONFIG.celebration.message;
        document.getElementById('celebrationEmojis').innerText = CONFIG.celebration.emojis;
    };
});
