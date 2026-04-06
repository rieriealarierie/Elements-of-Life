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
    try {
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
            case "tick":
                oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
                gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
                oscillator.start(audioCtx.currentTime);
                oscillator.stop(audioCtx.currentTime + 0.05);
                break;
        }
    } catch(e) {
        // Audio error silently handled
    }
}

// Chemical Elements Data - 30 Elements
const elements = [
    {
        symbol: "H", name: "هيدروجين", number: 1,
        category: "nonmetal",
        properties: "غاز عديم اللون والرائحة، أخف العناصر",
        fact: "يشكل 75% من كتلة الكون! ⭐"
    },
    {
        symbol: "He", name: "هيليوم", number: 2,
        category: "noble",
        properties: "غاز خامل، أخف من الهواء",
        fact: "يجعل صوتك حاداً عند استنشاقه! ��"
    },
    {
        symbol: "Li", name: "ليثيوم", number: 3,
        category: "alkali",
        properties: "أخف المعادن، لين وفضي",
        fact: "يستخدم في بطاريات الهواتف والسيارات الكهربائية! ��"
    },
    {
        symbol: "Be", name: "بيريليوم", number: 4,
        category: "alkaline",
        properties: "معدن صلب وخفيف الوزن",
        fact: "يستخدم في صنع نوافذ الأشعة السينية! ��"
    },
    {
        symbol: "B", name: "بورون", number: 5,
        category: "metalloid",
        properties: "شبه فلز، صلب وهش",
        fact: "يوجد في البوراكس المستخدم في التنظيف! ��"
    },
    {
        symbol: "C", name: "كربون", number: 6,
        category: "nonmetal",
        properties: "صلب، يوجد في الألماس والفحم",
        fact: "أساس الحياة على الأرض! ��"
    },
    {
        symbol: "N", name: "نيتروجين", number: 7,
        category: "nonmetal",
        properties: "غاز، يشكل 78% من الهواء",
        fact: "نستنشقه مع كل نَفَس! 🌬️"
    },
    {
        symbol: "O", name: "أكسجين", number: 8,
        category: "nonmetal",
        properties: "غاز ضروري للحياة والاحتراق",
        fact: "بدونه لا نستطيع التنفس! ��"
    },
    {
        symbol: "F", name: "فلور", number: 9,
        category: "halogen",
        properties: "غاز سام، أكثر العناصر كهروسلبية",
        fact: "يوجد في معجون الأسنان لحمايتها! ��"
    },
    {
        symbol: "Ne", name: "نيون", number: 10,
        category: "noble",
        properties: "غاز خامل، يتوهج باللون الأحمر",
        fact: "يستخدم في اللافتات المضيئة الشهيرة! ��"
    },
    {
        symbol: "Na", name: "صوديوم", number: 11,
        category: "alkali",
        properties: "معدن لين، يتفاعل بعنف مع الماء",
        fact: "موجود في ملح الطعام! ��"
    },
    {
        symbol: "Mg", name: "مغنيسيوم", number: 12,
        category: "alkaline",
        properties: "معدن خفيف، يحترق بلهب أبيض ساطع",
        fact: "يستخدم في الألعاب النارية! ��"
    },
    {
        symbol: "Al", name: "ألومنيوم", number: 13,
        category: "post-transition",
        properties: "معدن خفيف، مقاوم للصدأ",
        fact: "يصنع منه علب المشروبات والطائرات! ✈️"
    },
    {
        symbol: "Si", name: "سيليكون", number: 14,
        category: "metalloid",
        properties: "شبه فلز، موصل جيد للكهرباء",
        fact: "أساس صناعة الرقائق الإلكترونية! ��"
    },
    {
        symbol: "P", name: "فوسفور", number: 15,
        category: "nonmetal",
        properties: "عنصر لا فلزي، يتوهج في الظلام",
        fact: "ضروري لصحة العظام والأسنان! ��"
    },
    {
        symbol: "S", name: "كبريت", number: 16,
        category: "nonmetal",
        properties: "مادة صلبة صفراء، رائحة مميزة",
        fact: "يعطي البراكين رائحتها المميزة! ��"
    },
    {
        symbol: "Cl", name: "كلور", number: 17,
        category: "halogen",
        properties: "غاز سام أصفر مخضر",
        fact: "يستخدم لتعقيم مياه الشرب والمسابح! ��"
    },
    {
        symbol: "Ar", name: "أرغون", number: 18,
        category: "noble",
        properties: "غاز خامل، لا يتفاعل",
        fact: "يملأ المصابيح الكهربائية لحمايتها! ��"
    },
    {
        symbol: "K", name: "بوتاسيوم", number: 19,
        category: "alkali",
        properties: "معدن لين جداً، نشط كيميائياً",
        fact: "موجود بكثرة في الموز! ��"
    },
    {
        symbol: "Ca", name: "كالسيوم", number: 20,
        category: "alkaline",
        properties: "معدن فضي، ضروري للعظام",
        fact: "يجعل عظامك وأسنانك قوية! ��"
    },
    {
        symbol: "Ti", name: "تيتانيوم", number: 22,
        category: "transition",
        properties: "معدن قوي وخفيف ومقاوم للتآكل",
        fact: "يستخدم في الطائرات والمركبات الفضائية! ��"
    },
    {
        symbol: "Fe", name: "حديد", number: 26,
        category: "transition",
        properties: "معدن قوي، مغناطيسي",
        fact: "موجود في دمك ويعطيه اللون الأحمر! ❤️"
    },
    {
        symbol: "Cu", name: "نحاس", number: 29,
        category: "transition",
        properties: "معدن أحمر برتقالي، موصل ممتاز",
        fact: "يستخدم في الأسلاك الكهربائية حول العالم! ⚡"
    },
    {
        symbol: "Zn", name: "زنك", number: 30,
        category: "transition",
        properties: "معدن فضي مزرق، مقاوم للتآكل",
        fact: "يحمي الحديد من الصدأ ويقوي مناعتك! 🛡️"
    },
    {
        symbol: "Ag", name: "فضة", number: 47,
        category: "transition",
        properties: "معدن لامع، أفضل موصل للكهرباء",
        fact: "تستخدم في صناعة المجوهرات والإلكترونيات! ��"
    },
    {
        symbol: "Sn", name: "قصدير", number: 50,
        category: "post-transition",
        properties: "معدن لين فضي، مقاوم للتآكل",
        fact: "يستخدم في طلاء علب الطعام المعدنية! ��"
    },
    {
        symbol: "I", name: "يود", number: 53,
        category: "halogen",
        properties: "مادة صلبة بنفسجية داكنة",
        fact: "ضروري لعمل الغدة الدرقية في جسمك! ��"
    },
    {
        symbol: "Au", name: "ذهب", number: 79,
        category: "transition",
        properties: "معدن ثمين، لامع، لا يصدأ",
        fact: "استخدم في الحضارات القديمة كعملة! ��"
    },
    {
        symbol: "Hg", name: "زئبق", number: 80,
        category: "transition",
        properties: "المعدن الوحيد السائل في درجة حرارة الغرفة",
        fact: "كان يستخدم في موازين الحرارة القديمة! 🌡️"
    },
    {
        symbol: "U", name: "يورانيوم", number: 92,
        category: "actinide",
        properties: "معدن مشع، ثقيل جداً",
        fact: "يستخدم لتوليد الطاقة النووية! ☢️"
    }
];

const TOTAL_ELEMENTS = elements.length;

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
    quizLevel: document.getElementById("quiz-level-screen"),
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
    document.getElementById("total-elements").textContent = TOTAL_ELEMENTS;
    document.getElementById("total-points").textContent = gameState.totalPoints;
    const pct = (gameState.collectedCards.length / TOTAL_ELEMENTS) * 100;
    document.getElementById("progress-fill").style.width = pct + "%";
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
        showScreen("quizLevel");
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
    document.getElementById("quiz-level-back").addEventListener("click", () => {
        playSound("click");
        showScreen("mainMenu");
    });
    document.getElementById("quiz-back").addEventListener("click", () => {
        playSound("click");
        clearQuizTimer();
        showScreen("mainMenu");
    });

    // Quiz level selection
    document.querySelectorAll(".level-card").forEach(btn => {
        btn.addEventListener("click", () => {
            initAudio();
            playSound("click");
            const level = btn.dataset.level;
            showScreen("quiz");
            startQuiz(level);
        });
    });

    // Modal close
    document.getElementById("close-card-modal").addEventListener("click", () => {
        playSound("click");
        modals.card.classList.remove("active");
        showScreen("mainMenu");
        updateUI();
        checkQuizAvailability();
    });
    document.getElementById("close-result").addEventListener("click", () => {
        playSound("click");
        modals.result.classList.remove("active");
        showScreen("mainMenu");
        updateUI();
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
                case "ArrowUp": case "w": case "W": e.preventDefault(); movePlayer("up"); break;
                case "ArrowDown": case "s": case "S": e.preventDefault(); movePlayer("down"); break;
                case "ArrowLeft": case "a": case "A": e.preventDefault(); movePlayer("left"); break;
                case "ArrowRight": case "d": case "D": e.preventDefault(); movePlayer("right"); break;
            }
        }
    });
}

function showScreen(screenName) {
    Object.values(screens).forEach(s => s.classList.remove("active"));
    if (screens[screenName]) {
        screens[screenName].classList.add("active");
    }
}

function checkQuizAvailability() {
    const quizBtn = document.getElementById("quiz-btn");
    if (gameState.collectedCards.length >= 3) {
        quizBtn.disabled = false;
        quizBtn.title = "اختبر معلوماتك!";
    } else {
        quizBtn.disabled = true;
        quizBtn.title = "اجمع " + (3 - gameState.collectedCards.length) + " بطاقات إضافية";
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
        let attempts = 0;
        do {
            ox = Math.floor(Math.random() * GRID_WIDTH);
            oy = Math.floor(Math.random() * GRID_HEIGHT);
            attempts++;
            if (attempts > 100) break;
        } while (
            (ox === 0 && oy === 0) || 
            (ox === goal.x && oy === goal.y) ||
            obstacles.some(o => o.x === ox && o.y === oy) ||
            (Math.abs(ox - 0) <= 1 && Math.abs(oy - 0) <= 1)
        );
        if (attempts <= 100) {
            obstacles.push({ x: ox, y: oy });
        }
    }
}

function drawGame() {
    ctx.fillStyle = "#A5D6A7";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

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

    // Draw obstacles
    obstacles.forEach(obs => {
        ctx.fillStyle = "#795548";
        ctx.beginPath();
        ctx.arc(
            obs.x * TILE_SIZE + TILE_SIZE / 2,
            obs.y * TILE_SIZE + TILE_SIZE / 2,
            TILE_SIZE / 2.5, 0, Math.PI * 2
        );
        ctx.fill();
        ctx.fillStyle = "#5D4037";
        ctx.beginPath();
        ctx.arc(
            obs.x * TILE_SIZE + TILE_SIZE / 2 - 5,
            obs.y * TILE_SIZE + TILE_SIZE / 2 - 5,
            TILE_SIZE / 5, 0, Math.PI * 2
        );
        ctx.fill();
    });

    // Draw goal
    const time = Date.now() / 300;
    const bounce = Math.sin(time) * 3;
    ctx.fillStyle = "#FFC107";
    ctx.shadowColor = "#FFC107";
    ctx.shadowBlur = 15;
    ctx.fillRect(
        goal.x * TILE_SIZE + 5,
        goal.y * TILE_SIZE + 5 + bounce,
        TILE_SIZE - 10, TILE_SIZE - 10
    );
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#333";
    ctx.font = "bold 16px Cairo";
    ctx.textAlign = "center";
    ctx.fillText("?", goal.x * TILE_SIZE + TILE_SIZE / 2, goal.y * TILE_SIZE + TILE_SIZE / 2 + 6 + bounce);

    // Draw player
    const px = player.x * TILE_SIZE + TILE_SIZE / 2;
    const py = player.y * TILE_SIZE + TILE_SIZE / 2;

    ctx.fillStyle = "#2196F3";
    ctx.shadowColor = "#2196F3";
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(px, py, TILE_SIZE / 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.fillStyle = "#1a1a2e";
    ctx.beginPath();
    ctx.ellipse(px - 5, py - 3, 3, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(px + 5, py - 3, 3, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(px - 4, py - 4, 1.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(px + 6, py - 4, 1.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#1a1a2e";
    ctx.beginPath();
    ctx.arc(px, py + 5, 4, 0, Math.PI);
    ctx.fill();

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
        animationId = null;
    }
}

function movePlayer(direction) {
    if (!gameRunning) return;
    let newX = player.x;
    let newY = player.y;
    switch(direction) {
        case "up": newY--; break;
        case "down": newY++; break;
        case "left": newX++; break;
        case "right": newX--; break;
    }
    if (newX < 0 || newX >= GRID_WIDTH || newY < 0 || newY >= GRID_HEIGHT) {
        return;
    }
    if (obstacles.some(o => o.x === newX && o.y === newY)) {
        gameState.lives--;
        document.getElementById("lives").textContent = gameState.lives;
        playSound("lose");
        document.getElementById("guide-text").textContent = "أوه! اصطدمت بصخرة! 😵";
        if (gameState.lives <= 0) {
            gameOver();
            return;
        }
        player = { x: 0, y: 0 };
        return;
    }
    player.x = newX;
    player.y = newY;
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
    localStorage.setItem("collectedCards", JSON.stringify(gameState.collectedCards));
    localStorage.setItem("totalPoints", gameState.totalPoints.toString());
    showCardModal(newElement);
    checkQuizAvailability();
}

function showCardModal(element) {
    playSound("collect");
    const cardHTML = "<div class=\"element-card large " + element.category + "\">" +
        "<div class=\"number\">العدد الذري: " + element.number + "</div>" +
        "<div class=\"symbol\">" + element.symbol + "</div>" +
        "<div class=\"name\">" + element.name + "</div>" +
        "<div class=\"properties\">" + element.properties + "</div>" +
        "<div class=\"fact\">" + element.fact + "</div>" +
        "</div>";
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
    let html = "";
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const collected = gameState.collectedCards.includes(element.symbol);
        if (collected) {
            html += "<div class=\"element-card " + element.category + "\">" +
                "<div class=\"number\">العدد الذري: " + element.number + "</div>" +
                "<div class=\"symbol\">" + element.symbol + "</div>" +
                "<div class=\"name\">" + element.name + "</div>" +
                "<div class=\"properties\">" + element.properties + "</div>" +
                "<div class=\"fact\">" + element.fact + "</div>" +
                "</div>";
        } else {
            html += "<div class=\"element-card locked\">" +
                "<div class=\"symbol\">?</div>" +
                "<div class=\"name\">???</div>" +
                "</div>";
        }
    }
    grid.innerHTML = html;
}

// ===== QUIZ =====
let quizQuestions = [];
let currentQuestion = 0;
let correctAnswers = 0;
let currentQuizLevel = "easy";
let quizTimerInterval = null;
let quizTimeLeft = 0;

const QUIZ_CONFIG = {
    easy: { questions: 5, options: 4, time: 0, badge: "مستكشف العناصر 🔬" },
    medium: { questions: 7, options: 4, time: 20, badge: "عالم كيمياء 🧪" },
    hard: { questions: 10, options: 5, time: 12, badge: "عبقري الكيمياء 🏆" }
};

function getCollectedElements() {
    return elements.filter(e => gameState.collectedCards.includes(e.symbol));
}

function generateQuizQuestions(level) {
    const collectedElements = getCollectedElements();
    quizQuestions = [];
    const config = QUIZ_CONFIG[level];

    const easyTypes = [
        (el) => ({
            question: "ما اسم العنصر الذي رمزه \"" + el.symbol + "\"؟",
            correct: el.name,
            options: shuffleArray([
                el.name,
                ...getRandomElements(collectedElements, el, config.options - 1).map(e => e.name)
            ])
        }),
        (el) => ({
            question: "ما رمز عنصر \"" + el.name + "\"؟",
            correct: el.symbol,
            options: shuffleArray([
                el.symbol,
                ...getRandomElements(collectedElements, el, config.options - 1).map(e => e.symbol)
            ])
        })
    ];

    const mediumTypes = [
        ...easyTypes,
        (el) => ({
            question: "ما العدد الذري لعنصر \"" + el.name + "\"؟",
            correct: el.number.toString(),
            options: shuffleArray([
                el.number.toString(),
                ...getRandomElements(collectedElements, el, config.options - 1).map(e => e.number.toString())
            ])
        }),
        (el) => ({
            question: "أي عنصر يتميز بالخاصية التالية: " + el.properties + "؟",
            correct: el.name,
            options: shuffleArray([
                el.name,
                ...getRandomElements(collectedElements, el, config.options - 1).map(e => e.name)
            ])
        })
    ];

    const hardTypes = [
        ...mediumTypes,
        (el) => ({
            question: "ما تصنيف عنصر \"" + el.name + "\" في الجدول الدوري؟",
            correct: getCategoryName(el.category),
            options: shuffleArray(getUniqueCategoryOptions(el, config.options))
        }),
        (el) => {
            const cleanFact = el.fact.replace(/[!⭐🎈🔋🏥🧹🌍🌬️🫁🦷💡🧂🎆✈️💻🦴🌋🏊💡🍌💪🚀❤️⚡🛡️💍🥫🧬👑🌡️☢️]/g, "").trim();
            return {
                question: cleanFact + " - أي عنصر يتحدث عنه هذا الوصف؟",
                correct: el.name,
                options: shuffleArray([
                    el.name,
                    ...getRandomElements(collectedElements, el, config.options - 1).map(e => e.name)
                ])
            };
        }
    ];

    let questionTypes;
    if (level === "easy") questionTypes = easyTypes;
    else if (level === "medium") questionTypes = mediumTypes;
    else questionTypes = hardTypes;

    const usedElements = new Set();
    for (let i = 0; i < config.questions; i++) {
        let randomElement;
        if (usedElements.size < collectedElements.length) {
            do {
                randomElement = collectedElements[Math.floor(Math.random() * collectedElements.length)];
            } while (usedElements.has(randomElement.symbol) && usedElements.size < collectedElements.length);
        } else {
            randomElement = collectedElements[Math.floor(Math.random() * collectedElements.length)];
        }
        usedElements.add(randomElement.symbol);
        const randomType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
        quizQuestions.push(randomType(randomElement));
    }
}

function getCategoryName(cat) {
    const names = {
        "nonmetal": "لا فلز",
        "noble": "غاز نبيل",
        "alkali": "فلز قلوي",
        "alkaline": "فلز قلوي ترابي",
        "transition": "فلز انتقالي",
        "metalloid": "شبه فلز",
        "halogen": "هالوجين",
        "post-transition": "فلز بعد انتقالي",
        "lanthanide": "لانثانيد",
        "actinide": "أكتينيد"
    };
    return names[cat] || cat;
}

function getUniqueCategoryOptions(element, count) {
    const allCategories = ["لا فلز", "غاز نبيل", "فلز قلوي", "فلز قلوي ترابي", "فلز انتقالي", "شبه فلز", "هالوجين", "فلز بعد انتقالي", "أكتينيد"];
    const correctName = getCategoryName(element.category);
    const others = allCategories.filter(c => c !== correctName);
    const shuffled = shuffleArray(others);
    return [correctName, ...shuffled.slice(0, count - 1)];
}

function getRandomElements(arr, exclude, count) {
    const filtered = arr.filter(e => e.symbol !== exclude.symbol);
    if (filtered.length === 0) {
        const fallback = elements.filter(e => e.symbol !== exclude.symbol);
        return shuffleArray([...fallback]).slice(0, Math.min(count, fallback.length));
    }
    const shuffled = shuffleArray([...filtered]);
    if (shuffled.length < count) {
        const extra = elements.filter(e => e.symbol !== exclude.symbol && !filtered.some(f => f.symbol === e.symbol));
        return [...shuffled, ...shuffleArray(extra)].slice(0, count);
    }
    return shuffled.slice(0, count);
}

function shuffleArray(arr) {
    const newArr = [...arr];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
}

function startQuiz(level) {
    currentQuizLevel = level;
    currentQuestion = 0;
    correctAnswers = 0;
    clearQuizTimer();
    generateQuizQuestions(level);
    const config = QUIZ_CONFIG[level];
    document.getElementById("q-total").textContent = config.questions;
    const timerEl = document.getElementById("quiz-timer");
    if (config.time > 0) {
        timerEl.style.display = "inline-block";
    } else {
        timerEl.style.display = "none";
    }
    const levelNames = { easy: "سهل", medium: "متوسط", hard: "صعب" };
    document.getElementById("quiz-zari-text").textContent = "المستوى: " + levelNames[level] + " - هيا نبدأ! 🧪";
    showQuestion();
}

function clearQuizTimer() {
    if (quizTimerInterval) {
        clearInterval(quizTimerInterval);
        quizTimerInterval = null;
    }
}

function startQuestionTimer() {
    const config = QUIZ_CONFIG[currentQuizLevel];
    if (config.time <= 0) return;
    quizTimeLeft = config.time;
    document.getElementById("timer-value").textContent = quizTimeLeft;
    clearQuizTimer();
    quizTimerInterval = setInterval(() => {
        quizTimeLeft--;
        document.getElementById("timer-value").textContent = quizTimeLeft;
        if (quizTimeLeft <= 5) {
            playSound("tick");
        }
        if (quizTimeLeft <= 0) {
            clearQuizTimer();
            timeUpAnswer();
        }
    }, 1000);
}

function timeUpAnswer() {
    const correct = quizQuestions[currentQuestion].correct;
    const allButtons = document.querySelectorAll(".quiz-option");
    allButtons.forEach(b => {
        b.style.pointerEvents = "none";
        if (b.dataset.answer === correct) {
            b.classList.add("correct");
        }
    });
    playSound("wrong");
    document.getElementById("quiz-zari-text").textContent = "انتهى الوقت! الإجابة الصحيحة: " + correct;
    setTimeout(() => {
        currentQuestion++;
        showQuestion();
    }, 1500);
}

function showQuestion() {
    clearQuizTimer();
    if (currentQuestion >= quizQuestions.length) {
        endQuiz();
        return;
    }
    const q = quizQuestions[currentQuestion];
    document.getElementById("q-num").textContent = currentQuestion + 1;
    document.getElementById("quiz-question").textContent = q.question;
    const optionsContainer = document.getElementById("quiz-options");
    let optHtml = "";
    for (let i = 0; i < q.options.length; i++) {
        optHtml += "<button class=\"quiz-option\" data-answer=\"" + q.options[i] + "\">" + q.options[i] + "</button>";
    }
    optionsContainer.innerHTML = optHtml;
    optionsContainer.querySelectorAll(".quiz-option").forEach(btn => {
        btn.addEventListener("click", () => checkAnswer(btn));
    });
    startQuestionTimer();
}

function checkAnswer(btn) {
    clearQuizTimer();
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
        document.getElementById("quiz-zari-text").textContent = "الإجابة الصحيحة هي: " + correct;
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
    clearQuizTimer();
    const config = QUIZ_CONFIG[currentQuizLevel];
    const totalQ = config.questions;
    const percentage = (correctAnswers / totalQ) * 100;
    const resultIcon = document.getElementById("result-icon");
    const resultTitle = document.getElementById("result-title");
    const resultMessage = document.getElementById("result-message");
    const badgeContainer = document.getElementById("badge-earned");

    if (percentage >= 80) {
        resultIcon.textContent = "🏆";
        resultTitle.textContent = "ممتاز! أنت عالم كيمياء حقيقي!";
        resultMessage.textContent = "حصلت على " + correctAnswers + " من " + totalQ + " إجابات صحيحة";
        const badgeName = config.badge;
        if (!gameState.badges.includes(badgeName)) {
            gameState.badges.push(badgeName);
            localStorage.setItem("badges", JSON.stringify(gameState.badges));
            badgeContainer.innerHTML = "<div class=\"badge\">" + badgeName + "</div>";
        } else {
            badgeContainer.innerHTML = "";
        }
        const bonusPoints = currentQuizLevel === "hard" ? 500 : currentQuizLevel === "medium" ? 300 : 200;
        gameState.totalPoints += bonusPoints;
        localStorage.setItem("totalPoints", gameState.totalPoints.toString());
        playSound("win");
    } else if (percentage >= 60) {
        resultIcon.textContent = "👏";
        resultTitle.textContent = "جيد جداً!";
        resultMessage.textContent = "حصلت على " + correctAnswers + " من " + totalQ + " إجابات صحيحة. استمر!";
        badgeContainer.innerHTML = "";
        const bonusPoints = currentQuizLevel === "hard" ? 200 : currentQuizLevel === "medium" ? 150 : 100;
        gameState.totalPoints += bonusPoints;
        localStorage.setItem("totalPoints", gameState.totalPoints.toString());
        playSound("collect");
    } else {
        resultIcon.textContent = "💪";
        resultTitle.textContent = "حاول مرة أخرى!";
        resultMessage.textContent = "حصلت على " + correctAnswers + " من " + totalQ + " إجابات صحيحة. راجع البطاقات وحاول مجدداً!";
        badgeContainer.innerHTML = "";
        playSound("lose");
    }
    modals.result.classList.add("active");
    document.getElementById("quiz-timer").style.display = "none";
    updateUI();
}

// Initialize
document.addEventListener("DOMContentLoaded", init);
