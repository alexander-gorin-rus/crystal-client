import React, { useState, useEffect } from 'react'
import { auth, googleAuthProvider } from '../../firebase';
import { toast } from 'react-toastify';
import { MailOutlined, GoogleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { createOrUpdateUser } from '../../functions/auth';

export const Login = ({ history }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => ({ ...state }));

    const roleBaseRedirect = (res) => {
        if (res.data.role === 'admin') {
            history.push('/admin/dashboard')
        } else if(res.data.role === 'manager') {
            history.push('/manager')
        }
        else {
            history.push('/user/history')
        }
    }

    useEffect(() => {
        if (user && user.token) {
            history.push("/");
        }
    }, [user, history]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const result = await auth.signInWithEmailAndPassword(email, password);
            //console.log(result)
            const { user } = result;
            const idTokenResult = await user.getIdTokenResult();

            createOrUpdateUser(idTokenResult.token)
                .then((res) => {
                    dispatch({
                        type: "LOGGED_IN_USER",
                        payload: {
                            name: res.data.name,
                            email: res.data.email,
                            role: res.data.role,
                            token: idTokenResult.token,
                            _id: res.data._id
                        }
                    });
                    roleBaseRedirect(res);
                })
                .catch(err => console.log(err));

            //history.push('/');
        } catch (error) {
            console.log(error);
            toast.error('Неверно введены пароль или email');
            setLoading(false)
        }
    }

    const googleLogin = () => {
        auth.signInWithPopup(googleAuthProvider)
            .then(async (result) => {
                const { user } = result
                const idTokenResult = await user.getIdTokenResult();
                createOrUpdateUser(idTokenResult.token)
                    .then((res) => {
                        dispatch({
                            type: "LOGGED_IN_USER",
                            payload: {
                                name: res.data.name,
                                email: res.data.email,
                                role: res.data.role,
                                token: idTokenResult.token,
                                _id: res.data._id
                            }
                        });
                        roleBaseRedirect(res);
                    })
                    .catch(err => console.log(err));
                //history.push('/')
            })
            .catch(err => {
                console.log(err);
                toast('Такого google аккаунта не существует')
            })
    }

    const loginForm = () => (
        <form onSubmit={handleSubmit}>
            <input
                className="mt-5 mb-2"
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Введите email"
                autoFocus
            />
            <input
                className="mt-5 mb-2"
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль"
            />

            <Button
                onClick={handleSubmit}
                className="mt-4"
                type="primary"
                block
                shape="round"
                icon={<MailOutlined />}
                size="large"
                disabled={!email || password.length < 6}
            >
                Войти
            </Button>
        </form>
    );

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {loading ? <h4>Загрузка</h4> : <h4>Войти</h4>}
                    {loginForm()}
                    <Button
                        onClick={googleLogin}
                        className="mt-2"
                        type="danger"
                        block
                        shape="round"
                        icon={<GoogleOutlined />}
                        size="large"
                    >
                        Войти через Google профиль
                    </Button>

                    <Link to="/forgot/password" className="float-right text-danger mt-4">Забыли пароль ?</Link>
                </div>
            </div>
        </div>
    )
}

export default Login;