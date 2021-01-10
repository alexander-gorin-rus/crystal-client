import React from 'react'

const BackgroundPageCreateForm = ({ handleChange, clickSubmit, values }) => {

    const { title, url, text } = values;

    return (
        <form className="mb-3 flex" onSubmit={clickSubmit}>

            <div className="form-group">
                <label className="text-center">Название фонового изображения " оно должно быть коротким ".
                                <br />
                    <br />
                    <p className="text-danger">Оно обязательно, так как программа будет искать фоновое изображение по названию для редактирования или удаления</p></label>
                <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={title}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label className="text-center">Гипер ссылка для фонового изображения</label>
                <input className='form-control'
                    onChange={handleChange}
                    type="url"
                    name="url"
                    className='form-control'
                    value={url} />
            </div>
            <div className="form-group">
                <label className="text-center">Текст для фонового изображения " не обязательно "
                                <br />
                    <br />
                    <p className="text-primary">Этот текст можно создавать на праздники, например на 8 марта ты поменяешь фон на весенний, и можно добавить поздравительный текст </p>
                </label>
                <input className='form-control'
                    onChange={handleChange}
                    type="text"
                    name="text"
                    className='form-control'
                    value={text} />
            </div>

            <button className='btn btn-outline-primary'>Оправить</button>
        </form>

    )
}

export default BackgroundPageCreateForm
