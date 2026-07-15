// import { Link } from "react-router-dom";

// function Banner({ title }) {
//     return (
//         <div className="inner-banner">
//             <div className="container">
//                 <h3>{title}</h3>
//                 <ul className="breadcumb">
//                     <li><Link to="/">Home</Link></li>
//                     <li><span className="sep"><i className="fa fa-angle-right"></i></span></li>
//                     <li><span>{title}</span></li>
//                 </ul>
//             </div>
//         </div>
//     )
// }

// export default Banner;

// Banner.js
// Banner.js
import { Link, useLocation } from "react-router-dom";

function Banner({ title, breadcrumbs = [] }) {
    const location = useLocation();

    // Auto-generate breadcrumbs from URL if not provided
    const generateBreadcrumbs = () => {
        const pathSegments = location.pathname.split('/').filter(seg => seg !== '');

        if (pathSegments.length === 0) {
            return [{ label: 'Home', path: '/' }];
        }

        const crumbs = [{ label: 'Home', path: '/' }];
        let currentPath = '';

        // Skip the first segment (empty string)
        for (let i = 0; i < pathSegments.length; i++) {
            const segment = pathSegments[i];
            currentPath += '/' + segment;

            // Skip these segments entirely
            const skipSegments = ['product-category', 'product'];
            if (skipSegments.includes(segment)) {
                continue;
            }

            // Format the label
            let label = segment
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

            crumbs.push({
                label: label,
                path: currentPath
            });
        }

        return crumbs;
    };

    const finalBreadcrumbs = breadcrumbs.length > 0 ? breadcrumbs : generateBreadcrumbs();

    return (
        <div className="inner-banner">
            <div className="container">
                <h3>{title}</h3>
                <ul className="breadcumb">
                    {finalBreadcrumbs.map((item, index) => (
                        <li key={index}>
                            {index < finalBreadcrumbs.length - 1 ? (
                                <>
                                    <Link to={item.path}>{item.label}</Link>
                                    <span className="sep">
                                        <i className="fa fa-angle-right"></i>
                                    </span>
                                </>
                            ) : (
                                <span>{item.label}</span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Banner;