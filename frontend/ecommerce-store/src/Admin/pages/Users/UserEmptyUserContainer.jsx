import empty_user from '../../../assets/empty-users.svg';

function UserEmptyUserContainer() {
    return (
        <div className="admin-empty-user-container">
            <div className="container-top">
                <img src={empty_user} alt="emty-cart-image" />
            </div>
            <div className="container-bottom">
                <h1>Not Users Here</h1>
                <p>Looks like you haven't any users here.</p>
            </div>
        </div>
    )
}

export default UserEmptyUserContainer;