import React, { useState, useEffect } from 'react';
import AdminNav from '../AdminNav';
import CategoryForm from '../../components/forms/CategoryForm';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getSub, updateSub } from '../../../functions/sub';
import { getCategories } from '../../../functions/categories';


const SubUpdate = ({ history, match }) => {
    const { user } = useSelector((state) => ({ ...state }));

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [parent, setParent] = useState("")

    useEffect(() => {
        loadCategories();
        loadSub();
    }, []);

    const loadCategories = () => {
        getCategories().then((c) => setCategories(c.data));
    }

    const loadSub = () =>
        getSub(match.params.slug).then(s => {
            setName(s.data.name)
            setParent(s.data.parent);
        });

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        updateSub(match.params.slug, { name, parent }, user.token)
            .then((res) => {
                setLoading(false);
                setName("");
                toast.success(`Подкатегория "${res.data.name}" успешно изменена`);
                history.push('/admin/sub');
            })
            .catch(err => {
                console.log(err)
                setLoading(false);
                if (err.response.status === 400) toast.error('Не удалось изменить подкатегорию');
            })
    }



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
                            <h4 className="mt-4 text-center">Изменить подкатегорию</h4>
                        )}

                    <div className="form-group">
                        <h6 className="text-center text-primary">Категория в которой находится эта подкатегория, при необходимости можно изменить родительскую категорию</h6>
                        <select
                            name="category"
                            className="form-control bg-primary text-light"
                            onChange={e => setParent(e.target.value)}
                        >
                            {categories.length > 0 &&
                                categories.map((c) =>
                                    <option
                                        key={c._id}
                                        value={c._id}
                                        selected={c._id === parent}
                                    >{c.name}
                                    </option>)}
                        </select>
                    </div>

                    <CategoryForm
                        handleSubmit={handleSubmit}
                        name={name}
                        setName={setName} />
                </div>
            </div>
        </div>
    )
}

export default SubUpdate
