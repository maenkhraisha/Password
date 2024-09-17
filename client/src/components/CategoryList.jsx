function CategoryList({ categories, handleDeleteCategory }) {
    return (
        <>
            <ul>
                {categories.map((item) => (
                    <li key={item._id}>
                        {item.name}
                        <button value={item._id} onClick={handleDeleteCategory}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default CategoryList;
