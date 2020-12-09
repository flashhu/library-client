import { Layout } from 'antd';
import Menu from '@component/Menu'
import ErrorBoundary from '@component/ErrorBoundary'
import './index.less'

const { Content, Footer, Sider } = Layout;

function BaseLayout({ children }) {
    return (
        <Layout style={{ minHeight: '100vh' }} className="layout">
            <Sider theme="light">
                <div className="menu-logo">图书管理系统</div>
                <Menu />
            </Sider>
            <Layout className="site-layout">
                <Content style={{ margin: '0 16px' }}>
                    <ErrorBoundary>
                        {children}
                    </ErrorBoundary>
                </Content>
                <Footer style={{ textAlign: 'center' }}>©2020 Created by Group 7</Footer>
            </Layout>
        </Layout>
    )
}

export default BaseLayout