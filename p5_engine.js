/* START OF GAME ENGINE */
/**
A super basic engine that gets saved on github and copy/pasted for p5js   projects.
*/

// global entity id and image id assignment
var ENTITY_ID = 0;
var IMAGE_ID = 0;

// All of the Entities in the game
const entities = [];

// All of the images in the game
const images = [];


// Keyboard and Mouse events
var pressedKey = null;
var pressedArrow = null;
var mouseClick = false;


// NOTE: THESE ARE FOR IMPORT, AND AREN'T ACTUALLY p5js RELATED
function engine_preLoad(){
  images.forEach(i => i.img = loadImage(i.file));
}

function engineSetup() {}

function engineDraw() {
  // loop all of the entities
  entities.forEach(e => e.update());
}


// add entity(s)
function addEntity(entity) {
  entities.push(entity);
}

// remove entity
function deleteEntity(entity) {
  entities.forEach( e => { if(e.id === entity.id) { entities.splice(entities.indexOf(e), 1) } } );
}


// add image
function addImage(image) {
  images.push(image);
}

// remove entity
function deleteImage(image) {
  images.forEach( i => { if(i.id === image.id) { images.splice(images.indexOf(i), 1) } } );
}


// An Image
class Image {
  constructor(file){
    this.id = IMAGE_ID ++;
    
    // file location and actual image
    this.file = file;
    this.img = null;
  }
  
  // to draw the actual image
  drawImg(x, y, w, h){
    image(this.img, x, y, w || null, h || null);
  }
}

// A basic entity that has UI (boilerplate)
class Entity {
  constructor(x, y, w, h) {
    // basic
    this.x = x || 0;
    this.y = y || 0;
    this.w = w || 50;
    this.h = h || 50;
    
    this.id = ENTITY_ID ++;

    // collision entity (if needed)
    this.collisionEntity = null;

    // visibility
    this.visible = true;

    // events
    this.events = [];
  }

  // event scanner
  eventScan() {
    // reset
    this.events = [];

    // mouseY pos
    if (mouseY >= this.y && mouseY <= this.y + this.h) {
      // mouseX pos
      if (mouseX >= this.x && mouseX <= this.x + this.w) {
        this.events.push("mouse_hover");

        if (mouseClick) {
          this.events.push("mouse_click");
        }
      }
    }

    // screen bound collisions
    if (this.x === 0 || this.x === width) {
      this.events.push("x_bound");
    }
    if (this.y === 0 || this.y === height) {
      this.events.push("y_bound");
    }

    // collision with chosen entity
    if (this.collisionEntity) {
      if (this.boxCollision(this.collisionEntity)) {
        this.events.push("entity_collision");
      }
    }
  }

  boxCollision(collisionEntity) {
    if (
      this.x < collisionEntity.x + collisionEntity.w &&
      this.x + this.w > collisionEntity.x &&
      this.y < collisionEntity.y + collisionEntity.h &&
      this.h + this.y > collisionEntity.y
    ) {
      return true;
    } else {
      return false;
    }
  }

  // update for the p5 draw function
  update() {
    // event updating
    this.eventScan();

    // general updating
    this.preDraw();

    if (this.visible) {
      this.draw();
    }
  }

  // pre-draw function that gets inherited
  preDraw() {}

  // drawing that gets inherited
  draw() {}
}


// check if mouse was clicked
function mousePressed() {
  mouseClick = true;
}
function mouseReleased() {
  mouseClick = false;
}

// check if certian key clicked
function keyPressed() {
  pressedKey = key;
  pressedArrow = keyCode;
}
function keyReleased() {
  pressedKey = pressedArrow = null;
}
/* END OF GAME ENGINE */
