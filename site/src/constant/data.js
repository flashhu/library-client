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

export const SERACH_OPTIONS = [{
    id: 'any',
    name: '任意词'
}, {
    id: 'title',
    name: '题名'
}, {
    id: 'author',
    name: '责任者'
}, {
    id: 'theme',
    name: '主题词'
}, {
    id: 'isbn',
    name: 'ISBN'
}, {
    id: 'searchNum',
    name: '索书号'
}]