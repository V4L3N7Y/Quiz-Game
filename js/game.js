const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressBarFull = document.getElementById("progressBarFull");
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

///finally reparat o eroare de la o simpla virgula 
/// poti adauga intrebari daca vrei, dar trebuie sa actualizezi numarul de intrebari din variabila "MAX_QUESTIONS"
let questions = [];

//fetch()

fetch("https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple")
  .then(res => {
    return res.json();
})
  .then(loadedQuestions => {
     // questions = loadedQuestions;
      console.log(loadedQuestions.results);
      questions = loadedQuestions.results.map( loadedQuestion => {
          const formattedQuestion = {
              question: loadedQuestion.question 
          };
          const answerChoices  = [ ... loadedQuestion.incorrect_answers]; //raspunsurile incorecte de la opentdb api//
          formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
          answerChoices.splice(formattedQuestion.answer - 1, 0, loadedQuestion.correct_answer);

          answerChoices.forEach((choice, index) => {
              formattedQuestion["choice" + (index + 1)] = choice;
          });
          return formattedQuestion;
      });
     startGame(); 
  })
  .catch(err => {
      console.error(err);
  }); 
  


const CORECT_BONUS = 10;  // puncte pentru fiecare raspuns corect;
const MAX_QUESTIONS = 10; // numarul de intrebari inauntrul array-ului "questions"

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    // console.log(availableQuestions);
    getNewQuestion();
    game.classList.remove("hidden");
    loader.classList.add("hidden");
};

getNewQuestion = () => {
  if (availableQuestions.length == 0 || questionCounter > MAX_QUESTIONS){
      localStorage.setItem('mostRecentScore', score);
//se duce la pagina end.html 
    return window.location.assign('./end.html');
    //console.log("e gata nu mai e!");
  }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
      //Update progress bar
      //console.log(`${(questionCounter / MAX_QUESTIONS) * 100}%`);
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    //imi arata undefined la text din paragrafe
    //update## fixed the undefined - am adaugat o atributa "number" in game.html care sa reprezinte nr paragrafului pentru functia"dataset"  
    console.log({choices});
    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
        console.log({choice})
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        
        const classToApply = selectedAnswer == currentQuestion.answer ?  "correct" : "incorrect";
        if (classToApply === "correct") {
            incrementScore(CORECT_BONUS);
            const audio = new Audio("/audio/correct.mp3"); ///am adaugat un sunet si se activeaza atunci cand raspunzi corect la o intrebare
            audio.play();
        } else {
            const audio = new Audio("/audio/incorrect.mp3"); ///am adaugat un sunet si se activeaza atunci cand raspunzi incorect la o intrebare
            audio.play();
        }

        //culoarea verde pentru raspuns corect
            selectedChoice.parentElement.classList.add(classToApply);
        
        
        ///timp limita 1.5s pentru event; 
        setTimeout(() => {
            //culoarea rosu pentru raspuns incorect
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();

        },1500);        
       
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}
