import { useState } from 'react'
import { Breadcrumb } from 'antd';
import { useHistory } from 'react-router-dom'
import { BOOK_DETAIL_TIME } from '@constant/mock/search'
import bookImg from '@assets/img/book.jpg'
import BookLocation from './component/BookLocationTable'
import './index.less'

const eBookHref = 'http://www.sslibrary.com/reader/jpath/jpathreader?d=d81a3fb20a2b6c34f96a9de2773a7b19&ssid=13528630'

function BookDetail() {
    const [isAvailable, setIsAvailable] = useState(false)
    const [haveEbook, setHaveEbook] = useState(true)
    const history = useHistory()

    return (
        <div className="book-detail">
            <Breadcrumb>
                <Breadcrumb.Item>
                    <span href="" onClick={() => history.goBack()}>馆藏查询</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>查看馆藏</Breadcrumb.Item>
            </Breadcrumb>
            <div className="content-title">
                {BOOK_DETAIL_TIME.title}
                <div className={isAvailable ? "book-status active" : "book-status"} onClick={() => setIsAvailable(!isAvailable)}>
                    {isAvailable ? '可借/3': '无余量'}
                </div>
                <div className={haveEbook ? "book-status active" : "book-status"} onClick={() => setHaveEbook(!haveEbook)}>
                    {haveEbook ? '有电子版' : '无电子版'}
                </div>
            </div>
            <div className="detail-info">
                <img style={{ width: 170, height: 250 }} alt="book" src={bookImg}/>
                <div className="detail-param">
                    <p>作者：{BOOK_DETAIL_TIME.mainResp}</p>
                    <p>译者：{BOOK_DETAIL_TIME.secondResp}</p>
                    <p>出版：{BOOK_DETAIL_TIME.publish}</p>
                    <p>版次：{BOOK_DETAIL_TIME.editionNum}</p>
                    <p>定价：{BOOK_DETAIL_TIME.price}</p>
                    <p>形态：{BOOK_DETAIL_TIME.physical}</p>
                    <p>类别：{BOOK_DETAIL_TIME.subject}</p>
                    {haveEbook && <p>阅读：<a target='_blank' rel="noreferrer" href={eBookHref}>在线电子书</a></p>}
                </div>
            </div>
            {
                BOOK_DETAIL_TIME.content &&
                <div className="detail-intro">
                    <p className="intro-title">内容简介</p>
                    <div dangerouslySetInnerHTML={{ __html: BOOK_DETAIL_TIME.content }}></div>
                </div>
            }
            {
                BOOK_DETAIL_TIME.category && 
                <div className="detail-intro">
                    <p className="intro-title">目录</p>
                    <div dangerouslySetInnerHTML={{__html: BOOK_DETAIL_TIME.category }}></div>
                </div>
            }
            <BookLocation isAvailable={isAvailable} />
        </div>
    )
}

export default BookDetail