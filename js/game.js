const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestion = [];

let questions = [
    {
        question: "Inside which HTML elemrnt do we put the JavaScript?",
        choice1: "<script>",
        choice2: "<javascript>",
        choice3: "<js>",
        choice4: "<scripting>",
        answer: 1,
    },

    {
        question:
            "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script src='xxx.js'>",
        choice3: "<script file='xxx.js'>",
        choice4: "<script scr='xxx.js'>",
        answer: 2,
    },

    {
        question: "How do you write 'Hello World' in an alert box?",
        choice1: "msgBox(Hello World);",
        choice2: "alertBox(Hello World);",
        choice3: "msg(Hello World);",
        choice4: "alert(Hello World);",
        answer: 4,
    },
];

const CORECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestion = [...questions];
    console.log(availableQuestion);
    getNewQuestion();
};

getNewQuestion = () => {
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestion.length);
    currentQuestion = availableQuestion[questionIndex];
    question.innerText = currentQuestion.question;

    let numberOfParagraph = 1;
    choices.forEach((choice) => {
        var paragraph = document.getElementsByTagName("p")[numberOfParagraph];
        var idOfParagraph = paragraph.id;
        choice.innerText = currentQuestion[idOfParagraph];
        numberOfParagraph = numberOfParagraph + 2;
    });
};

startGame();
