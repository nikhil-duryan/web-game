//constant
let inputDir ={x:0,y:0};
const foodSound=new Audio('eatingsound.mp3');
const gameOverSound=new Audio('gameover.mp3');
const moveSound=new Audio('turn.mp3');
const musicSound=new Audio('backGround.mp3');
let speed=5;
let score=0;
let lastPainTime=0;
let snakeArr=[
    {x:10,y:12}
]
 food={x: 6,y: 8};
// game functions
function main(ctime){
    window.requestAnimationFrame(main);
   // console.log(ctime);
    if((ctime-lastPainTime)/1000 < 1/speed){
        return;
    }
    lastPainTime=ctime;
    gameEngine();
}
function isCollide(snake){
    //if you bump into yourself
    for (let i =1;i<snakeArr.length;i++){
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            return true;
        }   
    }
    if(snake[0].x >=18||snakeArr[0].x <=0 || snake[0].y >=18||snake[0].y <=0){
        return true;
    }
}
function gameEngine(){
    //updating snake array and food
       if(isCollide(snakeArr)){
          gameOverSound.play();
          musicSound.pause();
          inputDir ={x:0,y:0};
         
          alert("GAME OVER. Press any key to play again");
          snakeArr=[{x:10,y:12} ];
          score=0;
          musicSound.play();
          speed=5;
       }

       //if you eatean the food increase the score and regnerate the food
       if(snakeArr[0].x===food.x && snakeArr[0].y===food.y){
           foodSound.play();
           score+=1;
           speed+=.2;
           if(score>hiscore){
               hiscoreval=score;
               localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
               hiscoreBox.innerHTML="High score:"+hiscoreval;
           }
           scoreBox.innerHTML="score: "+score;
           snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y});
           let a=2;
           let b=16;
           food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};
       }
       //moving snake
       for (let i= snakeArr.length-2; i >=0; i--) {
           snakeArr[i+1]={...snakeArr[i]};
       }
       snakeArr[0].x+=inputDir.x;
       snakeArr[0].y+=inputDir.y;
       musicSound.play();
    //displaying the snake and food
    //display snake
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        
        if(index==0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })
    // display food
    
        foodElement=document.createElement('div');
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
    
}










//main logics
let hiscore=localStorage.getItem("hiscore");
if(hiscore===null){
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}
else{
    hiscoreval=JSON.parse(hiscore);
    hiscoreBox.innerHTML="High score:"+hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
inputDir={x:0,y:1}//start of game
moveSound.play();
switch (e.key) {
    case "ArrowUp":
        console.log("ArrowUp");
        inputDir.x=0;
        inputDir.y=-1;
        break;
    case "ArrowDown":
        console.log("ArrowDown");
        inputDir.x=0;
        inputDir.y=1;
        break;
    case "ArrowLeft":
         console.log("ArrowLeft");
         inputDir.x=-1;
        inputDir.y=0;
         break;
    case "ArrowRight":
        console.log("ArrowRight");
        inputDir.x=1;
        inputDir.y=0;
        break;                        

    default:
        break;
}
}); 
