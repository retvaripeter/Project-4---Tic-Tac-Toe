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

Boxes.forEach(li=> allBox.push(li));

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

function checkDraw (){ //this function helps to decide it the ending game

 let drawArr = []; //creates an empty array which will holds all the non-empty boxes

 allBox.forEach(box =>  { //iterate all elements/boxes

  if (box.className !== 'box'){ //if the box is filled then put it to the darArr array

      drawArr.push(box);
  }
  if (drawArr.length === 9 && win === false){ // draw => all box are filled and the nobody has 3 similar symbol in a row or in diagonal
    hideElement(board);
    showElement(screenWin);
    screenWin.className = "screen screen-win screen-win-tie"; //add the draw css style to the screenWin
    messageP.textContent = `It's a Tie`; // add message with changing the textcontent of the P element which we already created
    drawArr.length = 0; //when it comes to new game it will be empty again

  }

});

}
function WinCheck (playerNumber) { //create a function for helps track the winner numbers of all player
  // winNUmb is the winner combinations on the board => each element in this array is a winner combination from 3 numbers which represents where is the click located
  //playerNumber is the variable which collets the moves for both player
  //checkWin is the final array which will holds the filtered numbers of the player moves

  for (let i= 0; i < winNumb.length; i+=1) {

  const checkWin = playerNumber.concat(winNumb[i]).filter(function(number,index,array){

    return index !== array.indexOf(number); // here we filtered for only the duplicates because if we concat the actual playermoves with the winner combinations, the duplicated values
    // will show as that the player has the same winner numbers or not
  });

    if (checkWin.length === 3){ //if there is 3 duplicated value after the concat, it means that the current player has won the game
      win = true; //set the gamestatus to win
      if (playerNumber === Onumbers){
        hideElement(board);
        showElement(screenWin);
        screenWin.className = "screen screen-win screen-win-one"; //change the screen with the css of win one by rewrite the classname with JS
        messageP.textContent = 'Winner';
      }
      if (playerNumber !== Onumbers){
        hideElement(board);
        showElement(screenWin);
        screenWin.className = "screen screen-win screen-win-two"; //change the screen with the css of win two by rewrite the classname with JS
        messageP.textContent = 'Winner';
      }
      break;
    }
  }

}

function newGame () { //it is only activated when the newgame button is clicked by the user

hideElement(screenWin);
showElement(board);
whoTurns = 1; // player O starts again
win = false; // set the gamestatus again
player1.className = 'players active'; //make the player1 highlighted at the top corner
player2.className = 'players'; //make the player2 unhighlighted at the top corner
//remove the highlight from the checkboxes:
allBox.forEach(box => box.className = 'box');
allBox.forEach(box => box.style.backgroundImage = '');
//reset all variables,arrays
Onumbers.length = 0;//set the Onumbers array to zero
Xnumbers.length = 0;//set the Onumbers array to zero

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

  //EVENT IS CLICK

    if (whoTurns === 1 && eventlistener === 'click') {

       //add the usermove to the proper Y  basket array

      const index = allBox.indexOf(event.target); //put the index of the target event to the index variable

            Onumbers.push(index+1); // push the index +1 to the O busket

      //check that the box is empty or note
      if (event.target.className === 'box'){
        event.target.className = 'box box-filled-1'; //make the box O marked
        //check for draw
        checkDraw();
        //check for winners
        WinCheck(Onumbers);
            player2.className = 'players active'; //make the player2 highlighted at the top corner
            player1.className = 'players'; //unhighlight player 1
            whoTurns = 2; // alternates the turn varible to X

      }
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

    //EVENT IS CLICK

     if (whoTurns === 2 && eventlistener === 'click') {

         //add the usermove to the proper X basket array

         const index = allBox.indexOf(event.target); //put the index of the target event to the index variable

               Xnumbers.push(index+1); // push the index +1 to the X busket

        //check that the box is empty or note
        if (event.target.className ==='box' ){
          event.target.className = 'box box-filled-2'; //make the box O marked
          //check for draw
          checkDraw();
          //check for winners
          WinCheck(Xnumbers);

          player1.className = 'players active'; //make the player1 highlighted at the top corner
          player2.className = 'players'; //unhighlight player 2
          whoTurns = 1; // alternates the turn varible to X
      }

    }
}
  });

}
// 0. ------------------------------------------------------------Before the program starts.-----------------------------------------------------------------------------------
//Creating HTML elements for starts and win

//Creating the sreen-start elements
buildElement('DIV',body,'', "start","screen screen-start"); // you can find the properties meaning at the build element function on line: 28
const screenStart = document.getElementById('start');
buildElement('HEADER',screenStart,'','startheader');
const startheader = document.getElementById('startheader');
buildElement('H1',startheader,'Tic Tac Toe');
buildElement('A',startheader,'Start game','startbutton','button','#');
const startbutton = document.getElementById('startbutton');
//Creating the winning-screen elements
buildElement('DIV',body,'', "finish","screen screen-win");
const screenWin = document.getElementById('finish');
buildElement('HEADER',screenWin,'','winheader');
const winHeader = document.getElementById('winheader');
buildElement('H1',winHeader,'Tic Tac Toe');
buildElement('P',winHeader,'','Pmessage','message');
const messageP = document.getElementById('Pmessage');
buildElement('A',winHeader,'New game','newgamebutton','button','#');
const newGameButton = document.getElementById('newgamebutton');

newGameButton.addEventListener('click', (event)=>{ // add eventlistener to the newGameButton

  newGame();
})

// I. -------------------------------------------------When the page loads, the startup screen should appear.------------------------------------------------------------------

  window.onload = function () {
          hideElement(board); //hide the board screen
          hideElement(screenWin); //hide the win-screen
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

// This code below helps to collect the player's move

// // Get all boxelement (li-s) and push it to the array allBox
// Boxes.forEach(li=> allBox.push(li));
//
// // loop trough all element. If any element from the boxes activated by a click the index of the target will added to the index variable
// for (let i= 0; i < Boxes.length ; i+=1){
//
//
//
//   Boxes[i].addEventListener('click', (event) =>{
//
//   Boxes[i].removeEventListener('click',this);
//
//     const index = allBox.indexOf(event.target); //put the index of the target event to the index variable
//
//       if (whoTurns === 1){ // if O turns, push the index to the O busket
//         Onumbers.push(index+1);
//
//       } else { // if not push the index value to the X busket
//         Xnumbers.push(index+1);
//
//       }
//   });
// }

// IV. -----------------------------------------------------------------  GAME OVER :)  --------------------------------------------------------------------------------------------
