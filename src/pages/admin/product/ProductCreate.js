import React, { useState, useEffect } from 'react';
import AdminNav from '../AdminNav';
import ProductCreateForm from '../../components/forms/ProductCreateForm';
import FileUpload from '../../components/forms/FileUpload';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getCategories, getCategorySubs } from '../../../functions/categories';
import { createProduct } from '../../../functions/product';
import { LoadingOutlined } from '@ant-design/icons';



const ProductCreate = () => {


    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = () => {
        getCategories().then(c => setValues({ ...values, categories: c.data }));
    }

    const initialState = {
        title: "",
        description: "",
        fullDescription: "",
        category: "",
        categories: [],
        subs: [],
        price: "",
        volume: "",
        quantity: "",
        nn: "",
        images: []
    }

    const [values, setValues] = useState(initialState);
    const [subOptions, setSubOptions] = useState([]);
    const [showSub, setShowSub] = useState(false);
    const [loading, setLoading] = useState(false)

    const { user } = useSelector((state) => ({ ...state }));

    const handleSubmit = (e) => {
        e.preventDefault();
        createProduct(values, user.token)
            .then(res => {
                console.log(res);
                window.alert(`Продукт "${res.data.title}" успешно создан`);
                window.location.reload();
            }).catch(err => {
                console.log(err)
                toast.error(err.response.data.err)
            })
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleCategoryChange = (e) => {
        e.preventDefault();
        console.log('the choosen category', e.target.value);
        setValues({ ...values, subs: [], category: e.target.value });
        getCategorySubs(e.target.value)
            .then(res => {
                console.log('sub category options', res)
                setSubOptions(res.data);
                setShowSub(true)
            })
            .catch()
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>

                <div className="col-md-10">
                    {loading ? (<LoadingOutlined className="text-danger h1" />) : (<h5 className="text-center mt-3">Создать продукт</h5>)}
                    <div className="p-3">
                        <FileUpload
                            values={values}
                            setValues={setValues}
                            setLoading={setLoading}
                        />
                    </div>

                    <ProductCreateForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        handleCategoryChange={handleCategoryChange}
                        values={values}
                        setValues={setValues}
                        subOptions={subOptions}
                        showSub={showSub}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProductCreate
