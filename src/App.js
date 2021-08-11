import React from "react";
import "./App.css";

function Cell(i, j) {
  this.x = i;
  this.y = j;
  this.value = false;
}

const createGrid = () => {
  const arr = [];
  for (let i = 0; i < 4; i++) {
    const arrI = [];
    for (let j = 0; j < 4; j++) {
      const node = new Cell(i, j);
      arrI.push(node);
    }
    arr.push(arrI);
  }
  return arr;
};

function Board() {
  this.grid = createGrid();
  this.prevSelected = null;
  this.prevPrevSelected = null;
}

function App() {
  const [board, setBoard] = React.useState(new Board());

  const isRed = (x, y) => {
    if (
      (board.prevPrevSelected?.x == x && board.prevPrevSelected?.y == y) ||
      (board.prevSelected?.x == x && board.prevSelected?.y == y)
    )
      return true;
    else return false;
  };

  return (
    <div className="App">
      {board?.grid?.map((row) => (
        <div class="row" style={{ display: "flex", flexDirection: "row" , width : "fit-content" }}>
          {row.map((cell) => (
            <div
              onClick={() => {
                const newBoard = board;
                const grid = newBoard.grid;
                grid[cell.x][cell.y].value = true;
                if (newBoard.prevPrevSelected) {
                  newBoard.grid[newBoard.prevPrevSelected.x][
                    newBoard.prevPrevSelected
                  ] = false;
                }

                newBoard.prevPrevSelected = newBoard.prevSelected;
                newBoard.prevSelected = { x: cell.x, y: cell.y };
                setBoard({ ...board, ...newBoard });
                console.log(board.grid);
              }}
              style={{
                display: "block",
                width: "100px",
                height: "100px",
                backgroundColor:
                  isRed(cell.x , cell.y)
                    ? "red"
                    : "blue",
                border: "1px solid black",
              }}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
