// Funciones de primer orden: nos permite recibir

function iterador(desde, hasta, accion) {
    for (let i = desde; i <= hasta; i++){
        accion(i);
    }
}

iterador(1, 10, i => {
    console.log(`Iteración ${i}`);
});

// funtion fun0hasta2(i)
const fun0hasta2 = i => {
    alert(`Hola # ${i}`);
};

iterador(0,2, fun0hasta2);

// CLOSURES

function hacerSumador(numASumar) {
    let suma = 0;
    const funcionResulrado = () => {
       suma += numASumar;
       console.log(`Suma a ${numASumar} esta en ${suma}`);
    }
    return funcionResulrado
}

const sumador1 = hacerSumador(1);
const sumador2 = hacerSumador(2);

sumador1();
sumador1();
sumador2();
sumador2();

setTimeout(() => {
    console.log('Timeout ejecutado');
}, 1500);

console.log('Mensaje despues de la definición del timeout');

function procesoTardado(tiempoSegundos, nmobreProceso) {
    const tiempoMilisegundos = tiempoSegundos * 1000;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Proceso ${nmobreProceso} terminado`);
            resolve(tiempoMilisegundos);
        }, tiempoMilisegundos);
    });
}

console.log('Empieza Proc01');
procesoTardado(5, 'Proc01')
    .then(resultado => {
        console.log('Esto se ejecuta despues que se termina Proc01');
        console.log(`'Proc01 nos regreso -> ${resultado}'`);
    });

console.log('Termino Proc01??');
