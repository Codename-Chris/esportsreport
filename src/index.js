import "./styles/index.scss";
import Background from "./background"
import Game from "./game"
// import Player from "./player"

document.addEventListener("DOMContentLoaded", () => {
  let x = new Background();
  x.draw();
  
  new Game();

})
