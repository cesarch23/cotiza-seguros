
class Seguro {
    constructor(marca, year, tipo)
    {
        this.marca =  marca;
        this.year =  year;
        this.tipo =  tipo;
    }
    cotizar(){
        let base = 2000;
        let total= 0;
        switch(this.marca){
            case '1':
                total = base*1.15;
                break;
            case '2':
                total = base*1.05;
                break;
            case '3':
                total = base*1.35;
                break;
            default:
                total=base;
                break;
        }
        // la devaluacion anual del auto sera del 3%
        const now = new Date().getFullYear();
        const diferencia = now - parseInt(this.year);
        total = total - total*diferencia*0.03;
        // si el seguro es basico se incremente en 10%%
        // si el seguro es completo se incrementa en 50%
        if(this.tipo ==='Basico') total=total*(1.10);
        if(this.tipo ==='Completo') total=total*(1.50);
        
        return total;
    }
}
 

class UI{

    llenarOpciones(){
        const max = new Date().getFullYear(),
              min = max - 20;

        const selectYear = document.querySelector('#anio');
        for( let i = max; i>=min; i--){
            const option = document.createElement('OPTION');
            option.value = i;
            option.textContent = i;
            selectYear.appendChild(option);
        }
    }
    mostrarMensaje(message,type){
        const resultado = document.createElement('DIV');
        const reference = document.querySelector('#resultado')
        const seguroContent = document.querySelector('.seguro__content');
    
        resultado.textContent = message;
    
        if(type==='error') resultado.classList.add('error')
        if(type==='good')  resultado.classList.add('good');
        seguroContent.insertBefore(resultado,reference);
        setTimeout(() => {
            resultado.remove();
        }, 1000);
    }
    MostrarResultado(seguro,total){
        const div = document.createElement('DIV')
        div.innerHTML=`
            <div id="resumen" class="seguro__resultado">
                <h2 >Resultado</h2>
                <p class="seguro__año">Año de fabricación: ${seguro.year}</p>
                <p class="seguro__monto">Total. S/ ${total}</p>
            </div>
        `;
        const referencia = document.querySelector('#resultado');
        const spinner = document.querySelector('#spinner');
        spinner.style.display = 'block'
        setTimeout(()=>{
            spinner.style.display='none';
            referencia.appendChild(div);
        },1000)
    }
}




const ui = new UI();

document.addEventListener('DOMContentLoaded', ()=>{
    ui.llenarOpciones();
})

eventListeners();

function eventListeners(){
    const formulario = document.querySelector('#formulario');
    formulario.addEventListener('submit',cotizarSeguro);
}

function cotizarSeguro(e){
    e.preventDefault();
    // leer la marca y anio
    const marca = document.querySelector('#marca').value;
    const anio = document.querySelector('#anio').value;
    // leer el tipo 
    const tipo = document.querySelector('.seguro__field input[name="tipo"]:checked').value
    // validacion de datos
    if(marca==='' || anio === '' || tipo===''){
        ui.mostrarMensaje('Todos los campos son obligatorios','error');
        return;
    }
    ui.mostrarMensaje('cotizando... ','good');

    const resumen = document.querySelector('#resumen');
    if(resumen!=null) resumen.remove();

    const seguro = new Seguro(marca, anio,tipo)
    console.log(anio)
    const total = seguro.cotizar();
    ui.MostrarResultado(seguro,total)
    
    
}