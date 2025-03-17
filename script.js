// Hent referanser til DOM-elementene
const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');
const spinBtn = document.getElementById('spinBtn');
const addOptionBtn = document.getElementById('addOptionBtn');
const newOptionInput = document.getElementById('newOption');

// Startliste med standardalternativer (tal 1 - 10)
let options = ['1','2','3','4','5','6','7','8','9','10'];

/**
 * Når pilen er nederst (klokka 6):
 * - I canvas er 0 radianer mot høyre (klokka 3).
 * - For at alternativ 0 skal vises nederst, setter vi initialAngle til π/2 (90°).
 */
const initialAngle = Math.PI / 2;
let currentRotation = initialAngle;
let spinning = false;

const canvasSize = 400;
const centerX = canvasSize / 2;
const centerY = canvasSize / 2;
const radius = canvasSize / 2;

/**
 * Funksjon for å tegne hjulet
 */
function drawWheel() {
  const numOptions = options.length;
  const arc = 2 * Math.PI / numOptions;
  ctx.clearRect(0, 0, canvasSize, canvasSize);
  
  // Tegn hver sektor
  for (let i = 0; i < numOptions; i++) {
    const angle = currentRotation + i * arc;
    
    // Varierte bakgrunnsfarger for hver sektor
    ctx.fillStyle = i % 2 === 0 ? '#FFCDD2' : '#E1BEE7';
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, angle, angle + arc, false);
    ctx.closePath();
    ctx.fill();
    
    // Skriv teksten i midten av sektoren
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(angle + arc / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#000";
    ctx.font = "bold 18px sans-serif";
    ctx.fillText(options[i], radius - 10, 10);
    ctx.restore();
  }
}

/**
 * Funksjon for å spinne hjulet med animering
 */
function spinWheel() {
  if (spinning) return;
  spinning = true;
  
  const spinTimeTotal = 6000; // Spinn i 6 sekunder
  const spinStartTime = performance.now();
  
  // Bestem et tilfeldig antall grader: minst 4 fulle omdreininger + litt ekstra
  const randomSpin = Math.random() * 360 + 360 * 4;
  const randomSpinRad = randomSpin * Math.PI / 180;
  
  function animate(currentTime) {
    const elapsed = currentTime - spinStartTime;
    if (elapsed < spinTimeTotal) {
      const t = elapsed / spinTimeTotal;
      const easedT = easeOut(t);
      currentRotation = initialAngle + randomSpinRad * easedT;
      drawWheel();
      requestAnimationFrame(animate);
    } else {
      spinning = false;
      currentRotation = initialAngle + randomSpinRad;
      drawWheel();
      findWinner();
    }
  }
  
  requestAnimationFrame(animate);
}

/**
 * Utregning av vinner (for pil plassert nederst)
 * 
 * Siden vi setter initialAngle = π/2, vil alternativ 0 være plassert i retning
 * av 90° (bunnen). I canvas er 0° mot høyre (klokka 3).
 * For å finne riktig sektor, konverterer vi rotasjonsvinkelen til grader,
 * trekker fra 90° slik at bunnen blir 0°, og deler med sektorbredden.
 */
function findWinner() {
  let finalDeg = (currentRotation * 180 / Math.PI) % 360;
  if (finalDeg < 0) finalDeg += 360;
  
  // Juster for at bunnen (pilens retning) skal være 0°
  let effectiveDeg = (finalDeg - 90 + 360) % 360;
  
  const arcDeg = 360 / options.length;
  let winningIndex = Math.floor(effectiveDeg / arcDeg);
  
  // Hvis rekkefølgen virker speilvendt, kan du eventuelt speilvende indeksen:
  // winningIndex = (options.length - 1 - winningIndex) % options.length;
  
  alert('Vinnar: ' + options[winningIndex]);
}

/**
 * Easing-funksjon (easeOutCubic)
 */
function easeOut(t) {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Funksjon for å legge til et nytt alternativ
 */
function addOption() {
  const newValue = newOptionInput.value.trim();
  if (newValue) {
    options.push(newValue);
    newOptionInput.value = '';
    drawWheel();
  }
}

// Legg til event-lyttere
spinBtn.addEventListener('click', spinWheel);
addOptionBtn.addEventListener('click', addOption);

// Tegn hjulet initialt
drawWheel();
