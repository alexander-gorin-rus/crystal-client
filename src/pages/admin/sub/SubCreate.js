import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminNav from '../AdminNav';
import CategoryForm from '../../components/forms/CategoryForm';
import LocalSearch from '../../components/forms/LocalSearch';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getCategories } from '../../../functions/categories';
import { createSub, getSubs, removeSub } from '../../../functions/sub';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const SubCreate = () => {
    const { user } = useSelector((state) => ({ ...state }));

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [subs, setSubs] = useState([]);
    const [category, setCategory] = useState("")

    //This state is for searching and filtering sub categories. The whole search func consists of several steps
    //step 1
    const [keyword, setKeyword] = useState("")

    useEffect(() => {
        loadCategories();
        loadSubs();
    }, []);

    const loadCategories = () =>
        getCategories().then(s => setCategories(s.data));

    const loadSubs = () =>
        getSubs().then(c => setSubs(c.data));

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createSub({ name, parent: category }, user.token)
            .then((res) => {
                setLoading(false);
                setName("");
                toast.success(`Подкатегория "${res.data.name}" успешно создана`);
                loadSubs();
            })
            .catch(err => {
                console.log(err)
                setLoading(false);
                if (err.response.status === 400) toast.error('Не удалось создать подкатегорию');
            })
    }

    const handleRemove = async (slug) => {
        if (window.confirm(`Макс, ты точно хочешь удалить эту подкатегорию ${slug} ?`)) {
            setLoading(true);
            removeSub(slug, user.token)
                .then((res) => {
                    setLoading(false);
                    toast.success(`Подкатегория ${res.data.name} успешно удалена`);
                    loadSubs();
                })
                .catch(err => {
                    if (err.response.status === 400)
                        toast.error('Не удалось удалить подкатегорию');
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
                    {loading ? (<h4 className="text-danger" >Loading...</h4>) : (<h4 className="mt-4 text-center">Создать подкатегорию</h4>)}

                    <div className="form-group">
                        <select
                            name="category"
                            className="form-control bg-primary text-light"
                            onChange={e => setCategory(e.target.value)}
                        >
                            <option className="pl-3">Выбрать категорию</option>
                            {categories.length > 0 &&
                                categories.map((c) =>
                                    <option key={c._id}
                                        value={c._id} >{c.name}
                                    </option>)}
                        </select>
                    </div>

                    <CategoryForm
                        handleSubmit={handleSubmit}
                        name={name}
                        setName={setName} />

                    {/* step 2 and step 3 */}
                    <LocalSearch keyword={keyword} setKeyword={setKeyword} />

                    {/* step 5 */}
                    {subs.filter(searched(keyword)).map((s) => (
                        <div className="alert alert-primary" key={s._id}>
                            {s.name}
                            <span onClick={() => handleRemove(s.slug)} className="float-right">
                                <DeleteOutlined className="text-danger" />
                            </span>
                            <Link className="mx-3" to={`/admin/sub/${s.slug}`}>
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

export default SubCreate
