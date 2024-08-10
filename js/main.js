const buttons = document.querySelectorAll('.buttons button');
const hang = document.querySelectorAll('.hang');
const ul = document.querySelector('ul');
const question = document.querySelector(".question");
const container = document.querySelector(".container");
let questions = {};
let j = 0;
let k = 5;
let co = 0;
const arr = [];
const arrAnswers = [];
const h1 = document.querySelector("h1");
function hangQuestion(ques){
    const random = parseInt(Math.random() * ques.length);
    const question1 = ques[random].question;
    const answer = ques[random].answer;
    ques.splice(random,1);
    const h3 = document.createElement("h2");
    h3.textContent = question1;
    question.appendChild(h3);
    for(let i = 0;i < answer.length;i++){
        const li = document.createElement('li');
        ul.appendChild(li);
    }
    const lis = document.querySelectorAll("li");

buttons.forEach(button =>{
    button.addEventListener('click', function(){
        if(k > 10) return;
            let conf = false;
            if(!(arr.includes(button.textContent)) && !(arrAnswers.includes(answer))){
                    for(let i = 0;i < answer.length;i++){
                        if(button.textContent === answer[i].toUpperCase()){
                            lis[i].textContent = button.textContent;
                            arr.push(button.textContent);
                            j++;
                            conf = true;
                            button.classList.add("disabled");
                        }
                    }
                    if(!conf){
                        hang[k].classList.remove("disappear");
                        k++;
                    }
                    if(k == 11){
                        const span = document.createElement("span");
                        createStyle(span);
                        span.textContent = 'Restart';
                        span.onclick = function(){
                            clickRestart();
                        }
                        container.appendChild(span);
                        NextOrRestart(span,answer);
                        question.remove();
                        buttons.forEach(button => {
                            button.remove();
                        })
                        ul.remove();
                        for(let i = 5;i < k;i++){
                            hang[i].style = `border-color:red; background-color:red;`
                        }
                        h1.textContent = `You Lose The Game 😔`;
                        const content = document.querySelector('.content');
                        content.style = `justify-content:center`
                        co = 0;
                    }else if(j == answer.length){
                        confirmAnswer(answer);
                    }
            }
    })
})
}

function clickRestart(){
    location.reload();
}


function confirmAnswer(ans){
    const span = document.createElement("span");
    createStyle(span);
    span.textContent = "Next";
    container.appendChild(span);
    NextOrRestart(span,ans);
}

function NextOrRestart(span,answer){
        span.addEventListener("click",function(){
            if(span.textContent == 'Next'){
                co++;
            }
            if(co === 10){
                document.body.innerHTML = `<h1>You Win The Game 🎊</h1>`;
                const sp = document.createElement("span");
                sp.textContent = 'Restart';
                createStyle(sp);
                sp.onclick = function(){
                    clickRestart();
                }
                document.body.appendChild(sp);
            }else{
                for(let i = 0;i < j;i++){
                    arr.shift();
                }
                question.innerHTML = `<h2>Question:</h2>`;
                ul.textContent = '';
                j = 0;
                k = 5;
                for(let i = k;i < 11;i++){
                    hang[i].classList.add("disappear");
                }
                arrAnswers.push(answer);
                hangQuestion(questions);
                span.remove();
                buttons.forEach(but => {
                    but.classList.remove("disabled");
                })
            }
        })
}

function createStyle(span){
    span.style =`box-shadow: black 0px 0px 10px;
                padding: 10px 15px;
                color: white;
                border-radius: 5px;
                cursor: pointer;
                margin: 10px auto;
                display: block;
                width: fit-content;`;
}


fetch("js/main.json").then(response => response.json()).then(data =>{
    questions = data.questions;
    hangQuestion(questions);
})