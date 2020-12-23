import { useState } from 'react'
import { message, Modal, Table } from 'antd'
import { RETURN_BOOK_DATA } from '@constant/mock/return'
import CountDown from './component/CountDown'
import ReturnStatusBg from './component/ReturnStatusBg'
import './index.less'

const columns = [{
    title: '条码号',
    dataIndex: 'bookId',
    key: 'bookId'
}, {
    title: '书名',
    dataIndex: 'title',
    key: 'title'
}, {
    title: '作者',
    dataIndex: 'author',
    key: 'author'
}, {
    title: '应还日期',
    dataIndex: 'dateToReturn',
    key: 'dateToReturn'
}]

function Return() {
    // 0 => 借阅机繁忙
    // 1 => 借阅机空闲
    // 2 => 读取书籍成功
    // 3 => 开始还书操作
    const [status, setStatus] = useState(0)
    const [isModalVisible, setIsModalVisible] = useState(false)

    const handleClickReturn = () => {
        setIsModalVisible(true)
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleIdentifyFailed = () => {
        if(status === 1) {
            message.error('获取书籍信息失败，请重试');
            setIsModalVisible(false);
        }
        if(status === 2) {
            message.warn('请重新将待还书籍放到借阅机的感应区内');
            setStatus(1);
        }
    }

    const handleIdentifySuccess = () => {
        message.success('获取书籍信息成功');
        setStatus(2);
    }

    const handleVerifyStatus = () => {
        message.error('该本《时间简史》未借出，操作失败');
        setStatus(1);
        handleCancel();
    }

    const handleStartReturn = () => {
        setStatus(3);
    }

    const handleReturn = (type) => {
        setStatus(1);
        handleCancel();
        type === 'T' && message.success('还书成功');
        type === 'F' && message.warn('逾期还书成功，已扣除校园卡余额 0.5 元');
    }

    return (
        <div className="return-book">
            <div className="content-title">
                图书归还
                <div
                    className={status === 0 ? "status-item" : "status-item active"}
                    onClick={() => setStatus(status !== 0 ? 0 : 1)}
                >
                    借阅机{status === 0 ? "繁忙" : "空闲"}
                </div>
            </div>
            <div className="status-wrapper">
                <ReturnStatusBg status={status} handleClickReturn={handleClickReturn}/>
            </div>
            <Modal 
                className="return-wrapper"
                title="还书" 
                visible={isModalVisible}
                onCancel={handleCancel} 
                footer={null}
                destroyOnClose
            >
                <div className="rmodel-content">
                    {
                        status === 1 && 
                        <>
                            <CountDown handleFail={handleCancel} />
                            <p>请将待还书籍放到借阅机的感应区内 ...</p>
                        </>
                    }
                    {
                        status === 2 &&
                        <Table rowKey="id" columns={columns} dataSource={RETURN_BOOK_DATA} />
                    }
                    {
                        status === 3 &&
                        <p>正在归还书籍 ...</p>
                    }
                </div>
                <div className="rmodel-action">
                    {
                        status === 1 && 
                        <>
                            <div onClick={handleVerifyStatus}>状态异常</div>
                            <div onClick={handleIdentifyFailed}>识别失败</div>
                            <div onClick={handleIdentifySuccess}>识别成功</div>
                        </>
                    }
                    {
                        status === 2 &&
                        <>
                            <div onClick={handleIdentifyFailed}>识别失败</div>
                            <div onClick={handleStartReturn}>确认归还</div>
                        </>
                    }
                    {
                        status === 3 &&
                        <>
                            <div onClick={() => handleReturn('T')}>期内归还</div>
                            <div onClick={() => handleReturn('F')}>逾期归还</div>
                        </>
                    }
                </div>
            </Modal>
        </div>
    )
}

export default Return;