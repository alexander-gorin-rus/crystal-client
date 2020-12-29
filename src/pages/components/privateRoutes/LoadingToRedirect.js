import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const LoadingToRedirect = () => {

    const [count, setCount] = useState(10);
    let history = useHistory();

    useEffect(() => {

        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount)
        }, 1000);
        //redirect unauthenticated user when count is zero
        count === 0 && history.push("/");
        //cleanup
        return () => clearInterval(interval)
    }, [count, history]);


    return (
        <div className="container p-5 text-center">
            <h1 className="text-danger">Вы зашли на эту страницу как незарегистрированный пользователь,
                и будете перенаправлены на главную страницу через {count} секунд</h1>
        </div>
    )
}

export default LoadingToRedirect
