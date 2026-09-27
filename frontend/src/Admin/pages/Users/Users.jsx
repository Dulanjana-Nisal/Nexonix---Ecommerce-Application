import './Users.css';
import user_profile_image from '../../../assets/user-profile-image.png';
import { useEffect, useState } from 'react';
import api from '../../../services/auth';
import { Message } from '../../../context/MessagesContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import UserUpdate from './UserUpdate';
import LoadingComponent from '../../Components/Loading/LoadingComponent';
import UserHeader from './UserHeader';
import UserEmptyUserContainer from './UserEmptyUserContainer';
import UserListContainer from './UserListContainer';
import UserListResponsive from './UserListResponsive';
import UserFullDetailContainer from './UserFullDetailContainer';
import UserFooter from './UserFooter';

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
            setupMessage('error', 'Error while deletion proceed try again later!', 'User Delete Error!')
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
            <div className="user-section">
                {/* user header */}
                <UserHeader filterUsers={filterUsers} userIdSearchValue={userIdSearchValue} setUserIdSearchValue={setUserIdSearchValue} usersSearchValue={usersSearchValue} setUsersSearchValue={setUsersSearchValue} searchUsers={searchUsers} resetUsers={resetUsers} userFilter={userFilter} userID={userID} searchKeyword={searchKeyword} />

                <div className="user-body">
                    {
                        loading ? <LoadingComponent />
                            :
                            users.length === 0 ?
                                // empty user container
                                <UserEmptyUserContainer />
                                :
                                // user list container
                                <UserListContainer users={users} toggleFullDetailsBox={toggleFullDetailsBox} navigate={navigate} setUpdateUsersToggle={setUpdateUsersToggle} deleteUser={deleteUser} updateUsersToggle={updateUsersToggle} user_profile_image={user_profile_image} />
                    }
                    {
                        // update user
                        updateUsersToggle.toggle &&
                        <UserUpdate setUpdateUsersToggle={setUpdateUsersToggle} updateUsersToggle={updateUsersToggle} setupMessage={setupMessage} />
                    }
                    {/* user list reaponsive */}
                        <UserListResponsive users={users} toggleFullDetailsBox={toggleFullDetailsBox} navigate={navigate} setUpdateUsersToggle={setUpdateUsersToggle} deleteUser={deleteUser} updateUsersToggle={updateUsersToggle} user_profile_image={user_profile_image} />
                    {
                        // user full details box
                        toggleDetails &&
                        <UserFullDetailContainer setToggleDetails={setToggleDetails} fullDetails={fullDetails} />
                    }
                </div>

                {/* user footer */}
                <UserFooter pageNumber={pageNumber} prevPage={prevPage} allResultCount={allResultCount} nextPage={nextPage} />
            </div>
        </>
    )
}

export default Users;