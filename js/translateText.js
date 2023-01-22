////////////////////NEXT TIME//////////////////////////////





let titleGame = document.querySelector("h1").innerText;
const selectTag = document.querySelectorAll("select");
const buttonTag = document.querySelector("button");



// selectTag.forEach((tag, id)=> {
//     for (const country_code in countries) {
//         let selected;
//          if(id == 0 && country_code == "ro-RO") {
//             selected = "selected";
//         }
        
//         let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
//         tag.insertAdjacentHTML("beforeend", option); //adding options tag inside select tag
//         console.log(option)  
//     }
  

// });

// translate = selectTag.value;
// console.log(titleGame)

// console.log(buttonTag)
// buttonTag.addEventListener("click", () => {
//     let text = titleGame;
//     console.log(text);
    
//     let apiUrl = `https://api.mymemory.translated.net/get?q=${titleGame}&langpair=en-GB|ro-RO`;
//     fetch(apiUrl).then(res => res.json()).then(data => {        
//         console.log(data);
//     })
// })

let apiUrl = `https://api.mymemory.translated.net/get?q=${titleGame}&langpair=en-GB|ro-RO`;
    fetch(apiUrl).then(res => res.json()).then(data => {        
        titleGame = data.responseData.translatedText
        console.log(titleGame)
    })


   


////////////////////NEXT TIME//////////////////////////////
