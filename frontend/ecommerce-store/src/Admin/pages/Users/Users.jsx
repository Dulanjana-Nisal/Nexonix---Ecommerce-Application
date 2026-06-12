import './Users.css';
import user_profile_image from '../../../assets/user-profile-image.png'

function Users() {
    return (
        <>
            <div class="user-section">
                <div class="user-header">
                    <h1>Users List</h1>
                    <div class="search">
                        <input type="text" placeholder="Search Users" />
                        <button><i class="fa-solid fa-magnifying-glass"></i></button>
                    </div>
                </div>
                <div class="user-body">
                    <div class="user-list">
                        <div class="list-header">
                            <p>Name</p>
                            <p>Email</p>
                            <p>Id</p>
                            <p>Orders</p>
                        </div>
                        <div class="user-box">
                            <div class="name">
                                <img src={user_profile_image} alt="prodile-image" class="user-image" />
                                <p>Dulanjana Nisal</p>
                            </div>
                            <div>
                                <p>dulanjananisal67@gmail.com</p>
                            </div>
                            <div>
                                <p>69da8f62c39fbcbf86351016</p>
                            </div>
                            <div class="buttons">
                                <button class="order-btn">All Orders</button>
                                <button class="delete-btn"><img src="../images/delete-icon.png" alt="" /></button>
                            </div>
                        </div>
                    </div>
                    <div class="user-list-responsive">
                        <div class="user-box">
                            <div class="left-side">
                                <img src="../images/user-profile-image.png" alt="" />
                            </div>
                            <div class="right-side">
                                <div class="name row">
                                    <h4>Name</h4>
                                    <p>Dulanjana Nisal</p>
                                </div>
                                <div class="email row">
                                    <h4>Email</h4>
                                    <p>dulanjananisal67@gmail.com</p>
                                </div>
                                <div class="id row">
                                    <h4>User ID</h4>
                                    <p>69da8f62c39fbcbf86351016</p>
                                </div>
                                <div class="orders row">
                                    <h4>Orders</h4>
                                    <div class="btns">
                                        <button class="order-btn">All Orders</button>
                                        <button class="delete-btn"><img src="../images/delete-icon.png"
                                            alt="" /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="user-box">
                            <div class="left-side">
                                <img src="../images/user-profile-image.png" alt="" />
                            </div>
                            <div class="right-side">
                                <div class="name row">
                                    <h4>Name</h4>
                                    <p>Dulanjana Nisal</p>
                                </div>
                                <div class="email row">
                                    <h4>Email</h4>
                                    <p>dulanjananisal67@gmail.com</p>
                                </div>
                                <div class="id row">
                                    <h4>User ID</h4>
                                    <p>69da8f62c39fbcbf86351016</p>
                                </div>
                                <div class="orders row">
                                    <h4>Orders</h4>
                                    <div class="btns">
                                        <button class="order-btn">All Orders</button>
                                        <button class="delete-btn"><img src="../images/delete-icon.png"
                                            alt="" /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="user-box">
                            <div class="left-side">
                                <img src="../images/user-profile-image.png" alt="" />
                            </div>
                            <div class="right-side">
                                <div class="name row">
                                    <h4>Name</h4>
                                    <p>Dulanjana Nisal</p>
                                </div>
                                <div class="email row">
                                    <h4>Email</h4>
                                    <p>dulanjananisal67@gmail.com</p>
                                </div>
                                <div class="id row">
                                    <h4>User ID</h4>
                                    <p>69da8f62c39fbcbf86351016</p>
                                </div>
                                <div class="orders row">
                                    <h4>Orders</h4>
                                    <div class="btns">
                                        <button class="order-btn">All Orders</button>
                                        <button class="delete-btn"><img src="../images/delete-icon.png"
                                            alt="" /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="user-box">
                            <div class="left-side">
                                <img src="../images/user-profile-image.png" alt="" />
                            </div>
                            <div class="right-side">
                                <div class="name row">
                                    <h4>Name</h4>
                                    <p>Dulanjana Nisal</p>
                                </div>
                                <div class="email row">
                                    <h4>Email</h4>
                                    <p>dulanjananisal67@gmail.com</p>
                                </div>
                                <div class="id row">
                                    <h4>User ID</h4>
                                    <p>69da8f62c39fbcbf86351016</p>
                                </div>
                                <div class="orders row">
                                    <h4>Orders</h4>
                                    <div class="btns">
                                        <button class="order-btn">All Orders</button>
                                        <button class="delete-btn"><img src="../images/delete-icon.png"
                                            alt="" /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="user-box">
                            <div class="left-side">
                                <img src="../images/user-profile-image.png" alt="" />
                            </div>
                            <div class="right-side">
                                <div class="name row">
                                    <h4>Name</h4>
                                    <p>Dulanjana Nisal</p>
                                </div>
                                <div class="email row">
                                    <h4>Email</h4>
                                    <p>dulanjananisal67@gmail.com</p>
                                </div>
                                <div class="id row">
                                    <h4>User ID</h4>
                                    <p>69da8f62c39fbcbf86351016</p>
                                </div>
                                <div class="orders row">
                                    <h4>Orders</h4>
                                    <div class="btns">
                                        <button class="order-btn">All Orders</button>
                                        <button class="delete-btn"><img src="../images/delete-icon.png"
                                            alt="" /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="user-box">
                            <div class="left-side">
                                <img src="../images/user-profile-image.png" alt="" />
                            </div>
                            <div class="right-side">
                                <div class="name row">
                                    <h4>Name</h4>
                                    <p>Dulanjana Nisal</p>
                                </div>
                                <div class="email row">
                                    <h4>Email</h4>
                                    <p>dulanjananisal67@gmail.com</p>
                                </div>
                                <div class="id row">
                                    <h4>User ID</h4>
                                    <p>69da8f62c39fbcbf86351016</p>
                                </div>
                                <div class="orders row">
                                    <h4>Orders</h4>
                                    <div class="btns">
                                        <button class="order-btn">All Orders</button>
                                        <button class="delete-btn"><img src="../images/delete-icon.png"
                                            alt="" /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="user-box">
                            <div class="left-side">
                                <img src="../images/user-profile-image.png" alt="" />
                            </div>
                            <div class="right-side">
                                <div class="name row">
                                    <h4>Name</h4>
                                    <p>Dulanjana Nisal</p>
                                </div>
                                <div class="email row">
                                    <h4>Email</h4>
                                    <p>dulanjananisal67@gmail.com</p>
                                </div>
                                <div class="id row">
                                    <h4>User ID</h4>
                                    <p>69da8f62c39fbcbf86351016</p>
                                </div>
                                <div class="orders row">
                                    <h4>Orders</h4>
                                    <div class="btns">
                                        <button class="order-btn">All Orders</button>
                                        <button class="delete-btn"><img src="../images/delete-icon.png"
                                            alt="" /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="user-box">
                            <div class="left-side">
                                <img src="../images/user-profile-image.png" alt="" />
                            </div>
                            <div class="right-side">
                                <div class="name row">
                                    <h4>Name</h4>
                                    <p>Dulanjana Nisal</p>
                                </div>
                                <div class="email row">
                                    <h4>Email</h4>
                                    <p>dulanjananisal67@gmail.com</p>
                                </div>
                                <div class="id row">
                                    <h4>User ID</h4>
                                    <p>69da8f62c39fbcbf86351016</p>
                                </div>
                                <div class="orders row">
                                    <h4>Orders</h4>
                                    <div class="btns">
                                        <button class="order-btn">All Orders</button>
                                        <button class="delete-btn"><img src="../images/delete-icon.png"
                                            alt="" /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="user-full-details">
                        <div class="user-box">
                            <div class="left-side">
                                <img src="../images/user-profile-image.png" alt="" />
                            </div>
                            <div class="right-side">
                                <div class="name row">
                                    <h4>Name</h4>
                                    <p>Dulanjana Nisal</p>
                                </div>
                                <div class="email row">
                                    <h4>Email</h4>
                                    <p>dulanjananisal67@gmail.com</p>
                                </div>
                                <div class="id row">
                                    <h4>User ID</h4>
                                    <p>69da8f62c39fbcbf86351016</p>
                                </div>
                                <div class="role row">
                                    <h4>Role</h4>
                                    <p>User</p>
                                </div>
                                <button><i class="fa fa-close"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Users;