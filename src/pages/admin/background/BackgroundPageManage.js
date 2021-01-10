import React from 'react'
import { useSelector } from 'react-redux';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { homeBackgroundDelete } from '../../../functions/homePage';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


const BackgroundPageManage = ({ backImage, setValues, history }) => {

    const { user } = useSelector((state) => ({ ...state }));

    const handleRemove = (slug) => {
        const answer = window.confirm('Макс, ты точно хочешь удалить это фоновое изображение?');
        if (answer) {
            homeBackgroundDelete(slug, user.token)
                .then(res => {
                    toast.success('Фоновое изображение успешно удалено');
                    history.push('/admin/dashboard')
                    setValues({
                        title: "",
                        url: "",
                        text: ""
                    })
                })
        }
    }


    return (
        <div>
            {backImage.map((b, i) => (
                <div key={i}>
                    <Card
                        cover={
                            <img style={{ height: '150px', objectFit: "cover" }} src={b.url} />
                        }
                        actions={[
                            <Link to={`/admin/home-background/${b.slug}`}>
                                <EditOutlined className="text-warning" />
                            </Link>,
                            <DeleteOutlined onClick={() => handleRemove(b.slug)} className="text-danger" />
                        ]}
                    >

                    </Card>
                </div>
            ))}
        </div>
    )
}

export default BackgroundPageManage
