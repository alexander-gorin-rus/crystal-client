import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { createOrUpdateUser } from '../../functions/auth';



export const RegisterComplete = ({ history }) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    //const { user } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

    useEffect(() => {
        setEmail(window.localStorage.getItem('emailForRegistration'));
        // console.log(window.location.href);
        // console.log(window.localStorage.getItem("emailForRegistration"))
    }, [history])

    const handleSubmit = async (e) => {
        e.preventDefault();

        //password and email validation
        if (!email || !password) {
            toast.error('Пароль и почта обязательны для заполнения');

            //if error, stop execution
            return;
        }

        //password length requirements
        if (password.length < 6) {
            toast.error('Количество символов в пароле не должно быть менее шести');

            //if error, stop execution
            return;
        }
        try {
            const result = await auth.signInWithEmailLink(email, window.location.href);

            //console.log(result);

            if (result.user.emailVerified) {
                //remove user email from localStorage
                window.localStorage.removeItem('emailForRegistration');

                //get user id token
                let user = auth.currentUser;

                await user.updatePassword(password);

                const idTokenResult = await user.getIdTokenResult();
                //redux store

                console.log("user", user, "idTokenResult", idTokenResult);

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
                    })
                    .catch(err => console.log(err));

                //redirect
                history.push('/');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const completeRegistrationForm = () => (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                className="form-control"
                value={email}
                disabled
            />
            <br />
            <input
                type="password"
                className="form-control"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Придумайте пароль"
                autoFocus
            />
            <br />
            <button type="submit" className="btn btn-raised mt-3 bg-info">
                Завершить регистрацию
          </button>
        </form>
    );

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Форма завершения регистрации</h4>
                    {completeRegistrationForm()}
                </div>
            </div>
        </div>
    )
}

export default RegisterComplete;