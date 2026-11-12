class LoteTela{
    constructor(id, tipoFibra, kilogramos){
        this.id = id;
        this.tipoFibra = tipoFibra;
        this.kilogramos = kilogramos;
    }

    calcularAgua(){
        if(this.tipoFibra === "algodon"){
            return this.kilogramos * 10000;
        }else if(this.tipoFibra === "poliester"){
            return this.kilogramos * 300;
        }
        return 0;
    }
}

const seleccionDeFibra = document.getElementById("tipoFibra");
const cantidadKilosTela = document.getElementById("kilosTela");
const btnCalcular = document.getElementById("btnCalcular");
const lblAguaTotal = document.getElementById("aguaTotal");
const listaHistorial = document.getElementById("historialLotes");

document.addEventListener("DOMContentLoaded", () => {
    renderizadoHistorialYTotal();
});

btnCalcular.addEventListener("click", registrarLote);

function registrarLote(){
    const tipo = seleccionDeFibra.value;
    const kilos = parseFloat(cantidadKilosTela.value);

    if(isNaN(kilos)||kilos<=0){
        alert("Ingresa una cantidad valida de kilogramos apa.");
        return;
    }
    const lotes = obtenerLotesGuardados();
    const nuevoId = `LOTE-${lotes.length + 1}`;
    const nuevoLote = new LoteTela(nuevoId, tipo, kilos);

    lotes.push(nuevoLote);

    localStorage.setItem("historialLotesTextil", JSON.stringify(lotes));

    renderizadoHistorialYTotal();

    cantidadKilosTela.value = "";
    cantidadKilosTela.focus();
}

function obtenerLotesGuardados() {
    const datos = localStorage.getItem("historialLotesTextil");
    return datos ? JSON.parse(datos) : [];
}

function renderizadoHistorialYTotal() {
    const lotes = obtenerLotesGuardados();
    listaHistorial.innerHTML = "";
    
    let aguaAcumuladaTotal = 0;

    lotes.forEach((loteData) => {
        const lote = new LoteTela(loteData.id, loteData.tipoFibra, loteData.kilogramos);
        const aguaLote = lote.calcularAgua();

        aguaAcumuladaTotal += aguaLote;

        const itemLista = document.createElement("li");
        itemLista.className = "list-group-item bg-secondary text-white d-flex justify-content-between align-items-center mb-2 rounded";
        
        itemLista.innerHTML = `
            <div>
                <strong>${lote.id}</strong> (${lote.tipoFibra.toUpperCase()}) - ${lote.kilogramos} kg<br>
                <small>Consumo: ${aguaLote.toLocaleString()} Litros</small>
            </div>
            <span class="badge bg-info text-dark">${aguaLote.toLocaleString()} L</span>
        `;
        listaHistorial.appendChild(itemLista);
    });

    lblAguaTotal.textContent = aguaAcumuladaTotal.toLocaleString();
}