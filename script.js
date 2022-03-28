//global variables foir the doors/door clicks
let doorImage1 = document.getElementById('door1'); //sets doorImage1 to the door1 img element
let doorImage2 = document.getElementById('door2'); //sets doorImage1 to the door2 img element
let doorImage3 = document.getElementById('door3'); //sets doorImage1 to the door3 img element
let startButton = document.getElementById('start'); //sets startButton to the Good Luck button; clicking should reset the game once win/lose is determined
let wins = document.getElementById('wins'); //used in startRound function to display wins
let losses = document.getElementById('losses'); //used in startRound function to display losses
let streak = document.getElementById('streak'); //used in startRound function to display streaks
let highestStreak = document.getElementById('highStreak'); //will track highest streak
let botDoorPath = './images/robot.svg'; //sets botDoorPath to robot image. Will be used to change image of closed doors in onclick funtions
let beachDoorPath = './images/beach.svg'; //" "
let spaceDoorPath = './images/space.svg'; //" "
let closedDoorPath = './images/closed_door.svg'; //sets var to closed door image, used for the startRound function to reset game
let currentlyPlaying = true; //determines if the player can keep playing or if they've won/lost already
let numWins = 0; //tracks wins
let numLosses = 0; //tracks losses
let numStreak = 0; //tracks streaks
let highStreak = 0; //tracks highest streak


doorImage1.onclick = () => { //opens door one by changing image to new image when clicked
    if (isClicked(doorImage1.src) === false && currentlyPlaying === true) { //checks to see if the door is already clicked and that the player hasn't already won or lost
        doorImage1.src = openDoor1; //sets #doorImage1 to openDoor1
        playDoor(doorImage1.src); //see below in function definition
    }
} 

doorImage2.onclick = () => { //opens door two
    if (isClicked(doorImage2.src) === false && currentlyPlaying === true) {
        doorImage2.src = openDoor2; 
        playDoor(doorImage2.src);
    }
} 

doorImage3.onclick = () => { //opens door three
    if (isClicked(doorImage3.src) === false && currentlyPlaying === true) {
        doorImage3.src = openDoor3; 
        playDoor(doorImage3.src);
    }
} 

startButton.onclick = () => { //this makes it so that clicking #start resets the round if player won or lost
    if (currentlyPlaying === false) {
    startRound();
    }
}

const startRound = () => { //this resets the whole round. 
    doorImage1.src = closedDoorPath; //All doors are set to closed. 
    doorImage2.src = closedDoorPath;
    doorImage3.src = closedDoorPath;
    wins.innerHTML = numWins; //#wins, #losses, and #streak are set to their values in the html.
    losses.innerHTML = numLosses;
    streak.innerHTML = numStreak;
    if (numStreak > highStreak) { //numStreak is checked against highStreak. If higher, than highStreak is reset to numStreak and displayed in html
        highStreak = numStreak;
        highestStreak.innerHTML = highStreak;
    }
    numClosedDoors = 3; //number of closed doors reset back to 3
    startButton.innerHTML = 'Good Luck!'; //start button reset
    currentlyPlaying = true; //currently playing set back to true
    randomChoreDoorGenerator(); //doors are randomly assigned a chore door number
}

const gameOver = status => { //this function ends game and sets playing status to false
    if (status === 'win') {
        numWins++; //updates number of wins
        numStreak++; //updates current streak
        startButton.innerHTML = 'You win! Play again?'; //changes #start to say you win
    } else {
        numLosses++; //updates number of losses
        numStreak = 0; //sets current streak to 0
        startButton.innerHTML = 'Game over! Play again?'; //changes #start to say game over
    }
    currentlyPlaying = false;
    
}

//variables for randomChoreDoorGenerator function
let numClosedDoors = 3;
let openDoor1;
let openDoor2;
let openDoor3;

const randomChoreDoorGenerator = () => { //this function will random generate a "chore door" value that will choose which door hides the robot
    let choreDoor = Math.floor(Math.random()*3); //randomly chooses number between 0, 1, or 2
    console.log(choreDoor); //my little cheat code; lets me see robot's position in console SHHHH!!!
    switch(choreDoor) { //goes through and assigns the bot to door 1, 2, or 3 depending on the random number above
        case 0:
            openDoor1 = botDoorPath;
            openDoor2 = beachDoorPath;
            openDoor3 = spaceDoorPath;
            break;
        case 1:
            openDoor2 = botDoorPath;
            openDoor1 = beachDoorPath;
            openDoor3 = spaceDoorPath;
            break;
        case 2:
            openDoor3 = botDoorPath;
            openDoor1 = beachDoorPath;
            openDoor2 = spaceDoorPath;
            break;
    }
}

const isBot = door => { //this checks to see if the door clicked is the bot. Returns true if it is; used in playDoor()
    if(door.includes("images/robot.svg")) {
        return true;
    } else {
        return false;
    }
}

const isClicked = door => { //checks to make sure that the door clicked isn't already open. Returns false if it's closed. Used in the .onclick functions
    if (door.includes("images/closed_door.svg")) {
        return false;
    } else {
        return true;
    }
}

const playDoor = (door) => { //this function is what determines if the game is over or not.
    numClosedDoors--;
    if (numClosedDoors === 0) { //checks to see if numClosedDoors is 0 and if so, the player wins 
        gameOver('win');
    } else if (isBot(door) === true) { //checks to see if the door that was clicked is the robot. If so, then player loses
        gameOver();
    }
}

startRound(); //starts the round on page load