import { Button } from 'antd'
import iconDeviceIdle from '@assets/img/deviceIdle.svg'
import iconDeviceBusy from '@assets/img/deviceBusy.svg'
import iconOperationProcess from '@assets/img/operationProcess.svg'
import iconSuccessOperation from '@assets/img/successfulOperation.svg'

function BorrowStatusBg({ status, handleClickBorrow }) {
    switch (status) {
        case 0:
            // 借阅机繁忙
            return (
                <div>
                    <img alt="tip" className="status-pic" src={iconDeviceBusy} /><br />
                    <Button type="primary" disabled>立即借书</Button>
                </div>
            )
        case 1:
            // 借阅机空闲
            return (
                <div>
                    <img alt="tip" className="status-pic" src={iconDeviceIdle} /><br />
                    <Button type="primary" onClick={handleClickBorrow}>立即借书</Button>
                </div>
            )
        case 6:
            // 借书成功
            return (
                <div>
                    <img alt="tip" className="status-pic" src={iconSuccessOperation} />
                </div>
            )
        default:
            // 借书流程中
            return (
                <div>
                    <img alt="tip" className="status-pic" src={iconOperationProcess} />
                </div>
            )
    }
}

export default BorrowStatusBg