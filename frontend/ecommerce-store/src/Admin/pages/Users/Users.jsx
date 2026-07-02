import './Users.css';
import user_profile_image from '../../../assets/user-profile-image.png'
import empty_user from '../../../assets/empty-users.svg'
import { useEffect, useState } from 'react';
import api from '../../../services/auth'
import { Message } from '../../../context/MessagesContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import UserUpdate from './UserUpdate';
import LoadingComponent from '../../Components/Loading/LoadingComponent';
import { format } from 'date-fns';

function Users() {

    //load context
    const { setupMessage } = Message() || ''

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
        if (userIdSearchValue.length <= 1 && usersSearchValue.length <= 1) {
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
        if (usersSearchValue.length >= 2) {
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
            setupMessage('success', `User (ID: ${userId}) is successfully deleted`, 'User Delete success!')
        } catch (err) {
            console.log(err.response)
            setupMessage('error', 'Error while deletion proceed try again later!' , 'User Delete Error!')
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
                                                    <tr class="user-box" key={items._id}>
                                                        <td class="name" onClick={() => toggleFullDetailsBox(items._id)}>
                                                            <img src={user_profile_image} alt="prodile-image" class="user-image" />
                                                            <div class="box-user-details">
                                                                <h3>{items.name}</h3>
                                                                <p>ID: {items._id}</p>
                                                            </div>
                                                        </td>
                                                        <td class="user-role">
                                                            <p class={`user-${items.role}`}>{items.role === 'admin' ? "Admin" : "User"}</p>
                                                        </td>
                                                        <td>
                                                            <p>{items.email}</p>
                                                        </td>
                                                        <td>
                                                            <p>{(items.createdAt).slice(0, 10)}</p>
                                                        </td>
                                                        <td class="buttons">
                                                            <div class="button-content">
                                                                <button class="order-btn orders" onClick={() => navigate(`/admin/orders?serchByUserId=${items._id}`)}>All Orders</button>
                                                            </div>
                                                        </td>
                                                        <td class="buttons">
                                                            <div class="button-content">
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
                        {
                            users.length > 0 &&
                            users.map((items) => {
                                return (
                                    <div class="user-responsive-box" key={items._id}>
                                        <div class="left-side" onClick={() => toggleFullDetailsBox(items._id)}>
                                            <img src={user_profile_image} alt="prodile-image" class="user-image" />
                                        </div>
                                        <div class="right-side">
                                            <div class="right-side-top">
                                                <h4>{items.name}</h4>
                                                <p>User ID: {items._id}</p>
                                            </div>
                                            <div class="right-side-bottom">
                                                <div class="side-bottom-part">
                                                    <h4>Name:</h4>
                                                    <p>{items.name}</p>
                                                </div>
                                                <div class="side-bottom-part">
                                                    <h4>Role:</h4>
                                                    <p class={items.role}>{items.role}</p>
                                                </div>
                                                <div class="side-bottom-part">
                                                    <h4>Email:</h4>
                                                    <p>{items.email}</p>
                                                </div>
                                                <div class="side-bottom-part">
                                                    <h4>Joined:</h4>
                                                    <p>{(items.createdAt).slice(0, 10)}</p>
                                                </div>
                                                <div class="side-bottom-part">
                                                    <h4>Orders:</h4>
                                                    <button class="order-btn orders" onClick={() => navigate(`/admin/orders?serchByUserId=${items._id}`)}>All Orders</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="actions-btns">
                                            {
                                                items.role !== 'admin' &&
                                                <button class="update" onClick={() => setUpdateUsersToggle({ toggle: !updateUsersToggle.toggle, userId: items._id })}><i class="fa-solid fa-pen-to-square"></i></button>
                                            }
                                            {
                                                items.role !== 'admin' &&
                                                <svg onClick={() => deleteUser(items._id)} class="delete" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14H6L5 6"></path><path d="M10 11v6M14 11v6"></path><path d="M9 6V4h6v2"></path></svg>
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    {
                        toggleDetails &&
                        <div class={`${fullDetails.role}-full-details`}>
                            <div class="user-box">
                                <div class="box-top">
                                    <div class="user-thumb">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2.4c-3.3 0-9.8 1.6-9.8 4.9v2.5h19.6v-2.5c0-3.3-6.5-4.9-9.8-4.9z"></path>
                                        </svg>
                                    </div>
                                    <div class="user-name">
                                        <h1>{fullDetails.name}</h1>
                                        <p>{fullDetails.role === 'admin' ? "Admin" : "User"}</p>
                                    </div>
                                    <div class="user-id">
                                        <p>User ID: <span>{fullDetails._id}</span></p>
                                    </div>
                                </div>
                                <div class="box-bottom">
                                    <div class="bottom-section">
                                        <div class="section-left-side">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                                <rect x="2.5" y="5" width="19" height="14" rx="2" /><path d="M3.5 6.5L12 13l8.5-6.5" />
                                            </svg>
                                        </div>
                                        <div class="section-right-side">
                                            <h4>Email</h4>
                                            <p>{fullDetails.email}</p>
                                        </div>
                                    </div>
                                    <div class="bottom-section">
                                        <div class="section-left-side">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <rect x="2.5" y="4.5" width="19" height="15" rx="2.2"></rect>
                                                <circle cx="8.5" cy="11" r="2"></circle>
                                                <path d="M5.5 16.5c0-1.8 1.5-3 3-3s3 1.2 3 3"></path>
                                                <line x1="14.5" y1="9.5" x2="18.5" y2="9.5"></line>
                                                <line x1="14.5" y1="13" x2="18.5" y2="13"></line>
                                            </svg>
                                        </div>
                                        <div class="section-right-side">
                                            <h4>User ID</h4>
                                            <p>{fullDetails._id}</p>
                                        </div>
                                    </div>
                                    <div class="bottom-section">
                                        <div class="section-left-side">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M12 2l8 3.5v6c0 5-3.6 8.3-8 10.5-4.4-2.2-8-5.5-8-10.5v-6L12 2z" /><path d="M8.5 12l2.3 2.3L15.5 9.7" />
                                            </svg>
                                        </div>
                                        <div class="section-right-side">
                                            <h4>Role</h4>
                                            <p>{fullDetails.role}</p>
                                        </div>
                                    </div>
                                    <div class="bottom-section">
                                        <div class="section-left-side">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <rect x="3" y="5" width="18" height="16" rx="2"></rect>
                                                <line x1="16" y1="3" x2="16" y2="7"></line>
                                                <line x1="8" y1="3" x2="8" y2="7"></line>
                                                <line x1="3" y1="10" x2="21" y2="10"></line>
                                            </svg>
                                        </div>
                                        <div class="section-right-side">
                                            <h4>Joined On</h4>
                                            <p>{format(new Date(fullDetails.createdAt), "MMMM dd, yyyy") || "2021.12.03"}</p>
                                        </div>
                                    </div>
                                </div>
                                <svg class="close-toggle-btn" onClick={() => setToggleDetails(prev => !prev)} viewBox="0 0 24 24" fill="none" width="24" height="24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
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