import { Component } from 'react';
import errorImg from '@assets/img/error.svg'
import './index.less'

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            errorInfo: '',
            hasError: false,
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.log({ error, errorInfo });
        this.setState({ errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-holder">
                    <div>
                        <img alt="tip" src={errorImg} />
                        <p>系统发生故障，请刷新页面重试 ...</p>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;