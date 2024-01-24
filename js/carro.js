import Productos from "./main.js";

const vaciaCarro = document.querySelector('#vaciaCarro');
vaciaCarro.addEventListener('click', function() {
    if(confirm("Seguro que desea vaciar el carro de compras?.")){
        const iniciaProductos = new Productos();
        iniciaProductos.limpiaCarro();
        location.reload();
    }
});

const iniciaProductos = new Productos();
iniciaProductos.obtieneCarroCompras();