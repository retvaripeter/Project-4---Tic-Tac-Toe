// VARIABLES
const board = document.getElementById('board');
const body = document.querySelector('body');
const player1Highlight = document.getElementById('player1');
const player2Highlight = document.getElementById('player2');
const ul = document.querySelector('.boxes');
const Boxes = document.querySelectorAll('.boxes .box');
const allBox = [];
let win = false; //this is the status of the game, which now is false => there is no winner yet
let whoTurns = 2;  // if the value is 1, O turns => if 2, x turns
let Onumbers = []; // array which holds, the O's moves as an index value
let Xnumbers = []; // array which holds, the X's moves as an index value
const winNumb = [  // this array holds the winner combinatios (2 diagonal, 3 vertical and 3 horizontal):

[1,2,3],
[4,5,6],
[7,8,9],
[1,4,7],
[2,5,8],
[3,6,9],
[1,5,9],
[7,5,3]

];

// Get all boxelement (li-s) and push it to the array allBox
Boxes.forEach(li=> allBox.push(li));

// put the index of the target event to the index variable
for (let i= 0; i < Boxes.length ; i+=1){

  Boxes[i].onclick = function (){
    const index = allBox.indexOf(this);

      if (whoTurns === 1){ // if O turns, push the index to the O busket
        Onumbers.push(index+1);

      } else { // if not push the index value to the X busket
        Xnumbers.push(index+1);

      }
  }
}

//FUNCTIONS

function buildElement (etype,father,text,id,classname,href) { //buid up a function for creating elements with the usual parameters

  const element = document.createElement(etype); // the element type we create is flexible

  father.appendChild(element); //parent is also flexible
  element.textContent = text; // text is flexible too
  element.id = id; // you can add id
  element.className = classname; // you can add classname to the element
  element.href = href; //also possible to add href

}
function showElement (element) { //display the element

  element.style.display = 'block';

}
function hideElement (element) { //hide the element

  element.style.display = 'none';

}

function addNumber () {

  player.push(event.target);

}


// With this function we make the O and X alternates. With the mouseclick we generate the turns and change the whoTurns variable at the top.
// With mouseover and out we higlighted the possible choices for the player who turns, but just for the empty boxes!
function highlightOrNot (element, eventlistener){
  // O is turning --- EVENT IS MOUSEOVER OR MOUSEOUT

  element.addEventListener(eventlistener, (event) => {

    if (event.target.className ==='box' ){ //check if the box is empty (=> the classname is not box filled 1 or 2)

        if (whoTurns === 1 && eventlistener === 'mouseover') {
          event.target.style.backgroundImage = "url(img/o.svg)"; //if O turns and the event is mousover fill the box with o.svg
        }
        if (whoTurns === 1 && eventlistener === 'mouseout') { //if O turns and the event is mouseout clear the box
          event.target.style.backgroundImage = "";
        }
    }
  //EVENT IS CLICK

    if (whoTurns === 1 && eventlistener === 'click') {
      //add element to the proper busket

      //check that the box is empty or note
      if (event.target.className === 'box'){
        event.target.className = 'box box-filled-1'; //make the box O marked
            player2.className = 'players active'; //make the player2 highlighted at the top corner
            player1.className = 'players'; //unhighlight player 1
            whoTurns = 2; // alternates the turn varible to X

      }
    }

    //X is turning ------- EVENT IS MOUSEOVER OR MOUSEOUT
     if (event.target.className ==='box' ){ //check if the box is empty (=> the classname is not box filled 1 or 2)

         if (whoTurns === 2 && eventlistener === 'mouseover') { //if X turns and the event is mousover fill the box with o.svg
          event.target.style.backgroundImage = "url(img/x.svg)";
        }
         if (whoTurns === 2 && eventlistener === 'mouseout') { //if X turns and the event is mouseout clear the box
          event.target.style.backgroundImage = "";
        }
      }
    //EVENT IS CLICK

     if (whoTurns === 2 && eventlistener === 'click') {
      //check that the box is empty or note
      if (event.target.className ==='box' ){
        event.target.className = 'box box-filled-2'; //make the box O marked

        player1.className = 'players active'; //make the player1 highlighted at the top corner
        player2.className = 'players'; //unhighlight player 2
        whoTurns = 1; // alternates the turn varible to X
    }

  }

  });

}
// 0. ------------------------------------------------------------Before the program starts.-----------------------------------------------------------------------------------
//Creating HTML elements for starts and win

//Creating the sreen-start elements
buildElement('DIV',body,'', "start","screen screen-start");
const screenStart = document.getElementById('start');
buildElement('HEADER',screenStart,'','startheader');
const startheader = document.getElementById('startheader');
buildElement('H1',startheader,'Tic Tac Toe');
buildElement('A',startheader,'Start game','startbutton','button','#');
const startbutton = document.getElementById('startbutton');

// I. -------------------------------------------------When the page loads, the startup screen should appear.------------------------------------------------------------------
window.onload = function () {
        hideElement(board); //hide the board screen
    }

// II. --------------------------When the player clicks the start button the start screen disappears, the board appears, and the game begins  ------------------------------------------
startbutton.addEventListener('click', () => {
    hideElement(screenStart); //hide the startscreen
    showElement(board); //unhide the board screen
    player1.className = 'players active'; //make the player1 highlighted
    whoTurns = 1;
});

// III. -----------------------------------------------------------------  GAME BEGINS :)  --------------------------------------------------------------------------------------------

// GAME START player1 turns
  //make the O sign highlighted at the top of the page - Already did in the previous section
  //make the box higlighted with the actual player
highlightOrNot(ul, 'mouseover');
highlightOrNot(ul, 'mouseout');
  //fill the box with the actual player's svg
highlightOrNot(ul, 'click');

// IV. -----------------------------------------------------------------  GAME ENDING  --------------------------------------------------------------------------------------------

for (let i= 0; i < winNumb.length; i+=1) {

const checkWin = arrO.concat(coolNum[i]).filter(function(number,index,array){

  return index !== array.indexOf(number);
});

  if (checkWin.length === 3){
    console.log(`Kiraly vagy Istenem a nyeroszamaid most ezek: ${unique}`);
    win = true;
    break;
  }
}

if (win === false) {
console.log('Sajnalom de nem nyertel');
}
