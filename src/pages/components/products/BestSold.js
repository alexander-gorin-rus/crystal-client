import React, { useState, useEffect } from 'react';
import { getProducts, getProductsCount } from '../../../functions/product';
import UserProductCard from '../cards/UserProductCard';
import LoadingCard from '../../components/cards/LoadingCard';
import { Pagination } from 'antd';

const BestSold = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [productsCount, setProductsCount] = useState(0);
    const [page, setPage] = useState(1)

    useEffect(() => {
        loadAllProducts();
    }, [page]);

    useEffect(() => {
        getProductsCount().then((res) => setProductsCount(res.data))
    }, [])


    const loadAllProducts = () => {
        setLoading(true);
        // sort, order, limit
        getProducts("sold", "desc", page).then((res) => {
            setProducts(res.data);
            setLoading(false);
        });
    };
    return (
        <>
            <div className="container">
                {loading ? (<LoadingCard count={6} />) : (
                    <div className="row">
                        {products.map((product) =>
                            <div className="col-md-4" key={product._id}>
                                <UserProductCard product={product} />
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div className="row">
                <div className="col-md-3 offset-md-4 text-center pt-2 p-3">
                    <Pagination
                        current={page}
                        total={(productsCount / 4) * 10}
                        onChange={(value) => setPage(value)}
                    />
                </div>
            </div>
        </>
    )
}

export default BestSold
