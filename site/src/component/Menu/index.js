import { Menu } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import { USER_MENU } from '@constant/data'

const { SubMenu } = Menu;

function MainMenu() {
    const history = useHistory();
    
    return (
        <Menu selectedKeys={[history.location.pathname || '/']} mode="inline">
            {USER_MENU.map(item =>
                item.children ?
                <SubMenu key={item.path} icon={item.icon} title={item.name}>
                    {item.children.map(item => 
                        <Menu.Item key={item.path}>
                            <Link to={item.path}>{item.name}</Link>
                        </Menu.Item>
                    )}
                </SubMenu>:
                <Menu.Item key={item.path} icon={item.icon}>
                    <Link to={item.path}>{item.name}</Link>
                </Menu.Item>
            )}
        </Menu>
    )
}

export default MainMenu;