// Hent DOM-element
const gameBoard = document.getElementById("gameBoard");
const restartBtn = document.getElementById("restartBtn");

// Unike kortverdier – her bruker vi bokstavar. Du kan erstatte med bilete om ønskje.
const kortVerdier = ["A", "B", "C", "D", "E", "F", "G", "H"];
// Dupliser lista for å lage par
let kortArray = [...kortVerdier, ...kortVerdier];

// Variablar for spel-logikken
let firstCard = null;
let secondCard = null;
let preventClick = false;
let matchesFound = 0;

// Bland array med Fisher-Yates algoritme
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Opprett brettet for spelet
function createBoard() {
  gameBoard.innerHTML = "";
  matchesFound = 0;
  firstCard = null;
  secondCard = null;
  preventClick = false;
  
  // Bland korta
  shuffle(kortArray);
  
  // Lag eit DOM-element for kvart kort
  kortArray.forEach(value => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = value;
    
    // Opprett container for 3D-effekten
    const cardInner = document.createElement("div");
    cardInner.classList.add("card-inner");
    
    // Forsida (usnu) – viser "?"
    const cardFront = document.createElement("div");
    cardFront.classList.add("card-front");
    cardFront.textContent = "?";
    
    // Bakside – viser innhaldet (bokstaven)
    const cardBack = document.createElement("div");
    cardBack.classList.add("card-back");
    cardBack.textContent = value;
    
    // Sett saman strukturen
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    gameBoard.appendChild(card);
    
    // Legg til klikk-event for kortet
    card.addEventListener("click", () => flipCard(card));
  });
}

// Funksjon for å snu eit kort
function flipCard(card) {
  if (preventClick) return;
  if (card.classList.contains("flipped")) return;
  
  card.classList.add("flipped");
  
  if (!firstCard) {
    firstCard = card;
  } else if (!secondCard) {
    secondCard = card;
    preventClick = true;
    
    // Sjekk om korta har same verdi
    if (firstCard.dataset.value === secondCard.dataset.value) {
      matchesFound++;
      resetTurn();
      // Dersom alle par er funne, vis gratulasjonsmelding
      if (matchesFound === kortVerdier.length) {
        setTimeout(() => alert("Gratulerer! Du har vunnet!"), 500);
      }
    } else {
      // Vent litt, så snur vi korta tilbake dersom dei ikkje er like
      setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        resetTurn();
      }, 1000);
    }
  }
}

// Nullstill variablane for neste trekk
function resetTurn() {
  firstCard = null;
  secondCard = null;
  preventClick = false;
}

// Event-lyttar for "Start på nytt"-knappen
restartBtn.addEventListener("click", createBoard);

// Start spelet
createBoard();
