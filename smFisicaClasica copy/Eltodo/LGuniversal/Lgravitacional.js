function calculateForce() {
    var G = 6.67; // Constante gravitacionaln y el .value es para que lo tome desde el input range 
    var m1 = document.getElementById('masa1').value;
    var m2 = document.getElementById('masa2').value;
    var r = document.getElementById('distancia').value;
    var force = (G * m1 * m2) / Math.pow(r, 2);
    

    // Esto es para aumentar la masa de los objetos visiblemente okis
   document.getElementById('objecto1').style.width = m1 + 'px';
    document.getElementById('objecto1').style.height = m1 + 'px';
    document.getElementById('objecto2').style.width = m2 + 'px';
    document.getElementById('objecto2').style.height = m2 + 'px';

    // Calcular posición de los objetos en el centro
    var containerWidth = document.querySelector('.contenido').offsetWidth; // esto es lo que me da el ancho del elemnto en pixeles
    var center = containerWidth / 2; // y el containerwidth es lo que lo guarda 
    var x1 = center - (m1 / 2);
    var x2 = center - (m2 / 2) + parseInt(r);
    document.getElementById('objecto1').style.left = x1 + 'px';
    document.getElementById('objecto2').style.left = x2 + 'px';
// toodo esto fuel para poder centrar ambos objetos independientemente de sus masas
    document.getElementById('distancia-display').textContent = r;
    document.getElementById('masa1-display').textContent = m1 + " kg";
    document.getElementById('masa2-display').textContent = m2 + " kg";
    document.getElementById('fuerza-calculo').innerHTML = `<p>La ley gravitacional es: <span id="fuerza-calcululo">${force.toFixed(2)} *10^-11 N </span></p>`;
}

document.getElementById('masa1').addEventListener('input', calculateForce);
document.getElementById('masa2').addEventListener('input', calculateForce);
document.getElementById('distancia').addEventListener('input', calculateForce);



calculateForce(); // Calcular fuerza inicial