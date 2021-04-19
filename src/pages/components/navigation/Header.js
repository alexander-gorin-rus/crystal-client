import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Menu, Badge } from 'antd';
import {
    HomeOutlined,
    UserAddOutlined,
    UserOutlined,
    LogoutOutlined,
    ShopOutlined,
    SearchOutlined,
    ShoppingCartOutlined
} from '@ant-design/icons';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';

const { SubMenu, Item } = Menu;


const Header = () => {
    const [current, setCurrent] = useState('');

    let dispatch = useDispatch();
    let { user, cart } = useSelector((state) => ({ ...state }));
    let history = useHistory();

    const handleClick = (e) => {
        setCurrent(e.key);
    }

    const logout = () => {
        firebase.auth().signOut();
        dispatch({
            type: "LOGOUT",
            payload: null
        });

        history.push('/login')
    }

    return (
        <Menu className="custom-header" onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Item key="home" icon={<HomeOutlined />}>
                <Link to="/">Главная</Link>
            </Item>
            <Item key="products" icon={<ShopOutlined />}>
                <Link to="/products">Продукция</Link>
            </Item>
            <Item key="result" icon={<SearchOutlined />}>
                <Link to="/result">Поиск продукции</Link>
            </Item>
            <Item key="cart" icon={<ShoppingCartOutlined />}>
                <Link to="/cart">
                    <Badge count={cart.length} offset={[9, 0]} >
                        Корзина
                    </Badge>
                </Link>
            </Item>
            {!user && (
                <Item key="register" icon={<UserAddOutlined />} className="float-right">
                    <Link to="/register">Зарегистрироваться</Link>
                </Item>
            )}

            {!user && (
                <Item key="login" icon={<UserOutlined />} className="float-right">
                    <Link to="/login">Войти</Link>
                </Item>
            )}

            {user && (
                <SubMenu icon={<UserOutlined />} 
                    title={user.email && user.email.split('@')[0]} 
                    className="float-right mr-5">
                    {user && user.role === 'subscriber' && (
                        <Item>
                            <Link to="/user/history">Моя страница</Link>
                        </Item>
                    )}
                    {user && user.role === 'admin' && (
                        <Item>
                            <Link to="/admin/dashboard">Моя страница</Link>
                        </Item>
                    )}
                    <Item icon={<LogoutOutlined />} onClick={logout} >Выйти из профиля</Item>
                </SubMenu>
            )}
        </Menu>
    )
}

export default Header
