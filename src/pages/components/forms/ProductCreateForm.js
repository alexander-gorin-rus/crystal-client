import React from 'react'
import { Select } from 'antd';

const { Option } = Select;

const ProductCreateForm = ({ handleChange, handleSubmit, handleCategoryChange, setValues, showSub, subOptions, values }) => {

    const {
        title,
        description,
        fullDescription,
        category,
        categories,
        subs,
        price,
        volume,
        quantity,
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
                    placeholder="Название продукта"
                />
            </div>

            <div className="form-group">
                <input
                    type="text"
                    name="description"
                    className="form-control"
                    value={description}
                    onChange={handleChange}
                    placeholder="Краткое описание"
                />
            </div>

            <div className="form-group">
                <input
                    type="text"
                    name="fullDescription"
                    className="form-control"
                    value={fullDescription}
                    onChange={handleChange}
                    placeholder="Полное описание"
                />
            </div>

            <div className="form-group">
                <input
                    type="number"
                    name="price"
                    className="form-control"
                    value={price}
                    onChange={handleChange}
                    placeholder="Цена"
                />
            </div>

            <div className="form-group">
                <h6 className="bg-danger text-center p-3">Внимание: объём тары должен быть указан в миллилитрах</h6>
                <input
                    type="number"
                    name="volume"
                    className="form-control"
                    value={volume}
                    onChange={handleChange}
                    placeholder="Объём"
                />
            </div>

            <div className="form-group">
                <input
                    type="number"
                    name="quantity"
                    className="form-control"
                    value={quantity}
                    onChange={handleChange}
                    placeholder="Количество"
                />
            </div>

            <h6 className="text-center">Выбрать категорию</h6>

            <select
                name="category"
                className="form-control bg-primary text-light"
                onChange={handleCategoryChange}
            >
                <option>Выбрать категорию</option>
                {categories.length > 0 &&
                    categories.map((c) =>
                        <option
                            key={c._id}
                            value={c._id}
                        >{c.name}
                        </option>)}
            </select>

            { showSub && (
                <div>
                    <h6 className="mt-3 text-center">Выбрать подкатегорию</h6>
                    <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="Выбрать подкатегорию"
                        value={subs}
                        onChange={(value) => setValues({ ...values, subs: value })}
                    >
                        {subOptions.length && subOptions.map((s) => (
                            <Option
                                key={s._id}
                                value={s._id}
                            >
                                {s.name}
                            </Option>))}

                    </Select>
                </div>
            )}

            <button className="btn btn-outline-info mt-4">Отправить</button>

        </form>
    )
}

export default ProductCreateForm
