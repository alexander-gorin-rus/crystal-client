import React from 'react'

const BackgroundPageUpdateForm = ({ handleChange, handleSubmit, values, setValues }) => {

    const { title, url, text } = values

    return (
        <div className="mt-5">
            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label className="text-center text-primary">Название фонового изображения</label>
                    <input
                        type="text"
                        name="title"
                        className="form-control"
                        value={title}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label className="text-center text-primary">Адрес в интернете фонового изображения</label>
                    <input
                        type="url"
                        name="url"
                        className="form-control"
                        value={url}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label className="text-center text-primary">Текст фонового изображения</label>
                    <input
                        type="text"
                        name="text"
                        className="form-control"
                        value={text}
                        onChange={handleChange}
                        placeholder="Текст о компании"
                    />
                </div>
                <button className="btn btn-outline-info mt-4">Отправить</button>

            </form>
        </div>

    )
}

export default BackgroundPageUpdateForm
