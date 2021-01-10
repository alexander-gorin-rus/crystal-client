import React from 'react';
import NewProducts from '../components/products/NewProducts';
import BestSold from '../components/products/BestSold';
import CategoryList from '../components/category/CategoryList';
import SubList from '../components/sub/SubList';


const ProductsPage = () => {
    return (
        <div>
            {/* <div className="jumbotron h1 font-weight-bold text-center">
                <Jumbotron text={["Производственная компания 'Crystal'", "Только качественная продукция"]} />
            </div> */}

            <br />
            <h4 style={{ height: "10vh" }} className="text-center p-1 mt-1 mb-1 display-5 jumbotron">
                Новинки нашей продукции
            </h4>
            <br />
            <NewProducts />
            <br />
            <h4 style={{ height: "10vh" }} className="text-center p-1 mt-1 mb-1 display-5 jumbotron">
                Хиты продаж
            </h4>
            <br />
            <BestSold />
            <br />
            <h4 style={{ height: "10vh" }} className="text-center p-1 mt-1 mb-1 display-5 jumbotron">
                Категории
            </h4>
            <br />
            <CategoryList />
            <br />
            <h4 style={{ height: "10vh" }} className="text-center p-1 mt-1 mb-1 display-5 jumbotron">
                Подкатегории
            </h4>
            <br />
            <SubList />
            <br />
        </div>
    )
}

export default ProductsPage
