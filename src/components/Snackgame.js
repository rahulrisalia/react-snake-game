import React, { useEffect, useState } from "react";
import "../components/Snackgame.css";

function Snackgame() {
  let totalgridesize = 20;
  let initialsnackposition = [
    { x: totalgridesize / 2, y: totalgridesize / 2 },
    { x: totalgridesize / 2 + 1, y: totalgridesize / 2 },
  ];

  const [food, setfood] = useState({ x: 5, y: 5 });
  const [snake, setsnake] = useState(initialsnackposition);
  const [direction, setdirection] = useState("LEFT");
  const [score, setscore] = useState(0);

  const renderboard = () => {
    let cellarray = [];
    for (let row = 0; row < totalgridesize; row++) {
      for (let col = 0; col < totalgridesize; col++) {
        let className = "cell";
        let isfood = food.x === row && food.y === col;

        let issnake = snake.some((ele) => ele.x === row && ele.y === col);

        let issnakehead = snake[0].x === row && snake[0].y === col;
        if (isfood) {
          className = className + "food";
        }

        if (issnake) {
          className = className + "snake";
        }

        if (issnakehead) {
          className = className + "snakehead";
        }

        let cell = <div className={className} key={`${row},${col}`}></div>;
        cellarray.push(cell);
      }
    }
    return cellarray;
  };
  const gameover = () => {
    setsnake(initialsnackposition);
    setscore(0);
  };
  const updategame = () => {
    if (
      snake[0].x < 0 ||
      snake[0].x > 20 ||
      snake[0].y < 0 ||
      snake[0].y > 20
    ) {
      gameover();
      return;
    }
    let isbit = snake
      .slice(1)
      .some((ele) => ele.x === snake[0].x && ele.y === snake[0].y);
    if (isbit) {
      gameover();
      return;
    }

    let newsnake = [...snake];

    switch (direction) {
      case "LEFT":
        newsnake.unshift({ x: newsnake[0].x, y: newsnake[0].y - 1 });
        break;
      case "RIGHT":
        newsnake.unshift({ x: newsnake[0].x, y: newsnake[0].y + 1 });
        break;
      case "UP":
        newsnake.unshift({ x: newsnake[0].x - 1, y: newsnake[0].y });
        break;
      case "DOWN":
        newsnake.unshift({ x: newsnake[0].x + 1, y: newsnake[0].y });
        break;
    }
    let iseatfood = newsnake[0].x === food.x && newsnake[0].y === food.y;

    if (iseatfood) {
      setscore((prev) => prev + 2);
      renderfood();
    } else {
      newsnake.pop();
    }
    setsnake(newsnake);
  };

  const updatedirection = (e) => {
    let code = e.code;
    switch (code) {
      case "ArrowUp":
        if (direction !== "DOWN") setdirection("UP");
        break;
      case "ArrowDown":
        if (direction !== "UP") setdirection("DOWN");
        break;
      case "ArrowLeft":
        if (direction !== "RIGHT") setdirection("LEFT");
        break;
      case "ArrowRight":
        if (direction !== "LEFT") setdirection("RIGHT");
        break;
    }
  };

  const renderfood = () => {
    let xposition = Math.floor(Math.random() * totalgridesize);
    let yposition = Math.floor(Math.random() * totalgridesize);
    setfood({ x: xposition, y: yposition });
  };

  useEffect(() => {
    let interval = setInterval(updategame, 250);
    return () => clearInterval(interval, updategame);
  });

  useEffect(() => {
    document.addEventListener("keydown", updatedirection);
    return () => clearInterval("keydown", updatedirection);
  });
  return (
    <>
      <div className="container-fluid">
        <div className="score">
          score :<span>{score}</span>
        </div>
        <div className="board">{renderboard()}</div>
      </div>
    </>
  );
}

export default Snackgame;
