import React from 'react'


const HomeUpdateForm = ({
    handleChange,
    handleSubmit,
    values
}) => {

    const {
        title,
        info,
        fullInfo,
        address,
        phone,
        email,
        iin,
        responsiblePerson,
        appendix,
        images } = values;


    return (
        <form onSubmit={handleSubmit}>

            <div className="form-group">
                <label className="text-center text-primary">Название компании</label>
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
                <label className="text-center text-primary">Текст для бегущей строки</label>
                <input
                    type="textarea"
                    name="info"
                    className="form-control"
                    value={info}
                    onChange={handleChange}
                    placeholder="Текст для бегущей строки"
                />
            </div>

            <div className="form-group">
                <label className="text-center text-primary"> текст о компании</label>
                <input
                    type="textarea"
                    name="fullInfo"
                    className="form-control"
                    value={fullInfo}
                    onChange={handleChange}
                    placeholder="Полный текст о компании"
                />
            </div>


            <div className="form-group">
                <label className="text-center text-primary">Адрес</label>
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
                <label className="text-center text-primary">Телефон</label>
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
                <label className="text-center text-primary">Email</label>
                <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={email}
                    onChange={handleChange}
                    placeholder="Email"
                />
            </div>

            <div className="form-group">
                <label className="text-center text-primary">ИИН</label>
                <input
                    type="text"
                    name="iin"
                    className="form-control"
                    value={iin}
                    onChange={handleChange}
                    placeholder="ИИН"
                />
            </div>

            <div className="form-group">
                <label className="text-center text-primary">Ответственное лицо</label>
                <input
                    type="text"
                    name="responsiblePerson"
                    className="form-control"
                    value={responsiblePerson}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label className="text-center text-primary">Для шапки в накладной</label>
                <input
                    type="text"
                    name="appendix"
                    className="form-control"
                    value={appendix}
                    onChange={handleChange}
                />
            </div>

            <button className="btn btn-outline-info mt-4">Отправить</button>

        </form>
    )
}

export default HomeUpdateForm
