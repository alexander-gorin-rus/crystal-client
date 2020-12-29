import React from 'react'
import { Link } from 'react-router-dom';

const AdminNav = () => {
    return (
        <nav>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link to="/admin/home" className="nav-link">Создать домашнюю страницу</Link>
                </li>

                <li className="nav-item">
                    <Link to="/admin/home-manage" className="nav-link" >Изменить/удалить домашнюю страницу</Link>
                </li>

                <li className="nav-item">
                    <Link to="/admin/product" className="nav-link">Создать продукт</Link>
                </li>

                <li className="nav-item">
                    <Link to="/admin/products" className="nav-link">Изменить/удалить продукт</Link>
                </li>

                <li className="nav-item">
                    <Link to="/admin/category" className="nav-link">Создать, изменить/удалить категорию</Link>
                </li>

                <li className="nav-item">
                    <Link to="/admin/sub" className="nav-link">Создать, изменить/удалить подкатегорию</Link>
                </li>

                <li className="nav-item">
                    <Link to="/admin/coupon" className="nav-link">Скидочные купоны</Link>
                </li>

                <li className="nav-item">
                    <Link to="/user/password" className="nav-link">Изменить пароль</Link>
                </li>


            </ul>
        </nav>
    )
}

export default AdminNav
