import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';

const Search = () => {

    const dispatch = useDispatch();
    const { search } = useSelector((state) => ({ ...state }));
    const { text } = search;
    const history = useHistory();

    const handleChange = (e) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: e.target.value }
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push(`/result?${text}`)
    }

    return (
        <form className="form-inline my-2 my-lg-0" style={{ backgroundColor: "#fa87e3" }} onSubmit={handleSubmit} >
            <input
                onChange={handleChange}
                type="text"
                className="form-control mr-sm-2"
                value={text}
                placeholder="Поиск товара по названию"
            />

            <SearchOutlined onClick={handleSubmit} style={{ cursor: "pointer" }} />
        </form>
    )
}

export default Search
