const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore"); //api


const highScores  = JSON.parse(localStorage.getItem("highScores")) || [];
console.log(highScores);

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () =>{
    saveScoreBtn.disabled =!username.value;
})


saveHighScore = e => {
   
    e.preventDefault()

const score = {
    score: Math.floor(Math.random() * 100),
    name: username.value
};

highScores.push(score);
highScores.sort((a,b) => b.score - a.score) //sorteaza scorul in ordine descrescatoare
highScores.splice(5); //cate persoane sa se afiseze la scor

localStorage.setItem("highScores", JSON.stringify(highScores));
window.location.assign("/home.html"); 
};