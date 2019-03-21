var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
document.addEventListener("keydown", window.onKeyPress.bind());

const cnvHeight = canvas.height;
const cnvWidth = canvas.width;
let initialSpace = 120;
const minPipeHeight = 40;
const pipeWidth = 60;

class Pipe {
   constructor(ctx, height, space){
      this.ctx = ctx;
      this.isOut = false;

      this.x = cnvWidth;
      this.y = height ? cnvHeight - height : 0;
      this.width = pipeWidth;
      this.height = height || minPipeHeight + Math.random() * (cnvHeight - space - minPipeHeight * 2);
   }

   draw(){
      this.ctx.fillStyle = "#2d96b9";
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
   }

   update = () => {
      this.x -= 1;
      if(this.x < -60){
         this.isOut = true;
      }
   }
}

class Bird {
   constructor(ctx){
      this.ctx = ctx;
      this.isFailed = false;

      this.x = cnvWidth / 2;
      this.y = cnvHeight / 2;
      this.radius = 16;
      this.velocity = 0.12;
      this.gravity = 0;
      
   }

   draw() {
      this.ctx.strokeStyle = firstColor;
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      this.ctx.lineWidth = 4;
      this.ctx.closePath();
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.radius - this.ctx.lineWidth, 0, 2 * Math.PI);
      this.ctx.fillStyle = secondColor;
      this.ctx.fill();
   }

   update() {
      this.gravity += this.velocity;
      this.y += this.gravity;
      this.gravity = Math.min(4, this.gravity);

      if(this.y > cnvHeight) {
         gameOver();
      }
      if(this.y < 6) {
         gameOver();
      }
   }

   jump() {
      this.gravity = -4;
   }
}

startGame = () => {
   this.frameCount = 0;
   this.gameScore = 0;
   this.pipeFrequency = 450; // 450, 410, 370, 330, 290, 250, 210, 170, 130, 90, 50, 10, -30...
   this.firstColor = document.getElementById("color1").value;
   this.secondColor = document.getElementById("color2").value;
   initialSpace = 120;
   document.getElementById("darken").style.display = "none";
   document.getElementById("gameOver").style.display = "none";
   document.getElementById("toJump").style.display = "none";
   document.getElementById("toStart").style.display = "none";
   clearInterval(this.loop);
   this.ctx.clearRect(0, 0, cnvWidth, cnvHeight);

   this.pipes = this.createPipe();
   this.bird = this.createBird();
   this.loop = setInterval(this.gameLoop, 1000 / 100);
}

function displayComp(component) {
   switch (component) {
      case game:
         document.getElementById("game").style.display = "block";
         document.getElementById("index").style.display = "none";
         break;
   
      case index:
         document.getElementById("game").style.display = "none";
         document.getElementById("index").style.display = "block";
         break;

   }

}

createPipe = () => {
   const firstPipe = new Pipe(this.ctx, null, initialSpace);
   const secondPipeHeight = cnvHeight - firstPipe.height - initialSpace;
   const secondPipe = new Pipe(this.ctx, secondPipeHeight, 80);
   return [firstPipe, secondPipe];
}

createBird = () => {
   const bird = new Bird(this.ctx);
   return bird;
}

gameLoop = () => {
   this.update();
   this.draw();
}

update = () => {
   this.frameCount++;

   if (this.frameCount == this.pipeFrequency) {
      const pipes = this.createPipe();
      this.pipes.push(...pipes);
      this.frameCount = 0;
   }

   document.getElementById("score").innerHTML = parseInt(this.gameScore / 100);
   this.pipes.forEach(pipe => pipe.update());
   this.pipes = this.pipes.filter(pipe => !pipe.isOut);
   this.bird.update();

   this.isDead();
   this.difficulty();
}

draw = () => {

   this.ctx.clearRect(0, 0, cnvWidth, cnvWidth);
   this.pipes.forEach(pipe => pipe.draw());
   this.bird.draw();
   
}

difficulty = () => {
   this.gameScore += 1;

   if(gameScore % 500 == 0){
      this.initialSpace -= 4;
      if(this.pipeFrequency >= 131){
         this.pipeFrequency -= 40;
         console.log(this.pipeFrequency);
      }else if(this.pipeFrequency = 130){
         this.pipeFrequency = 130;
         console.log(this.pipeFrequency);
      }
      console.log("Game is getting difficult!");
   }
}

isDead = () => {
   this.pipes.forEach((pipe) => {
      const pipeTopLeft = { x: pipe.x, y: pipe.y };
      const pipeTopRight = { x: pipe.x + pipe.width, y: pipe.y };
      const pipeBottomLeft = { x: pipe.x, y: pipe.y + pipe.height };
      const pipeBottomRight = { x: pipe.x + pipe.width, y: pipe.y + pipe.height };

      if(
         this.bird.x  > pipeTopLeft.x - this.bird.radius / 2 && this.bird.x < pipeTopRight.x && 
         this.bird.y > pipeTopLeft.y - this.bird.radius / 2 && this.bird.y < pipeBottomLeft.y + this.bird.radius / 2
         )
         {
            this.gameOver();
         }
   })
}

gameOver = () => {
   clearInterval(this.loop);
   document.getElementById("finalScore").innerHTML = parseInt(this.gameScore / 100);
   document.getElementById("toJump").style.display = "block";
   document.getElementById("toStart").style.display = "block";
   document.getElementById("toSelect").style.display = "block";
   document.getElementById("darken").style.display = "block";
   document.getElementById("gameOver").style.display = "block";
}

function onKeyPress(e) {
   if(e.keyCode == 32){
      this.bird.jump();
   }
}