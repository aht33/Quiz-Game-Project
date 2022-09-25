// Before submit, change dict values

function playFunction() {
    var dict = {
        maxLevels: 2,
        maxRounds: 4,
        currentQuestion: 1,
        qIndex: 0, // Index of question being shown
        currentLevel: 1,
        leftIsTrue: false,
        questions: [
            ["What can increase your car insurance rates?",
            "Bad Credit, filing claims, low deductible, older or unstable homes",
            "Being married, going to college, or having a new house"],
        
            ["Does marital status affect your car insurance?",
            "Yes",
            "No"],
        
            ["What are some types of car insurance coverages?",
            "Collision coverage",
            "Aqua coverage"],
        
            ["What areas have higher car insurance rates?",
            "Urban",
            "Rural"],

            ["At what age does car insurance get cheaper?",
            "25-65",
            "65+"],

            ["What is covered by open peril?",
            "Any peril not specifically excluded",
            "Perils specifically mentioned"]
            
            ["Which cars is more likely to be stolen?",
            "Honda Accord",
            "Tesla Model S"],

            ["Which car is more likely to be stolen?",
            "Ford pick-up",
            "Hyundai Tucson"],
        ]
    }

    setDict(dict)
    switchScreens("home", "game");
    
    loadQuestion();
}

// Loads question
function loadQuestion(){
    var dict = getDict()
    switchScreens("next-level", "game");

    // Picks which question
    qIndex = Math.floor(Math.random() * dict['questions'].length);
    if (Math.floor(Math.random() * 2) == 0)
        leftIsTrue = true;
    else
        leftIsTrue = false;

    // Displays question and answer on screen
    document.getElementById("questiontext").innerHTML = dict['questions'][qIndex][0];
    if (leftIsTrue == true){
        document.getElementById("choice1").innerHTML = dict['questions'][qIndex][1];
        document.getElementById("choice2").innerHTML = dict['questions'][qIndex][2];
    } else{
        document.getElementById("choice1").innerHTML = dict['questions'][qIndex][2];
        document.getElementById("choice2").innerHTML = dict['questions'][qIndex][1];
    }
    setDict(dict)
}

// Verifies answer
function nextQuestion(IsLeft){
    var dict = getDict()

    // +1 round if right answer
    if (IsLeft == true && leftIsTrue == true ||
        IsLeft == false && leftIsTrue == false){
        dict['currentQuestion'] += 1;

        // Levels up if high enough rounds
        if (dict['currentQuestion'] > dict['maxRounds']){
            goToLevelUp();
            return;
        }
        displayTracker(dict);

    // Fail screen if wrong answer
    } else {
        setDict(dict);
        goToFail();
        return;
    }

    setDict(dict)
    loadQuestion();
}

function restart(){
    switchScreens("failed-level", "game");
    loadQuestion();
}

function goToFail(){
    var dict = getDict();

    // Resets question to 1 and switches to fail screen
    dict['currentQuestion'] = 1;
    switchScreens("game", "failed-level");
    document.getElementById("nfail").innerHTML = "Level "
        + dict['currentLevel'] + " failed...";
    displayTracker(dict);
    setDict(dict);
}

function goToLevelUp(){
    var dict = getDict()

    // Plays Jingle
    const mySound = document.getElementById("sound");
    mySound.play();

    // Levels up, resets question count
    switchScreens("game", "next-level");
    dict['currentLevel'] += 1;
    dict['currentQuestion'] = 1;

    // Victory if high enough levels
    if (dict['currentLevel'] > dict['maxLevels']){
        goToVictory();
        return;
    }
    document.getElementById("nlevel").innerHTML ="questions for level " + dict['currentLevel'] + " correctly,";
    setDict(dict)
    displayTracker(dict)
}

function goToVictory(){
    switchScreens("game", "victory");
    switchScreens("next-level", "victory");
    document.getElementById("tracker").style.display="none";
}




// Quality of life functions
function displayTracker(dict){
    document.getElementById("tracker").innerHTML = "Lvl: " + dict['currentLevel'] + ", Round: " + dict['currentQuestion'];
}

function switchScreens(offscreen, onscreen){
    document.getElementById(onscreen).style.display = "block";
    document.getElementById(offscreen).style.display = "none";
}

function getDict(){
    return JSON.parse(document.getElementById("hidden-variables").innerHTML);
}
function setDict(dict){
    document.getElementById("hidden-variables").innerHTML = JSON.stringify(dict);
}

// Helper Functions
function nextQuestionLeft(){
    nextQuestion(true);
}
function nextQuestionRight(){
    nextQuestion(false);
}

