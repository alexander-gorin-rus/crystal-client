import React, { useState } from 'react'

const Radiobox = (props) => {
    const [Value, setValue] = useState('0')

    const handleChange = (event) => {
        setValue(event.target.value)
        props.handleFilters(event.target.value)
    }

    return props.list.map((p, i) => (
        <div key={i} >
            <input
                onChange={handleChange} value={Value}
                value={`${p._id}`}
                name={p}
                type="radio"
                className="mr-2 ml-4" />
            <label className="form-check-label form-checkbox">{p.name}</label>
        </div>
    ))
}

export default Radiobox