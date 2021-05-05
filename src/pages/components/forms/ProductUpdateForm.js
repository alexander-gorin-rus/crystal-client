import React from 'react'
import { Select } from 'antd';

const { Option } = Select;

const ProductUpdateForm = ({
    handleChange,
    handleSubmit,
    handleCategoryChange,
    //setValues,
    // showSub, 
    //subOptions,
    //arrayOfSubs,
    //setArrayOfSubs,
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
        //images 
    } = values;


    return (
        <form onSubmit={handleSubmit}>

            <div className="form-group">
                <label className="label text-danger">Название продукта</label>
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
                <label className="label text-danger">Описание продукта</label>
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
            <label className="label text-danger">Полное описание продукта</label>
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
            <label className="label text-danger">Цена</label>
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
                <label className="label text-danger">Объем тары</label>
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
            <label className="label text-danger">Количество</label>
                <input
                    type="number"
                    name="quantity"
                    className="form-control"
                    value={quantity}
                    onChange={handleChange}
                    placeholder="Количество"
                />
            </div>

            <label className="label text-danger">Категория</label>
            <h6 className="text-center">Выбрать категорию</h6>

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

            {/* <Select> of antd works not in the same way as HTML <select> tag. See comments in ProductUpdate component from line 47 */}

            {/* <div>
                <h6 className="mt-3 text-center">Выбрать подкатегорию</h6>
                
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
