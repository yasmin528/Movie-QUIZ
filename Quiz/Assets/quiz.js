// Questions
const Questions = [
    {
        id: 0,
        q: "Who actually drew the sketch of Rose in Titanic?",
        a: [
            { text: "Leonardo DiCaprio", isCorrect: false },
            { text: "Billy Zane", isCorrect: false },
            { text: "James Cameron", isCorrect: true },
            { text: "Kathy Bates", isCorrect: false },
        ],
    },
    {
        id: 1,
        q: "Who voices Joy in Pixar’s Inside Out?",
        a: [
            { text: "Tina Fey", isCorrect: false },
            { text: "Kathryn Hahn", isCorrect: false },
            { text: "Ellen DeGeneres", isCorrect: false },
            { text: "Amy Poehler", isCorrect: true },
        ],
    },
    {
        id: 2,
        q: "Where were The Lord of the Rings movies filmed?",
        a: [
            { text: "Ireland", isCorrect: false },
            { text: "Iceland", isCorrect: false },
            { text: "New Zealand", isCorrect: true },
            { text: "Australia", isCorrect: false },
        ],
    },
    {
        id: 3,
        q: "Who was the first Black person to win an Oscar?",
        a: [
            { text: "Hattie McDaniel", isCorrect: true },
            { text: "Sidney Poitier", isCorrect: false },
            { text: "Dorothy Dandridge", isCorrect: false },
            { text: "James Earl Jones", isCorrect: false },
        ],
    },
    {
        id: 4,
        q: "What is the name of the fictional land where Frozen takes place?",
        a: [
            { text: "Naples", isCorrect: false },
            { text: "Arendelle", isCorrect: true },
            { text: "Florin", isCorrect: false },
            { text: "Grimm", isCorrect: false },
        ],
    },
];

var selected = "";
var tOrf = false;
var noOfCorrectQ = 0;
var correctIndex = -1;
var selectedInd = -1;

function iterate(id) {
    if (id == Questions.length - 1) {
        var submit = document.querySelector('.next');
        submit.innerHTML = "Submit";
    }
    var noQ = document.querySelector('.noQ');
    noQ.innerHTML = `${parseInt(id) + 1}/${Questions.length}`;
    var question = document.querySelector('.question');
    question.innerHTML = Questions[id].q;
    const optionElements = document.querySelectorAll(".option");
    var isOptionSelected = false; // variable to track if an option is selected for current question
    optionElements.forEach((optionElement, index) => {
        optionElement.innerText = Questions[id].a[index].text;
        if (Questions[id].a[index].isCorrect) {
            correctIndex = index;
        }
        optionElement.addEventListener('click', function () {
            selected = document.querySelector(`.op${index + 1}`);
            tOrf = Questions[id].a[index].isCorrect;
            selectedInd = index;
            optionElements.forEach((optionElement, ind) => {
                if (ind != index) {
                    optionElement.style.background = "rgba(240, 231, 231, 0.808)";
                    optionElement.style.color = "black";
                } else {
                    selected.style.background = "#4b1c25";
                    selected.style.color = "rgba(240, 231, 231, 0.808)";
                    isOptionSelected = true; // set variable to true when option is selected
                }
            })
        });
        if (!isOptionSelected) { // if no option is selected, reset styles
            optionElement.style.background = "rgba(240, 231, 231, 0.808)";
            optionElement.style.color = "black";
        }
    });
}

//next button
const next = document.querySelector('.next');
var id = 0;

next.addEventListener("click", () => {
    if (id < Questions.length) {
        if (tOrf) {
            noOfCorrectQ++;
        }
        if (correctIndex === selectedInd) {
            selected.classList.add("flash");
            setTimeout(function () {
                selected.classList.remove("flash");
                id++;
                if (id != Questions.length) {
                    iterate(id);
                } else {
                    showResult();
                }
            }, 1500);
        } else {
            var correctbtn = document.querySelector(`.op${correctIndex + 1}`);
            correctbtn.classList.add("flash");
            setTimeout(function () {
                correctbtn.classList.remove("flash");
                id++;
                if (id != Questions.length) {
                    iterate(id);
                } else {
                    showResult();
                }
            }, 1500);
        }
    }
});

function showResult() {
    var quiz = document.querySelector(".quiz");
    quiz.style.display = "none";
    if (noOfCorrectQ > Questions.length / 2) {
        var resultWinner = document.querySelector(".resultWinner");
        var winText = document.querySelector(".winText");
        resultWinner.style.display = "flex";
        winText.innerHTML = `Congratulation...<br>You got ${noOfCorrectQ}/${Questions.length} answers right!`;
    } else {
        var resultloser = document.querySelector(".resultloser");
        var loseText = document.querySelector(".loseText");
        resultloser.style.display = "flex";
        loseText.innerHTML = `Unfortunately...<br>You got ${noOfCorrectQ}/${Questions.length}  answers right!`;
    }
}

// Start button
const startButton = document.querySelector('.startButton');

startButton.addEventListener("click", () => {
    var introDiv = document.querySelector(".intro");
    introDiv.style.display = "none";
    var quiz = document.querySelector(".quiz");
    quiz.style.display = "flex";
    id = "0";
    iterate(id);
})
