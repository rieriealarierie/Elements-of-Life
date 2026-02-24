// ===== Elements of Life - Game Logic =====

// Sound Effects (Web Audio API)
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new AudioContext();
    }
}

function playSound(type) {
    if (!audioCtx) return;
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    switch(type) {
        case "collect":
            oscillator.frequency.setValueAtTime(523.25, audioCtx.currentTime);
            oscillator.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.1);
            oscillator.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.2);
            gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
            oscillator.start(audioCtx.currentTime);
            oscillator.stop(audioCtx.currentTime + 0.4);
            break;
        case "win":
            oscillator.frequency.setValueAtTime(392, audioCtx.currentTime);
            oscillator.frequency.setValueAtTime(523.25, audioCtx.currentTime + 0.15);
            oscillator.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.3);
            oscillator.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.45);
            gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.7);
            oscillator.start(audioCtx.currentTime);
            oscillator.stop(audioCtx.currentTime + 0.7);
            break;
        case "lose":
            oscillator.frequency.setValueAtTime(311.13, audioCtx.currentTime);
            oscillator.frequency.setValueAtTime(233.08, audioCtx.currentTime + 0.2);
            gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
            oscillator.start(audioCtx.currentTime);
            oscillator.stop(audioCtx.currentTime + 0.5);
            break;
        case "correct":
            oscillator.frequency.setValueAtTime(880, audioCtx.currentTime);
            gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
            oscillator.start(audioCtx.currentTime);
            oscillator.stop(audioCtx.currentTime + 0.15);
            break;
        case "wrong":
            oscillator.type = "sawtooth";
            oscillator.frequency.setValueAtTime(150, audioCtx.currentTime);
            gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
            oscillator.start(audioCtx.currentTime);
            oscillator.stop(audioCtx.currentTime + 0.3);
            break;
        case "click":
            oscillator.frequency.setValueAtTime(600, audioCtx.currentTime);
            gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
            oscillator.start(audioCtx.currentTime);
            oscillator.stop(audioCtx.currentTime + 0.05);
            break;
    }
}

// Chemical Elements Data
const elements = [
    {
        symbol: "H",
        name: "هيدروجين",
        number: 1,
        category: "nonmetal",
        properties: "غاز عديم اللون والرائحة، أخف العناصر",
        fact: "يشكل 75% من كتلة الكون! ⭐"
    },
    {
        symbol: "He",
        name: "هيليوم",
        number: 2,
        category: "noble",
        properties: "غاز خامل، أخف من الهواء",
        fact: "يجعل صوتك حاداً عند استنشاقه! ��"
    },
    {
        symbol: "C",
        name: "كربون",
        number: 6,
        category: "nonmetal",
        properties: "صلب، يوجد في الألماس والفحم",
        fact: "أساس الحياة على الأرض! ��"
    },
    {
        symbol: "N",
        name: "نيتروجين",
        number: 7,
        category: "nonmetal",
        properties: "غاز، يشكل 78% من الهواء",
        fact: "نستنشقه مع كل نَفَس! 🌬️"
    },
    {
        symbol: "O",
        name: "أكسجين",
        number: 8,
        category: "nonmetal",
        properties: "غاز ضروري للحياة والاحتراق",
        fact: "بدونه لا نستطيع التنفس! ��"
    },
    {
        symbol: "Na",
        name: "صوديوم",
        number: 11,
        category: "alkali",
        properties: "معدن لين، يتفاعل بعنف مع الماء",
        fact: "موجود في ملح الطعام! ��"
    },
    {
        symbol: "Fe",
        name: "حديد",
        number: 26,
        category: "transition",
        properties: "معدن قوي، مغناطيسي",
        fact: "موجود في دمك ويعطيه اللون الأحمر! ❤️"
    },
    {
        symbol: "Au",
        name: "ذهب",
        number: 79,
        category: "transition",
        properties: "معدن ثمين، لامع، لا يصدأ",
        fact: "استخدم في الحضارات القديمة كعملة! ��"
    },
    {
        symbol: "Ag",
        name: "فضة",
        number: 47,
        category: "transition",
        properties: "معدن لامع، أفضل موصل للكهرباء",
        fact: "تستخدم في صناعة المجوهرات والإلكترونيات! ��"
    },
    {
        symbol: "Ca",
        name: "كالسيوم",
        number: 20,
        category: "alkaline",
        properties: "معدن فضي، ضروري للعظام",
        fact: "يجعل عظامك وأسنانك قوية! 🦴"
    }
];

// Game State
let gameState = {
    collectedCards: JSON.parse(localStorage.getItem("collectedCards")) || [],
    totalPoints: parseInt(localStorage.getItem("totalPoints")) || 0,
    currentScore: 0,
    lives: 3,
    quizScore: 0,
    badges: JSON.parse(localStorage.getItem("badges")) || []
};

// DOM Elements
const screens = {
    mainMenu: document.getElementById("main-menu"),
    game: document.getElementById("game-screen"),
    library: document.getElementById("library-screen"),
    quiz: document.getElementById("quiz-screen")
};

const modals = {
    card: document.getElementById("card-modal"),
    result: document.getElementById("result-modal")
};

// Initialize Game
function init() {
    updateUI();
    setupEventListeners();
    checkQuizAvailability();
}

function updateUI() {
    document.getElementById("card-count").textContent = gameState.collectedCards.length;
    document.getElementById("total-points").textContent = gameState.totalPoints;
    document.getElementById("progress-fill").style.width = `${(gameState.collectedCards.length / 10) * 100}%`;
}

function setupEventListeners() {
    // Menu buttons
    document.getElementById("start-btn").addEventListener("click", () => {
        initAudio();
        playSound("click");
        showScreen("game");
        startGame();
    });
    document.getElementById("library-btn").addEventListener("click", () => {
        initAudio();
        playSound("click");
        showScreen("library");
        renderLibrary();
    });
    document.getElementById("quiz-btn").addEventListener("click", () => {
        initAudio();
        playSound("click");
        showScreen("quiz");
        startQuiz();
    });
    // Back buttons
    document.getElementById("back-to-menu").addEventListener("click", () => {
        playSound("click");
        showScreen("mainMenu");
        stopGame();
    });
    document.getElementById("library-back").addEventListener("click", () => {
        playSound("click");
        showScreen("mainMenu");
    });
    document.getElementById("quiz-back").addEventListener("click", () => {
        playSound("click");
        showScreen("mainMenu");
    });
    // Modal close
    document.getElementById("close-card-modal").addEventListener("click", () => {
        playSound("click");
        modals.card.classList.remove("active");
        showScreen("mainMenu");
        updateUI();
    });
    document.getElementById("close-result").addEventListener("click", () => {
        playSound("click");
        modals.result.classList.remove("active");
        showScreen("mainMenu");
    });
    // Game controls
    document.querySelectorAll(".control-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const dir = btn.dataset.dir;
            movePlayer(dir);
        });
    });
    // Keyboard controls
    document.addEventListener("keydown", (e) => {
        if (screens.game.classList.contains("active")) {
            switch(e.key) {
                case "ArrowUp": case "w": case "W": movePlayer("up"); break;
                case "ArrowDown": case "s": case "S": movePlayer("down"); break;
                case "ArrowLeft": case "a": case "A": movePlayer("left"); break;
                case "ArrowRight": case "d": case "D": movePlayer("right"); break;
            }
        }
    });
}

function showScreen(screenName) {
    Object.values(screens).forEach(s => s.classList.remove("active"));
    screens[screenName].classList.add("active");
}

function checkQuizAvailability() {
    const quizBtn = document.getElementById("quiz-btn");
    if (gameState.collectedCards.length >= 3) {
        quizBtn.disabled = false;
        quizBtn.title = "اختبر معلوماتك!";
    } else {
        quizBtn.disabled = true;
        quizBtn.title = `اجمع ${3 - gameState.collectedCards.length} بطاقات إضافية`;
    }
}

// ===== MAZE GAME =====
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const TILE_SIZE = 40;
const GRID_WIDTH = 10;
const GRID_HEIGHT = 10;

canvas.width = TILE_SIZE * GRID_WIDTH;
canvas.height = TILE_SIZE * GRID_HEIGHT;

let player = { x: 0, y: 0 };
let goal = { x: 9, y: 9 };
let obstacles = [];
let gameRunning = false;
let animationId = null;

function generateMaze() {
    obstacles = [];
    const obstacleCount = 15 + Math.floor(Math.random() * 10);
    for (let i = 0; i < obstacleCount; i++) {
        let ox, oy;
        do {
            ox = Math.floor(Math.random() * GRID_WIDTH);
            oy = Math.floor(Math.random() * GRID_HEIGHT);
        } while (
            (ox === 0 && oy === 0) || 
            (ox === goal.x && oy === goal.y) ||
            obstacles.some(o => o.x === ox && o.y === oy) ||
            (Math.abs(ox - player.x) <= 1 && Math.abs(oy - player.y) <= 1)
        );
        obstacles.push({ x: ox, y: oy });
    }
}

function drawGame() {
    // Clear canvas
    ctx.fillStyle = "#A5D6A7";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Draw grid
    ctx.strokeStyle = "#81C784";
    ctx.lineWidth = 1;
    for (let x = 0; x <= GRID_WIDTH; x++) {
        ctx.beginPath();
        ctx.moveTo(x * TILE_SIZE, 0);
        ctx.lineTo(x * TILE_SIZE, canvas.height);
        ctx.stroke();
    }
    for (let y = 0; y <= GRID_HEIGHT; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y * TILE_SIZE);
        ctx.lineTo(canvas.width, y * TILE_SIZE);
        ctx.stroke();
    }
    // Draw obstacles (rocks/bushes)
    obstacles.forEach(obs => {
        ctx.fillStyle = "#795548";
        ctx.beginPath();
        ctx.arc(
            obs.x * TILE_SIZE + TILE_SIZE / 2,
            obs.y * TILE_SIZE + TILE_SIZE / 2,
            TILE_SIZE / 2.5,
            0,
            Math.PI * 2
        );
        ctx.fill();
        ctx.fillStyle = "#5D4037";
        ctx.beginPath();
        ctx.arc(
            obs.x * TILE_SIZE + TILE_SIZE / 2 - 5,
            obs.y * TILE_SIZE + TILE_SIZE / 2 - 5,
            TILE_SIZE / 5,
            0,
            Math.PI * 2
        );
        ctx.fill();
    });
    // Draw goal (element card)
    const time = Date.now() / 300;
    const bounce = Math.sin(time) * 3;
    ctx.fillStyle = "#FFC107";
    ctx.shadowColor = "#FFC107";
    ctx.shadowBlur = 15;
    ctx.fillRect(
        goal.x * TILE_SIZE + 5,
        goal.y * TILE_SIZE + 5 + bounce,
        TILE_SIZE - 10,
        TILE_SIZE - 10
    );
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#333";
    ctx.font = "bold 16px Cairo";
    ctx.textAlign = "center";
    ctx.fillText("?", goal.x * TILE_SIZE + TILE_SIZE / 2, goal.y * TILE_SIZE + TILE_SIZE / 2 + 6 + bounce);
    // Draw player (Zari)
    const px = player.x * TILE_SIZE + TILE_SIZE / 2;
    const py = player.y * TILE_SIZE + TILE_SIZE / 2;
    // Body
    ctx.fillStyle = "#2196F3";
    ctx.shadowColor = "#2196F3";
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(px, py, TILE_SIZE / 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    // Eyes
    ctx.fillStyle = "#1a1a2e";
    ctx.beginPath();
    ctx.ellipse(px - 5, py - 3, 3, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(px + 5, py - 3, 3, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    // Eye shine
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(px - 4, py - 4, 1.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(px + 6, py - 4, 1.5, 0, Math.PI * 2);
    ctx.fill();
    // Mouth
    ctx.fillStyle = "#1a1a2e";
    ctx.beginPath();
    ctx.arc(px, py + 5, 4, 0, Math.PI);
    ctx.fill();
    // Electrons
    const electronAngle = time * 2;
    for (let i = 0; i < 3; i++) {
        const angle = electronAngle + (i * Math.PI * 2 / 3);
        const ex = px + Math.cos(angle) * 18;
        const ey = py + Math.sin(angle) * 18;
        ctx.fillStyle = "#FFC107";
        ctx.shadowColor = "#FFC107";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(ex, ey, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

function gameLoop() {
    if (!gameRunning) return;
    drawGame();
    animationId = requestAnimationFrame(gameLoop);
}

function startGame() {
    player = { x: 0, y: 0 };
    goal = { x: GRID_WIDTH - 1, y: GRID_HEIGHT - 1 };
    gameState.currentScore = 0;
    gameState.lives = 3;
    document.getElementById("score").textContent = gameState.currentScore;
    document.getElementById("lives").textContent = gameState.lives;
    document.getElementById("guide-text").textContent = "استخدم الأسهم للتحرك وتجنب الصخور! 🎯";
    generateMaze();
    gameRunning = true;
    gameLoop();
}

function stopGame() {
    gameRunning = false;
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
}

function movePlayer(direction) {
    if (!gameRunning) return;
    let newX = player.x;
    let newY = player.y;
    switch(direction) {
        case "up": newY--; break;
        case "down": newY++; break;
        case "left": newX--; break;
        case "right": newX++; break;
    }
    // Check boundaries
    if (newX < 0 || newX >= GRID_WIDTH || newY < 0 || newY >= GRID_HEIGHT) {
        return;
    }
    // Check obstacle collision
    if (obstacles.some(o => o.x === newX && o.y === newY)) {
        gameState.lives--;
        document.getElementById("lives").textContent = gameState.lives;
        playSound("lose");
        document.getElementById("guide-text").textContent = "أوه! اصطدمت بصخرة! 😵";
        if (gameState.lives <= 0) {
            gameOver();
            return;
        }
        // Reset player position
        player = { x: 0, y: 0 };
        return;
    }
    player.x = newX;
    player.y = newY;
    // Check win condition
    if (player.x === goal.x && player.y === goal.y) {
        winGame();
    }
}

function gameOver() {
    gameRunning = false;
    document.getElementById("guide-text").textContent = "انتهت المحاولات! حاول مرة أخرى 💪";
    setTimeout(() => {
        startGame();
    }, 2000);
}

function winGame() {
    gameRunning = false;
    playSound("win");
    // Award random uncollected element
    const uncollected = elements.filter(e => 
        !gameState.collectedCards.includes(e.symbol)
    );
    if (uncollected.length === 0) {
        document.getElementById("guide-text").textContent = "أحسنت! جمعت كل البطاقات! 🏆";
        setTimeout(() => showScreen("mainMenu"), 2000);
        return;
    }
    const newElement = uncollected[Math.floor(Math.random() * uncollected.length)];
    gameState.collectedCards.push(newElement.symbol);
    gameState.currentScore += 100;
    gameState.totalPoints += 100;
    // Save to localStorage
    localStorage.setItem("collectedCards", JSON.stringify(gameState.collectedCards));
    localStorage.setItem("totalPoints", gameState.totalPoints.toString());
    // Show card modal
    showCardModal(newElement);
    checkQuizAvailability();
}

function showCardModal(element) {
    playSound("collect");
    const cardHTML = `
        <div class="element-card large ${element.category}">
            <div class="number">العدد الذري: ${element.number}</div>
            <div class="symbol">${element.symbol}</div>
            <div class="name">${element.name}</div>
            <div class="properties">${element.properties}</div>
            <div class="fact">${element.fact}</div>
        </div>
    `;
    document.getElementById("new-card").innerHTML = cardHTML;
    modals.card.classList.add("active");
}

// ===== LIBRARY =====
function renderLibrary() {
    const grid = document.getElementById("cards-grid");
    const emptyMsg = document.getElementById("empty-library");
    if (gameState.collectedCards.length === 0) {
        grid.style.display = "none";
        emptyMsg.style.display = "block";
        return;
    }
    grid.style.display = "grid";
    emptyMsg.style.display = "none";
    grid.innerHTML = elements.map(element => {
        const collected = gameState.collectedCards.includes(element.symbol);
        if (collected) {
            return `
                <div class="element-card ${element.category}">
                    <div class="number">العدد الذري: ${element.number}</div>
                    <div class="symbol">${element.symbol}</div>
                    <div class="name">${element.name}</div>
                    <div class="properties">${element.properties}</div>
                    <div class="fact">${element.fact}</div>
                </div>
            `;
        } else {
            return `
                <div class="element-card locked" style="position: relative;">
                    <div class="symbol">?</div>
                    <div class="name">???</div>
                </div>
            `;
        }
    }).join("");
}

// ===== QUIZ =====
let quizQuestions = [];
let currentQuestion = 0;
let correctAnswers = 0;

function generateQuizQuestions() {
    const collectedElements = elements.filter(e => 
        gameState.collectedCards.includes(e.symbol)
    );
    quizQuestions = [];
    const questionTypes = [
        // Symbol to name
        (el) => ({
            question: `ما اسم العنصر الذي رمزه "${el.symbol}"؟`,
            correct: el.name,
            options: shuffleArray([
                el.name,
                ...getRandomElements(collectedElements, el, 3).map(e => e.name)
            ])
        }),
        // Name to symbol
        (el) => ({
            question: `ما رمز عنصر "${el.name}"؟`,
            correct: el.symbol,
            options: shuffleArray([
                el.symbol,
                ...getRandomElements(collectedElements, el, 3).map(e => e.symbol)
            ])
        }),
        // Atomic number
        (el) => ({
            question: `ما العدد الذري لعنصر "${el.name}"؟`,
            correct: el.number.toString(),
            options: shuffleArray([
                el.number.toString(),
                ...getRandomElements(collectedElements, el, 3).map(e => e.number.toString())
            ])
        }),
        // Fact based
        (el) => ({
            question: el.fact.replace(/[!⭐🎈💎🌬️🫁🧂❤️👑💍🦴]/g, "") + " - أي عنصر هذا؟",
            correct: el.name,
            options: shuffleArray([
                el.name,
                ...getRandomElements(collectedElements, el, 3).map(e => e.name)
            ])
        })
    ];
    // Generate 5 questions
    for (let i = 0; i < 5; i++) {
        const randomElement = collectedElements[Math.floor(Math.random() * collectedElements.length)];
        const randomType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
        quizQuestions.push(randomType(randomElement));
    }
}

function getRandomElements(arr, exclude, count) {
    const filtered = arr.filter(e => e.symbol !== exclude.symbol);
    const shuffled = shuffleArray([...filtered]);
    return shuffled.slice(0, Math.min(count, shuffled.length));
}

function shuffleArray(arr) {
    const newArr = [...arr];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
}

function startQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    generateQuizQuestions();
    document.getElementById("quiz-zari-text").textContent = "هيا نختبر معلوماتك عن العناصر! 🧪";
    showQuestion();
}

function showQuestion() {
    if (currentQuestion >= quizQuestions.length) {
        endQuiz();
        return;
    }
    const q = quizQuestions[currentQuestion];
    document.getElementById("q-num").textContent = currentQuestion + 1;
    document.getElementById("quiz-question").textContent = q.question;
    const optionsContainer = document.getElementById("quiz-options");
    optionsContainer.innerHTML = q.options.map((opt, i) => `
        <button class="quiz-option" data-answer="${opt}">${opt}</button>
    `).join("");
    // Add click listeners
    optionsContainer.querySelectorAll(".quiz-option").forEach(btn => {
        btn.addEventListener("click", () => checkAnswer(btn));
    });
}

function checkAnswer(btn) {
    const selected = btn.dataset.answer;
    const correct = quizQuestions[currentQuestion].correct;
    const allButtons = document.querySelectorAll(".quiz-option");
    allButtons.forEach(b => b.style.pointerEvents = "none");
    if (selected === correct) {
        btn.classList.add("correct");
        correctAnswers++;
        playSound("correct");
        document.getElementById("quiz-zari-text").textContent = "أحسنت! إجابة صحيحة! ✅";
    } else {
        btn.classList.add("wrong");
        playSound("wrong");
        document.getElementById("quiz-zari-text").textContent = "للأسف! الإجابة الصحيحة هي: " + correct;
        // Highlight correct answer
        allButtons.forEach(b => {
            if (b.dataset.answer === correct) {
                b.classList.add("correct");
            }
        });
    }
    setTimeout(() => {
        currentQuestion++;
        showQuestion();
    }, 1500);
}

function endQuiz() {
    const percentage = (correctAnswers / 5) * 100;
    const resultIcon = document.getElementById("result-icon");
    const resultTitle = document.getElementById("result-title");
    const resultMessage = document.getElementById("result-message");
    const badgeContainer = document.getElementById("badge-earned");
    if (percentage >= 80) {
        resultIcon.textContent = "🏆";
        resultTitle.textContent = "ممتاز! أنت عالم كيمياء حقيقي!";
        resultMessage.textContent = `حصلت على ${correctAnswers} من 5 إجابات صحيحة`;
        // Award badge
        const badgeName = "عالم العناصر 🔬";
        if (!gameState.badges.includes(badgeName)) {
            gameState.badges.push(badgeName);
            localStorage.setItem("badges", JSON.stringify(gameState.badges));
            badgeContainer.innerHTML = `<div class="badge">${badgeName}</div>`;
        } else {
            badgeContainer.innerHTML = "";
        }
        // Bonus points
        gameState.totalPoints += 200;
        localStorage.setItem("totalPoints", gameState.totalPoints.toString());
        playSound("win");
    } else if (percentage >= 60) {
        resultIcon.textContent = "👏";
        resultTitle.textContent = "جيد جداً!";
        resultMessage.textContent = `حصلت على ${correctAnswers} من 5 إجابات صحيحة. استمر!`;
        badgeContainer.innerHTML = "";
        gameState.totalPoints += 100;
        localStorage.setItem("totalPoints", gameState.totalPoints.toString());
        playSound("collect");
    } else {
        resultIcon.textContent = "💪";
        resultTitle.textContent = "حاول مرة أخرى!";
        resultMessage.textContent = `حصلت على ${correctAnswers} من 5 إجابات صحيحة. راجع البطاقات وحاول مجدداً!`;
        badgeContainer.innerHTML = "";
        playSound("lose");
    }
    modals.result.classList.add("active");
    updateUI();
}

// Initialize
document.addEventListener("DOMContentLoaded", init);
