import React, { useState, useEffect } from 'react'
import { createHomePage, getHomePage, removeHomePage } from '../../../functions/homePage';
import { useSelector } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import AdminNav from '../AdminNav'
import HomePageCreateForm from './HomePageCreateForm';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';/////
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import imageDefault from '../../../images/image_1.jpg';



import { Card } from 'antd';

const { Meta } = Card


const HomePageCreate = ({ history }) => {

    const [homePage, setHomePage] = useState([]);/////


    const initialState = {
        images: [],
        title: "",
        info: "",
        fullInfo: "",
        address: "",
        phone: "",
        email: "",
    }

    //const [Images, setImages] = useState([])

    const [values, setValues] = useState(initialState);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getHomePage().then((res) => setHomePage(res.data))

    }, []);

    const { user } = useSelector((state) => ({ ...state }));

    const handleSubmit = (e) => {
        e.preventDefault();
        createHomePage(values, user.token)
            .then(res => {
                console.log(res);
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

    const handleRemove = (slug) => {
        const answer = window.confirm(`Макс, ты точно хочешь удалить домашнюю страницу ?`);
        if (answer) {
            //console.log('The product to be deleted is', slug)
            removeHomePage(slug, user.token)
                .then(res => {
                    history.push('/admin/dashboard')
                    toast.success(`Домашняя страница успешно удалена`);
                })
                .catch(err => {
                    console.log(err);

                    if (err.response.status === 400) toast.error(`Не удалось удалить домашнюю страницу`);
                })
        }
    }


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>

                <div className="col-md-10">

                    {homePage && homePage.length === 0 ? (
                        <>
                            {loading ? (<LoadingOutlined className="text-danger h1" />) : (<h5 className="text-center mt-3">Создать главную страницу</h5>)}
                            <HomePageCreateForm
                                handleSubmit={handleSubmit}
                                handleChange={handleChange}
                                values={values}
                                setValues={setValues}
                            />
                        </>
                    ) : (
                            <>
                                <div>{homePage.map((h) => (
                                    <div key={h._id}>
                                        <Card
                                            cover={
                                                <img src={h.images && h.images.length ? h.images[0].url : imageDefault}
                                                    style={{ height: '150px', objectFit: "cover" }}
                                                    className="p-1" />

                                            }
                                            actions={[
                                                <Link to={`/admin/home/${h.slug}`} >
                                                    <EditOutlined className="text-warning" />
                                                </Link>,
                                                <DeleteOutlined onClick={() => handleRemove(h.slug)} className="text-danger" />]}
                                        >
                                            <Meta className="text-center" title={h.title} />


                                        </Card>
                                    </div>

                                ))}</div>
                            </>
                        )}

                </div>

            </div>
        </div>
    )
}

export default HomePageCreate
