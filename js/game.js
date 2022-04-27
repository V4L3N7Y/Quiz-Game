const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

///finally reparat o eroare de la o simpla virgula 
let questions = [

    {
        question: "Inside which HTML elemrnt do we put the JavaScript?",
        choice1: "<script>",
        choice2: "<javascript>",
        choice3: "<js>",
        choice4: "<scripting>",
        answer: 1
    },

    {
        question: "AAAAAAAAAAAAA",
        choice1: "asasasa",
        choice2: "ssss",
        choice3: "dddd",
        choice4: "fewef",
        answer: 1
    },

    {
        question:
            "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script src='xxx.js'>",
        choice3: "<script file='xxx.js'>",
        choice4: "<script scr='xxx.js'>",
        answer: 2
    },

    {
        question: "How do you write 'Hello World' in an alert box?",
        choice1: "msgBox(Hello World);",
        choice2: "alertBox(Hello World);",
        choice3: "msg(Hello World);",
        choice4: "alert(Hello World);",
        answer: 4
    },
    
];

const CORECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    // console.log(availableQuestions);
    getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length == 0 || questionCounter > MAX_QUESTIONS){
      //go to the end page
      //return window.location.assign('./end.html');
     console.log("e gata nu mai e!");
  }

    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    //imi arata undefined la text din paragrafe
    console.log({choices});
    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
        console.log({choice})
    });

   /* let numberOfParagraph = 1;
    choices.forEach((choice) => {
        console.log(choice)
        var paragraph = document.getElementsByTagName("p")[numberOfParagraph];
        var idOfParagraph = paragraph.id;
        choice.innerText = currentQuestion[idOfParagraph];
        numberOfParagraph = numberOfParagraph + 2;
    });*/

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        // console.log(choice);
        getNewQuestion();
       
    });
});

startGame(); 