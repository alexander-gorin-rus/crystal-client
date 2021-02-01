import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';
import { currentManager } from '../../../functions/auth';

const ManagerRoute = ({ children, ...rest }) => {

    const { user } = useSelector((state) => ({ ...state }));
    const [ok, setOk] = useState(false)

    useEffect(() => {
        if (user && user.token) {
            currentManager(user.token)
                .then(res => {
                    console.log('current manager res', res);
                    setOk(true);
                })
                .catch(err => {
                    console.log('manager error', err);
                    setOk(false)
                })
        }
    }, [user])

    return ok ? (
        <Route {...rest} />
    ) : (<LoadingToRedirect />)
}

export default ManagerRoute;