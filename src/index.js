import p5 from "p5";
import { FXInit, FXRandomBool } from "@liamegan1/fxhash-helpers";
// these are the variables you can use as inputs to your algorithms
console.log(fxhash); // the 64 chars hex number fed to your algorithm
console.log(fxrand()); // deterministic PRNG function, use it instead of Math.random()

// note about the fxrand() function
// when the "fxhash" is always the same, it will generate the same sequence of
// pseudo random numbers, always

FXInit(fxrand);
const boolTest = FXRandomBool();
//----------------------
// defining features
//----------------------
// You can define some token features by populating the $fxhashFeatures property
// of the window object.
// More about it in the guide, section features:
// [https://fxhash.xyz/articles/guide-mint-generative-token#features]
//
// window.$fxhashFeatures = {
//   "Background": "Black",
//   "Number of lines": 10,
//   "Inverted": true
// }
window.$fxhashFeatures = {
  boolTest,
};
console.table(window.$fxhashFeatures);

let canvasSize;

const sketch = function (p5) {
  p5.setup = function () {
    p5.noLoop();
    canvasSize = p5.min(p5.windowWidth, p5.windowHeight);
    p5.createCanvas(canvasSize, canvasSize);
  };
  p5.draw = function () {
    p5.background("red");
    p5.stroke("black");
    p5.text(`random hash: ${fxhash}`, p5.width * 0.1, p5.height / 2);
    p5.text(
      `some pseudo random values: [ ${boolTest}, ${FXRandomBool()}]`,
      p5.width * 0.1,
      p5.height / 2 + 30
    );
    // calling the fxpreview function tells fxhash to generate a preview
    fxpreview();
  };
  p5.windowResized = function () {
    canvasSize = p5.min(p5.windowWidth, p5.windowHeight);
    p5.resizeCanvas(canvasSize, canvasSize);
  };
};

const fxHashSketch = new p5(sketch, window.document.body);
