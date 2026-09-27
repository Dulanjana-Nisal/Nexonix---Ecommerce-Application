import { Link } from "react-router-dom";

function DetailsHeader({producatDetails}) {
    return (
        <div className="container-header">
            <p><Link to="/" style={{ textDecoration: "none" }}><span>Home</span></Link> / <Link to={`/products/${producatDetails.category}`} style={{ textDecoration: "none" }}><span>{producatDetails.category}</span></Link> / {producatDetails.name}</p>
        </div>
    )
}

export default DetailsHeader;