import React from 'react'

const LocalSearch = ({ keyword, setKeyword }) => {

    const handeSearchChange = (e) => {
        e.preventDefault();
        setKeyword(e.target.value.toLowerCase());
    }

    return (
        <input
            type="search"
            placeholder="Поиск категории"
            onChange={handeSearchChange}
            value={keyword}
            className="form-control mb-4"
        />
    )
}

export default LocalSearch
