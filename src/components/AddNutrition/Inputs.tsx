import React from 'react'
import addStyle from './style'


function Inputs({ id, onChange, type, label, value, name, form }) {
    return (
        <div className="m3">
            <label className={addStyle.labels} htmlFor={name}>{label}</label>
            <input type={type} value={value} name={name} id={id} onChange={(e) => {
                onChange({ ...form, [name]: type == "text" ? e.target.value : +e.target.value })
            }
            } className={addStyle.inputs} />
        </div>
    )
}

export default Inputs;
