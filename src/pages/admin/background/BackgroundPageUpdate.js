import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import AdminNav from '../AdminNav';
import { homeBackgroundUpdate, homeBackgroundReadOne } from '../../../functions/homePage';
import BackgroundPageUpdateForm from './BackgroundPageUpdateForm'


const BackgroundPageUpdate = ({ match, history }) => {

    const initialState = {
        title: "",
        url: "",
        text: ""
    }

    const [values, setValues] = useState(initialState);
    const [loading, setLoading] = useState(false);


    const { user } = useSelector((state) => ({ ...state }));

    let { slug } = match.params;

    useEffect(() => {
        loadBackground();
    }, []);

    const loadBackground = () => {
        homeBackgroundReadOne(slug).then(res => {
            setValues({
                ...values,
                ...res.data
            })
        })
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        homeBackgroundUpdate(slug, values, user.token)
            .then(res => {
                setLoading(false);
                // console.log(res);
                toast.success(`Фоновое изображение успешно изменено`)
                history.push('/admin/dashboard')
            }).catch(err => {
                setLoading(false);
                console.log(err)
                toast.error(err.response.data.err)
            })
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    {loading ? (<LoadingOutlined className="text-danger h1" />) : (<h5 className="text-center mt-3">Изменить фоновое изображение домашней страницы</h5>)}
                    <BackgroundPageUpdateForm
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        values={values}
                        setValues={setValues}
                    />
                </div>
            </div>
        </div>
    )
}

export default BackgroundPageUpdate
