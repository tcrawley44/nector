import React from 'react'
import classnames from 'classnames';
import propTypes from 'prop-types';
import "./fieldStyles.css";
const TextFieldGroup = ({
    name,
    placeholder,
    value,
    label, 
    error,
    info,
    type,
    onChange,
    disabled
}) => {
  return (
    <div className="form-group">
        <input 
            
            autoComplete = "new-password"
            type={type}
            className={classnames("form-control form-control-lg" )}
            placeholder={placeholder} 
            name={name}
            value = {value} 
            onChange = {onChange}
            disabled = {disabled}
            
        />             
    </div>
  )
}

TextFieldGroup.propTypes = {
    name: propTypes.string.isRequired,
    placeholder: propTypes.string,
    value: propTypes.string.isRequired,
    info: propTypes.string,
    
    error: propTypes.string,
    type: propTypes.string.isRequired,
    onChange: propTypes.func.isRequired, 
    disabled: propTypes.string
}

TextFieldGroup.defaultProps = {
    type: 'text'
}

export default TextFieldGroup;