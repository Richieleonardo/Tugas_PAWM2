import { levels } from "./levels.mjs";

//RETRIEVE USER DATA IN LOCAL STORAGE
const userID = localStorage.getItem('userID');
const userName= localStorage.getItem('username');
let userlevel = Number(localStorage.getItem('level'));
//Make level span 
const divleft = document.querySelector('#left-side');
const divLevel = document.querySelector('#left-side .header .level');
const levelSpan = document.createElement("span");
levelSpan.innerText = "Level";
levelSpan.className = "level-indicator";



//Description for level
const description = document.createElement("p");
description.className = "description";
description.innerText = "Berikut merupakan tempat untuk meletakkan deskripsi dari tiap level";
divleft.appendChild(description);

//Code editor for user to input
const codeblock = document.createElement("div");
codeblock.className = "code-editor";

const dummyNavbar = document.createElement("nav");
dummyNavbar.className = "file-name"
dummyNavbar.innerText = "main.js";
codeblock.appendChild(dummyNavbar);
divleft.appendChild(codeblock);

function storeTextAreaInput() {
    let val = textArea;
    console.log(val);
}


const textArea = document.createElement("textarea");
textArea.id = "code-input";
textArea.oninput = "storeTextAreaInput()"
textArea.placeholder = "Type your code...";
textArea.spellcheck = false;
codeblock.appendChild(textArea);

//IMPORTANT FOR EACH LEVEL
const beforeArea = document.createElement("p");
beforeArea.id = "before-template";
beforeArea.innerText = "ini text sebelum text textArea";
codeblock.insertBefore(beforeArea, textArea);

const afterArea = document.createElement("p");
afterArea.id = "after-template";
afterArea.innerText = "}";
codeblock.appendChild(afterArea);

const divButton = document.createElement("div");
divButton.className = "button-container";
codeblock.appendChild(divButton);

const childDivButton1 = document.createElement("div");
childDivButton1.className = "button-container-kiri";
divButton.appendChild(childDivButton1); 

const childDivButton2 = document.createElement("div");
childDivButton2.className = "button-container-kanan";
divButton.appendChild(childDivButton2); 

//Make button to go to next level
const button1 = document.createElement("button");
button1.className = "next-level";
button1.innerText = "Next";
button1.disabled = true;

//Make button to submit the code created by user
const button2 = document.createElement("button");
button2.className = "submit";
button2.innerText = "Submit";
childDivButton1.appendChild(button2);

const button3 = document.createElement("button");
button3.className = "reset";
button3.innerText = "Reset";
childDivButton2.appendChild(button3)
childDivButton2.appendChild(button1);

button3.addEventListener('click', function() {
    location.reload();
});


/* GAME LOGIC */

//Canvas for animation (gameplay logic)
const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d"); //Canvas context
canvas.style.background = "black";
canvas.width = 64*10;
canvas.height= 64*10;


class Boundary{
    static width = 64;
    static height = 64;
    constructor({position, image}, type) {
        this.position = position;
        this.width = 64;
        this.height = 64;
        this.image = image;
        this.type = type;
    }

    draw() {
        if(this.image == null){ //not working remove morning
            ctx.fillStyle = "blue";
            ctx.fillRect(this.position.x, this.position.y, 
                this.width, this.height);
        }
        else{
            ctx.drawImage(this.image, this.position.x, this.position.y, 64, 64);
        }
        
    }
}

//Crate Player
class Player{
    constructor({position, targetPosition, velocity}) {

        this.position = position;
        this.targetPosition = targetPosition;
        this.velocity = velocity;
        this.radius = 20;
        this.energy = 0;
        this.moving = false;
        this.movementQueue = [];
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, 
                this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "yellow";
        ctx.fill();
        ctx.closePath();
    }
    
    update() {
        this.draw();
        // console.log("ble")
        if (this.moving) {
            // Move horizontally
            if (this.velocity.x !== 0) {
                if (Math.abs(this.targetPosition.x - this.position.x) <= Math.abs(this.velocity.x)) {
                    this.position.x = this.targetPosition.x; // Snap to target
                    this.velocity.x = 0; // Stop horizontal movement
                } else {
                    this.position.x += this.velocity.x; // Continue moving
                }
            }
    
            // Move vertically
            if (this.velocity.y !== 0) {
                if (Math.abs(this.targetPosition.y - this.position.y) <= Math.abs(this.velocity.y)) {
                    this.position.y = this.targetPosition.y; // Snap to target
                    this.velocity.y = 0; // Stop vertical movement
                } else {
                    this.position.y += this.velocity.y; // Continue moving
                }
            }
    
            // Check if both velocities are zero (meaning the player has reached the target)
            if (this.velocity.x === 0 && this.velocity.y === 0) {
                this.moving = false; // Allow the player to move again
                processNextMove(); // Start the next move if available
            }
        }
    }

    setEnergy(value){
        this.energy = value;
        console.log("This energy", this.energy);
    }
}

//Collectible for conditional
class Pellet{
    constructor({position}) {
        this.position = position;
        this.radius = 10;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, 
                this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    }
}


const pellets = []
const boundaries = [];
window.player = new Player({
    position: {
        x: 0,
        y: 0
    },
    targetPosition: {
        x: (Boundary.width) + Boundary.width/2,
        y: (Boundary.height*2) + Boundary.width/2
    },
    velocity: {
        x: 0,
        y: 0
    }
});


const energyCount = document.createElement("p");
energyCount.innerText = "Initial Energy = " + player.energy;
divleft.insertBefore(energyCount, codeblock);
energyCount.style.fontSize = "1.25em";
energyCount.style.fontWeight = "bold";

function createImage(src){
    const image = new Image();
    image.src = src;
    return image;
}

//Draw map (FIRST LEVEL)
console.log("user level " , userlevel);
let idx = userlevel - 1;
let currlevel = levels[idx]; //Initial level
button1.addEventListener('click', async function (){
    //UPDATE LEVEL
    const userId = userID;  // The user's ID (replace with dynamic value)
    const newLevel = userlevel;  // The new level (this can come from a form or input)

    try {
    // Make the PUT request to the Express API
    const response = await fetch(`/user/${userId}/level`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ level: newLevel }),  // Send the new level in the body
    });

    // Handle the response
    const data = await response.json();

    if (response.ok) {
        console.log('Level updated:', data);
        idx = newLevel;
        // Optionally, update the UI to reflect the new level
    } else {
        console.error('Error:', data.error);
    }
    } catch (error) {
    console.error('Error making the request:', error);
    }
    
    loadLevel(idx);
});

//Counter level 
const levelLabel = document.createElement("span");
levelLabel.className = "levelLabel";
let levelNum = currlevel.levelNumber;

//Change layout
function loadLevel(idx) {
    const existingWinText = divleft.querySelector('#win-text');
    if (existingWinText) {
        existingWinText.remove();
    }
    boundaries.length = 0;
    pellets.length = 0;

    //LAYOUT LEFT-SIDE
    currlevel = levels[idx];
    description.innerHTML = currlevel.description;
    beforeArea.innerText = currlevel.beforetemplate;
    afterArea.innerText = currlevel.aftertemplate;
    
    levelNum = idx+1;
    levelLabel.innerText = " " + levelNum;
    divLevel.appendChild(levelSpan);
    levelSpan.appendChild(levelLabel);
    if(idx+1 === 1){
        player.setEnergy(0);
        energyCount.innerText = "Initial Energy = " + player.energy;
        textArea.value = "//Tulis kodemu disini\n\nmove('right')\nmove('right')";
    }
    if(idx+1 === 2){
        textArea.value = null;
        textArea.style.height = "350px";
        player.setEnergy(100);
        energyCount.innerText = "Initial Energy = " + player.energy;
    }
    currlevel.map.forEach((row, i) => {
        row.forEach((tileset, j) => {
            switch (tileset){
                case '1':
                    boundaries.push(
                        new Boundary({
                            position: {
                                x: Boundary.width * j,
                                y: Boundary.height * i
                            },
                            image: createImage('./img/block.png'),
                        }, 1)
                    )
                    break;
                
                case '2': // not working
                    boundaries.push(
                        new Boundary({
                            position: {
                                x: Boundary.width * j,
                                y: Boundary.height * i
                            },
                            image: createImage('./img/finish.png'),
                        }, 2)
                    )
                    break;
                
                case '.':
                    pellets.push(
                        new Pellet({
                            position: {
                                x: Boundary.width * j + Boundary.width/2,
                                y: Boundary.height * i + Boundary.height/2
                            }
                        })
                    )
                    break;
                case 'p':
                    player.position.x = Boundary.width * j + Boundary.width/2;
                    player.position.y = Boundary.height * i + Boundary.height/2
                    break;
            }
        })
    })
}

loadLevel(idx);


//GET COMMAND AND PUSH TO MOVEMENT QUEUE
window.move = function(direction){
    if(player.energy > 0){
        player.movementQueue.push(direction);
        console.log(player.movementQueue);
    }
    processNextMove();
}

//MAIN MOVE LOGIN
function processNextMove() {
    // console.log("This shit is running");
    if (player.energy > 0 && !player.moving) {
        const direction = player.movementQueue.shift();
        player.moving = true; // Prevent further movement until the current move is finished
        switch (direction) {
            case 'left':
                player.targetPosition.x = player.position.x - 64;
                player.velocity.x = -4; // 4 pixels per frame, adjust as needed
                player.energy--;
                break;
            case 'right':
                player.targetPosition.x = player.position.x + 64;
                player.velocity.x = 4;
                player.energy--;
                break;
            case 'up':
                player.targetPosition.y = player.position.y - 64;
                player.velocity.y = -4;
                player.energy--;
                break;
            case 'down':
                player.targetPosition.y = player.position.y + 64;
                player.velocity.y = 4;
                player.energy--;
                break;
        }
        
    }
}

//LEVEL 1
window.a = 1;
window.b = 1;
//GET USER INPUT 
let input;
button2.addEventListener('click', function getText(){
    input = textArea.value;
    let func = new Function(input);
    func();
    energyCount.innerText = "Final Energy = " + player.energy;
})

//ALERT 
function gameover(){
    const existingLoseText = divleft.querySelector('#lose-text');
    if (existingLoseText) {
        existingLoseText.remove();
    }

    const losetext = document.createElement('h1');
    losetext.id="lose-text";
    losetext.innerText = "Kamu kalah";
    divleft.appendChild(losetext);
    setTimeout(() => {location.reload()}, 3000);
}

function win(){
    // Remove existing win text (if any)
    const existingWinText = divleft.querySelector('#win-text');
    if (existingWinText) {
        existingWinText.remove();
    }

    // Add new win text
    const wintext = document.createElement('h1');
    wintext.id ="win-text"
    wintext.innerText = "Kamu menang, tekan next untuk continue";
    divleft.appendChild(wintext);
    button1.disabled = false;
}

// ANIMATION
function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0, canvas.width, canvas.height);
    // updatePlayerPosition();
    pellets.forEach((pellet, i) => {
        pellet.draw();

        //COLLISION CHECK 
        if (Math.hypot(
            pellet.position.x - player.position.x, 
            pellet.position.y - player.position.y) < 
            pellet.radius + player.radius
        ){
            console.log("peletletlet")
            pellets.splice(i, 1);
        }
    })

    boundaries.forEach((boundary) =>{
        boundary.draw();

        //COLLISION CHECK
        if(
            player.position.y - player.radius <= boundary.position.y + boundary.height &&
            player.position.x + player.radius >= boundary.position.x && 
            player.position.y + player.radius >= boundary.position.y &&
            player.position.x - player.radius <= boundary.position.x + boundary.width){
                if(boundary.type == 2){
                    win();
                }
                else{
                    gameover();
                }
        }
    })
    //Draw player
    player.update();
    
}
animate();


