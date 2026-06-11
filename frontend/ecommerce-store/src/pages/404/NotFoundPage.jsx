import { Link } from 'react-router-dom';
import './NotFoundPage.css';
import not_found from '../../assets/404.jpg'

function NotFoundPage(){
    return(
        <>
            <div class="notfound-container">
                <img src={not_found} alt="404 notfound" />
                <h1>Oops! Page Not Found</h1>
                <button><Link to='/'>Go to Home Page</Link></button>
            </div>
        </>
    )
}
export default NotFoundPage;