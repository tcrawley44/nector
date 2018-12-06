import React from 'react'
import classnames from 'classnames';
import propTypes from 'prop-types';

const TextAreaFieldGroup = ({
    name,
    placeholder,
    value,
    
    error,
    info,
    
    onChange,
    
}) => {
  return (
    <div className="form-group">
        <textarea 
            
            className={classnames("form-control form-control-lg" )}
            placeholder={placeholder} 
            name={name}
            value = {value} 
            onChange = {onChange}
            
        />             
    </div>
  )
}

TextAreaFieldGroup.propTypes = {
    name: propTypes.string.isRequired,
    placeholder: propTypes.string,
    value: propTypes.string.isRequired,
    info: propTypes.string,
    error: propTypes.string,
    
    onChange: propTypes.func.isRequired, 
    
}



export default TextAreaFieldGroup;