import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminNav from '../AdminNav';
import CategoryForm from '../../components/forms/CategoryForm';
import LocalSearch from '../../components/forms/LocalSearch';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { createCategory, getCategories, removeCategory } from '../../../functions/categories';
import { getSubs } from '../../../functions/sub';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const CategoryCreate = () => {
    const { user } = useSelector((state) => ({ ...state }));

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [subs, setSubs] = useState([]);


    //This state is for searching and filtering categories. The whole search func consists of several steps
    //step 1
    const [keyword, setKeyword] = useState("")

    useEffect(() => {
        loadCategories();
        loadSubs()
    }, [])

    const loadCategories = () =>
        getCategories().then(c => setCategories(c.data));

    const loadSubs = () =>
        getSubs().then(c => setSubs(c.data));

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createCategory({ name }, user.token)
            .then((res) => {
                setLoading(false);
                setName("");
                toast.success(`Категория "${res.data.name}" успешно создана`);
                loadCategories();
            })
            .catch(err => {
                console.log(err)
                setLoading(false);
                if (err.response.status === 400) toast.error('Не удалось создать категорию');
            })
    }

    const handleRemove = async (slug) => {
        if (window.confirm(`Макс, ты точно хочешь удалить эту категорию ${slug} ?`)) {
            setLoading(true);
            removeCategory(slug, user.token)
                .then((res) => {
                    setLoading(false);
                    toast.success(`Категория ${res.data.name} успешно удалена`);
                    loadCategories();
                })
                .catch(err => {
                    if (err.response.status === 400)
                        toast.error('Не удалось удалить категорию');
                    setLoading(false);
                })
        }
    }

    //step 4
    const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>

                <div className="col">
                    {loading ? (
                        <h4 className="text-danger" >Loading...</h4>
                    ) : (
                            <h4 className="mt-4 text-center">Создать категорию</h4>
                        )}
                    <CategoryForm
                        handleSubmit={handleSubmit}
                        name={name}
                        setName={setName} />

                    {/* step 2 and step 3 */}
                    <LocalSearch keyword={keyword} setKeyword={setKeyword} />

                    {/* step 5 */}
                    {categories.filter(searched(keyword)).map((c) => (
                        <div className="alert alert-primary" key={c._id}>
                            {c.name}
                            <span onClick={() => handleRemove(c.slug)} className="float-right">
                                <DeleteOutlined className="text-danger" />
                            </span>
                            <Link className="mx-3" to={`/admin/category/${c.slug}`}>
                                <span className="mr-4 ml-4 float-right">
                                    <EditOutlined className="text-warning" />
                                </span>
                            </Link>
                        </div>))}
                </div>
            </div>
        </div>
    )
}

export default CategoryCreate
