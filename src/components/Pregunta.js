import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import Error from './Error';

const Pregunta = ({guardarPresupuesto, guardarRestante, actualizarPregunta}) => {

    //Definir los states
    const [cantidad, guardarCantidad] = useState(0);
    const [error, guardarError] = useState(false);

    //Submit para definir el presupuesto
    const agregarPresupuesto = e => {
        //Para que no envie el query string en la URL y que no recargue la pagina
        e.preventDefault();

        //Validar que se un numero positivo y que no sea NaN
        if (cantidad < 1 || isNaN(cantidad)) {
            guardarError(true);
            return;
        }

        //Si se pasa la validacion
        guardarError(false);
        guardarPresupuesto(cantidad);
        guardarRestante(cantidad);
        actualizarPregunta(false);

    }

    return (
        <Fragment>
            <h2>Coloca tu presupuesto</h2>

            { error ? <Error mensaje="Ingrese un valor valido" error/> : null }

            <form
                onSubmit={agregarPresupuesto}
            >
                <input
                    type="number"
                    className="u-full-width"
                    placeholder="Ingresa tu presupuesto"
                    //Funcion que lee el presupuesto definido por el usuario
                    //Convertimos lo que se ingresa de string a numero
                    //Actualizamos el state "cantidad" con guardarCantidad
                    onChange={ e => guardarCantidad(parseInt(e.target.value, 10))}
                />
                <input
                    type="submit"
                    className="button-primary u-full-width"
                    value="Definir presupuesto"
                />    
            </form>
        </Fragment>
    );
}

Pregunta.propTypes = {
    guardarPresupuesto: PropTypes.func.isRequired,
    guardarRestante: PropTypes.func.isRequired,
    actualizarPregunta: PropTypes.func.isRequired
}

export default Pregunta;