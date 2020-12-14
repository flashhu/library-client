import iconNotFound from '@assets/img/404.svg'
import './index.less'

function NotFound() {
    return (
        <div className="not-found">
            <img
                className="icon-404"
                alt="404"
                src={iconNotFound}
            />
        </div>
    )
}

export default NotFound;