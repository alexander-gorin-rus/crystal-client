import React, { useState, useEffect } from 'react';
import { getOneForUpdate, updateHomePage } from '../../functions/homePage'
import { useSelector } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import AdminNav from '../admin/AdminNav';
import HomeUpdateForm from './HomeUpdateForm';
import { toast } from 'react-toastify';


const HomePageUpdate = ({ match, history }) => {

    const initialState = {
        title: "",
        info: "",
        fullInfo: "",
        address: "",
        phone: "",
        email: "",
        iin: "",
        responsiblePersone: "",
        appendix: "",
        images: []
    }

    const [values, setValues] = useState(initialState);
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => ({ ...state }));


    //router
    let { slug } = match.params;

    useEffect(() => {
        loadHomePage()
    }, [])

    const loadHomePage = () => {
        getOneForUpdate(slug).then(res =>
            setValues({ ...values, ...res.data }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        updateHomePage(slug, values, user.token)
            .then(res => {
                setLoading(false);
                // console.log(res);
                toast.success(`Информация о компании успешно изменена`)
                history.push('/admin/dashboard')
            }).catch(err => {
                setLoading(false);
                console.log(err)
                toast.error(err.response.data.err)
            })
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>

                <div className="col-md-10">
                    {loading ? (<LoadingOutlined className="text-danger h1" />) : (<h5 className="text-center mt-3">Изменить домашнюю страницу</h5>)}
                    <div className="p-3">

                        <HomeUpdateForm
                            handleSubmit={handleSubmit}
                            handleChange={handleChange}
                            values={values}
                            setValues={setValues}
                        />
                    </div>


                </div>
            </div>
        </div>
    )
}

export default HomePageUpdate
