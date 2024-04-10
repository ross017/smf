const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const sun = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 60,
    color: '#ffdb58'
  };

  const planets = [
    { name: 'Mercurio', radius: 4.88, period: 0.60, color: '#a9a9a9', direction: 1, speedMultiplier: 1 },
    { name: 'Venus', radius: 12.1, period: 0.62, color: '#ffe4b5', direction: 1, speedMultiplier: 1 },
    { name: 'Tierra', radius: 12.74, period: 1, color: '#4682b4', direction: 1, speedMultiplier: 1 },
    { name: 'Marte', radius: 6.78, period: 1.88, color: '#ff6347', direction: 1, speedMultiplier: 1 }
  ];

  const moon = {
    name: 'Luna',
    radius: 3.474,
    period: 0.20,
    color: '#d3d3d3',
    direction: 1,
    speedMultiplier: 1
  };

  let isPaused = false;

  function drawSun() {
    ctx.beginPath();
    ctx.arc(sun.x, sun.y, sun.radius, 0, Math.PI * 2);
    ctx.fillStyle = sun.color;
    ctx.fill();
  }

  function drawPlanet(planet, index) {
    const angle = (Date.now() / (planet.period * 1000) % (Math.PI * 2)) * planet.direction;
    const distance = 120 + planet.radius * 10;

    const planetX = sun.x + Math.cos(angle) * distance;
    const planetY = sun.y + Math.sin(angle) * distance;

    ctx.beginPath();
    ctx.arc(planetX, planetY, planet.radius, 0, Math.PI * 5);
    ctx.fillStyle = planet.color;
    ctx.fill();

    ctx.fillStyle = '#fff';
    ctx.fillText(planet.name, planetX - planet.radius, planetY + planet.radius + 10);

    ctx.beginPath();
    ctx.strokeStyle = planet.color;
    ctx.arc(sun.x, sun.y, distance, 0, Math.PI * 2);
    ctx.stroke();

    if (index === 2) {
      const moonAngle = (Date.now() / (moon.period * 1000) % (Math.PI * 2)) * moon.direction;
      const moonDistance = 20 + moon.radius * 2;
      const moonX = planetX + Math.cos(moonAngle) * moonDistance;
      const moonY = planetY + Math.sin(moonAngle) * moonDistance;
      ctx.beginPath();
      ctx.arc(moonX, moonY, moon.radius, 0, Math.PI * 2);
      ctx.fillStyle = moon.color;
      ctx.fill();
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSun();
    planets.forEach((planet, index) => drawPlanet(planet, index));
    if (!isPaused) {
      requestAnimationFrame(draw);
    }
  }

  draw();

  document.getElementById('pausar').addEventListener('click', function() {
    isPaused = !isPaused;
    if (!isPaused) {
      draw();
    }
  });

  document.getElementById('reiniciar').addEventListener('click', function() {
    isPaused = false;
    draw();
  });
