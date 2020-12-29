import React, { useState, useEffect } from 'react';
import { getCategory } from '../../functions/categories';
import UserProductCard from '../components/cards/UserProductCard';

const Category = ({ match }) => {

    const [category, setCategory] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const { slug } = match.params

    useEffect(() => {
        setLoading(true)
        getCategory(slug).then(res => {
            setCategory(res.data.category);
            setProducts(res.data.products)
            setLoading(false)
        })
    }, [])
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    {loading ? (
                        <h4 className=" text-center p-3 mt-5 mb-5 dislplay-4 jumbotron">Загружаю...</h4>
                    ) : (
                        <h4 className=" text-center p-3 mt-5 mb-5 dislplay-4 jumbotron" style={{height: "4rem"}}>
                            {products.length} продуктов в категории "{category.name}""
                        </h4>
                    )}
                </div>
                <div className="row">
                {products.map((p) => (
                    <div className="col-md-4 pl-4" key={p._id}>
                    <UserProductCard product={p} />
                </div>))}
                </div>
            </div>
        </div>
    )
}

export default Category
