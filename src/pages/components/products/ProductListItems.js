import React from 'react';
import { Link } from 'react-router-dom';

const ProductListItems = ({ product }) => {



    const {
        fullDescription,
        price,
        volume,
        quantity,
        category,
        subs,
        sold
    } = product
    return (
        <>
            <p className="text-center text-primary">{fullDescription}</p>
            <ul className="list-group">
                <li className="list-group-item">
                    Цена:
                <span className="label label-default label-pill pull-xs-right">
                        {price} {" "}тенге
                </span>
                </li>

                <li className="list-group-item">
                    Объём тары в литрах:
                <span className="label label-default label-pill pull-xs-right">
                        {volume / 1000}
                    </span>
                </li>

                {category && (
                    <li className="list-group-item">
                        Категория:
                        <Link to={`/category/${category.slug}`}
                            className="label label-default label-pill pull-xs-right">
                            {category.name}
                        </Link>
                    </li>
                )}

                {subs && (
                    <li className="list-group-item">
                        Подкатегории:
                        {subs.map((s) => (
                            <Link key={s._id} to={`/sub/${s.slug}`}
                                className="label label-default label-pill pull-xs-right">
                                {s.name}
                            </Link>
                        ))}
                    </li>
                )}

                <li className="list-group-item">
                    Количество на складе:
            <span className="label label-default label-pill pull-xs-right">
                        {quantity}{" "}единиц
                    </span>
                </li>

                {/* <li className="list-group-item">
                    Продано этого товара:
                <span className="label label-default label-pill pull-xs-right">
                        {sold}
                    </span>
                </li> */}
            </ul>
        </>
    )
}

export default ProductListItems
