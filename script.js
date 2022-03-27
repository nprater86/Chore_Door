//global variables foir the doors/door clicks
let doorImage1 = document.getElementById('door1'); //sets doorImage1 to the door1 img element
let doorImage2 = document.getElementById('door2'); //sets doorImage1 to the door2 img element
let doorImage3 = document.getElementById('door3'); //sets doorImage1 to the door3 img element
let startButton = document.getElementById('start');
let wins = document.getElementById('wins');
let losses = document.getElementById('losses');
let streak = document.getElementById('streak');
let botDoorPath = './images/robot.svg'; //sets botDoorPath to robot image
let beachDoorPath = './images/beach.svg';
let spaceDoorPath = './images/space.svg';
let closedDoorPath = './images/closed_door.svg';
let currentlyPlaying = true;
let numWins = 0;
let numLosses = 0;
let numStreak = 0;


doorImage1.onclick = () => {
    if (isClicked(doorImage1.src) === false && currentlyPlaying === true) {
        doorImage1.src = openDoor1; 
        playDoor(doorImage1.src);
    }
} //opens door one by changing image to new image

doorImage2.onclick = () => {
    if (isClicked(doorImage2.src) === false && currentlyPlaying === true) {
        doorImage2.src = openDoor2; 
        playDoor(doorImage2.src);
    }
} //opens door two

doorImage3.onclick = () => {
    if (isClicked(doorImage3.src) === false && currentlyPlaying === true) {
        doorImage3.src = openDoor3; 
        playDoor(doorImage3.src);
    }
} //opens door three

startButton.onclick = () => {
    if (currentlyPlaying === false) {
    startRound();
    }
}

const startRound = () => {
    doorImage1.src = closedDoorPath;
    doorImage2.src = closedDoorPath;
    doorImage3.src = closedDoorPath;
    wins.innerHTML = numWins;
    losses.innerHTML = numLosses;
    streak.innerHTML = numStreak;
    numClosedDoors = 3;
    startButton.innerHTML = 'Good Luck!';
    currentlyPlaying = true;
    randomChoreDoorGenerator();
}

const gameOver = status => {
    if (status === 'win') {
        numWins++;
        numStreak++;
        startButton.innerHTML = 'You win! Play again?';
    } else {
        numLosses++;
        numStreak = 0;
        startButton.innerHTML = 'Game over! Play again?';
    }
    currentlyPlaying = false;
    
}

//variables for randomChoreDoorGenerator function
let numClosedDoors = 3;
let openDoor1;
let openDoor2;
let openDoor3;

const randomChoreDoorGenerator = () => { //this function will random generate a "chore door" value that will choose which door hides the robot
    let choreDoor = Math.floor(Math.random()*3);
    console.log(choreDoor);
    switch(choreDoor) {
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

const isBot = door => {
    if(door.includes("images/robot.svg")) {
        return true;
    } else {
        return false;
    }
}

const isClicked = door => {
    if (door.includes("images/closed_door.svg")) {
        return false;
    } else {
        return true;
    }
}

const playDoor = (door) => {
    numClosedDoors--;
    if (numClosedDoors === 0) {
        gameOver('win');
    } else if (isBot(door) === true) {
        gameOver();
    }
}

startRound();