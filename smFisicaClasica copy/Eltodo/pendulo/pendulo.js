let r = 300; // Longitud del péndulo
let angle = Math.PI / 4; // Ángulo inicial
let aVelocity = 0; // Velocidad angular
let aAcceleration = 0; // Aceleración angular
let damping = 0.01; // Factor de amortiguamiento (fricción)
let gravity = 0.4; // Gravedad

let offsetX = 0, offsetY = 0;
let dragging = false;


let oscillationCount = 0;
let prevAngle = angle;

let masa = 50; // Masa inicial

let playing = true;

function setup() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
}

function setup() {
    let canvas = createCanvas(600, 500); // Ajustado para dar espacio a los controles
    canvas.parent('canvas-container');

    createControls();
}

function draw() {
            if (playing) {
                background(255);
                if (dragging) {
                    angle = atan2(mouseY - height / 2, mouseX - width / 2);
                } else {
                    aAcceleration = (-1 * gravity / r) * sin(angle);
                    aVelocity += aAcceleration;
                    aVelocity *= (1 - damping);
                    angle += aVelocity;
                }
                let x = r * sin(angle);
                let y = r * cos(angle);
                translate(width / 2, 100);
                stroke(0);
                line(0, 0, x, y);
                fill(0, 0, 255);
                let masaX = r * sin(angle);
                let masaY = r * cos(angle);
                ellipse(masaX, masaY, map(masa, 100, 500, 20, 40), map(masa, 100, 500, 20, 40));
                arc(0, 0, 60, 60, PI, 0);
                let deltaAngle = abs(prevAngle - angle);
                if (deltaAngle > 0.1 && prevAngle < angle && angle < Math.PI / 2) {
                    oscillationCount++;
                }
                prevAngle = angle;
                fill(0);
                textSize(16);
                textAlign(LEFT);
                text("Oscilaciones: " + oscillationCount, 20, 20);
                text("Velocidad angular: " + nf(degrees(aVelocity), 0, 2) + " grados/segundo", 20, 40);
                let energiaPotencial = masa * gravity * (r - r * Math.cos(angle));
                let energiaCinetica = 0.5 * masa * Math.pow(aVelocity, 2);
                let energiaTotal = energiaCinetica + energiaPotencial;
                    document.getElementById('energias').innerHTML = `<p><i class='bx bxs-circle' style='color:#2684d9'  ></i> E. Potencial <span>${energiaPotencial.toFixed(2)}</span><br> 
                    <i class='bx bxs-circle' style='color:#d92626'  ></i> E. Cinética <span>${energiaCinetica.toFixed(2)}</span><br> 
                    <i class='bx bxs-circle' style='color:#7626d9'  ></i> E. Total <span>${energiaTotal.toFixed(2)}</span></p>`;
                    let alturaPotencialw = map(energiaPotencial, 0, 0, 0, 0);
                    let alturaPotencial = map(energiaPotencial, 0, 50000, 0, 1000); 
                 //   let alturaCinetica = map(energiaCinetica, 0, 50000, 0, 1000); 
                    let alturaTotal = map(energiaTotal, 0, 50000, 0, 1000); 
                    document.getElementById('energia-p').style.height = alturaPotencial + 'px';
                  //  document.getElementById('energia-c').style.height = alturaCinetica + 'px';
                    document.getElementById('energia-t').style.height = alturaTotal + 'px';
                    document.getElementById('energia-w').style.height = alturaTotal + 'px';
            
            }
        }

function mousePressed() {
    // Comprobar si el ratón está sobre la masa
    let d = dist(mouseX, mouseY, width / 2 + r * sin(angle), 100 + r * cos(angle));
    if (d < 20) { // Radio de la masa
        dragging = true;
        offsetX = mouseX - (width / 2 + r * sin(angle));
        offsetY = mouseY - (100 + r * cos(angle));
    }
}

function mouseReleased() {
    dragging = false;
}



function createControls() {
    let lengthSlider = document.getElementById('length-slider');
    let massSlider = document.getElementById('mass-slider');
    let gravitySlider = document.getElementById('gravity-slider');
    let frictionSlider = document.getElementById('friction-slider');

    lengthSlider.addEventListener('input', function() {
        let length = parseFloat(this.value);
        document.getElementById('length-value').textContent = "Longitud: " + length + " m";
        r = length * 300; // 300 es la longitud máxima
    });

    massSlider.addEventListener('input', function() {
        let mass = parseFloat(this.value);
        document.getElementById('mass-value').textContent = "Masa: " + mass + " kg";
        masa = map(mass, 0.1, 1.5, 100, 500);
    });

    gravitySlider.addEventListener('input', function() {
        let grav = parseFloat(this.value);
        document.getElementById('gravity-value').textContent = "Gravedad: " + grav;
        gravity = grav;
    });

    frictionSlider.addEventListener('input', function() {
        let friction = parseFloat(this.value);
        document.getElementById('friction-value').textContent = "Fricción: " + friction;
        damping = friction;
    });

    document.getElementById('add-mass-button').addEventListener('click', function() {
        masa += 50; // Añade 50 unidades a la masa
    });

    document.getElementById('pause-button').addEventListener('click', function() {
        playing = false;
    });

    document.getElementById('play-button').addEventListener('click', function() {
        playing = true;
    });
}