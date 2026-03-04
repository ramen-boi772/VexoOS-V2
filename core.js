let zIndex = 1;

const desktop = document.getElementById("desktop");
const taskApps = document.getElementById("task-apps");

////////////////////////////
// WINDOW SYSTEM
////////////////////////////

function createWindow(id,title,content){

  if(document.getElementById(id)) return;

  const win = document.createElement("div");
  win.className="window";
  win.id=id;

  win.innerHTML=`
    <div class="header" onmousedown="dragStart(event,this.parentElement)">
      <span>${title}</span>
      <div>
        <button onclick="minimize('${id}')">—</button>
        <button onclick="closeApp('${id}')">✖</button>
      </div>
    </div>
    <div class="content">${content}</div>
  `;

  desktop.appendChild(win);
  openApp(id);
  addTaskIcon(id,title);
}

function openApp(id){
  const win=document.getElementById(id);
  if(!win) return;
  win.style.display="flex";
  win.style.zIndex=++zIndex;
}

function closeApp(id){
  document.getElementById(id)?.remove();
  document.getElementById("task-"+id)?.remove();
}

function minimize(id){
  document.getElementById(id).style.display="none";
}

////////////////////////////
// TASKBAR
////////////////////////////

function addTaskIcon(id,title){
  if(document.getElementById("task-"+id)) return;

  const icon=document.createElement("div");
  icon.id="task-"+id;
  icon.innerText=title;
  icon.onclick=()=>openApp(id);

  taskApps.appendChild(icon);
}

////////////////////////////
// DRAG SYSTEM
////////////////////////////

function dragStart(e,win){
  let shiftX=e.clientX-win.getBoundingClientRect().left;
  let shiftY=e.clientY-win.getBoundingClientRect().top;

  function moveAt(pageX,pageY){
    win.style.left=pageX-shiftX+"px";
    win.style.top=pageY-shiftY+"px";
  }

  function onMove(e){moveAt(e.pageX,e.pageY);}

  document.addEventListener("mousemove",onMove);

  document.onmouseup=function(){
    document.removeEventListener("mousemove",onMove);
    document.onmouseup=null;
  };
}

////////////////////////////
// START MENU (Phase 2)
////////////////////////////

function toggleStart(){
  alert("Start Menu Coming in Phase 2 🔥");
}

////////////////////////////
// THEME SYSTEM
////////////////////////////

function toggleTheme(){
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
  localStorage.theme=document.body.className;
}

if(localStorage.theme){
  document.body.className=localStorage.theme;
}
