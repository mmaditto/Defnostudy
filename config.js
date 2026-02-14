// config.js
const CONFIG = {
    // 1. The name that appears in the final question
    valentineName: "Faria",

    // 2. Question Settings
    questions: {
        first: {
            text: "Do you like me?",
            yesBtn: "Yes",
            noBtn: "No",
            // This is the message that will pop up in the alert
            secretAnswer: "Yay! I knew it! ❤️" 
        },
        second: {
            text: "How much do you love me?",
            startText: "Love Meter: ",
            nextBtn: "Next ❤️"
        },
        third: {
            yesBtn: "Yes!",
            noBtn: "No"
        }
    },

    // 3. Love Meter Messages
    // These appear based on the slider value
    loveMessages: {
        normal: "Aww, that's sweet! 😊",
        high: "Wait, really? That's a lot! 🥰",
        extreme: "OH MY GOD! EXTREME LOVE! 💖🔥"
    },

    // 4. Final Celebration Screen
    celebration: {
        title: "Yay! It's a Date! 🥳",
        message: "I'm the luckiest person in the world! Can't wait to see you!",
        emojis: "💖✨🌹🎈🎁"
    }
};
