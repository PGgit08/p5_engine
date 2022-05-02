// global entity id assignment
var ENTITY_ID = 0;

// All of the Entities in the game
const entities = [];


// NOTE: THESE ARE FOR IMPORT, AND AREN'T ACTUALLY p5js RELATED
function engineSetup() {
  createCanvas(400, 400);
}

function engineDraw() {
  background(220);

  // loop all of the entities
  entities.foreach(e => e.loop());
}


// add entity
function addEntity(entity) {
  entities.push(entity);
}

// remove entity
function deleteEntity(entity) {
  entities.foreach( e => { if(e.id === entity.id) { entities.splice(entities.indexOf(e), 1) } } );
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
    if (this.x === 0 || this.x === screenW) {
      this.events.push("x_bound");
    }
    if (this.y === 0 || this.y === screenH) {
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
