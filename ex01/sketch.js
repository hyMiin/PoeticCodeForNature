let p = [];

function setup() {
  title = createElement('h2', "<a href='/PoeticCodeForNature'> HOME : </a> Bloom");
   title.position(20, 0);
  canvas = createCanvas(400, 400);
  canvas.position(20, 60);
  canvas.class("artwork");
  colorMode(RGB, 100, 100, 100, 255);
}

function draw() {
  background(100);
  for (let i = 0; i < p.length; i++) {
    p[i].addParticle();
    for (let j = 0; j < p[i].particles.length; j++) {
      p[i].particles[j].run(i);
      if (p[i].particles[j].isDead()) {
        p[i].particles.splice(j, 1);
        j--;
      }
    }
  }
}

class Particle {
  constructor(l) {
    this.acc = createVector(0, 0.005);
    this.vel = createVector(random(-1, 1), random(-1, 1));
    this.pos = l;
    this.lifespan = 255.0;
  }
  run(i) {
    this.update();
    this.display(i);
  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.lifespan -= 2.0;
  }
  display(i) {
    noStroke();
    fill(p[i].col, 0, 0, this.lifespan);
    rect(this.pos.x, this.pos.y, 12, 12);
  }
  isDead() {
    if (this.lifespan < 0.0) {
      return true;
    } else {
      return false;
    }
  }
}

function mouseClicked() {
  p.push(new ParticleSystem(mouseX, mouseY));
  p.push(new ParticleSystem(mouseX - 10, mouseY));
  p.push(new ParticleSystem(mouseX + 10, mouseY));
  p.push(new ParticleSystem(mouseX, mouseY - 10));
  p.push(new ParticleSystem(mouseX, mouseY + 10));
}

class ParticleSystem {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.col = random(50, 255);
    this.particles = [];
  }
  addParticle() {
    this.particles.push(new Particle(createVector(this.x, this.y)));
  }
}
