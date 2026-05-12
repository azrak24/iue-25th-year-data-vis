/**
 * IUE GRADUATES 2026 - SEPARATED PIE AND ARC
 */

const PALETTE = [
  "#63BC9F", 
  "#DB9EA7",
  "#B5B9D0", 
  "#A76073", 
  "#C4C5B2", 
  "#DB807B", 
  "#8C8C8C", 
  "#383838"  
];

let data = [
  { label: "Business",        val: 4995 },
  { label: "Engineering",     val: 4292 },
  { label: "FFAD",            val: 3000 },
  { label: "Communication",            val: 1429 },
  { label: "Arts & Sciences",     val: 2115 },
  { label: "law",             val: 1187 },
  { label: "Vocational School",  val: 4070 },
  { label: "Health Sciences", val:  279 },
  { label: "Med",             val:  137 }
];

data.forEach((d, i) => d.hex = PALETTE[i % PALETTE.length]);

const BG = "#F5F0E8";
let total = 0;
const GAP = 0.10;

function setup() {
  createCanvas(800, 900);
  data.forEach(d => total += d.val);
}

function draw() {
  background(BG);
  
  const cx = width / 2;
  const cy = height / 2 + 60; 
  const r1_base = 220; 
  const r2_base = 280; 
  
  const avail = TWO_PI - GAP * data.length;
  const mAngle = ((atan2(mouseY - cy, mouseX - cx)) % TWO_PI + TWO_PI) % TWO_PI;
  const mDist = dist(mouseX, mouseY, cx, cy);

  // ANA BAŞLIK
  push();
  noStroke();
  fill("#383838");
  textFont('Jost'); 
  textSize(26);
  textAlign(LEFT);
  textStyle(NORMAL); 
  text("iue graduation distribution 2026", 50, 60);

  textFont('Source Sans 3');
  textSize(14);
  fill("#8C8C8C");
  text("faculty-specific graduate mapping / total: " + total, 50, 88);
  pop();

  translate(cx, cy);
  let cur = 0;

  data.forEach(d => {
    const aw = (d.val / total) * avail;
    const end = cur + aw;
    const hovered = mDist > 50 && mDist < r2_base + 60 && mAngle > cur && mAngle < end;
    const dc = color(d.hex);
    const currentR1 = hovered ? r1_base + 25 : r1_base;
    const currentR2 = r2_base; 
    const currentStroke = hovered ? 35 : 8;

    
    push();
    fill(dc); 
    noStroke();
    beginShape();
    for (let a = cur; a <= end; a += 0.01) vertex(currentR1 * cos(a), currentR1 * sin(a));
    vertex(currentR1 * cos(end), currentR1 * sin(end));
    vertex(0, 0);
    endShape(CLOSE);
    pop();

    
    stroke(dc);
    strokeWeight(currentStroke);
    noFill();
    arc(0, 0, currentR2 * 2, currentR2 * 2, cur, end);

  
    push();
    const la = cur + aw / 2;
    rotate(la);
    translate(hovered ? currentR2 + 70 : currentR2 + 45, 0);
    noStroke();
    
    textFont('Source Sans 3');
    fill("#383838"); 
    textSize(hovered ? 15 : 12);
    textStyle(hovered ? BOLD : NORMAL); 
    textAlign(LEFT, CENTER);
    text(d.label.toUpperCase(), 0, 0);
    pop();

    if (hovered) {
      push();
      translate(currentR2 * cos(cur + aw / 2), currentR2 * sin(cur + aw / 2));
      rotate(cur + aw / 2);
      const la2 = cur + aw / 2;
      if (la2 > HALF_PI && la2 < 3 * HALF_PI) rotate(PI);
      
      textFont('Source Sans 3');
      fill(BG); 
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(16); 
      textStyle(BOLD);
      text(d.val, 0, 0);
      pop();
    }

    cur = end + GAP;
  });

  fill(BG);
  noStroke();
  circle(0, 0, 180);
  
  fill("#383838");
  textFont('Jost');
  textSize(36);
  textAlign(CENTER, CENTER);
  text(total.toLocaleString(), 0, -10);
  
  textFont('Source Sans 3');
  textSize(13);
  fill("#8C8C8C");
  text("GRADUATES", 0, 22);
}