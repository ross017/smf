const carrusel = document.querySelector(".carrusel");


const dragging = (e) => {
    carrusel.scrollLeft = e.pageX;
    

}

carrusel.addEventListener("mousemove", dragging);
/* se supoia que eston seria un loop eterno pero ya estaba media cansada 
y pues hice esta forma corta con el dragging que vendrian siendo cada que se 
arrastre el mouse pues se muevan las cartas de presentacion, ya luego se le agrega 
la funcionalidad a los botones, pero por el momento creo que con un dragging resolvemos. */