import React from 'react'
import { Link } from 'react-router-dom';

const AdminNav = () => {
    return (
        <nav>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link to="/admin/background-create" className="nav-link">Создать фон для домашней страницы</Link>
                </li>
                <div className="bg-primary" style={{ height: "2px" }} ></div>

                <li className="nav-item">
                    <Link to="/admin/home" className="nav-link">Создать или <p className="text-danger">изменить/удалить</p> домашнюю страницу</Link>
                </li>
                <div className="bg-primary" style={{ height: "2px" }} ></div>


                <li className="nav-item">
                    <Link to="/admin/home-slider" className="nav-link" >Создать или <p className="text-danger">удалить</p> слайдер для домашней страницы</Link>
                </li>
                <div className="bg-primary" style={{ height: "2px" }} ></div>


                <li className="nav-item">
                    <Link to="/admin/product" className="nav-link">Создать продукт</Link>
                </li>
                <div className="bg-primary" style={{ height: "2px" }} ></div>


                <li className="nav-item">
                    <Link to="/admin/products" className="nav-link"><p className="text-danger">Изменить/удалить</p>продукт</Link>
                </li>
                <div className="bg-primary" style={{ height: "2px" }} ></div>


                <li className="nav-item">
                    <Link to="/admin/category" className="nav-link">Создать, или <p className="text-danger">изменить/удалить</p> категорию</Link>
                </li>
                <div className="bg-primary" style={{ height: "2px" }} ></div>


                {/* <li className="nav-item">
                    <Link to="/admin/sub" className="nav-link">Создать, или <p className="text-danger">изменить/удалить</p> подкатегорию</Link>
                </li>
                <div className="bg-primary" style={{ height: "2px" }} ></div> */}


                <li className="nav-item">
                    <Link to="/admin/coupon" className="nav-link">Скидочные купоны</Link>
                </li>
                <div className="bg-primary" style={{ height: "2px" }} ></div>


                <li className="nav-item">
                    <Link to="/user/password" className="nav-link">Изменить пароль</Link>
                </li>
                <div className="bg-primary" style={{ height: "2px" }} ></div>



            </ul>
        </nav>
    )
}

export default AdminNav
