const canvas_width = window.innerWidth;
const canvas_height = window.innerHeight;
const c = document.getElementById("canvas");

function newCircle(x, y, r, x_speed, y_speed){
    return {
        x: x,
        y: y,
        r : r,
        x_speed: x_speed,
        y_speed: y_speed
    };
}

function moveCircle(circle, w, h){
    circle.x += circle.x_speed;
    circle.y += circle.y_speed;
    if(circle.x < circle.r || circle.x > w - circle.r){
        circle.x_speed *= -1;
    }
    if(circle.y < circle.r || circle.y > h - circle.r){
        circle.y_speed *= -1;
    }
}

function distBetweenPoints(x1, y1, x2, y2){
    return Math.sqrt((x1-x2)**2 + (y1-y2)**2);
}

let circles = [];
let speed_range = .6; 
let radius = 2;
let number_circles = canvas_width*canvas_height/2500;
for(let i = 0; i < number_circles; i++){
    circles.push(newCircle(
                            25 + Math.random()*(canvas_width - 50),
                            25 + Math.random()*(canvas_height - 50),
                            radius,
                            Math.random()*speed_range - speed_range/2,
                            Math.random()*speed_range - speed_range/2));
}

function draw(){
    fillCanvas("#203040");
    for(let i = 0; i < circles.length; i++){
        moveCircle(circles[i], canvas_width, canvas_height);
        fillCircle(circles[i].x, circles[i].y, circles[i].r, "#A0A0A0");
    }

    let lineRange = 85;

    for(let i = 0; i < circles.length; i++){
        for(let j = i + 1; j < circles.length; j++){
            let dist = distBetweenPoints(circles[i].x, circles[i].y, circles[j].x, circles[j].y);
            if(dist < lineRange){
                drawLine(circles[i].x, circles[i].y, circles[j].x, circles[j].y, shadeColor("#203040", dist/lineRange));
            }
        }
    }

    for(let i = 0; i < circles.length; i++){
        let dist = distBetweenPoints(mousePos[0], mousePos[1], circles[i].x, circles[i].y);
        if(dist < lineRange){
            drawLine(mousePos[0], mousePos[1], circles[i].x, circles[i].y, shadeColor("#203040", dist/lineRange));
        }
    }
}

function getMousePos(e){
    let rect = c.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    [x,y] = reverseStandardize(x, y); //convert to user coordinates
    return [x,y];
}

let mousePos = [0,0];
c.addEventListener("mousemove", function(e){
    let [x,y] = getMousePos(e);
    mousePos = [x,y];
    //console.log(x + ", " + y);
});

const cg_c = addCGCanvas(c, draw, canvas_width, canvas_height, true);

render();