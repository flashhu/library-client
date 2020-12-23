import { LoadingOutlined } from '@ant-design/icons';
import './index.less'

function Loading() {
    return (
        <div className="loading">
            <LoadingOutlined /> 疯狂加载中...
        </div>
    )
}

export default Loading;