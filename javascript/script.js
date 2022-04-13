const container = document.querySelector(".container");
const clearGridBtn = document.querySelector(".clearGrid");
const blackColorBtn = document.querySelector(".blackColor");
const eraseBtn = document.querySelector(".eraser");
const randomColorBtn = document.querySelector(".randomColor");

makeGrid(16, 16);

function makeGrid(col, row) {
  for (let i = 0; i < col * row; i++) {
    let div = document.createElement("div");
    container.style.gridTemplateColumns = `repeat(${col}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${row}, 1fr)`;
    container.appendChild(div);
  }
}

// Erase Cell by Modifying CSS
eraseBtn.addEventListener("click", () => {
  // Reset Black Color Button to Original Color
  resetColor(blackColorBtn);
  resetColor(randomColorBtn);
  setClickedColor(eraseBtn);

  const cells = container.querySelectorAll("div");
  cells.forEach((cell) => {
    cell.addEventListener("mouseover", () => {
      cell.style.backgroundColor = "white";
      cell.style.border = "black solid 1px";
    });
  });
});

// Clear Grid and Set New Grid Size
clearGridBtn.addEventListener("click", () => {
  // Reset Erase Button, Random Color, and Black Color Buttons Color
  resetColor(eraseBtn);
  resetColor(blackColorBtn);
  resetColor(randomColorBtn);
  removeAllChildNodes(container);
  let gridSize = prompt("Select Grid Size (Must Be <= 32): ", "");
  if (gridSize === null) {
    resetColor(eraseBtn);
    resetColor(blackColorBtn);
    resetColor(randomColorBtn);
    makeGrid(16, 16);
  } else if (gridSize > 32) {
    gridSize = prompt("Select Grid Size (Must Be <= 32): ", "");
  } else if (gridSize <= 32) {
    makeGrid(gridSize, gridSize);
  }
});

// Activate Hover Effect With Black Color
blackColorBtn.addEventListener("click", () => {
  // Reset Erase Button and Random Color Button to Original Color
  resetColor(eraseBtn);
  resetColor(randomColorBtn);
  setClickedColor(blackColorBtn);
  const cells = container.querySelectorAll("div");
  cells.forEach((cell) => {
    cell.addEventListener("mouseover", () => {
      cell.style.backgroundColor = "#222";
      cell.style.border = "1px solid #aaa";
    });
  });
});

randomColorBtn.addEventListener("click", () => {
  // Reset Erase Button and Black Color Button Color
  resetColor(eraseBtn);
  resetColor(blackColorBtn);

  setClickedColor(randomColorBtn);

  const cells = container.querySelectorAll("div");
  cells.forEach((cell) => {
    cell.addEventListener("mouseover", () => {
      let r = Math.floor(Math.random() * 256);
      let g = Math.floor(Math.random() * 256);
      let b = Math.floor(Math.random() * 256);
      cell.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    });
  });
});

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function resetColor(el) {
  el.style.backgroundColor = "white";
  el.style.color = "black";
}

function setClickedColor(el) {
  el.style.backgroundColor = "black";
  el.style.color = "white";
}
