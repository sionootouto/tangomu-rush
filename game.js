function createCards() {
    const letters = ["t", "a", "n", "g", "o", "m", "u"];
    const shuffledLetters = [...letters];

    for (let i = shuffledLetters.length - 1; i >= 0; i--) {
        let random = Math.floor(Math.random() * (i + 1));
        let tmp = shuffledLetters[random];
        shuffledLetters[random] = shuffledLetters[i];
        shuffledLetters[i] = tmp;
    }

    const board = document.getElementById("letterBoard");
    board.textContent = "";

    for (let i = 0; i < letters.length; i++) {
        const card = document.createElement("button");

        card.textContent = shuffledLetters[i];
                
        card.onclick = function() {
            if (gameEnded) {
                return;
            } else {
                const tapped = shuffledLetters[i]
                    
                document.getElementById("tappedLetter").textContent = tapped;

                if (tapped === letters[nextLetterIndex]) {
                    nextLetterIndex++; 

                    if (nextLetterIndex === letters.length) {
                        board.removeChild(card);
                        document.getElementById("sequenceMessage").textContent = "1セット完成！";
                        nextLetterIndex = 0;
                        score++;
                        document.getElementById("score").textContent = score;
                        createCards();
                    } else {
                        document.getElementById("sequenceMessage").textContent = 
                            "正解！次は「" + letters[nextLetterIndex] + "」";
                        card.classList.add("correct");

                        card.addEventListener("transitionend", function() {
                        board.removeChild(card);
                        });
                    }
                } else {
                    if (timeLeft > 0) {
                      document.getElementById("sequenceMessage").textContent =
                          "順番ちがう！次は「" + letters[nextLetterIndex] + "」";
                      timeLeft = timeLeft - 1;
                      document.getElementById("timer").textContent = timeLeft;  
                      if (timeLeft <= 0) {
                          endGame();
                      }
                    }
                }
                    
            }
        };
                
        board.appendChild(card);
                
    }
}
        

let nextLetterIndex = 0;
let score = 0;
let timeLeft = 60;
let countdown;
let gameEnded = false; /*ゲームが終わってなければfalse, 終わってたらtrue*/

function endGame() {
    if (!gameEnded) {
        gameEnded = true;
        clearInterval(countdown);
        document.getElementById("startButton").disabled = false;
        alert("時間切れ！");
    }
}
        
function startGame() {
    document.getElementById("startButton").disabled = true;
    nextLetterIndex = 0;
    score = 0;
    timeLeft = 60;
    gameEnded = false;
    document.getElementById("score").textContent = score;
    createCards();

    document.getElementById("timer").textContent = timeLeft;

    countdown = setInterval(function() {
        timeLeft = timeLeft - 1;

        if (timeLeft < 0) {
            timeLeft = 0;
        }

        document.getElementById("timer").textContent = timeLeft;
        if (timeLeft <= 0) {
            endGame();
        }
                
    }, 1000);

}

