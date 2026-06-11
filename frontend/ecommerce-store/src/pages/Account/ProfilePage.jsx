import './ProfilePage.css';
import { Link } from 'react-router-dom';
import { logout } from '../../services/auth';
import user_profile from '../../assets/user-profile-image.png'

function ProfilePage({navigate,dispatch,user}) {
    return (
        <>
            <div class='profile-container'>
                <div class="profile-header">
                    <img src={user_profile} alt="" />
                    <h1>{user.name}</h1>
                    <p>{user.email}</p>
                </div>
                <div class="container-body">
                    {
                        user.role === 'admin' &&
                        <Link to='/admin/dashboard' class="no-style-link"><button class='admin-panel'>Go to Admin Panel</button></Link>
                    }
                    <button onClick={() => logout(navigate, dispatch)} class='logout'>Logout</button>
                </div>
            </div>
        </>
    )
}

export default ProfilePage;