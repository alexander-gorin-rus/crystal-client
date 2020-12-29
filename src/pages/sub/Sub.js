import React, { useState, useEffect } from 'react';
import { getSub } from '../../functions/sub';
import UserProductCard from '../components/cards/UserProductCard';

const Sub = ({ match }) => {

    const [sub, setSub] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const { slug } = match.params

    useEffect(() => {
        setLoading(true)
        getSub(slug).then(res => {
            setSub(res.data.sub);
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
                            {products.length} продуктов в подкатегории "{sub.name}""
                        </h4>
                    )}
                </div>
                <div className="row">
                {products.map((p) => (
                    <div className="col-md-6 pl-4" key={p._id}>
                    <UserProductCard product={p} />
                </div>))}
                </div>
            </div>
        </div>
    )
}

export default Sub
