var masaBalon = parseFloat(document.getElementById("masa").value); // Masa de la bola en kg
var aceleracion = 0; // Aceleracion inicial
var velocidad = 0; // Velocidad inicial
var tiempo = 0; // Tiempo inicial
var velocidadMaxima = 50; // Velocidad máxima en m/s
var interval; // aca se guarda la animacion ha usar

function aplicarFuerza() {
    masaBalon = parseFloat(document.getElementById("masa").value);
    var fuerza = parseFloat(document.getElementById("fuerza").value);
    aceleracion = fuerza / masaBalon;
    velocidad = 0;
    tiempo = 0;
    animarObjeto();
}

function animarObjeto() {
    var bola = document.getElementById("bola");
    var container = document.getElementById("container");
    var posicionDelBalon = 0;
    bola.style.bottom = "0px"; // pone la bola en la esquina inferior derecha
    bola.style.left = "0px";
    interval = setInterval(frame, 10);

    function frame() {
        tiempo += 0.01; // Incrementar el tiempo
        velocidad = aceleracion * tiempo; // Calcular la velocidad actual
        posicionDelBalon += velocidad * 0.01; // Actualizar posición de la bola
        
        if (posicionDelBalon >= container.clientWidth - bola.clientWidth) {
            posicionDelBalon = container.clientWidth - bola.clientWidth;
        }
        
        bola.style.left = posicionDelBalon + "px"; 
        bola.style.width = (30 + masaBalon * 2) + "px"; 
        bola.style.height = (30 + masaBalon * 2) + "px";

        
        if (velocidad > velocidadMaxima) {
            velocidad = velocidadMaxima;
        }

        document.getElementById("velocidad").innerText = velocidad.toFixed(2); 
    }
}

function pausar() {
    clearInterval(interval); 
}

function reiniciar() {
    clearInterval(interval); 
    document.getElementById("bola").style.left = "0px"; 
    velocidad = 0; 
    document.getElementById("velocidad").innerText = velocidad.toFixed(2); 
}

document.getElementById("masa").addEventListener("input", function() {
    document.getElementById("masa-valor").innerText = this.value;
});
//estas me muestran el nuevo cvalor del input digase de la masa y la fuerza a plicar
document.getElementById("fuerza").addEventListener("input", function() {
    document.getElementById("fuerza-valor").innerText = this.value;
});