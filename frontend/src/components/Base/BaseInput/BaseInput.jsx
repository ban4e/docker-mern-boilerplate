import React, { useState } from 'react';

function BaseInput({ label }) {
    const [value, setValue] = useState('');

    function handleChange(e) {
        setValue(e.target.value);
    }

    return (
        <div className="field">
            <div className="field__container">
                <fieldset className="field__fieldset">
                    <legend className="field__legend"></legend>
                </fieldset>
                <div className="field__entry">
                    <input type="text" value={ value } onChange={ handleChange } />
                    <label className="field__label">{ label }</label>
                </div>
            </div>
        </div>
    );
}

export default BaseInput;