import React, {useState} from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid'
import Error from './Error';

const Formulario = ({guardarGasto, guardarCrearGasto}) => {

    const [nombre, guardarNombre] = useState('');
    const [cantidad, guardarCantidad] = useState('');
    const [error, guardarError] = useState(false);

    //Cuando el usuario agrega un gasto
    const agregarGasto = e => {
        //Prevenimos la accion por default, que es que mande un query string por el metodo GET.
        //Obligamos a que solo envie el formulario al presionar el boton y no haga otras acciones por default.
        e.preventDefault();

        //Validar
        if (cantidad < 1 || isNaN(cantidad) || nombre.trim() === '') {
            guardarError(true);
            return;
            }

        //En caso de pasar la validacion
        guardarError(false);

        //Construir el gasto
        const gasto = {
            nombre,
            cantidad,
            id: shortid.generate()
        }

        //Pasar el gasto al componente principal
        guardarGasto(gasto);
        guardarCrearGasto(true);

        //Resetear el formulario
        guardarNombre('');
        guardarCantidad('');
    }

    return (
        <form
            onSubmit={agregarGasto}
        >
            <h2>Agregar gasto</h2>

            { error ? <Error mensaje="No te olvides de completar todos los campos e ingresar un monto valido" error/> : null }

            <div className="campo">
                <label>Nombre del gasto</label>
                <input
                    type="text"
                    className="u-full-width"
                    placeholder="Ej. Transporte"
                    value={nombre}
                    onChange={ e => guardarNombre(e.target.value)}
                />
            </div>
            <div className="campo">
                <label>Valor del gasto</label>
                <input
                    type="number"
                    className="u-full-width"
                    placeholder="Ej. 300"
                    value={cantidad}
                    onChange={ e => guardarCantidad(parseInt(e.target.value), 10)}
                />
            </div>

            <input
                type="submit"
                className="button-primary u-full-width"
                value="Agregar gasto"
            />

        </form>
    );
}

Formulario.propTypes = {
    guardarGasto: PropTypes.func.isRequired,
    guardarCrearGasto: PropTypes.func.isRequired
}

export default Formulario;