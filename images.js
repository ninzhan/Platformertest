/**
 * Created by Joseph on 12/1/16.
 */
var headbang;
var up = false, down = false, left = false, right = false;
var sprite_x = 0, sprite_y = 0;
var frames = 0;
var renderingContext;
var canvas;
var width, height;
var delta_sprite = Date.now();
var delta = Date.now();
var velocity = 0;
var jumped = false;
var max_jump = 10;
var jump_count = 2;

function windowSetup(){
    width = window.innerWidth;
    height = window.innerHeight;
    if(width >= 500){
        width = 380;
        height = 430;
    }
}
function canvasSetup(){
    canvas = document.createElement("canvas");
    canvas.style.border = "15px black solid";
    canvas.width = width;
    canvas.height = height;
    renderingContext = canvas.getContext("2d");
    document.body.appendChild(canvas);
    var text = document.createElement("p");
    text.innerHTML = "Art by Revangale, Alucard and tebruno99 on <a href = 'https://opengameart.org'>Open Game Art</a>";
    document.body.appendChild(text);
}
function Sprite(image, x, y, width, height){
    this.image = image;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}
Sprite.prototype.draw = function(renderingContext, x, y, width, height){
    if(width == "default"){
        width = this.width;
    }
    if(height == "default"){
        height = this.height;
    }
    renderingContext.drawImage(this.image, this.x, this.y, this.width, this.height, x, y, width, height);
};

function init(){
    windowSetup();
    canvasSetup();
    initHandlers();
    loadGraphics();
}

function loadGraphics() {
    var img = new Image();
    img.src = "headbang.png";
    img.onload = function(){
        initSprites(this);
        gameLoop();
    }
}
function initHandlers() {
    document.addEventListener("keypress", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
}
function keyDownHandler(e){
    var keyPressed = String.fromCharCode(e.keyCode);
    if(keyPressed == "s"){
        down = true;
    }
    if(keyPressed == "w"){
        jumped = true;
    }
    if(keyPressed == "a"){
        left = true;
    }
    if(keyPressed == "d"){
        right = true;
    }
}
function keyUpHandler(e) {

    var keyUp = String.fromCharCode(e.keyCode);
    if(keyUp == "S"){
        down = false;
    }
    if(keyUp== "W"){
        up = false;
    }
    if(keyUp == "A"){
        left = false;
    }
    if(keyUp == "D"){
        right = false;
    }
}
function initSprites(img){
    headbang = [new Sprite(img, 0, 0, 103, 89),
        new Sprite(img, 103, 0, 103, 89),
        new Sprite(img, 206, 0, 103, 89),
        new Sprite(img, 0, 89, 103, 89),
        new Sprite(img, 103, 89, 103, 89),
        new Sprite(img, 206, 89, 103, 89)
    ];
}
function update(){
    if(delta < (Date.now()-20)){
        var speed = 20;
        if(jumped && jump_count > 0){
            velocity = -15;
            jump_count--;
            jumped = false;
            console.log(jump_count);
        }
        sprite_y+=velocity;
        if(sprite_y>=340) {
            velocity = 0;
            jump_count = max_jump;
        }else{
            velocity += 2;
        }
        if (left){
            sprite_x -=speed;
        }
        if (right){
            sprite_x +=speed;
        }

        if(sprite_x >= 380){
            sprite_x = -103;
        } else if(sprite_x <= -103){
            sprite_x = 380;
        }
        sprite_y +=velocity;
        if(sprite_y> 340){
            sprite_y = 340;
        }
        if(sprite_y<0){
            sprite_y = 0;
            velocity = 0;
        }
        delta = Date.now();
    }
    if(delta_sprite < (Date.now()-80)){
        frames ++;
        delta_sprite = Date.now();
    }

}
function render(){

    renderingContext.clearRect(0, 0, 380, 430);
    headbang[frames%6].draw(renderingContext, sprite_x, sprite_y, "default", "default");

}
function gameLoop(){
    update();
    render();
    window.requestAnimationFrame(gameLoop);
}


