const divisas = [
    {divisa: 'CLP', valor : 1},
    {divisa: 'USD', valor : 0.00113273},
    {divisa: 'EUR', valor : 0.0010}
]
divisas.push({divisa: 'SOL', valor : 0.0042});
function formulaConversion(hacia, desde, monto){
    const indice_d = divisas.map(e => e.divisa).indexOf(desde);
    const indice_h = divisas.map(e => e.divisa).indexOf(hacia);
    let res_divisa = 0;
    if(desde == 'CLP'){
        res_divisa = (monto * divisas[indice_d].valor)/divisas[indice_h].valor;
    }else{
        res_divisa = (monto * divisas[indice_d].valor);
    }
    return monto + " " + hacia  + " son " + res_divisa.toFixed(2) + " " + desde;
}
const div_o = prompt("Ingrese la divisa origen: CLP - USD - EUR - SOL (La conversión siempre será desde o hacia CLP)");
let div_d = 'CLP';
if(div_o == 'CLP'){
    div_d = prompt("Ingrese la divisa destino: USD - EUR - SOL");
}
const monto = parseInt(prompt("Ingrese el monto que desea convertir"));
console.log(formulaConversion(div_o, div_d, monto));

