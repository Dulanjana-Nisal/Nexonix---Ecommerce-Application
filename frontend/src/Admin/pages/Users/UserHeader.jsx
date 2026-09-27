function UserHeader({ filterUsers, userIdSearchValue, setUserIdSearchValue, usersSearchValue, setUsersSearchValue, searchUsers, resetUsers, userFilter, userID, searchKeyword }) {
    return (
        <div className="user-header">
            <div className="header-filter">
                <div className="filter-methods">
                    <div className="header-filter">
                        <p>Filter By</p>
                        <select onClick={(e) => filterUsers(e.target.value)}>
                            <option value="">All</option>
                            <option value="admin">Admins</option>
                            <option value="user">Users</option>
                        </select>
                    </div>
                    <div className="find">
                        <p>Search by User ID</p>
                        <input type="text" value={userIdSearchValue} type="text" onChange={(e) => setUserIdSearchValue(e.target.value)} />
                        {
                            userIdSearchValue === "" &&
                            <div className="placeholder">
                                <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                <p>Enter User ID</p>
                            </div>
                        }
                    </div>
                    <div className="search">
                        <p>Search by User Name</p>
                        <input value={usersSearchValue} type="text" onChange={(e) => setUsersSearchValue(e.target.value)} />
                        {
                            usersSearchValue === "" &&
                            <div className="placeholder">
                                <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"></path></svg>
                                <p>Enter User Name</p>
                            </div>
                        }
                    </div>
                    <div className="buttons">
                        <button onClick={() => searchUsers()}><i className="fa-solid fa-magnifying-glass"></i>Search</button>
                        <button className='reset' onClick={() => resetUsers()}><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 102.13-9.36L1 10"></path></svg> Reset</button>
                    </div>
                </div>
                <div className="filter-keys">
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
    )
}

export default UserHeader;