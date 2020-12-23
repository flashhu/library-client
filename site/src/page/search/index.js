import { useEffect } from 'react'
import { Input, Select, DatePicker, message } from 'antd'
import { useParams, useHistory, Link } from 'react-router-dom'
import { SERACH_OPTIONS, COLLECT_LOCATION } from '@constant/data'
import { SEARCH_WORD_TIME } from '@constant/mock/search'
import { highlightKeyword, hanldeKeyword } from '@util/highlight'
import iconNoData from '@assets/img/noData.svg'
import './index.less'

const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

function SearchPage() {
    const { keyword } = useParams()
    const history = useHistory()

    const onSearch = (value) => {
        history.push(`/search/${value ? '时间简史': ''}`)
    }

    useEffect(() => {
        if (keyword) {
            const dom = document.getElementById('search-result');
            const pattern = hanldeKeyword(keyword);
            highlightKeyword(dom, pattern[0])
        } else {
            message.error('请检查检索词是否有误！');
        }
    }, [keyword])

    return (
        <div className="search">
            <div className="content-title">馆藏查询</div>
            <Input.Group compact>
                <Select style={{ width: 100 }} defaultValue={SERACH_OPTIONS[0].id || ''}>
                    {SERACH_OPTIONS.map(item =>
                        <Option value={item.id} key={item.id}>{item.name}</Option>
                    )}
                </Select>
                <Select style={{ width: 120 }} defaultValue={COLLECT_LOCATION[0].id || ''}>
                    {COLLECT_LOCATION.map(item =>
                        <Option value={item.id} key={item.id}>{item.name}</Option>
                    )}
                </Select>
                <RangePicker picker="year" style={{ width: 200 }} />
                <Search className="search-bar" defaultValue={keyword ? '时间简史': ''} placeholder="搜索图书..." onSearch={onSearch} enterButton />
            </Input.Group>
            {
                keyword ? <>
                    <div className="result-summary">共检索到 {SEARCH_WORD_TIME.length} 条数据</div>
                    <div id="search-result" className="search-result">
                        {SEARCH_WORD_TIME.map((item, index) =>
                            <div className="result-item" key={`searchb${index}`}>
                                <div className="item-header">
                                    <span>{item.title}</span>
                                    <Link to="/book/978-7-5135-6503-5">查看馆藏</Link>
                                </div>
                                <div className="item-content">
                                        <div>
                                            <p>{item.author}</p>
                                            <p>{item.publish} <span>{item.year}</span></p>
                                        </div>
                                        <div className="item-num">
                                            <p>馆藏总量：{item.sum}</p>
                                            <p>可借余量：{item.available}</p>
                                        </div>
                                    </div>
                            </div>
                        )}
                    </div>
                </>:
                <div className="no-result">
                    <div>
                        <img alt="tip" src={iconNoData} />
                        <p>当前检索词未找到相关数据，请重新搜索！</p>
                    </div>
                </div>
            }
        </div>
    )
}

export default SearchPage;