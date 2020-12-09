import {
    CloudDownloadOutlined,
    FileSearchOutlined,
    CloudUploadOutlined,
    HistoryOutlined
} from '@ant-design/icons';

export const USER_MENU = [{
    name: '馆藏查询',
    path: '/',
    icon: <FileSearchOutlined />
}, {
    name: '图书借阅',
    path: '/borrow',
    icon: <CloudDownloadOutlined />
}, {
    name: '图书归还',
    path: '/return',
    icon: <CloudUploadOutlined />
}, {
    name: '历史记录',
    path: '/history',
    icon: <HistoryOutlined />,
    children: [{
        name: '借阅记录',
        path: '/history/book'
    }, {
        name: '预约记录',
        path: '/history/reserve'
    }]
}]