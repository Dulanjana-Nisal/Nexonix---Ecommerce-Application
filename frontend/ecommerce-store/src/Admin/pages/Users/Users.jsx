import './Users.css';
import user_profile_image from '../../../assets/user-profile-image.png'
import delete_img from '../../../assets/delete-icon.png'
import { useEffect, useState } from 'react';
import api from '../../../services/auth'
import { Message } from '../../../context/MessagesContext';

function Users() {

    //load context
    const {setupMessage} = Message()

    // users states
    const [users,setUsers] = useState([])
    const [toggleDetails,setToggleDetails] = useState(false)
    const [searchValue,setSearchValue] = useState("")
    const [fullDetails,setFullDetails] = useState({})

    // fetch all users data
    useEffect(()=>{
        const fetchUsersData = async ()=>{
            const result = await api.get('/users')
            setUsers(result.data.data)
        }
        fetchUsersData();
    }, [])

    //search users function 
    const searchUsers = async() => {
        if(searchValue.length < 2){
            setupMessage('error', 'Please Enter more than 2 values for search...')
            return
        }
        try{
            const result = await api.get(`/users?search=${searchValue}`)
            setUsers(result.data.data)
        }
        catch(err){
            console.log(err.response)
        }
    }

    //toggle user full details box
    const  toggleFullDetailsBox = (itemId) => {
        setToggleDetails(prev => !prev)
        
        const details = users.find(item => item._id === itemId)
        setFullDetails(details)
    }

    //filter users
    const filterUsers = (filterValue)=>{
        const fetchUsersByRole = async ()=>{
            const result = await api.get(`/users?role=${filterValue}`)
            setUsers(result.data.data)
        }
        fetchUsersByRole();
    }

    // detele users
    const deleteUser = async(userId) => {
        try{
            await api.delete(`users/${userId}`)
            setupMessage('success','User Delete success!')
        }catch(err){
            console.log(err.response)
            setupMessage('error','User Delete Error!')
        }
    }

    return (
        <>
            <div class="user-section">
                <div class="user-header">
                    <div class="header-filter">
                        <p>Filter By</p>
                        <select  onClick={(e) => filterUsers(e.target.value)}>
                            <option value="">All</option>
                            <option value="admin">Admins</option>
                            <option value="user">Users</option>
                        </select>
                    </div>
                    <div class="search">
                        <input type="text" placeholder="Search Users"  onChange={(e) => setSearchValue(e.target.value)}/>
                        <button onClick={() => searchUsers()}><i class="fa-solid fa-magnifying-glass"></i></button>
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
                        {
                            users.length > 0 &&
                            users.map((items)=>{
                                return(
                                    <div class="user-box" key={items._id} onClick={() => toggleFullDetailsBox(items._id)}>
                                        <div class="name">
                                            <img src={user_profile_image} alt="prodile-image" class="user-image" />
                                            <p>{items.name}</p>
                                        </div>
                                        <div>
                                            <p>{items.email}</p>
                                        </div>
                                        <div>
                                            <p>{items._id}</p>
                                        </div>
                                        <div class="buttons">
                                            {
                                                items.role === 'admin' ?
                                                <button class="order-btn admin">Admin</button>
                                                :
                                                <button class="order-btn orders">All Orders</button>
                                            }
                                            {
                                                items.role !=='admin' &&
                                                <button class="delete-btn"><img src={delete_img} alt="" onClick={() => deleteUser(items._id)}/></button>
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
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
                                        <button class="delete-btn"><img src={delete_img}
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
                    {
                        toggleDetails &&
                        <div class="user-full-details">
                            <div class="user-box">
                                <div class="left-side">
                                    <img src={user_profile_image} alt="" />
                                </div>
                                <div class="right-side">
                                    <div class="name row">
                                        <h4>Name</h4>
                                        <p>{fullDetails.name}</p>
                                    </div>
                                    <div class="email row">
                                        <h4>Email</h4>
                                        <p>{fullDetails.email}</p>
                                    </div>
                                    <div class="id row">
                                        <h4>User ID</h4>
                                        <p>{fullDetails._id}</p>
                                    </div>
                                    <div class="role row">
                                        <h4>Role</h4>
                                        <p>{fullDetails.role}</p>
                                    </div>
                                    <button onClick={() => setToggleDetails(prev => !prev)}><i class="fa fa-close"></i></button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Users;