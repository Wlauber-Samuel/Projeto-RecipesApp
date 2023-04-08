import React from 'react';
import { PropTypes } from 'prop-types';

function Erro({ message }) {
  return (
    <div>
      <h2>Não foi possível acessar o servidor. Verifique a conexão.</h2>
      <p>{message}</p>
    </div>
  );
}

Erro.propTypes = {
  message: PropTypes.string,
}.isRequired;

export default Erro;
