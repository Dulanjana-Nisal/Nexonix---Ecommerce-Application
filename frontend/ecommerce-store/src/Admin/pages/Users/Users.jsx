import './Users.css';
import user_profile_image from '../../../assets/user-profile-image.png'
import delete_img from '../../../assets/delete-icon.png'
import empty_user from '../../../assets/empty-users.svg'
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
    const [userIdSearchValue, setUserIdSearchValue] = useState("")
    const [usersSearchValue, setUsersSearchValue] = useState("")
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
    const searchKeyword = queryData.get('search') || ""

    // search by user id
    const userID = queryData.get('userId') || ''

    // fetch all users data
    useEffect(() => {
        const fetchUsersData = async () => {
            setLoading(true)
            try {
                const result = await api.get(`/users?page=${pageNumber}&role=${userFilter}&search=${searchKeyword}&userId=${userID}`)
                setUsers(result.data.data)
                setAllResultCount(result.data.all_result)
            }
            catch (err) {
                console.log(err.response)
            }
            finally {
                setLoading(false)
            }

        }
        fetchUsersData();
    }, [pageNumber, userFilter, setupMessage, userID, searchKeyword])

    // search users
    const searchUsers = () => {
        const newquery = new URLSearchParams(queryData);
        if (userIdSearchValue.length <= 1 && usersSearchValue <= 1) {
            setupMessage('error', 'Please Enter more than 1 value to search...', "Search Faild!")
            return
        }
        if (userIdSearchValue.length > 1) {
            if (userIdSearchValue.length !== 24) {
                setupMessage('error', 'User ID must be 24 characters!', "Search Faild!")
                return
            }
            newquery.set('userId', userIdSearchValue)
            newquery.set('page', 1)
        }
        if (usersSearchValue.length > 1) {
            newquery.set('search', usersSearchValue)
            newquery.set('page', 1)
        }
        setQueryData(newquery)
    }

    // reset button
    const resetUsers = () => {
        setQueryData({})
        setUsersSearchValue("")
        setUserIdSearchValue("")
    }

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
                        <div class="filter-methods">
                            <div class="header-filter">
                                <p>Filter By</p>
                                <select onClick={(e) => filterUsers(e.target.value)}>
                                    <option value="">All</option>
                                    <option value="admin">Admins</option>
                                    <option value="user">Users</option>
                                </select>
                            </div>
                            <div class="find">
                                <p>Search by User ID</p>
                                <input type="text" value={userIdSearchValue} type="text" onChange={(e) => setUserIdSearchValue(e.target.value)} />
                                {
                                    userIdSearchValue === "" &&
                                    <div class="placeholder">
                                        <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                        <p>Enter User ID</p>
                                    </div>
                                }
                            </div>
                            <div class="search">
                                <p>Search by User Name</p>
                                <input value={usersSearchValue} type="text" onChange={(e) => setUsersSearchValue(e.target.value)} />
                                {
                                    usersSearchValue === "" &&
                                    <div class="placeholder">
                                        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"></path></svg>
                                        <p>Enter User Name</p>
                                    </div>
                                }
                            </div>
                            <div class="buttons">
                                <button onClick={() => searchUsers()}><i class="fa-solid fa-magnifying-glass"></i>Search</button>
                                <button class='reset' onClick={() => resetUsers()}><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 102.13-9.36L1 10"></path></svg> Reset</button>
                            </div>
                        </div>
                        <div class="filter-keys">
                            {
                                userFilter &&
                                <p>{userFilter}</p>
                            }
                            {
                                userID &&
                                <p>ID: {userID}</p>
                            }
                            {
                                searchKeyword &&
                                <p>{searchKeyword}</p>
                            }
                        </div>
                    </div>
                </div>
                <div class="user-body">
                    {
                        loading ? <LoadingComponent />
                            :
                            users.length === 0 ?
                                <div class="admin-empty-user-container">
                                    <div class="container-top">
                                        <img src={empty_user} alt="emty-cart-image" />
                                    </div>
                                    <div class="container-bottom">
                                        <h1>Not Users Here</h1>
                                        <p>Looks like you haven't any users here.</p>
                                    </div>
                                </div>
                                :
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Joined</th>
                                            <th>Orders</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            users.length > 0 &&
                                            users.map((items) => {
                                                return (
                                                    <tr class="user-box" key={items._id}>
                                                        <td class="name" onClick={() => toggleFullDetailsBox(items._id)}>
                                                            <img src={user_profile_image} alt="prodile-image" class="user-image" />
                                                            <div class="box-user-details">
                                                                <h3>{items.name}</h3>
                                                                <p>ID: {items._id}</p>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <p>{items.email}</p>
                                                        </td>
                                                        <td>
                                                            <p>{(items.createdAt).slice(0, 10)}</p>
                                                        </td>
                                                        <td class="buttons">
                                                            <div class="button-content">
                                                                {
                                                                    items.role === 'admin' ?
                                                                        <button class="order-btn admin">Admin</button>
                                                                        :
                                                                        <button class="order-btn orders" onClick={() => navigate(`/admin/orders?serchByUserId=${items._id}`)}>All Orders</button>
                                                                }
                                                                {
                                                                    items.role !== 'admin' &&
                                                                    <button class="update" onClick={() => setUpdateUsersToggle({ toggle: !updateUsersToggle.toggle, userId: items._id })}><i class="fa-solid fa-pen-to-square"></i></button>
                                                                }
                                                                {
                                                                    items.role !== 'admin' &&
                                                                    <svg onClick={() => deleteUser(items._id)} class="delete" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14H6L5 6"></path><path d="M10 11v6M14 11v6"></path><path d="M9 6V4h6v2"></path></svg>
                                                                }
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
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
                        <p><span>{pageNumber}</span> of {Math.ceil(allResultCount / 10)}</p>
                        {
                            (Math.ceil(allResultCount / 10)) > pageNumber &&
                            <button class="next" onClick={() => nextPage()}>›</button>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Users;