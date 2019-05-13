let c = [];
let xoff = 0;
function setup() {
  title = createElement('h2', "<a href='/PoeticCodeForNature'> HOME : </a> Comet");
   title.position(20, 0);
  canvas = createCanvas(400, 400);
  canvas.position(20, 60);
  canvas.class("artwork");
  for (let i=0; i < 100; i++) {
  c[i] = new Comet();
  }
}

function draw() {
  background(0,5);
  for (let i=0; i< c.length; i++){
  c[i].update();
  c[i].display();
  }
}

class Comet {
  constructor() {
    this.acc = createVector(0, 0.005);
    this.vel = createVector(0,0);
    this.pos = createVector(random(width), random(height));
    this.h = 100;
    this.lifespan = 255.0;
  }
  update() {
    this.mouse=createVector(mouseX, mouseY);
    this.n = noise(xoff);
    this.acc = p5.Vector.sub(this.mouse, this.pos);
    this.acc.setMag(0.05);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.lifespan -= 1.0;
    xoff += 0.1;
    this.h -= this.n * random(0.1, 0.5);
  }
  display() {
    noStroke();
    fill(random(255), 50, 100, this.lifespan);
    ellipse(this.pos.x, this.pos.y, 5, 5);
  }
  isDead() {
    if (this.lifespan < 0.0) {
      this.update();
      this.display();
    }
  }
}
