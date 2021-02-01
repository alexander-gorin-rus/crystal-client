import React, { useState, useEffect } from 'react';
import { getProductsByCount, fetchProductsByFilter } from '../../../functions/product';
import { getCategories } from '../../../functions/categories';
import { getSubs } from '../../../functions/sub';
//import { useSelector } from 'react-redux';
import UserProductCard from '../../components/cards/UserProductCard';
import { volume } from '../forms/Data';
import Checkbox from './Checkbox';
import Radiobox from './Radiobox';
//import SubCheckbox from './SubCheckbox';


//see Shop component
const SearchResult = () => {

    const [products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(6)
    const [PostSize, setPostSize] = useState(0)
    const [Categories, setCategories] = useState([])
    //const [Subs, setSubs] = useState([])
    //const [Error, setError] = useState(false)
    const [Filters, setFilters] = useState({
        category: [],
        subs: [],
        volume: [],
    });
    //const [loading, setLoading] = useState(false);

    //let dispatch = useDispatch();
    //let { search } = useSelector((state) => ({ ...state }));
    //const { text } = search;


    useEffect(() => {
        loadAllProducts();
        getCategories().then((res) => setCategories(res.data));
        //getSubs().then((res) => setSubs(res.data));
    }, []);

    //1. load product by default
    const loadAllProducts = () => {
        getProductsByCount().then(p => {
            setProducts(p.data)
            //setLoading(false)
        })
    }



    const getProducts = (variables) => {
        fetchProductsByFilter(variables)
            .then(response => {
                if (response.data.success) {
                    if (variables.loadMore) {
                        setProducts([...products, ...response.data.products]);
                    } else {
                        setProducts(response.data.products)
                    }
                    setPostSize(response.data.postSize)
                } else {
                    alert('Unable to fetch product');
                }
            })
    }

    const onLoadMore = () => {
        const skip = Skip + Limit

        const variables = {
            skip: skip,
            limit: Limit,
            loadMore: true
        }

        getProducts(variables)
        setSkip(skip)
    }

    const showFilteredResults = (filters) => {

        const variables = {
            skip: 0,
            limit: Limit,
            filters: filters
        }
        getProducts(variables)
        setSkip(0)
    }

    const handleVolume = value => {
        const data = volume;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value, 10)) {
                array = data[key].array;
            }
        }
        return array
    }

    const handleFilters = (filters, category) => {
        const newFilters = { ...Filters }

        newFilters[category] = filters;

        if (category === 'volume') {
            let volumeValue = handleVolume(filters)
            newFilters[category] = volumeValue
        }

        showFilteredResults(newFilters)
        setFilters(newFilters)
        //setLoading(false)
    }

    return (
        <div className="container-fluid">
            <h4 className="text-center text-primary mt-3">Поиск продукции по параметрам (категория, подкатерогия, объём тары)</h4>
            <div className="row">
                <div className="col-md-3">
                    <h5 className="text-center text-info mt-3">Выборка по:</h5>
                    <h6 style={{ textAlign: "center", color: "#0f8200" }}>катерогиям:</h6>
                    <ul>
                        <Checkbox
                            list={Categories}
                            handleFilters={filters => handleFilters(filters, 'category')} />
                    </ul>
                    {/* <h6 style={{ textAlign: "center", color: "#0f8200" }}>подкатерогиям:</h6>

                    <p style={{ color: "#1010e8", textAlign: "center", fontSize: "0.7rem" }}>
                        <p style={{ color: "#f50707", fontSize: "0.8rem" }}>Внимание!</p>  Выбирайте товар либо в меню категории, либо в меню подкатерогии
                        </p>
                    <ul>
                        <SubCheckbox
                            list={Subs}
                            handleFilters={filters => handleFilters(filters, 'subs')} />
                    </ul> */}
                    <div className='p-3'>
                        <h6 style={{ textAlign: "center", color: "#0f8200" }}>объему тары:</h6>
                        <Radiobox list={volume}
                            handleFilters={filters => handleFilters(filters, 'volume')} />
                    </div>
                </div>

                <div className="col-md-9">
                    {/* {loading ? (
                        <h4 className="text-center text-danger">fgfg</h4>
                    ) : (
                            <h6 className="text-center text-warning">Загружена вся продукция, для поиска необходимого товара, воспользуйтесь меню выбора слева</h6>
                        )} */}
                    <div className="row pb-5">
                        {products.map((p) => (
                            <div key={p._id} className="col-md-4 mt-3">
                                <UserProductCard product={p} />
                            </div>
                        ))}
                    </div>
                    {PostSize >= Limit &&
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px', marginTop: '30px' }}>
                            <button onClick={onLoadMore}>Показать больше</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default SearchResult
