import React, { useState, useEffect } from 'react'
import AdminNav from '../AdminNav';
import { useSelector } from 'react-redux';
import { homeBackgroundCreate, homeBackgroundGet } from '../../../functions/homePage';
import { toast } from 'react-toastify';
import BackgroundPageManage from './BackgroundPageManage';
import BackgroundPageCreateForm from './BackgroundPageCreateForm';


const BackgroundPageCreate = ({ history }) => {

    const { user } = useSelector((state) => ({ ...state }));
    const [backImage, setBackImage] = useState([]);

    useEffect(() => {
        homeBackgroundGet().then(res => {
            setBackImage(res.data)
        }).catch(err =>
            console.log(err))
    }, []);

    const initialState = {
        title: "",
        url: "",
        text: ""
    }

    const [values, setValues] = useState(initialState)


    const handleChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const clickSubmit = e => {
        e.preventDefault();
        homeBackgroundCreate(values, user.token)
            .then(res => {
                console.log(res);
                toast.success(`Фоновое изображение для главной страницы создано`);
                setTimeout(() => {
                    history.push('/admin/dashboard')
                }, 2000)
            }).catch(err => {
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

                <div className="col-md-10 mt-5">

                    {backImage && backImage.length === 0 ? (
                        <BackgroundPageCreateForm clickSubmit={clickSubmit} handleChange={handleChange} values={values} />
                    ) : (
                            <>
                                <p className="text-center h3 mt-5 mb-5 text-danger">Редактировать или удалить фоновое изображение</p>
                                <BackgroundPageManage backImage={backImage} setValues={setValues} history={history} className='mb-5' />
                            </>
                        )}


                </div>
            </div>
        </div>
    )
}

export default BackgroundPageCreate
