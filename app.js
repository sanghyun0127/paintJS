const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById("jsSave");


const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 600;

//canvas size 지정 -> css에서 한거랑 별개로 js가 인식하도록 해줘야함
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// set ctx style
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;


let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath(); // path = line
        ctx.moveTo(x, y);
    } else{
        ctx.lineTo(x, y); // from 이전 위치 to (x,y)
        ctx.stroke(); // draw line
    }
}

function changeColorClick(event){
    const color = event.target.style.backgroundColor; // json 구조 보고 확인하자
    ctx.strokeStyle = color; // line 색
    ctx.fillStyle = ctx.strokeStyle; // 색칠하는 색
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "FILL"
    } else {
        filling = true;
        mode.innerText = "PAINT"
        
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(event){ // 따로 SAVE 버튼을 쓰기 위해 마우스 우클릭 방지
    event.preventDefault(); 
}

function handleSaveClick(){
    // 1. canvas data를 image로 얻기
    const image = canvas.toDataURL(); // default: png
    // 2. create link
    const link = document.createElement("a"); // a태그에 download 기능이 있음
    link.href = image; //href 는 이미지 url 
    link.download = "PaintJS"; // download 는 다운로드되는 이미지 파일 이름
    link.click();

}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick)
    canvas.addEventListener("contextmenu", handleCM);
}

if(colors){
    Array.from(colors).forEach(color => color.addEventListener("click", changeColorClick));  // => : 호출
}

if(range){
    range.addEventListener("input", handleRangeChange)
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick)
}
