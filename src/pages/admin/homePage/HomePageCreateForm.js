import React from 'react'

const HomePageCreateForm = ({ handleChange, handleSubmit, values }) => {

    const {
        title,
        info,
        address,
        phone,
        email
    } = values
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
                <textarea
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
                    placeholder="адрес"
                />
            </div>

            <div className="form-group">
                <input
                    type="text"
                    name="phone"
                    className="form-control"
                    value={phone}
                    onChange={handleChange}
                    placeholder="телефон"
                />
            </div>

            <div className="form-group">
                <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={email}
                    onChange={handleChange}
                    placeholder="email"
                />
            </div>

            <button className="btn btn-outline-info mt-4">Отправить</button>

        </form>
    )
}

export default HomePageCreateForm
