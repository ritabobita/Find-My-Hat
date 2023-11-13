const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(field) {
    this.field = field; 
    this.counter = 0;
  }
  print() {
    let joinField = this.field.join("\n");
    console.log(joinField.replace(/[,]/g, ""));
  }
  playerLocation() {
    for (let row = 0; row < this.field.length; row++) {
      if (this.field[row].includes(pathCharacter) === true) {
        const x = this.field[row].indexOf(pathCharacter);
        const y = row;
        return [x, y];
      }
    }
  }
  holeLocation() {
    for (let row = 0; row < this.field.length; row++) {
      if (this.field[row].includes(hole) === true) {
        const x = this.field[row].indexOf(hole);
        const y = row;
        return [x, y];
      }
    }
  }
  hatLocation() {
    for (let row = 0; row < this.field.length; row++) {
      if (this.field[row].includes(hat) === true) {
        const x = this.field[row].indexOf(hat);
        const y = row;
        return [x, y];
      }
    }
  }
  right() {
    const [x, y] = this.playerLocation();
    if (x >= this.field[y].length - 1) {
      return (gameOver = "Lose");
    }
    let temp = this.field[y][x + 1];
    if (temp === hole) {
      return (gameOver = "Lose");
    } else if (temp === hat) {
      return (gameOver = "Win");
    }
    this.field[y][x + 1] = pathCharacter;
    this.field[y][x] = temp;
  }
  left() {
    const [x, y] = this.playerLocation();
    if (x <= 0) {
      return (gameOver = "Lose");
    }
    let temp = this.field[y][x - 1];
    if (temp === hole) {
      return (gameOver = "Lose");
    } else if (temp === hat) {
      return (gameOver = "Win");
    }
    this.field[y][x - 1] = pathCharacter;
    this.field[y][x] = temp;
  }
  up() {
    const [x, y] = this.playerLocation();
    if (y <= 0) {
      return (gameOver = "Lose");
    }
    let temp = this.field[y - 1][x];
    if (temp === hole) {
      return (gameOver = "Lose");
    } else if (temp === hat) {
      return (gameOver = "Win");
    }
    this.field[y - 1][x] = pathCharacter;
    this.field[y][x] = temp;
  }
  down() {
    const [x, y] = this.playerLocation();
    if (y >= this.field.length - 1) {
      return (gameOver = "Lose");
    }
    let temp = this.field[y + 1][x];
    if (temp === hole) {
      return (gameOver = "Lose");
    } else if (temp === hat) {
      return (gameOver = "Win");
    }
    this.field[y + 1][x] = pathCharacter;
    this.field[y][x] = temp;
  }
    static generateField(height, width, percentage = 0.2) {
    const field = new Array(height).fill(0).map(el => new Array(width));
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const prob = Math.random();
        field[y][x] = prob > percentage ? fieldCharacter : hole;
      }
    }
    field[0][0] = pathCharacter;
    const hatLocation = {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height)
    };
    while (hatLocation.x === 0 && hatLocation.y === 0) {
      hatLocation.x = Math.floor(Math.random() * width);
      hatLocation.y = Math.floor(Math.random() * height);
    }
    field[hatLocation.y][hatLocation.x] = hat;
    return field;
  }
  }

const myField = new Field(Field.generateField(6, 4));

let gameOver;
while (!gameOver) {
  myField.print();
  let move = prompt("Where would you like to move?");
  if (move === "right") {
    myField.right();
  } else if (move === "left") {
    myField.left();
  } else if (move === "up") {
    myField.up();
  } else if (move === "down") {
    myField.down();
  } else {
    console.log("Please enter a valid move");
  }
  if (gameOver === "Win") {
    console.log("You Win!");
    return (gameOver = true);
  } else if (gameOver === "Lose") {
    console.log("Game Over");
    return (gameOver = true);
  }
}