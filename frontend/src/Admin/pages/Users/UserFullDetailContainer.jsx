import { format } from "date-fns";

function UserFullDetailContainer({ fullDetails, setToggleDetails }) {
    return (
        <div className={`${fullDetails.role}-full-details`}>
            <div className="user-box">
                <div className="box-top">
                    <div className="user-thumb">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2.4c-3.3 0-9.8 1.6-9.8 4.9v2.5h19.6v-2.5c0-3.3-6.5-4.9-9.8-4.9z"></path>
                        </svg>
                    </div>
                    <div className="user-name">
                        <h1>{fullDetails.name}</h1>
                        <p>{fullDetails.role === 'admin' ? "Admin" : "User"}</p>
                    </div>
                    <div className="user-id">
                        <p>User ID: <span>{fullDetails._id}</span></p>
                    </div>
                </div>
                <div className="box-bottom">
                    <div className="bottom-section">
                        <div className="section-left-side">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="2.5" y="5" width="19" height="14" rx="2" /><path d="M3.5 6.5L12 13l8.5-6.5" />
                            </svg>
                        </div>
                        <div className="section-right-side">
                            <h4>Email</h4>
                            <p>{fullDetails.email}</p>
                        </div>
                    </div>
                    <div className="bottom-section">
                        <div className="section-left-side">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="2.5" y="4.5" width="19" height="15" rx="2.2"></rect>
                                <circle cx="8.5" cy="11" r="2"></circle>
                                <path d="M5.5 16.5c0-1.8 1.5-3 3-3s3 1.2 3 3"></path>
                                <line x1="14.5" y1="9.5" x2="18.5" y2="9.5"></line>
                                <line x1="14.5" y1="13" x2="18.5" y2="13"></line>
                            </svg>
                        </div>
                        <div className="section-right-side">
                            <h4>User ID</h4>
                            <p>{fullDetails._id}</p>
                        </div>
                    </div>
                    <div className="bottom-section">
                        <div className="section-left-side">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M12 2l8 3.5v6c0 5-3.6 8.3-8 10.5-4.4-2.2-8-5.5-8-10.5v-6L12 2z" /><path d="M8.5 12l2.3 2.3L15.5 9.7" />
                            </svg>
                        </div>
                        <div className="section-right-side">
                            <h4>Role</h4>
                            <p>{fullDetails.role}</p>
                        </div>
                    </div>
                    <div className="bottom-section">
                        <div className="section-left-side">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="3" y="5" width="18" height="16" rx="2"></rect>
                                <line x1="16" y1="3" x2="16" y2="7"></line>
                                <line x1="8" y1="3" x2="8" y2="7"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                        </div>
                        <div className="section-right-side">
                            <h4>Joined On</h4>
                            <p>{format(new Date(fullDetails.createdAt), "MMMM dd, yyyy") || "2021.12.03"}</p>
                        </div>
                    </div>
                </div>
                <svg className="close-toggle-btn" onClick={() => setToggleDetails(prev => !prev)} viewBox="0 0 24 24" fill="none" width="24" height="24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </div>
        </div>
    )
}

export default UserFullDetailContainer;