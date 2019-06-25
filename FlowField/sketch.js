let inc = 0.1;
let scl = 20;
let cols;
let rows;
let zoff = 0;
let particleObejct = 10000;
let particles = [];
let flowField;

function setup() {
  background(255);
  title = createElement('h2', "<a href='/PoeticCodeForNature'> HOME : </a> FlowField 기류");
   title.position(20, 0);
  canvas = createCanvas(400, 400);
  canvas.position(20, 60);
  canvas.class("artwork");
  cols = floor(width / scl);
  rows = floor(height / scl);
  flowField = new Array(cols * rows);
    for (var i = 0; i < particleObejct; i++) {
      particles[i] = new Particle();
    }
}

function draw() {
  beginShape();
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    xoff = 0;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let angle = noise(xoff, yoff, zoff) * TWO_PI;
      let v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowField[index] = v;
      xoff += inc;
    }
    yoff += inc;
  }
  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(flowField);
    particles[i].edges();
    particles[i].show();
    particles[i].update();
  }
}

function mousePressed() {
  background(255);
  draw();
}

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxspeed = 10;
    this.prePos = this.pos.copy();
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  show() {
    stroke(0, 0, random(255), 20);
    strokeWeight(1);
    line(this.pos.x, this.pos.y, this.prePos.x, this.prePos.y);
    this.updatePrev();
  }

  updatePrev() {
    this.prePos.x = this.pos.x;
    this.prePos.y = this.pos.y;
  }

  edges() {
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrev();
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    }
  }

  follow(vectors) {
    var x = floor(this.pos.x / scl);
    var y = floor(this.pos.y / scl);
    var index = x + y * cols;
    var force = vectors[index];
    this.applyForce(force);
  }
}
