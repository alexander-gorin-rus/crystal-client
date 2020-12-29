import React, { useState, useEffect } from 'react'
import { getHomePage, removeHomePage } from '../../functions/homePage';
import AdminNav from '../admin/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import imageDefault from '../../images/image_1.jpg';
import { Card } from 'antd';


const { Meta } = Card



const AdminHomeUpade = ({ history }) => {

    const [homePage, setHomePage] = useState([]);

    const { user } = useSelector((state) => ({ ...state }))

    useEffect(() => {
        getHomePage().then((res) => setHomePage(res.data))
        //console.log(JSON.stringify(homePage, null, 4))
    }, [])


    // const loadHomePage = () => {
    //     getHomePage().then((res) => {
    //         setHomePage(res.data)
    //         console.log(res.data)
    //     })
    // }

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
                    <h4 className="text-center">Изменить или удалить домашнюю страницу</h4>
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

                                <h5 className="text-center">{h.info}</h5>
                            </Card>
                        </div>

                    ))}</div>
                </div>
            </div>
        </div>
    )
}

export default AdminHomeUpade
