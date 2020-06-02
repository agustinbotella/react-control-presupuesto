import React, {useState, useEffect} from 'react';
import Pregunta from './components/Pregunta';
import Formulario from './components/Formulario'
import Listado from './components/Listado';
import ControlPresupuesto from './components/ControlPresupuesto';

function App() {

  //Definir states
  const [presupuesto, guardarPresupuesto] = useState(0);
  const [restante, guardarRestante] = useState(0);
  const [mostrarpregunta, actualizarPregunta] = useState(true);
  const [gastos, guardarGastos] = useState([]);
  const [gasto, guardarGasto] = useState({});
  const [creargasto, guardarCrearGasto] = useState(false);

  //useEffect que actualiza el restante
  useEffect(() => {
    //Funcion que se ejecuta al agregar un nuevo gasto
    //Usamos corchetes porque es un arreglo.
    //Como dependencia le pasamos el gasto [gasto]
    //Tomamos una copia de gastos y le agregamos le gasto. Luego guardamos.
    //Usamos un condicional y lo ejecutamos solo si creargasto es true. Caso contrario no ejecutamos nada.
    if (creargasto) {
    guardarGastos([...gastos, gasto]);

    //Resta del presupuesto actual
    const presupuestoRestante = restante - gasto.cantidad;
    guardarRestante(presupuestoRestante);

    //Reseteamos creargasto a false
    guardarCrearGasto(false);
    }
  }, [gasto, creargasto, gastos, restante]);

  return (
    <div className="container">
      <header>
        <h1>Gasto Semanal</h1>
        <div className="contenido-principal contenido">

            { 
            //Utilizamos un ternario. Si mostrarpregunta es true se muestra la pregunta. Si no se muestra el resto pero
            //sin la pregunta
            mostrarpregunta ? 
            (
              <Pregunta
                guardarPresupuesto={guardarPresupuesto}
                guardarRestante={guardarRestante}
                actualizarPregunta={actualizarPregunta}
              />
            )
            : 
            (
                <div className="row">
                  <div className="one-half column">
                      <Formulario
                      guardarGasto={guardarGasto}
                      guardarCrearGasto={guardarCrearGasto}
                      />
                  </div>
                <div className="one-half column">
                      <Listado
                          gastos={gastos}
                      />
                      <ControlPresupuesto
                          presupuesto={presupuesto}
                          restante={restante}
                      />
                </div>
                </div>
            )}

        </div>
        
      </header>
    </div>
  );
}

export default App;
