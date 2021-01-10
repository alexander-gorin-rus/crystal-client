import React, { useState, useEffect } from 'react';
import { createSlider, getSlides, getOneSlide, removeSlide, updateSlide } from '../../../functions/homePageSlider';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import AdminNav from '../AdminNav';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';




const Slider = () => {

    const { user } = useSelector((state) => ({ ...state }));
    const [slidesList, setSlidesList] = useState([]);

    useEffect(() => {
        loadSlides()
    }, []);

    const loadSlides = () => {
        getSlides().then(res => {
            setSlidesList(res.data)
        }).catch(err =>
            console.log(err))
    }


    const initialState = {
        title: "",
        url: ""
    }

    const [values, setValues] = useState(initialState);

    const { title, url } = values;


    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const clickSubmit = (e) => {
        e.preventDefault();
        createSlider(values, user.token)
            .then(res => {
                console.log(res);
                toast.success('Фото для слайдера успешно создано');
                setValues({
                    title: "",
                    url: ""
                })
                loadSlides()
            }).catch(err => {
                console.log(err)
                toast.error(err.response.data.err)
            })
    }

    const handleRemove = (slug) => {
        const answer = window.confirm('Макс, ты точно хочешь удалить этот слайд?');
        if (answer) {
            removeSlide(slug, user.token)
                .then(res => {
                    toast.success('Слайд успешно удален');
                    loadSlides()
                })
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10 mt-5">
                    <form className="mb-3 flex" onSubmit={clickSubmit}>

                        <div className="form-group">
                            <label className="text-center">Название слайда " оно должно быть коротким ".
                            <br />
                                <br />
                                <p className="text-danger">Оно обязательно, так как программа будет искать слайд по названию для удаления</p></label>
                            <input
                                type="text"
                                name="title"
                                className="form-control"
                                value={title}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-center">Гипер ссылка для слайда</label>
                            <input className='form-control'
                                onChange={handleChange}
                                type="url"
                                name="url"
                                className='form-control'
                                value={url} />
                        </div>

                        <button className='btn btn-outline-primary'>Оправить</button>
                    </form>
                    <h4 className="text-center">Список созданных слайдов</h4>
                    {slidesList.map((s, i) => (
                        <div key={i}>
                            <Card
                                cover={
                                    <img style={{ height: '150px', objectFit: "cover" }} src={s.url} />
                                }
                                actions={[
                                    <DeleteOutlined onClick={() => handleRemove(s.slug)} className="text-danger" />
                                ]}
                            >

                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Slider
