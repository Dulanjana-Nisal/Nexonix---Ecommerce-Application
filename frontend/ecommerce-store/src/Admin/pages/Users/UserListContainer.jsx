function UserListContainer({ users, toggleFullDetailsBox, navigate, setUpdateUsersToggle, deleteUser, updateUsersToggle, user_profile_image }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Email</th>
                    <th>Joined</th>
                    <th>Orders</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.length > 0 &&
                    users.map((items) => {
                        return (
                            <tr className="user-box" key={items._id}>
                                <td className="name" onClick={() => toggleFullDetailsBox(items._id)}>
                                    <img src={user_profile_image} alt="prodile-image" className="user-image" />
                                    <div className="box-user-details">
                                        <h3>{items.name}</h3>
                                        <p>ID: {items._id}</p>
                                    </div>
                                </td>
                                <td className="user-role">
                                    <p className={`user-${items.role}`}>{items.role === 'admin' ? "Admin" : "User"}</p>
                                </td>
                                <td>
                                    <p>{items.email}</p>
                                </td>
                                <td>
                                    <p>{(items.createdAt).slice(0, 10)}</p>
                                </td>
                                <td className="buttons">
                                    <div className="button-content">
                                        <button className="order-btn orders" onClick={() => navigate(`/admin/orders?serchByUserId=${items._id}`)}>All Orders</button>
                                    </div>
                                </td>
                                <td className="buttons">
                                    <div className="button-content">
                                        {
                                            items.role !== 'admin' &&
                                            <button className="update" onClick={() => setUpdateUsersToggle({ toggle: !updateUsersToggle.toggle, userId: items._id })}><i className="fa-solid fa-pen-to-square"></i></button>
                                        }
                                        {
                                            items.role !== 'admin' &&
                                            <svg onClick={() => deleteUser(items._id)} className="delete" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14H6L5 6"></path><path d="M10 11v6M14 11v6"></path><path d="M9 6V4h6v2"></path></svg>
                                        }
                                    </div>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default UserListContainer;