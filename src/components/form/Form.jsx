import React from "react";
import PropTypes from "prop-types";

import './form.scss'
const Form = (props) => {
  return (
    <>
      <form className="form-container">{props.children}</form>
    </>
  );
};

const FormGroup = (props) => {
  return (
    <>
      <div className={`form-group ${props.textError ? 'error' : null}`}>
        <label className="form-group__label" htmlFor={props.id}>{props.label}</label>
        <input
          className="form-group__input"
          type={props.type}
          name={props.name}
          id={props.id}
          placeholder=' '
        />
        {
          props.textError ? <span className="form-group__error">{props.textError}</span> : null
        }
        
      </div>
    </>
  );
};

Form.FormGroup = FormGroup

Form.propTypes = {};

FormGroup.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  textError: PropTypes.string
}
export default Form;
