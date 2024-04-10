let canvas, ctx;
    let x, y, vx, vy;
    let gravity = 0.1;
    let masa = 23.43;
    let fuerza = 12.00;
    let launchAngle = 45;
    let projectileLaunched = false;
    let markingEnabled = false;
    let distance = 0.00;
    let launchSpeed = 20;
    let maxDistance = 70;
    let backgroundColor = "#000";
    let projectileColor = "#fff";
    let path = [];

    function setup() {
      canvas = document.getElementById("canvas");
      ctx = canvas.getContext("2d");
      canvas.width = 1000;
      canvas.height = 600;

      document.getElementById("lanzarProyectil").addEventListener("click", function() {
        if (!projectileLaunched) {
          reiniciarSimulacion();
          launchProjectile();
        }
      });
      

      document.getElementById("reiniciar").addEventListener("click", function() {
        reiniciarSimulacion();
      });

      document.getElementById("masa").addEventListener("input", function() {
        masa = parseFloat(this.value);
      });

      document.getElementById("fuerza").addEventListener("input", function() {
        fuerza = parseFloat(this.value);
      });

      document.getElementById("launchAngle").addEventListener("input", function() {
        launchAngle = parseFloat(this.value);
        let energiaW = document.getElementById("flecha");
        energiaW.style.transform = `translateX(-50%) rotate(${-launchAngle}deg)`;
        document.getElementById("grados").innerHTML = `<span id="grados">${launchAngle}°</span>`;
      });
    }


    function draw() {
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (projectileLaunched) {
    updateProjectile();
    drawProjectile();

    if (reachedMaxDistance() || reachedGround()) {
      projectileLaunched = false;
      markingEnabled = false;
      drawProjectile(); // Dibujar el proyectil en la posición final
    }
  }

  if (markingEnabled) {
    document.getElementById("distanciaLabel").innerText = "Distancia recorrida: " + distance.toFixed(2) + " m";
    let canvasHeight = canvas.height;
    let canvasWidth = canvas.width;
    let energiaWHeight = energiaW.offsetHeight;
    let energiaWWidth = energiaW.offsetWidth;
    let bottomValue = canvasHeight * (launchAngle / 90) - energiaWHeight + (canvasHeight * 0.13); // Ajuste para centrar la flecha en el "palito"
    let leftValue = canvasWidth / 2 - energiaWWidth / 2; // Centrar horizontalmente
    energiaW.style.bottom = bottomValue + "px";
    energiaW.style.left = leftValue + "px";
  }
}

    function launchProjectile() {
      let centimeters_to_pixels = canvas.width / 50.0;
      x = 20 + 2 * centimeters_to_pixels;
      y = canvas.height - 20; // Posición inicial ajustada un poco más arriba
      let launchSpeedX = launchSpeed * Math.cos(launchAngle * Math.PI / 180);
      let launchSpeedY = -launchSpeed * Math.sin(launchAngle * Math.PI / 180);
      let factor = fuerza / 60.0;
      vx = launchSpeedX * factor;
      vy = launchSpeedY * factor;
      projectileLaunched = true;
      markingEnabled = true;
      path.push({x: x, y: y});
    }

    function reiniciarSimulacion() {
      distance = 0.00;
      projectileLaunched = false;
      markingEnabled = false;
      path = [];
      document.getElementById("distanciaLabel").innerText = "Distancia recorrida: 0 m";
    }

    function updateProjectile() {
      x += vx;
      y += vy;

      if (y <= 0) {
        vy = 0; // Detener movimiento vertical si alcanza la superficie
      } else {
        vy += gravity;
      }

      distance += (vx * (1 / masa) * fuerza) / 10;

      if (projectileLaunched) {
        path.push({x: x, y: y});
      }
    }

    function drawProjectile() {
      ctx.fillStyle = projectileColor;
      ctx.beginPath();
      ctx.arc(x, y, masa, 0, Math.PI * 2);
      ctx.fill();
    }

    function reachedMaxDistance() {
      return x >= maxDistance * (canvas.width / 50.0);
    }

    function reachedGround() {
      return y >= canvas.height;
    }

    setup();
    setInterval(draw, 10); 