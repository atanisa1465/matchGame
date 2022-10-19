moves = document.getElementById("moves-count");
timeValue = document.getElementById("time");
startButton = document.getElementById("start");
stopButton = document.getElementById("stop");
gameContainer = document.querySelector(".game-container");
result = document.getElementById("result");
controls = document.querySelector(".controls-container");

let cards;
let interval;
let firstCard = false;
let secondCard = false;

//Images
items = [
  { name: "one", image: "images/1.png" },
  { name: "two", image: "images/2.png" },
  { name: "three", image: "images/3.png" },
  { name: "four", image: "images/4.png" },
  { name: "five", image: "images/5.png" },
  { name: "six", image: "images/6.png" },
  { name: "seven", image: "images/7.png" },
  { name: "eight", image: "images/8.png" },
];

movesCount = 0,
winCount = 0;

movesCounter = () => {
  movesCount += 1;
  moves.innerHTML = `<span>Clicks: </span>${movesCount}`;
};

generateRandom = (size = 4) => {
  let tempArray = [...items];
  let cardValues = [];
  size = (size * size) / 2;
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    tempArray.splice(randomIndex, 1);
  } return cardValues;
};

matrixGenerator = (cardValues, size = 4) => {
  gameContainer.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];
  cardValues.sort(() => Math.random() - 0.5);
  for (let i = 0; i < size * size; i++) {
    gameContainer.innerHTML += `
     <div class="card-container" data-card-value="${cardValues[i].name}">
        <img class="card-before" src ="images/back.jpg"/>
        <div class="card-after">
        <img src="${cardValues[i].image}" class="image"/></div>
     </div> `;
  }

  gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;
  cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      if (!card.classList.contains("matched")) {
        card.classList.add("flipped");
        if (!firstCard) {
          movesCounter();
          firstCard = card;
          firstCardValue = card.getAttribute("data-card-value");
        } else {
          movesCounter();
          secondCard = card;
          let secondCardValue = card.getAttribute("data-card-value");
          if (firstCardValue == secondCardValue) {
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            firstCard = false;
            winCount += 1;
            if (winCount == 8) {
              console.log("WINNER");
              //------
              //WORK HERE
              result.innerHTML = `<h2>You Won</h2> <h4>Clicks: ${movesCount}</h4>`;
              // stopGame();
              controls.classList.remove("hide");
    stopButton.classList.add("hide");
    clearInterval(interval);
              //-----
            }
          } else {
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 900);
          }
        }
      }
    });
  });
};


//Reset game
stopButton.addEventListener(
  "click",
  
  (stopGame = () => {
    
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    clearInterval(interval);
    initializer();
  } )
);

const initializer = () => {
  movesCount = 0;
  seconds = 0;
  minutes = 0;
  controls.classList.add("hide");
  moves.innerHTML = `<span>Clicks:</span> ${movesCount}`;
  
  result.innerText = "";
  winCount = 0;
  let cardValues = generateRandom();
  console.log(cardValues);
  matrixGenerator(cardValues);
};
