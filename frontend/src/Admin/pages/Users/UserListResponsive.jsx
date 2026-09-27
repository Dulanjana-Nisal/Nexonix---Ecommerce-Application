function UserListResponsive({users,toggleFullDetailsBox,user_profile_image,navigate,setUpdateUsersToggle,updateUsersToggle,deleteUser}) {
    return (
        <div className="user-list-responsive">
            {
                users.length > 0 &&
                users.map((items) => {
                    return (
                        <div className="user-responsive-box" key={items._id}>
                            <div className="left-side" onClick={() => toggleFullDetailsBox(items._id)}>
                                <img src={user_profile_image} alt="prodile-image" className="user-image" />
                            </div>
                            <div className="right-side">
                                <div className="right-side-top">
                                    <h4>{items.name}</h4>
                                    <p>User ID: {items._id}</p>
                                </div>
                                <div className="right-side-bottom">
                                    <div className="side-bottom-part">
                                        <h4>Name:</h4>
                                        <p>{items.name}</p>
                                    </div>
                                    <div className="side-bottom-part">
                                        <h4>Role:</h4>
                                        <p className={items.role}>{items.role}</p>
                                    </div>
                                    <div className="side-bottom-part">
                                        <h4>Email:</h4>
                                        <p>{items.email}</p>
                                    </div>
                                    <div className="side-bottom-part">
                                        <h4>Joined:</h4>
                                        <p>{(items.createdAt).slice(0, 10)}</p>
                                    </div>
                                    <div className="side-bottom-part">
                                        <h4>Orders:</h4>
                                        <button className="order-btn orders" onClick={() => navigate(`/admin/orders?serchByUserId=${items._id}`)}>All Orders</button>
                                    </div>
                                </div>
                            </div>
                            <div className="actions-btns">
                                {
                                    items.role !== 'admin' &&
                                    <button className="update" onClick={() => setUpdateUsersToggle({ toggle: !updateUsersToggle.toggle, userId: items._id })}><i className="fa-solid fa-pen-to-square"></i></button>
                                }
                                {
                                    items.role !== 'admin' &&
                                    <svg onClick={() => deleteUser(items._id)} className="delete" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14H6L5 6"></path><path d="M10 11v6M14 11v6"></path><path d="M9 6V4h6v2"></path></svg>
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default UserListResponsive;