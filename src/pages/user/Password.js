import React, { useState } from 'react';
import UserNav from '../components/navigation/UserNav';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';

const Password = () => {

    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        await auth.currentUser.updatePassword(password)
            .then(() => {
                setLoading(false);
                setPassword("")
                toast.success('Пароль успешно обновлен');
            })
            .catch(err => {
                setLoading(false);
                toast.error('Не удалось обновить пароль')
            });
    }

    const passwordUpdateForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    type="password"
                    className="form-control"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Введите новый пароль"
                    disabled={loading}
                    value={password}
                />
                <button className="btn btn-primary" disabled={!password || password.length < 6 || loading}>Отправить</button>
            </div>
        </form>
    )

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <UserNav />
                    </div>
                    <div className="col">
                        {loading ? (<h4 className="text-center text-danger">Loading</h4>) : (<h4 className="text-center">Изменить пароль</h4>)}
                        {passwordUpdateForm()}
                    </div>
                    <div className="m-4">
                        <h6>Уважаемый пользователь, если при попытке изменить пароль у вас появляется всплывающее окно,
                            с текстом о неудачной попытке обновить пароль, вам необходимо выйти из вашего профиля, затем войти вновь и повторить попытку обновления пароля. Спасибо</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Password
