// VARIABLES
const board = document.getElementById('board');
const body = document.querySelector('body');

//FUNCTIONS

function buildElement (etype,father,text,id,classname,href) { //buid up a function for creating elements with the usual parameters

  const element = document.createElement(etype);

  father.appendChild(element);
  element.textContent = text;
  element.id = id;
  element.className = classname;
  element.href = href;

}

function showElement (element) {

  element.style.display = 'block';

}

function hideElement (element) {

  element.style.display = 'none';

}
// I. -------------------------------------------------When the page loads, the startup screen should appear.------------------------------------------------------------------
//Use the tictactoe-01-start.png mockup, and the start.txt HTML snippet to guide you.
//Creating HTML elements for starts and win

//Creating the sreen-start elements
buildElement('DIV',body,'', "start","screen screen-start");
const screenStart = document.getElementById('start');
buildElement('HEADER',screenStart,'','startheader');
const startheader = document.getElementById('startheader');
buildElement('H1',startheader,'Tic Tac Toe');
buildElement('A',startheader,'Start game','startbutton','button','#');
const startbutton = document.getElementById('startbutton');

window.onload = function () {

        hideElement(board); //hide the board screen

    }
// II. ------------------------When the player clicks the start button the start screen disappears, the board appears, and the game begins  ------------------------------------------

startbutton.addEventListener('click', () => {
    hideElement(screenStart);
    showElement(board);
});
