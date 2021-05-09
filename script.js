const container = document.getElementById("grid");

function makeRows(rows, cols, matrix) {
  container.style.setProperty('--grid-rows', rows);
  container.style.setProperty('--grid-cols', cols);
  for (c = 0; c < rows; c++) {
      for (i = 0; i< cols; i++){
        let cell = document.createElement("div");
        cell.innerText = matrix[c][i];
        container.appendChild(cell).className = "grid-item";
      }
    };
};
var matrix = [];
for(var i=0; i<16; i++) {
    matrix[i] = [];
    for(var j=0; j<16; j++) {
        matrix[i][j] = 0;
    }
}
matrix[0][4] = 2


makeRows(16, 16, matrix);