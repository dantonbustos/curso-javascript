import Productos from "./main.js";

const iniciaProductos = new Productos();
iniciaProductos.obtieneProductosCategoria(0, '.contenedor_categoria');
iniciaProductos.obtieneResumenCarro();