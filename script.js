const container = document.getElementById("grid");
const btn = document.getElementById("button");
var url = window.location.href;  
const urlLink = document.getElementById("url");
urlLink.innerHTML = "Lights Out Game";
urlLink.href = urlOrigin+ "/LightsOut"


var path = [];

const matrice = [];
const neighbours = [];

for(var i=0; i<16; i++) {
  for(var j=0; j<16; j++) {
    neighbours[i* 16 + j] = [];
    if (i != 0){
      neighbours[i*16+j].push((i-1)*16 + j);
    }
    if (j != 0){
      neighbours[i*16+j].push((i)*16 + j-1);
    }
    if (i != 15){
      neighbours[i*16+j].push((i+1)*16 + j);
    }
    if (j != 15){
      neighbours[i*16+j].push((i)*16 + j+1);
    }
    if (Math.random() < 0.2){
      matrice[i*16+j] = -1;
    }
    else if (Math.random() > 0.7){
      matrice[i*16+j] = 5;
    }
    else{
    matrice[i*16+j] = 1;
    }
  }
}
  var portal1 = Math.floor(Math.random() * 16 * 16);
  var portal2 = Math.floor(Math.random() * 16 * 16);
  while (portal1 == portal2){
    portal2 = math.floor(Math.random() * 16 * 16);
  }
  matrice[portal1] = 1;
  matrice[portal2] = 1;
  if (!neighbours[portal1].includes(portal2)){
    neighbours[portal1].push(portal2);
    neighbours[portal2].push(portal1);
  }


function portal_heuristic(node, end){

  xend = Math.floor(end / 16);
  yend = end % 16;

  xnode = Math.floor(node / 16);
  ynode = node % 16;

  xportal1 = Math.floor(portal1 / 16);
  yportal1 = portal1 % 16;

  xportal2 = Math.floor(portal2 / 16);
  yportal2 = portal2 % 16;

  distance1 = Math.abs(xportal1-xnode) + Math.abs(yportal1-ynode) + Math.abs(xend-xportal2) + Math.abs(yend-yportal2);
  distance2 = Math.abs(xportal2-xnode) + Math.abs(yportal2-ynode) + Math.abs(xend-xportal1) + Math.abs(yend-yportal1);

  return Math.min(distance1, distance2)
}

function heuristic(node, end){
  xend = Math.floor(end / 16);
  yend = end % 16;

  xnode = Math.floor(node / 16);
  ynode = node % 16;
  
  h_portal = portal_heuristic(node, end);
  out = Math.abs(xend-xnode) + Math.abs(yend-ynode);
  out = Math.min(h_portal, out);
  return out
}
function arrayRemove(arr, value) { 
  return arr.filter(function(ele){ 
      return ele != value; 
  });
}

function reset_path(){
  if (path.length > 0){
    for (var i = 0; i <path.length; i++){
      node = path[i]
      strnr = String(node);
      el  = document.getElementById(strnr);
      el.style.backgroundColor = "rgb(255, 255, 255)";
    }
  }
}
function reset_grid(){
  for (var i = 0; i < 16*16; i++){
    strnr = String(i);
    if (container.end == i){
      continue;
    }
    if (container.start == i){
      continue;
    }
    el  = document.getElementById(strnr);
    if (matrice[i]==1){
      el.style.backgroundColor = "rgb(255, 255, 255)";
      el.innerText = "";
    }
    else if (matrice[i]== 5){
      el.style.backgroundColor = "rgb(150, 150, 150)";
      el.innerText = "";
    }
    if (i == portal1 || i == portal2){
      el.style.backgroundColor= "rgb(255,105,180)";
      el.innerText = "";
    }
  }
}
function reset(){
  var nr = container.end;
  var strnr = String(nr);
  el  = document.getElementById(strnr);
  el.style.backgroundColor = "rgb(255, 255, 255)";
  nr = container.start;
  strnr = String(nr);
  el  = document.getElementById(strnr);
  el.style.backgroundColor = "rgb(255, 255, 255)";
}
function show(){
  var nr = container.end;
  var strnr = String(nr);
  el  = document.getElementById(strnr);
  
  el.style.backgroundColor = "rgb(32, 126, 150)";
  nr = container.start;
  strnr = String(nr);
  el  = document.getElementById(strnr);
  
  el.style.backgroundColor = "rgb(32, 126, 150)";
}

function astar(){
  startCord = container.start;
  endCord = container.end;
  strt = String(container.end);
  endt = String(container.start);
  el  = document.getElementById(strt);
  el.style.backgroundColor = "rgb(1, 109, 1)";
  el  = document.getElementById(endt);
  el.style.backgroundColor = "rgb(1, 109, 1)";


  var f = [];
  var g = [];
  var h = [];
  var parent = [];

  for (var i = 0; i < 16*16; i++){
    f[i] = 0;
    g[i] = 0;
    h[i] = 0;
    parent[i] = undefined;
  }


  var openList = [];
  var closedList = [];
  openList.push(startCord);


  while(openList.length > 0 ) {
 
    // Grab the lowest f(x) to process next
    var lowInd = 0;
    for(var i=0; i<openList.length; i++) {
      if(f[openList[i]] < f[openList[lowInd]]) { lowInd = i; }
    }
    var currentNode = openList[lowInd];

    // End case -- result has been found, return the traced path
    if(currentNode == endCord) {
      var curr = currentNode;
      var ret = [];
      while(parent[curr] != undefined) {
        ret.push(curr);
        curr = parent[curr];
      }
      return [ret.reverse(), closedList, g, h, f];
    }
    openList = arrayRemove(openList, currentNode);
    closedList.push(currentNode);
    var neighbors = neighbours[currentNode];
    for (var i=0; i<neighbors.length; i++){
      var neighbor = neighbors[i];
      if (closedList.includes(neighbor) || matrice[neighbor] == -1){
        continue;
      }
      var gScore = g[currentNode] + matrice[neighbor];
      var gScoreIsBest = false;
      if (!openList.includes(neighbor)){
        gScoreIsBest = true;
        h[neighbor] = heuristic(neighbor, endCord);
        openList.push(neighbor);
      }
      else if (gScore < g[neighbor]){
        gScoreIsBest = true;
      }

      if (gScoreIsBest){
        parent[neighbor] = currentNode;
        g[neighbor] = gScore;
        f[neighbor] = g[neighbor] + h[neighbor];
      }
    }
  }
}
function start(){
  if (container.end == undefined){
    return 0
  }
  else{
    arrays = astar();
    path = arrays[0];
    closedList = arrays[1];
    g = arrays[2];
    for (var i = 1; i < closedList.length; i++){
      nr = closedList[i];
      var strnr = String(nr);
      el  = document.getElementById(strnr);
      if (matrice[nr] == 1){
        el.style.backgroundColor = "rgb(208, 235, 199)";
      }
      else{
        el.style.backgroundColor = "rgb(108, 135, 99)";
      }
      if (nr == portal1 || nr == portal2){
        console.log("true");
        el.style.backgroundColor= "rgb(255,155,180)";
      }
      el.innerText = String(g[nr]);

    }
    for (var i = 0; i < path.length-1; i++){
      nr = path[i];
      var strnr = String(nr);
      el  = document.getElementById(strnr);
      el.style.backgroundColor = "rgb(34, 126, 150)";
      if (nr == portal1 || nr == portal2){
        console.log("true");
        el.style.backgroundColor= "rgb(255,155,230)";
      }
    }
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
    container.start = item.x * 16 + item.y;
    reset_grid();
    return 0
  }
  else if(container.value == 1) {
    item.style.backgroundColor ="rgb(32, 126, 150)";
    item.value = container.value;
    container.value = 2;
    container.start = item.x * 16 + item.y;
  }
  else{
    item.value = container.value;
    container.value = 3;
    container.end = item.x * 16 + item.y;
    reset_grid();
    show();
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
        cell.x = c;
        cell.y = i;
        cell.value = matrice[c*16 + i];
        cell.id = c * 16 + i;
        if (cell.value == -1){
          cell.style.backgroundColor = "rgb(0,0,0)";
        }
        else if (cell.value == 5){
          cell.style.backgroundColor = "rgb(150,150,150)";
        }
        //cell.innerText = String(cell.value);
        cell.addEventListener('click', function(evt){
        update(evt)
        }); 

        container.appendChild(cell).className = "grid-item";
      }
    };
    strnr = String(portal1);
    el  = document.getElementById(strnr);
    el.style.backgroundColor= "rgb(255,105,180)";
    strnr = String(portal2);
    el  = document.getElementById(strnr);
    el.style.backgroundColor= "rgb(255,105,180)";
};



makeRows(16, 16);
createStartBtn();