import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { observer } from 'mobx-react';
import { Table, Button, Tag, Tooltip, message, Modal, InputNumber } from 'antd';
import { BOOK_SPARE_LIST, BOOK_FULL_LIST, BOOK_STATUS_TYPE } from '@constant/mock/search'
import { useUserStore } from '@hooks/useStore';
// import { debounce } from '@util/debounce'

function BookLocation({ isAvailable }) {
    const userStore = useUserStore();
    const history = useHistory();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [day, setDay] = useState(5);

    const columns = [
        {
            title: '索书号',
            dataIndex: 'searcnNum',
            key: 'searcnNum'
        }, {
            title: '条码号',
            dataIndex: 'bookId',
            key: 'bookId',
            responsive: ['lg']
        }, {
            title: '馆藏地',
            dataIndex: 'collectLocation',
            key: 'collectLocation',
        }, {
            title: '书刊状态',
            dataIndex: 'returnBookStatus',
            key: 'returnBookStatus',
            render: returnBookStatus => <Tag color={BOOK_STATUS_TYPE[returnBookStatus].color}>{BOOK_STATUS_TYPE[returnBookStatus].name}</Tag>
        }, {
            title: '定位信息',
            dataIndex: 'bookLocation',
            key: 'bookLocation',
        }, {
            title: '操作',
            key: 'action',
            responsive: ['md'],
            render: (text, record) => (
                <Tooltip placement="top" title={record.returnBookStatus === 0 ? '本书籍状态可借，不支持预约' : userStore.user ? '' : '请先登录系统'}>
                    <Button
                        type="primary"
                        size="small"
                        disabled={record.returnBookStatus === 0 ? '0' : ''}
                        onClick={() => reserveBook(record)}
                    >
                        预约
                    </Button>
                </Tooltip>
            ),
        },
    ];

    const handleOk = () => {
        if(!day) {
            message.error('预约天数不能为空！');
            return
        }
        message.warn('正在预约中...');
        setConfirmLoading(true);
        setTimeout(() => {
            switch (day) {
                case 1:
                    message.error('当前账户存在逾期未还图书，请先归还!');
                    break;
                case 2:
                    message.error('当前账户预约书籍过多，暂不支持预约!');
                    break;
                default:
                    message.success('预约成功，请及时关注系统消息或手机短信!');
                    break;
            }
            setConfirmLoading(false);
            setIsModalVisible(false);
        }, 1000);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleNumChange = (val) => {
        console.log(val);
        setDay(val)
        if (val > 8) {
            message.error('预约保留天数不得大于八天，请重新输入');
        }
    }

    // 防止用户删数字时即触发错误提示
    // const debounceHandleNumChange = debounce(handleNumChange, 1000);

    const reserveBook = (val) => {
        if (!userStore.user) {
            history.push('/login');
        } else {
            setIsModalVisible(true);
            console.log('正在预约的图书信息', val);
        }
    }

    return (
        <>
            <Table rowKey="id" columns={columns} dataSource={isAvailable ? BOOK_SPARE_LIST : BOOK_FULL_LIST} />
            <Modal
                title="预约信息"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                confirmLoading={confirmLoading}
                destroyOnClose
            >
                <span>请输入预约保留天数：</span>
                <InputNumber min={1} max={8} defaultValue={day} onChange={handleNumChange} />
            </Modal>
        </>
    )
}

export default observer(BookLocation);