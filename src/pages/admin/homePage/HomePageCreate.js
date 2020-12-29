import React, { useState } from 'react'
import { createHomePage } from '../../../functions/homePage';
import { useSelector } from 'react-redux';
import FileUpload from '../../components/forms/FileUpload';
import { LoadingOutlined } from '@ant-design/icons';
import AdminNav from '../AdminNav'
import HomePageCreateForm from './HomePageCreateForm';
import { toast } from 'react-toastify';


const HomePageCreate = ({ history }) => {

    const initialState = {
        title: "",
        info: "",
        address: "",
        phone: "",
        email: "",
        images: []
    }

    const [values, setValues] = useState(initialState);
    const [loading, setLoading] = useState(false)

    const { user } = useSelector((state) => ({ ...state }));

    const handleSubmit = (e) => {
        e.preventDefault();
        createHomePage(values, user.token)
            .then(res => {
                console.log(res);
                //window.alert(`Главная страница "${res.data.title}" успешно создана`);
                toast.success('Главная станица успешно создана')
                setTimeout(() => {
                    history.push('/admin/dashboard')
                }, 4000)

            }).catch(err => {
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
                    {loading ? (<LoadingOutlined className="text-danger h1" />) : (<h5 className="text-center mt-3">Создать главную страницу</h5>)}
                    <div className="p-3">
                        <FileUpload
                            values={values}
                            setValues={setValues}
                            setLoading={setLoading}
                        />
                    </div>

                    <HomePageCreateForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        values={values}
                        setValues={setValues}
                    />
                </div>
            </div>
        </div>
    )
}

export default HomePageCreate
