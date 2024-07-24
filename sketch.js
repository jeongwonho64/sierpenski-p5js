let X1, Y1, X2, Y2, X3, Y3, slide, number;
function setup() {
  createCanvas(400, 400);
  slide = createSlider(0, 6, 3, 1);
  slide.position(10, 10)
}

function draw() {
  background(255);
  number = slide.value();
  fill(0);
  translate(width / 2, height / 2 + 30);
  frac(0, -200, -100 * sqrt(3), 100, 100 * sqrt(3), 100, number); //equilateral triangle
}

function frac(x1, y1, x2, y2, x3, y3, count) {
  if (count > 0) {
    setReference(x1, y1, x2, y2, x3, y3);
    frac(x1, y1, barry(0.5, 0.5, "x"), barry(0.5, 0.5, "y"), barry(0.5, 0, "x"), barry(0.5, 0, "y"), count - 1);
    setReference(x1, y1, x2, y2, x3, y3);
    frac(barry(0.5, 0.5, "x"), barry(0.5, 0.5, "y"), x2, y2, barry(0, 0.5, "x"), barry(0, 0.5, "y"), count - 1);
    setReference(x1, y1, x2, y2, x3, y3); //the reference gets changed every recursion so it must be reset to the original first as the next triangle's coordinates is still determined using the original reference 
    frac(barry(0.5, 0, "x"), barry(0.5, 0, "y"), barry(0, 0.5, "x"), barry(0, 0.5, "y"), x3, y3, count - 1);
  } else {
    triangle(x1, y1, x2, y2, x3, y3); //base case
  }
}

function setReference(x1, y1, x2, y2, x3, y3) {
  X1 = x1;
  Y1 = y1;
  X2 = x2;
  Y2 = y2;
  X3 = x3;
  Y3 = y3; //sets the reference triangle for the barycentric coordinates
}

function barry(l1, l2, axis) {
  if (axis === "x") {
    return l1 * X1 + l2 * X2 + (1 - l1 - l2) * X3;
  } else if (axis === "y") {
    return l1 * Y1 + l2 * Y2 + (1 - l1 - l2) * Y3; //converts from barycentric to cartesian coordinates
  }
}