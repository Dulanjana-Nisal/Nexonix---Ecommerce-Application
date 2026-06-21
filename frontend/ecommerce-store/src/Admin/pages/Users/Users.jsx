import './Users.css';
import user_profile_image from '../../../assets/user-profile-image.png'
import delete_img from '../../../assets/delete-icon.png'
import { useEffect, useState } from 'react';
import api from '../../../services/auth'
import { Message } from '../../../context/MessagesContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import UserUpdate from './UserUpdate';
import LoadingComponent from '../../Components/Loading/LoadingComponent';

function Users() {

    //load context
    const { setupMessage } = Message()

    // users states
    const [users, setUsers] = useState([])
    const [toggleDetails, setToggleDetails] = useState(false)
    const [allResultCount, setAllResultCount] = useState(1)
    const [updateUsersToggle, setUpdateUsersToggle] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const [fullDetails, setFullDetails] = useState({})
    const [loading, setLoading] = useState(false)

    // navigations
    const navigate = useNavigate();

    //get query data from url
    const [queryData, setQueryData] = useSearchParams();

    //page number
    const pageNumber = Number(queryData.get('page')) || 1

    //user filters
    const userFilter = queryData.get('role') || ""

    //users search
    const searchUsers = queryData.get('search') || ""

    // fetch all users data
    useEffect(() => {
        const fetchUsersData = async () => {
            setLoading(true)
            try{
                const result = await api.get(`/users?page=${pageNumber}&role=${userFilter}&search=${searchUsers}`)
                setUsers(result.data.data)
                setAllResultCount(result.data.all_result)
            }
            catch(err){
                console.log(err.response)
            }
            finally{
                setLoading(false)
            }
            
        }
        fetchUsersData();
    }, [pageNumber,userFilter,setupMessage,searchUsers])

    //search users function 
    const searchUsersByKeyword = async () => {
        const newQuery = new URLSearchParams(queryData)
        if (searchValue.length < 2) {
            setupMessage('error', 'Please Enter more than 1 values for search...')
            newQuery.set("search", "")
            setQueryData(newQuery)
            return
        }
        newQuery.set("search", searchValue)
        setQueryData(newQuery)
    }

    console.log('hellow')

    //toggle user full details box
    const toggleFullDetailsBox = (itemId) => {
        setToggleDetails(prev => !prev)

        const details = users.find(item => item._id === itemId)
        setFullDetails(details)
    }

    //filter users
    const filterUsers = (filterValue) => {
        const newQuery = new URLSearchParams(queryData)
        newQuery.set("role", filterValue)
        setQueryData(newQuery)
    }

    // detele users
    const deleteUser = async (userId) => {
        try {
            await api.delete(`users/${userId}`)
            setupMessage('success', 'User Delete success!')
        } catch (err) {
            console.log(err.response)
            setupMessage('error', 'User Delete Error!')
        }
    }

    //prev page
    const prevPage = () => {
        const newQuery = new URLSearchParams(queryData)
        if (pageNumber === 1) {
            newQuery.set("page", 1)
        }
        newQuery.set("page", pageNumber - 1)
        setQueryData(newQuery)
    }

    //next page
    const nextPage = () => {
        const newQuery = new URLSearchParams(queryData)
        newQuery.set("page", pageNumber + 1)
        setQueryData(newQuery)
    }

    return (
        <>
            <div class="user-section">
                <div class="user-header">
                    <div class="header-filter">
                        <p>Filter By</p>
                        <select onClick={(e) => filterUsers(e.target.value)}>
                            <option value="">All</option>
                            <option value="admin">Admins</option>
                            <option value="user">Users</option>
                        </select>
                    </div>
                    <div class="search">
                        <input type="text" placeholder="Search Users" onChange={(e) => setSearchValue(e.target.value)} />
                        <button onClick={() => searchUsersByKeyword()}><i class="fa-solid fa-magnifying-glass"></i></button>
                    </div>
                </div>
                <div class="user-body">
                    {
                        loading ? <LoadingComponent />
                        :
                        <div class="user-list">
                            <div class="list-header">
                                <p>Name</p>
                                <p>Email</p>
                                <p>Id</p>
                                <p>Orders</p>
                            </div>
                            {
                                users.length > 0 &&
                                users.map((items) => {
                                    return (
                                        <div class="user-box" key={items._id}>
                                            <div class="name" onClick={() => toggleFullDetailsBox(items._id)}>
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
                                                        <button class="order-btn orders" onClick={() => navigate(`/admin/orders?serchByUserId=${items._id}`)}>All Orders</button>
                                                }
                                                {
                                                    items.role !== 'admin' &&
                                                    <button class="update" onClick={() => setUpdateUsersToggle({toggle: !updateUsersToggle.toggle, userId: items._id})}><i class="fa-solid fa-pen-to-square"></i></button>
                                                }
                                                {
                                                    items.role !== 'admin' &&
                                                    <button class="delete-btn"><img src={delete_img} alt="" onClick={() => deleteUser(items._id)} /></button>
                                                }

                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    }
                    {
                        updateUsersToggle.toggle &&
                        <UserUpdate setUpdateUsersToggle={setUpdateUsersToggle} updateUsersToggle={updateUsersToggle} setupMessage={setupMessage} />
                    }
                    <div class="user-list-responsive">
                        {/* map here */}
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
                <div class="user-footer">
                    <div class="box-buttons">
                        {
                            pageNumber !== 1 &&
                            <button class="pre" onClick={() => prevPage()}>‹</button>
                        }
                        <p><span>{pageNumber}</span> of {Math.ceil(allResultCount /10)}</p>
                        {
                            (Math.ceil(allResultCount /10)) > pageNumber &&
                            <button class="next" onClick={() => nextPage()}>›</button>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Users;