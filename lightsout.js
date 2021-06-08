const btn = document.getElementById("button");
const container = document.getElementById("grid");

function header(){
  $("#headerHtml").load("header.html");
}


const matrice = [];
const neighbours = [];
var busy = 0;



var dim1 = 8;
var dim2 = 8;

for(var i=0; i<dim1; i++) {
    for(var j=0; j<dim2; j++) {
      neighbours[i* dim1 + j] = [];
      if (i != 0){
        neighbours[i*dim1+j].push((i-1)*dim1 + j);
      }
      if (j != 0){
        neighbours[i*dim1+j].push((i)*dim1 + j-1);
      }
      if (i != dim1-1){
        neighbours[i*dim1+j].push((i+1)*dim1 + j);
      }
      if (j != dim2-1){
        neighbours[i*dim1+j].push((i)*dim1 + j+1);
      }
      matrice[i*dim1+j] = 0;
    }
}

function click(evt){
  item = evt.target;
  clickId = item.id;
  move(clickId);
}

function move(cell){
  item = document.getElementById(cell);
  if (item.style.backgroundColor == "rgb(0, 206, 209)"){
    item.style.backgroundColor = "rgb(205, 132, 143)";
  }
  else{
    item.style.backgroundColor = "rgb(0, 206, 209)";
  }
  matrice[cell] = (matrice[cell] + 1) % 2;
  for (var i = 0; i < neighbours[cell].length; i++){
    id = neighbours[cell][i];
    nCell = document.getElementById(id);
    if (nCell.style.backgroundColor == "rgb(205, 132, 143)"){
      nCell.style.backgroundColor = "rgb(0, 206, 209)";
    }
    else{
      nCell.style.backgroundColor = "rgb(205, 132, 143)";
    }
  }
}

function createTask(){
    var randomCell;
    for (var i = 0; i <30; i++){
        randomCell = Math.floor(Math.random() * dim1 * dim2)
        move(randomCell);
    }
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array
}

function solve(){
  if (!busy){
    busy = 1;
    var list_moves = [];
    for (var i = 0; i < dim1 * dim2; i++){
      if (matrice[i] == 1){
        list_moves.push(i);
      }
    }
    list_moves = shuffleArray(list_moves);
    var i = 0;
    var iId = setInterval(solveMove, 350);
    function solveMove(){
      id = list_moves[i];
      cell = document.getElementById(id);
      prev_backroundColor = cell.style.backgroundColor;
      i++;
      if (i == list_moves.length){
        clearInterval(iId);
        busy = 0;
      }
      move(id);
    }
  }
}
function createSolveBtn(){
  btn.value = "Solve";
  btn.addEventListener('click', function(){
    solve();
  })
}
function makeRows(rows, cols) {
    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-cols', cols);
    container.value = 1;
    container.start = undefined;
    container.end = undefined;
    
    for (c = 0; c < rows; c++) {
        for (i = 0; i< cols; i++){
            let cell = document.createElement("div");
            cell.x = c;
            cell.y = i;
            cell.value = matrice[c * dim1 + i];
            cell.id = c * dim1 + i;
            cell.style.width = "5em";
            cell.style.height = "4em";
            cell.style.border = "3px solid #ddd";
            cell.style.backgroundColor = "rgb(205, 132, 143)";
            //cell.innerText = String(cell.value);
            cell.addEventListener('click', function(evt){
            click(evt);
            }); 

            container.appendChild(cell).className = "grid-item";
        }
    };
}
header()
makeRows(dim1,dim2);
createTask();
createSolveBtn();
