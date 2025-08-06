// All your JavaScript code from the HTML <script> block goes here

var score = 0;
var clickValue = 1;
var autoClickerEnabled = false;
var autoClickerInterval;
var upgradeCount = 0;
var cookiesAchievementThreshold = 100;
var upgradesAchievementThreshold = 5;
var autoClickerAchievementThreshold = 0.5;

function clickCookie() {
    score += clickValue;
    updateScore();
    checkAchievements();
}

function updateScore() {
    document.getElementById("scoreValue").innerText = score;
    updateUpgradeButtons();
}

function updateClickValue() {
    document.getElementById("clickValue").innerText = "Click Value: " + clickValue;
}

function updateAchievement(achievementId, message) {
    document.getElementById(achievementId).innerText = message;
}

function buyUpgrade(cost, increase) {
    if (score >= cost) {
        score -= cost;
        clickValue += increase;
        upgradeCount++;
        updateScore();
        updateClickValue();
        checkAchievements();
    } else {
        alert("Not enough uranium to buy this upgrade!");
    }
}

function buyAutoClicker(cost, initialSpeed) {
    if (score >= cost && !autoClickerEnabled) {
        score -= cost;
        autoClickerEnabled = true;
        document.getElementById("autoClickerStatus").innerText = "Auto-uranium: On";
        autoClickerInterval = setInterval(autoClick, 1000 / initialSpeed);
        checkAchievements();
    } else if (autoClickerEnabled) {
        alert("Auto-uranium is already enabled!");
    } else {
        alert("Not enough uranium to buy the Auto-uranium!");
    }
}

function buyUpgradeAutoClicker(cost, speedIncrease) {
    if (score >= cost && autoClickerEnabled) {
        score -= cost;
        clearInterval(autoClickerInterval);
        autoClickerInterval = setInterval(autoClick, 100 / (1 + speedIncrease));
        checkAchievements();
    } else {
        alert("Either Auto-uranium is not enabled, or not enough uranium to buy this upgrade!");
    }
}

function autoClick() {
    score += clickValue;
    updateScore();
}

function checkAchievements() {
    if (score >= cookiesAchievementThreshold) {
        updateAchievement("achievement1", "Achievement 1: Unlocked!");
    }
    if (upgradeCount >= upgradesAchievementThreshold) {
        updateAchievement("achievement2", "Achievement 2: Unlocked!");
    }
    if (autoClickerEnabled && score >= autoClickerAchievementThreshold) {
        // Add more achievements as needed
    }
    if (upgradeCount >= upgradesAchievementThreshold) {
        updateAchievement("achievement3", "Achievement 2: Unlocked!");
    }
}

function saveGame() {
    localStorage.setItem("score", score);
    localStorage.setItem("clickValue", clickValue);
    localStorage.setItem("upgradeCount", upgradeCount);
    localStorage.setItem("autoClickerEnabled", autoClickerEnabled);
}

function loadGame() {
    score = parseInt(localStorage.getItem("score")) || 0;
    clickValue = parseInt(localStorage.getItem("clickValue")) || 1;
    upgradeCount = parseInt(localStorage.getItem("upgradeCount")) || 0;
    autoClickerEnabled = (localStorage.getItem("autoClickerEnabled") === "true");
    updateScore();
    updateClickValue();
    clearInterval(autoClickerInterval);
    if (autoClickerEnabled) {
        document.getElementById("autoClickerStatus").innerText = "Auto-uranium: On";
        autoClickerInterval = setInterval(autoClick, 1000);
    } else {
        document.getElementById("autoClickerStatus").innerText = "Auto-uranium: Off";
    }
}

function updateUpgradeButtons() {
    document.getElementById("upgrade1").disabled = score < 10;
    document.getElementById("upgrade2").disabled = score < 100;
    document.getElementById("upgrade3").disabled = score < 1000;
    document.getElementById("upgrade4").disabled = score < 5000;
    document.getElementById("upgrade5").disabled = score < 10000;
}

function turnOffAutoClicker() {
    if (autoClickerEnabled) {
        clearInterval(autoClickerInterval);
        autoClickerEnabled = false;
        document.getElementById("autoClickerStatus").innerText = "Auto-uranium: Off";
    } else {
        alert("Auto-uranium is already off!");
    }
}