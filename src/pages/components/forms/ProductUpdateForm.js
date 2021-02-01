import React from 'react'
import { Select } from 'antd';

const { Option } = Select;

const ProductUpdateForm = ({
    handleChange,
    handleSubmit,
    handleCategoryChange,
    setValues,
    // showSub, 
    //subOptions,
    arrayOfSubs,
    setArrayOfSubs,
    selectedCategory,
    categories,
    values
}) => {

    const {
        title,
        description,
        fullDescription,
        category,
        //subs,
        price,
        volume,
        quantity,
        nn,
        //images 
    } = values;


    return (
        <form onSubmit={handleSubmit}>

            <div className="form-group">
                <label className="text-center text-info">Название продукта</label>
                <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={title}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label className="text-center text-info">Краткое описание продукта</label>
                <input
                    type="text"
                    name="description"
                    className="form-control"
                    value={description}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label className="text-center text-info">Полное описание продукта</label>
                <input
                    type="text"
                    name="fullDescription"
                    className="form-control"
                    value={fullDescription}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label className="text-center text-info">Цена</label>
                <input
                    type="number"
                    name="price"
                    className="form-control"
                    value={price}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label className="text-center text-info">Объём тары</label>
                <h6 className="bg-danger text-center p-3">Внимание: объём тары должен быть указан в миллилитрах</h6>
                <input
                    type="number"
                    name="volume"
                    className="form-control"
                    value={volume}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label className="text-center text-info">Количество</label>
                <input
                    type="number"
                    name="quantity"
                    className="form-control"
                    value={quantity}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label className="text-center text-info">Номенклатурный номер</label>
                <input
                    type="text"
                    name="nn"
                    className="form-control"
                    value={nn}
                    onChange={handleChange}
                />
            </div>

            <label className="text-center text-info">Выбрать категорию</label>

            <select
                name="category"
                className="form-control bg-primary text-light"
                onChange={handleCategoryChange}
                value={selectedCategory ? selectedCategory : category._id}
            >
                {categories.length > 0 &&
                    categories.map((c) =>
                        <option
                            key={c._id}
                            value={c._id}
                        >{c.name}
                        </option>)}
            </select>

            {/* <div>
                <label className="text-center text-info mt-4">Выбрать подкатегорию</label>
                <Select> of antd works not in the same way as HTML <select> tag. See comments in ProductUpdate component from line 47
                <Select
                    mode="multiple"
                    style={{ width: "100%" }}
                    placeholder="Выбрать подкатегорию"
                    value={arrayOfSubs}
                    onChange={(value) => setArrayOfSubs(value)}
                >
                    {subOptions.length && subOptions.map((s) => (
                        <Option
                            key={s._id}
                            value={s._id}
                        >
                            {s.name}
                        </Option>))}

                </Select>
            </div> */}


            <button className="btn btn-outline-info mt-4">Отправить</button>

        </form>
    )
}

export default ProductUpdateForm
