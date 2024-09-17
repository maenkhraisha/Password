import { useEffect, useState } from "react";
import Nav from "./Nav";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import CategoryList from "./CategoryList";

function PasswordsList() {
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();

    const [categories, setCategories] = useState([]);
    const [passwords, setPasswords] = useState([]);

    const [category, setCategory] = useState("");
    const [passwordForm, setPasswordForm] = useState({
        user: auth.id,
        category: "",
        source: "",
        password: "",
        note: "",
    });

    useEffect(() => {
        getCategories();
        getPaswords();
    }, []);

    const handlePasswordForm = (e) => {
        const { name, value } = e.target;

        setPasswordForm({ ...passwordForm, [name]: value });
    };

    const handleAddPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosPrivate.post(`/password`, {
                passwordForm: passwordForm,
            });

            setPasswordForm({
                user: "",
                category: "",
                source: "",
                password: "",
                note: "",
            });
            getPaswords();
        } catch (error) {
            console.log(error);
        }
    };

    const getCategories = async () => {
        try {
            const response = await axiosPrivate.get(`/category/${auth.id}`);

            setCategories(response.data.categories);
        } catch (error) {
            console.log(error);
        }
    };

    const getPaswords = async () => {
        try {
            const response = await axiosPrivate.get(`/password/${auth.id}`);

            setPasswords(response.data.passwords);
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddCategory = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosPrivate.post(`/category`, {
                user: auth.id,
                name: category,
            });

            setCategory("");
            getCategories();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteCategory = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosPrivate.delete(`/category`, {
                data: {
                    id: e.target.value,
                },
            });

            getCategories();
        } catch (error) {
            console.log(error);
        }
    };
    const handleDeletePassword = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosPrivate.delete(`/password`, {
                data: {
                    id: e.target.value,
                },
            });

            getPaswords();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="app">
                <div className="popup add_category_popup">
                    <form className="popup__content">
                        <a
                            className="popup__content-close"
                            onClick={() => window["closePopup"]("add_category_popup")}
                        >
                            &#x2715;
                        </a>
                        <div className="form-control">
                            <label htmlFor="catName">Category Name : </label>
                            <input
                                type="text"
                                id="catName"
                                value={category}
                                onChange={(e) => {
                                    setCategory(e.target.value);
                                }}
                            />
                        </div>
                        <button onClick={handleAddCategory}>Add Category</button>
                    </form>
                </div>

                <div className="popup add_password_popup">
                    <form className="popup__content">
                        <a
                            className="popup__content-close"
                            onClick={() => window["closePopup"]("add_password_popup")}
                        >
                            &#x2715;
                        </a>
                        <div className="form-control">
                            <label htmlFor="catpassName">category : </label>
                            <select
                                id="catpassName"
                                name="category"
                                onChange={handlePasswordForm}
                                required
                            >
                                {categories.map((item, index) => (
                                    <option key={index} value={item._id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-control">
                            <label htmlFor="sourceName">source : </label>
                            <input
                                type="text"
                                id="sourceName"
                                name="source"
                                required
                                value={passwordForm.source}
                                onChange={handlePasswordForm}
                            />
                        </div>
                        <div className="form-control">
                            <label htmlFor="passwordName">password : </label>
                            <input
                                type="text"
                                id="passwordName"
                                name="password"
                                required
                                value={passwordForm.password}
                                onChange={handlePasswordForm}
                            />
                        </div>
                        <div className="form-control">
                            <label htmlFor="noteName">note : </label>
                            <input
                                type="text"
                                id="noteName"
                                name="note"
                                value={passwordForm.note}
                                onChange={handlePasswordForm}
                            />
                        </div>
                        <button onClick={handleAddPassword}>Add Password</button>
                    </form>
                </div>
                <Nav />
                <section className="content">
                    <button onClick={() => window["openPopup"]("add_category_popup")}>
                        Add Category
                    </button>

                    <button onClick={() => window["openPopup"]("add_password_popup")}>
                        Add Passowrd
                    </button>

                    <br />
                    <div>
                        <h3>Password List</h3>

                        {categories && (
                            <CategoryList
                                categories={categories}
                                handleDeleteCategory={handleDeleteCategory}
                            />
                        )}
                    </div>
                    <div>
                        <ul>
                            {passwords &&
                                passwords.map((item, index) => (
                                    <li key={index}>
                                        <p>{item.category?.name}</p> / <p>{item.source}</p>
                                        <p>{item.password}</p> /<p>{item.note}</p>
                                        <button value={item._id} onClick={handleDeletePassword}>
                                            Delete
                                        </button>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </section>
            </div>
        </>
    );
}

export default PasswordsList;
