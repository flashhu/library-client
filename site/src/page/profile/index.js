import { observer }  from 'mobx-react'
import { Tag } from 'antd';
import { useUserStore } from '@hooks/useStore'
import './index.less'

function Profile() {
    const userStore = useUserStore()

    return (
        <div className="proflie">
            <div className="content-title">个人资料</div>
            <div className="profile-info">
                <p><span>姓名：</span>{userStore.user && userStore.user.name}</p>
                <p><span>学院：</span>{userStore.user && userStore.user.college}</p>
                <p><span>班级：</span>{userStore.user && userStore.user.class}</p>
                <p><span>联系方式：</span>{userStore.user && userStore.user.phone}</p>
                <p><span>邮箱：</span>{userStore.user && userStore.user.email}</p>
                <p><span>借阅数量：</span>3 / 10本 <Tag color="red" style={{marginLeft: 10}}>存在超期图书</Tag></p>
                <p><span>可借天数：</span>30天</p>
                <p><span>续借天数：</span>30天</p>
            </div>
        </div>
    )
}

export default observer(Profile)