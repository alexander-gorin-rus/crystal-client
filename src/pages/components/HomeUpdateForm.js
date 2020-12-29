import React from 'react'
import { Select } from 'antd';

const { Option } = Select;

const HomeUpdateForm = ({
    handleChange,
    handleSubmit,
    values
}) => {

    const {
        title,
        info,
        address,
        phone,
        email,
        images } = values;


    return (
        <form onSubmit={handleSubmit}>

            <div className="form-group">
                <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={title}
                    onChange={handleChange}
                    placeholder="Название компании"
                />
            </div>

            <div className="form-group">
                <input
                    type="textarea"
                    name="info"
                    className="form-control"
                    value={info}
                    onChange={handleChange}
                    placeholder="Текст о компании"
                />
            </div>

            <div className="form-group">
                <input
                    type="text"
                    name="address"
                    className="form-control"
                    value={address}
                    onChange={handleChange}
                    placeholder="Адрес"
                />
            </div>

            <div className="form-group">
                <input
                    type="text"
                    name="phone"
                    className="form-control"
                    value={phone}
                    onChange={handleChange}
                    placeholder="Телефон"
                />
            </div>

            <div className="form-group">
                <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={email}
                    onChange={handleChange}
                    placeholder="Объём"
                />
            </div>

            <button className="btn btn-outline-info mt-4">Отправить</button>

        </form>
    )
}

export default HomeUpdateForm
