import React from 'react'
import { Link } from 'react-router-dom';

const UserNav = () => {
    return (
        <nav>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link to="/user/history" className="nav-link">История покупок</Link>
                </li>

                <li className="nav-item">
                    <Link to="/user/password" className="nav-link">Изменить пароль</Link>
                </li>
            </ul>
        </nav>
    )
}

export default UserNav
