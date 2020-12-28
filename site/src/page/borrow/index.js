import { useState } from 'react'
import { Tabs, message, Modal, Table, Descriptions } from 'antd'
import { BORROW_DATA, BORROW_RENEW_DATA} from '@constant/mock/borrow'
import CountDown from '@component/CountDown'
import BorrowStatusBg from './component/BorrowStatusBg'
import  BorrowRenewStatusBg from './component/BorrowRenewStatusBg'
import './index.less'

const { TabPane } = Tabs;

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

const columns_renew = [{
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
    title: '续借应还日期',
    dataIndex: 'dateToReturn',
    key: 'dateToReturn'
}]


function Borrow() {    
    // status：
    // 0 => 借阅机繁忙
    // 1 => 借阅机空闲
    // 2 => 读取一卡通信息成功
    // 3 => 开始借书操作
    // 4 => 检查可借数量/续借状态
    // 5 => 检查上架状态
    // 6 => 显示借阅图书信息
    // 7 => 流程中需要重新放置图书
    const [status, setStatus] = useState(0)
    const [isModalVisible, setIsModalVisible] = useState(false)

    const handleClickBorrow = () => {
        setIsModalVisible(true)
    }

    const handleCancel = () => {
        setIsModalVisible(false);
        setStatus(1);
    };

    // 验证一卡通--成功
    const handleIdentifyIDSuccess = () => {
        message.success('获取一卡通信息成功');
        setStatus(2);
    }

    // 有逾期情况，借阅机跳转空闲
    const handleOutReturn = () => {
        message.warn('您有逾期图书尚未归还,请先还书');
        handleCancel();
    }
    // 无逾期未还，开始借书流程
    const handleStartBorrow = () => {
        setStatus(3);
    }

    // 获取书籍--成功
    const handleIdentifyBookSuccess = () => {
        message.success('获取书籍信息成功');
        setStatus(4);
    }

    // 有续借图书
    const handleInRenew = () => {
        message.success('检测到可续借图书')
        setStatus(5);
    }
    // 无续借图书
    const handleOutRenew = () => {
        message.warn('没有检测到可续借图书')
        setStatus(7);
    }

    // 借数之内
    const handleInLimited = () => {
        setStatus(5);
    }
    // 借数之外
    const handleOutLimited = () => {
        message.warn('数量超过帐户可借数量');
        setStatus(7);
    }

    // 上架图书
    const handleInCheck = () => {
        setStatus(6);
    }
    // 未上架图书
    const handleOutCheck = () => {
        message.warn('包含未上架图书《时间简史》,该书暂不可借阅');
        setStatus(7);
    }

    // 完成借书
    const handleBorrow = () => {
        message.success('借书成功');
        handleCancel();
    }
    //完成续借
    const handleBorrow_renew = () => {
        message.success('续借成功');
        handleCancel();
    }

    // 识别过程中需要重新放置图书
    const handleReset = () => {
        setStatus(3);
    }

    return (
        <div>
            <Tabs defaultActiveKey="1" size="large">
                <TabPane tab="图书借阅" key="1">
                    <div className="return-book">
                        <div className="content-title">
                            
                            <div
                                className={status === 1 ? "status-item active" : "status-item"}
                                onClick={() => setStatus(status !== 0 ? 0 : 1)}
                            >
                                借阅机{status === 1 ? "空闲" : "繁忙"}
                            </div>
                        </div>
                        <div className="status-wrapper">
                            <BorrowStatusBg status={status} handleClickBorrow={handleClickBorrow}/>
                        </div>
                        <Modal 
                            className="return-wrapper"
                            title="借书" 
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
                                        <p>请将一卡通放到借阅机的磁卡感应区内 ...</p>
                                    </>
                                }
                                {
                                    status === 2 && 
                                    <Descriptions title="用户信息">
                                        <Descriptions.Item label="姓名">李铁牛</Descriptions.Item>
                                        <Descriptions.Item label="学号">2018212212675</Descriptions.Item>
                                        <Descriptions.Item label="可借数量">8</Descriptions.Item>
                                    </Descriptions>
                                }
                                {
                                    status === 3 &&
                                    <>
                                        <CountDown handleFail={handleCancel} />
                                        <p>请将图书放到借阅机的感应区内 ...</p>
                                        <p>机器默认处理放置图书的前10本 ...</p>
                                    </>
                                }
                                {
                                    status === 4 &&
                                    <>
                                        <p>检查数量状态 ...</p>
                                    </>
                                }
                                {
                                    status === 5 &&
                                    <>
                                        <p>检查图书上架状态 ...</p>
                                    </>
                                }
                                {
                                    status === 6 &&
                                    <Table rowKey="id" columns={columns} dataSource={BORROW_DATA} />
                                }
                                {
                                    status === 7 &&
                                    <p>请选择操作 ...</p>
                                }
                            </div>
                            <div className="rmodel-action">
                                {
                                    status === 1 && 
                                    <>
                                        <div onClick={handleCancel}>取消</div>
                                        <div onClick={handleIdentifyIDSuccess}>识别成功</div>
                                    </>
                                }
                                {
                                    status === 2 &&
                                    <>
                                        <div onClick={handleOutReturn}>有逾期未还</div>
                                        <div onClick={handleStartBorrow}>无逾期未还</div>
                                    </>
                                }
                                {
                                    status === 3 &&
                                    <>
                                        <div onClick={handleIdentifyBookSuccess}>识别成功</div>
                                    </>
                                }
                                {
                                    status === 4 &&
                                    <>
                                        <div onClick={handleOutLimited}>超过可借数</div>
                                        <div onClick={handleInLimited}>可借数之内</div>
                                    </>
                                }
                                {
                                    status === 5 &&
                                    <>
                                        <div onClick={handleOutCheck}>未上架图书</div>
                                        <div onClick={handleInCheck}>上架图书</div>
                                    </>
                                }
                                {
                                    status === 6 &&
                                    <>
                                        <div onClick={() => handleReset()}>识别有误</div>
                                        <div onClick={() => handleBorrow()}>确认借阅</div>
                                    </>
                                }
                                {
                                    status === 7 &&
                                    <>
                                        <div onClick={() => handleCancel()}>取消借阅</div>
                                        <div onClick={() => handleReset()}>重新放置</div>
                                    </>
                                }
                            </div>
                        </Modal>
                    </div>
                </TabPane>
                <TabPane tab="图书续借" key="2">
                <div className="return-book">
                        <div className="content-title">
                            
                            <div
                                className={status === 0 ? "status-item" : "status-item active"}
                                onClick={() => setStatus(status !== 0 ? 0 : 1)}
                            >
                                借阅机{status === 0 ? "繁忙" : "空闲"}
                            </div>
                        </div>
                        <div className="status-wrapper">
                            <BorrowRenewStatusBg status={status} handleClickBorrow={handleClickBorrow}/>
                        </div>
                        <Modal 
                            className="return-wrapper"
                            title="续借" 
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
                                        <p>请将一卡通放到借阅机的磁卡感应区内 ...</p>
                                    </>
                                }
                                {
                                    status === 2 && 
                                    <Descriptions title="用户信息">
                                        <Descriptions.Item label="姓名">李铁牛</Descriptions.Item>
                                        <Descriptions.Item label="学号">2018212212675</Descriptions.Item>
                                        <Descriptions.Item label="可借数量">8</Descriptions.Item>
                                    </Descriptions>
                                }
                                {
                                    status === 3 &&
                                    <>
                                        <CountDown handleFail={handleCancel} />
                                        <p>请将图书放到借阅机的感应区内 ...</p>
                                        <p>机器默认处理放置图书的前10本 ...</p>
                                    </>
                                }
                                {
                                    status === 4 &&
                                    <>
                                        <p>检查图书续借状态 ...</p>
                                    </>
                                }
                                {
                                    status === 5 &&
                                    <Table rowKey="id" columns={columns_renew} dataSource={BORROW_RENEW_DATA} />
                                }
                                {
                                    status === 7 &&
                                    <p>请选择操作 ...</p>
                                }
                            </div>
                            <div className="rmodel-action">
                                {
                                    status === 1 && 
                                    <>
                                        <div onClick={handleCancel}>取消</div>
                                        <div onClick={handleIdentifyIDSuccess}>识别成功</div>
                                    </>
                                }
                                {
                                    status === 2 &&
                                    <>
                                        <div onClick={handleOutReturn}>有逾期未还</div>
                                        <div onClick={handleStartBorrow}>无逾期未还</div>
                                    </>
                                }
                                {
                                    status === 3 &&
                                    <>
                                        <div onClick={handleIdentifyBookSuccess}>识别成功</div>
                                    </>
                                }
                                {
                                    status === 4 &&
                                    <>
                                        <div onClick={handleOutRenew}>无可续借书</div>
                                        <div onClick={handleInRenew}>有可续借书</div>
                                    </>
                                }
                                {
                                    status === 5 &&
                                    <>
                                        <div onClick={() => handleReset()}>识别有误</div>
                                        <div onClick={() => handleBorrow_renew()}>确认续借</div>
                                    </>
                                }
                                {
                                    status === 7 &&
                                    <>
                                        <div onClick={() => handleCancel()}>取消续借</div>
                                        <div onClick={() => handleReset()}>重新放置</div>
                                    </>
                                }
                            </div>
                        </Modal>
                    </div>
                </TabPane>
            </Tabs>
            
        </div>
    )
}

export default Borrow;