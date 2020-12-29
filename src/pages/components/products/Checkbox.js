import React, { useState, Fragment } from 'react'

const Checkbox = (props) => {
    const [checked, setChecked] = useState([]);

    const handleToggle = value => {
        //return the first index or -1
        const currentIndex = checked.indexOf(value)
        const newChecked = [...checked]

        // if currently checked was not already in the checked state > push
        // else pull/take off
        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }
        //console.log(newCheckedCategoryId);
        setChecked(newChecked);
        props.handleFilters(newChecked)
    }

    const renderCheckboxList = () => props.list && props.list.map((value, index) => (
        <Fragment key={index}>
            <li className="list-unstyled">
                <input
                    onChange={() => handleToggle(value._id)}
                    value={checked.indexOf(value._id === -1)}
                    type="checkbox"
                    className="form-check-input" />
                <label className="form-checkbox">{value.name}</label>
            </li>

        </Fragment>

    ))
    return (
        <div>
            {renderCheckboxList()}
        </div>

    )

}

export default Checkbox

