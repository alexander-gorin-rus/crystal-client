import React, { useState, useEffect } from 'react';
import AdminNav from '../AdminNav';
import AdminProductCard from '../../components/cards/AdminProductCard';
import { getProductsByCount, removeProduct } from '../../../functions/product';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        loadAllProducts()
    }, []);

    const { user } = useSelector((state) => ({ ...state }));

    const loadAllProducts = () => {
        setLoading(true)
        getProductsByCount(100)
            .then((res) => {
                setProducts(res.data)
                setLoading(false)
            })
            .catch((err) => console.log(err))
    }

    const handleRemove = (slug) => {
        const answer = window.confirm(`Макс, ты точно хочешь удалить продукт ${slug} ?`);
        if (answer) {
            //console.log('The product to be deleted is', slug)
            removeProduct(slug, user.token)
                .then(res => {
                    loadAllProducts();
                    toast.success(`Продукт ${res.data.title} успешно удален`);
                })
                .catch(err => {
                    console.log(err);
                    setLoading(false);
                    if (err.response.status === 400) toast.error(`Не удалось удалить продукт ${slug}`);
                })
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    {loading ? (<h4 className="text-danger text-center mt-4">Загружаю...</h4>) : (<h4 className="text-center mt-4">Вся продукция</h4>)}
                    <div className="row">

                        {products.map(product =>
                            <div className="col-md-4 pb-3" key={product._id}>
                                <AdminProductCard product={product} handleRemove={handleRemove} />
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageProducts
