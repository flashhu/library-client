import { useEffect } from 'react'
import { observer } from 'mobx-react'
import { Layout, Tooltip } from 'antd'
import { useHistory } from 'react-router-dom'
import { useUserStore } from '@hooks/useStore'
import Menu from '@component/Menu'
import ErrorBoundary from '@component/ErrorBoundary'
import './index.less'

const { Content, Footer, Sider } = Layout;

function BaseLayout({ children }) {
    const history = useHistory()
    const userStore = useUserStore()

    const handleClickLogo = () => {
        if (userStore.user) {
            // 登出
            userStore.logout();
        } else {
            // 登录
            history.push('/login');
        }
    }

    useEffect(() => {
        if (window.localStorage.token && !userStore.user) {
            userStore.loginWithToken();
        }
    }, [userStore])

    return (
        <Layout style={{ minHeight: '100vh' }} className="layout">
            <Sider theme="light">
                <Tooltip classNmae="menu-tip" placement="right" title={userStore.user ? '点击登出': '点击登录'}>
                    <div className="menu-logo" onClick={handleClickLogo}>图书管理系统</div>
                </Tooltip>
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

export default observer(BaseLayout)