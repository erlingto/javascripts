const container = document.getElementById("grid");
const btn = document.getElementById("button");
function reset(){
  matrice[container.end[0], container.end[1]] = 0;
  matrice[container.start[1], container.start[1]] = 0;
  var nr = container.end[0] * 16 + container.end[1];
  var strnr = String(nr);
  el  = document.getElementById(strnr);
  el.value = matrice[container.end[0], container.end[1]];
  el.style.backgroundColor = "rgb(255, 255, 255)";
  nr = container.start[0] * 16 + container.start[1];
  strnr = String(nr);
  el  = document.getElementById(strnr);
  el.value = matrice[container.start[0], container.start[1]];
  el.style.backgroundColor = "rgb(255, 255, 255)";
}
function show(){
  var nr = container.end[0] * 16 + container.end[1];
  var strnr = String(nr);
  el  = document.getElementById(strnr);
  el.value = matrice[container.end[0], container.end[1]];
  
  el.style.backgroundColor = "rgb(32, 126, 150)";
  nr = container.start[0] * 16 + container.start[1];
  strnr = String(nr);
  el  = document.getElementById(strnr);
  
  el.style.backgroundColor = "rgb(32, 126, 150)";
}

function astar(){
  strt = String(container.end[0] * 16 + container.end[1]);
  endt = String(container.start[0] * 16 + container.start[1]);
  el  = document.getElementById(strt);
  el.style.backgroundColor = "rgb(1, 109, 1)";
  el  = document.getElementById(endt);
  el.style.backgroundColor = "rgb(34, 252, 34)";
}
const walls = 10;
const matrice = [];
    for(var i=0; i<16; i++) {
      matrice[i] = [];
      for(var j=0; j<16; j++) {
          if (Math.random() < 0.2){
            matrice[i][j] = -1;
          }
          else{
          matrice[i][j] = 0;
          }
      }
function start(){
  if (container.end == undefined){
    return 0
  }
  else{
    matrice[container.end[0], container.end[1]] = 20;
    matrice[container.start[1], container.start[1]] = 20;
    astar()
  }
}

function createStartBtn(){
  btn.value = "Start";
  btn.addEventListener('click', function(evt){
    start()
  })
}

function update(evt){
  item = evt.target;
  if (item.value == -1){
    return 0 
  }
  else if (container.value == 3){
    reset()
    container.value = 1;
    item.value = container.value;
    item.style.backgroundColor ="rgb(32, 126, 150)";
    container.value = 2;
    container.start = [item.x, item.y];
    return 0
  }
  else if(container.value == 1) {
    item.style.backgroundColor ="rgb(32, 126, 150)";
    item.value = container.value;
    container.value = 2;
    container.start = [item.x, item.y];
  }
  else{
    item.value = container.value;
    container.value = 3;
    container.end = [item.x, item.y];
    matrice[container.end[0], container.end[1]] = 10;
    matrice[container.start[1], container.start[1]] = 10;
    show()
  }
  }
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
        cell.value = matrice[c][i];
        cell.x = c;
        cell.y = i;
        cell.id = c * 16 + i;
        if (cell.value == -1){
          cell.style.backgroundColor = "rgb(0,0,0)";
        }
        //cell.innerText = String(cell.value);
        cell.addEventListener('click', function(evt){
        update(evt)
        }); 

        container.appendChild(cell).className = "grid-item";
      }
    };
};



makeRows(16, 16);
createStartBtn();