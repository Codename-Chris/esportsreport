// create colors
const COLORS = ["green", "red", "yellow", "blue"]

// create comments that user will see after each round
const randomComments = ["Well Done!", "You are pretty good at this, huh?", "Not bad", "Wow", "That was easy, how about this", "OK", "That was just luck",
    "Very Impressive", "Not too shabby my friend", "That was lightwork, try this"]

// fetch color based on id 
const green = document.getElementById("green");
const red = document.getElementById("red");
const yellow = document.getElementById("yellow");
const blue = document.getElementById("blue");

// fetch audio based on id
const colorSound = document.getElementById("color-sound");
const startSound = document.getElementById("start-sound");
const youWin = document.getElementById("win-sound");
const gameOver = document.getElementById("game-over-sound");

// setup game skeleton
let Simon = {
    gameOn: false,
    gameOver: false,
    sequence: [],
    playerInput: [],
    defaultLevel: "Easy",
    level: 1
}

// clears gameboard 
const clearFlash = () => {
    red.style.backgroundColor = "#E01E5A";
    red.style.border = "5px solid black";
    yellow.style.backgroundColor = "#FFEB3B";
    yellow.style.border = "5px solid black";
    blue.style.backgroundColor = "blue";
    blue.style.border = "5px solid black";
    green.style.backgroundColor = "#2EB67D";
    green.style.border = "5px solid black";
}

//make colors flash
const flashRed = () => {
    colorSound.play();
    red.style.backgroundColor = "rgb(222, 0, 70)";
    red.style.border = "5px solid whitesmoke"
    setTimeout(clearFlash, 500);
}

const flashYellow = () => {
    colorSound.play();
    yellow.style.backgroundColor = "rgb(255, 230, 0)";
    yellow.style.border = "5px solid whitesmoke";
    setTimeout(clearFlash, 500);
};

const flashBlue = () => {
    colorSound.play();
    blue.style.backgroundColor = " blue ";
    blue.style.border = "5px solid whitesmoke";
    setTimeout(clearFlash, 500);
};

const flashGreen = () => {
    colorSound.play();
    green.style.backgroundColor = "rgb(0, 177, 103)";
    green.style.border = "5px solid whitesmoke";
    setTimeout(clearFlash, 500);
};

//event listener waiting for player to click and start game
const redInput = red.addEventListener("click", (e) => {
    if (Simon.gameOn && !Simon.gameOver) {
        Simon.playerInput.push("red");
        flashRed();
        setTimeout(checker, 500);
    }
})

const yellowInput = yellow.addEventListener("click", e => {
    if (Simon.gameOn && !Simon.gameOver) {
        Simon.playerInput.push("yellow");
        flashYellow();
        setTimeout(checker, 500);
    }
});

const blueInput = blue.addEventListener("click", e => {
    if (Simon.gameOn && !Simon.gameOver) {
        Simon.playerInput.push("blue");
        flashBlue();
        setTimeout(checker, 500);
    }
});

const greenInput = green.addEventListener("click", e => {
    if (Simon.gameOn && !Simon.gameOver) {
        Simon.playerInput.push("green");
        flashGreen()
        setTimeout(checker, 500)
    }
});

//generates the correct sequence for the whole 10 rounds to win 
const sequenceGenerator = () => {
    for (let i = 0; i < 10; i++) {
        randomIndex = Math.floor((Math.random() * 4))
        Simon.sequence.push(COLORS[randomIndex])
    }
}

// displays current level
level = document.getElementById("level-counter");
const displayLevel = () => {
    level.innerHTML = `ROUND ${Simon.level}`
}

// button starts, ends and says trying again when you lose 
startButton = document.getElementById("start");
startButton.addEventListener('click', function (e) {
    if (startButton.innerHTML === "Start") {
        resetGame();
        sequenceGenerator();
        clearFlash();
        ComputerTurn();
        displayLevel();
        startButton.innerHTML = "END GAME"
    } else if (startButton.innerHTML === "END GAME") {
        clearFlash();
        Simon.gameOver = true;
        gameOver.play();
        comments.innerHTML = "Don't Give Up That Easy!"
        startButton.innerHTML = "START"
    } else {
        startSound.play();
        resetGame();
        sequenceGenerator();
        clearFlash();
        ComputerTurn();
        displayLevel()
        startButton.innerHTML = "END GAME"
    }
})

// starts computer's color sequence
const ComputerTurn = () => {
    currentCorrectSequence = Simon.sequence.slice(0, Simon.level)
    Simon.gameOn = false;
    for (let i = 0; i < currentCorrectSequence.length; i++) {
        switch (currentCorrectSequence[i]) {
            case "red":
                setTimeout(flashRed, i * 1250)
                break;
            case "green":
                setTimeout(flashGreen, i * 1250);
                break;
            case "yellow":
                setTimeout(flashYellow, i * 1250);
                break;
            case "blue":
                setTimeout(flashBlue, i * 1250);
                break;
            default:
                break;
        }
    }
    setTimeout(gameTrue, currentCorrectSequence.length * 1250)
}

const gameTrue = () => {
    Simon.gameOn = true;
}

//displays random comments after each turn
comments = document.getElementById("comments")
    const checker = () => {
    let currentCheck = Simon.playerInput.length - 1
    if (Simon.playerInput[currentCheck] === currentCorrectSequence[currentCheck]) {
        randomIndex = Math.floor(Math.random() * 10);
        comments.innerHTML = randomComments[randomIndex];
    } else {
        comments.innerHTML = "Game Over";
        startButton.innerHTML = "Try Again";
        loseFlash();
    }

    if (Simon.playerInput.length === 10) {
        winFlash();
        Simon.gameOver = true;
        startButton.innerHTML = "Start";
    }

    if (Simon.playerInput.length === currentCorrectSequence.length) {
        clearPlayerInput();
        Simon.level = Simon.level + 1;
        displayLevel()
        setTimeout(ComputerTurn, 1250);
    }
}

const clearPlayerInput = () => {
    Simon.playerInput = []
}

const resetGame = () => {
    Simon = {
        sequence: [],
        playerInput: [],
        gameOn: true,
        gameOver: false,
        defaultLevel: "Easy",
        level: 1
    };
    comments.innerHTML = "Simon Says"
}

const loseFlash = () => {
    gameOver.play()
    flashRed();
    flashYellow();
    flashBlue();
    flashGreen()
    Simon.gameOver = true;
}

const winFlash = () => {
    while (Simon.gameOver) {
        youWin.play();
        flashRed();
        flashYellow();
        flashBlue();
        flashGreen()
        comments.innerHTML = "Congrats you have done Simon proud!"
    }
}
