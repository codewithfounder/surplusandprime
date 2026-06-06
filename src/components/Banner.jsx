import { Link } from "react-router-dom";

function Banner({ title }) {
    return (
        <div className="inner-banner">
            <div className="container">
                <h3>{title}</h3>
                <ul className="breadcumb">
                    <li><Link to="/">Home</Link></li>
                    <li><span className="sep"><i className="fa fa-angle-right"></i></span></li>
                    <li><span>{title}</span></li>
                </ul>
            </div>
        </div>
    )
}

export default Banner;