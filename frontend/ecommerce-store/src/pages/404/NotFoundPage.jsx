import { Link } from 'react-router-dom';
import './NotFoundPage.css';

function NotFoundPage(){
    return(
        <>
            <div class="notfound-container">
                <h1>Page not found 404 error...</h1>
                <p><Link to='/'>Go to Home page</Link></p>
            </div>
        </>
    )
}
export default NotFoundPage;