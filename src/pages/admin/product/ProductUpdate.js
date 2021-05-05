import React, { useState, useEffect } from 'react';
import AdminNav from '../AdminNav';
import ProductUpdateForm from '../../components/forms/ProductUpdateForm';
import FileUpload from '../../components/forms/FileUpload';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getCategories, getCategorySubs } from '../../../functions/categories';
import { getProduct, updateProduct } from '../../../functions/product';
import { LoadingOutlined } from '@ant-design/icons';



const ProductUpdate = ({ match, history }) => {

    const initialState = {
        title: "",
        description: "",
        fullDescription: "",
        category: "",
        subs: [],
        price: "",
        volume: "",
        quantity: "",
        images: []
    }

    const [values, setValues] = useState(initialState);
    const [categories, setCategories] = useState([])
    //const [subOptions, setSubOptions] = useState([]);
    const [arrayOfSubs, setArrayOfSubs] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("")
    //const [showSub, setShowSub] = useState(false);
    const [loading, setLoading] = useState(false)

    //router
    let { slug } = match.params;

    useEffect(() => {
        loadProduct();
        loadCategories();
    }, []);

    const loadProduct = () => {
        getProduct(slug)
            .then(p => {
                //console.log('single product is', p);

                //in order to fetch sub categories with <Select> tag of antd design
                //we need to get array of ids of sub categories. To do this we need to make several steps:

                //step 1 is to get single product
                setValues({ ...values, ...p.data });
                //step 2 load single product category subs
                // getCategorySubs(p.data.category._id)
                //     .then(res => {
                //         setSubOptions(res.data) //on first load, show default subs
                //     });
                // //step 3 prepare array of subs ids to show as default sub values in antd Select
                // let arr = [];
                // p.data.subs.map((s) => {
                //     arr.push(s._id);
                // });
                // console.log("sub ids are", arr)
                // setArrayOfSubs((prev) => arr) //required for antd design <Select> to work
            })
    }

    const loadCategories = () =>
        getCategories()
            .then((c) => {
                setCategories(c.data)
            })


    const { user } = useSelector((state) => ({ ...state }));

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        values.subs = arrayOfSubs;
        values.category = selectedCategory ? selectedCategory : values.category;

        updateProduct(slug, values, user.token)
            .then(res => {
                setLoading(false);
                console.log(res);
                toast.success(`Продукт ${res.data.title} успешно изменен`)
                history.push('/admin/products')
            }).catch(err => {
                setLoading(false);
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
        setValues({ ...values, subs: [] });

        setSelectedCategory(e.target.value);

        // getCategorySubs(e.target.value)
        //     .then(res => {
        //         console.log('sub category options', res)
        //         setSubOptions(res.data);
        //         //setShowSub(true)
        //     });

        //if admin clicks back to the original category
        //show its sub categories in default
        if (values.category._id === e.target.value) {
            loadProduct()
        }

        //Clear old sub category id
        //setArrayOfSubs([]);
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>

                <div className="col-md-10">
                    {loading ? (<LoadingOutlined className="text-danger h1" />) : (<h5 className="text-center mt-3">Изменить продукт</h5>)}
                    <div className="p-3">
                        <FileUpload
                            values={values}
                            setValues={setValues}
                            setLoading={setLoading}
                        />
                        <ProductUpdateForm
                            handleSubmit={handleSubmit}
                            handleChange={handleChange}
                            handleCategoryChange={handleCategoryChange}
                            values={values}
                            setValues={setValues}
                            categories={categories}
                            //subOptions={subOptions}
                            arrayOfSubs={arrayOfSubs}
                            setArrayOfSubs={setArrayOfSubs}
                            selectedCategory={selectedCategory}
                        // showSub={showSub}
                        />
                    </div>


                </div>
            </div>
        </div>
    )
}

export default ProductUpdate
