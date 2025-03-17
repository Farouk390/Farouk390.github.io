let text="Velkommen";
let firstname = prompt("Skriv inn Navne ditt");
console.log(text +", "+ firstname);




function setHeading(){
    let firstname = document.getElementById("firstname"); 
    let heading = document.getElementById("heading"); 
    heading.innerText = "Velkommen, " + firstname.value; 
    heading.style.color = "Red";
    heading.style.backgroundColor = "blue";
    heading.style.fontFamily = "sans-serif";
    heading.style.fontSize = "50px";
} 

let container = document.getElementById("container"); 
container.style.backgroundColor = "Blue";
container.style.color ="green";
heading.style.backgroundColor = "blue";
heading.style.fontFamily = "sans-serif";
heading.style.fontSize = "50px";
    