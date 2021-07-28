const bgm = new Audio('ballfall_music.mpeg');
const gmovr = new Audio('ballfall_gameover.mpeg');
let score = 0;
var character = document.getElementById("character");
var game = document.getElementById("game");
var interval;
var both = 0;
var counter = 0;
var speed = 0.5;
var currentBlocks = [];

function moveleft(){
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if (left>0) {
        character.style.left = left - 2 +"px";    
    }
}

function moveright(){
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if (left<380) {
        character.style.left = left + 2 +"px";     
    }
}

document.addEventListener("keydown" , event =>{
    if (both == 0) {
        both++;
        if(event.key === "ArrowLeft"){
            interval = setInterval(moveleft , 1);
        }
        if (event.key === "ArrowRight") {
            interval = setInterval(moveright , 1);
        }
    }
} );

document.addEventListener("keyup" ,event =>{
    clearInterval(interval);
    both=0;
});
// alert("Are you ready ?");
// window.requestAnimationFrame(blocks);
let hscore = localStorage.getItem("hscore");
if(hscore === null){
    hscoreval = 0;
    localStorage.setItem("hscore", JSON.stringify(hscoreval));
}else{
    hscoreval = JSON.parse(hscore);
    hscoreBox.innerHTML = "HiScore: " +hscore;
}
var blocks = setInterval(function() {
    bgm.play();
    var blockLast = document.getElementById("block"+(counter-1));
    var holeLast = document.getElementById("hole"+(counter-1));
    var hole1Last = document.getElementById("hole1"+(counter-1));
    if (counter>0) {
        var blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"));
        var holeLastTop = parseInt(window.getComputedStyle(holeLast).getPropertyValue("top"));
        var hole1LastTop = parseInt(window.getComputedStyle(hole1Last).getPropertyValue("top"));
    }
    if (blockLastTop < 400 || counter == 0) {
        var block = document.createElement("div");
        var hole = document.createElement("div");
        var hole1 = document.createElement("div");
        block.setAttribute("class" ,"block");
        hole1.setAttribute("class" ,"hole");
        hole.setAttribute("class" ,"hole");
        block.setAttribute("id","block"+counter);
        hole.setAttribute("id","hole"+counter);
        hole1.setAttribute("id","hole1"+counter);
        block.style.top = blockLastTop + 100 +"px";
        hole.style.top = holeLastTop + 100 + "px";
        hole1.style.top = hole1LastTop + 100 + "px";
        var random = Math.floor(Math.random() * 360);
        var rand = Math.floor(Math.random() * 360);
        hole.style.left = random +"px";
        hole1.style.left = rand  +"px";
        game.appendChild(block);
        game.appendChild(hole);
        game.appendChild(hole1);
        currentBlocks.push(counter);
        counter++; 
        score ++;
        if (score==5 && counter <=5) {
            score = 0;
        }
        if(score%20 ==0 && speed < 1.5){
            speed+=0.1;
        }
        if(score>hscoreval){
            hscoreval = score;
            localStorage.setItem("hscore", JSON.stringify(hscoreval));
            hscoreBox.innerHTML = "HiScore: " + hscore;
        }
        scoreBox.innerHTML = "Score: " + score;
    }
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    var drop = 0 ;
    if (characterTop <= 0 ) {
        bgm.pause();
        gmovr.play();
        alert("Game Over! Press any Key to Play Again");
        clearInterval(blocks);
        location.reload();
    }
    for(var i = 0 ;i< currentBlocks.length ; i++){
        let current = currentBlocks[i];
        let iblock = document.getElementById("block"+current);
        let ihole = document.getElementById("hole"+current);
        let ihole1 = document.getElementById("hole1"+current);
        let iblockTop = parseFloat(window.getComputedStyle(iblock).getPropertyValue("top"));
        let iholeLeft = parseFloat(window.getComputedStyle(ihole).getPropertyValue("left"));
        let ihole1Left = parseFloat(window.getComputedStyle(ihole1).getPropertyValue("left"));
        iblock.style.top = iblockTop - speed + "px" ;
        ihole1.style.top = iblockTop - speed + "px" ;
        ihole.style.top = iblockTop - speed + "px" ;
        if(iblockTop < 0){
            currentBlocks.shift();
            iblock.remove();
            ihole.remove();
            ihole1.remove();
        }
        if (iblockTop-20<characterTop && iblockTop>characterTop) {
            drop++;
            if(iholeLeft<=characterLeft && iholeLeft+20>=characterLeft){
                drop=0;
            }
            if(ihole1Left<=characterLeft && ihole1Left+20>=characterLeft){
                drop=0;
            }
        }
    }
    if(drop == 0){
        if (characterTop < 480) {
            character.style.top = characterTop + 2 +"px";  
        }      
    }else{
        character.style.top = characterTop -speed +"px";
    }
} ,1);


