import { Button } from 'antd'
import iconDeviceIdle from '@assets/img/deviceIdle.svg'
import iconDeviceBusy from '@assets/img/deviceBusy.svg'
import iconOperationProcess from '@assets/img/operationProcess.svg'
import iconSuccessOperation from '@assets/img/successfulOperation.svg'

function ReturnStatusBg({ status, handleClickReturn }) {
    switch (status) {
        case 0:
            // 借阅机繁忙
            return (
                <div>
                    <img alt="tip" className="status-pic" src={iconDeviceBusy} /><br />
                    <Button type="primary" disabled>立即还书</Button>
                </div>
            )
        case 1:
            // 借阅机空闲
            return (
                <div>
                    <img alt="tip" className="status-pic" src={iconDeviceIdle} /><br />
                    <Button type="primary" onClick={handleClickReturn}>立即还书</Button>
                </div>
            )
        case 2:
            // 书籍扫描结束
            return (
                <div>
                    <img alt="tip" className="status-pic" src={iconOperationProcess} />
                </div>
            )
        case 3:
            // 还书成功
            return (
                <div>
                    <img alt="tip" className="status-pic" src={iconSuccessOperation} />
                </div>
            )
        default:
            return <></>
    }
}

export default ReturnStatusBg