import Productos from "./main.js";

const iniciaProductos = new Productos();
iniciaProductos.obtieneProductosCategoria(12, '.contenedor_ofertas');
iniciaProductos.obtieneResumenCarro();