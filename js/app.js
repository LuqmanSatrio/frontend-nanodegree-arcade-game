// Enemies our player must avoid
// speed defines the amount of postion changes made in one movement
function Enemy(x,y,velocity) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x += this.velocity *dt;

    if (this.x >= 505) {
        this.x = 0;
    }

allEnemies.forEach(function(enemy){
    if(((enemy.y + 30) > player.y  && (enemy.y - 30) < player.y) && ((enemy.x + 50) > player.x && (enemy.x - 50) < player.x)){
         playerStartPosition();
    }
})
};

// Draws the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

function Player(x,y,velocity){
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function(){
displayPointAndLevel();
// key handler
    if(player.x>0 && this.KeyPressed === 'left'){
           this.x -= this.velocity;
    } else if(player.x<400 && this.KeyPressed === 'right'){
           this.x += this.velocity;
    }  else if(this.KeyPressed === 'up'){
           this.y -= this.velocity;
     } else if(player.y<380 && this.KeyPressed === 'down'){
           this.y += this.velocity;

}
// makes sure that the player is only moved once when a button is pressed
     this.KeyPressed = "";

// changes velocity, depending on which ground the player is
    if(this.y < 230){
        this.velocity= 50;
    } else {
        this.velocity = 30;
    }

// if the player reaches the water the position is beeing renewed
if(this.y<0){
   playerStartPosition();
   nextLevel();

}

// when the water is reached, the function nextLevel() is beeing called
function nextLevel(){
   score = score +1;
   level = level +1;
   if(level>1 && level< 3){
   congratsText = "Good Job!"
   } else if (level > 3 && level < 5)
   {
    congratsText = "Stop the madness!!!"
   } else if(level > 5 )
   {
    congratsText = "WAAAAAAAAAAAAAAAAAAAAA!!!!!"
   }
    var enemy = new Enemy(0,Math.floor((Math.random() * 233) + 0), Math.floor((Math.random() * 350) + 0));
    allEnemies.push(enemy);
}

// displays the points and levels, that the player currently have
function displayPointAndLevel(){
    document.getElementById('scoreAndLevel').innerHTML = "Score: " + score + " | Level: " + level + "<br>" + congratsText ;
}

}

//sets the player in the starting position
function playerStartPosition(){
        player.x = 200;
         player.y = 380;
}
Player.prototype.render = function(){
ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(e){
   this.KeyPressed = e;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player(200, 380, 30);
var enemy = new Enemy(0,Math.floor((Math.random() * 233) + 0), Math.floor((Math.random() * 350) + 0));
var score = 0;
var level = 1;
var congratsText = "";
allEnemies.push(enemy);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
