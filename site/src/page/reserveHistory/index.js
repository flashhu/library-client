import { Select, Input, Table, Tag, DatePicker } from 'antd';
import { RESERVE_SERACH_OPTIONS } from '@constant/data'
import { RESERVE_RECORD } from '@constant/mock/reserve'
import './index.less'

const { Option } = Select;
const { Search } = Input;
const { RangePicker } = DatePicker;

const onSearch = value => console.log(value);

const columns = [
  {
    title: '题名',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '责任者',
    dataIndex: 'author',
    key: 'author',
    // ellipsis: true,
  },
  {
    title: '条码号',
    dataIndex: 'bookId',
    key: 'bookId',
    align: 'center'
  },
  {
    title: '预约时间',
    dataIndex: 'reserveTime',
    key: 'reserveTime',
    align: 'center'
  },
  {
    title: '预留截止日期',
    dataIndex: 'validateTime',
    key: 'validateTime',
    align: 'center'
  },
  {
    title: '预约状态',
    key: 'tags',
    dataIndex: 'tags',
    width: 150,
    align: 'center',
    render: tags => (
      <>
        {tags.map(tag => {
          let color = 'green';
          if (tag === '已失效') {
            color = 'volcano';
          }
          if (tag === '待取书') {
            color = 'geekblue';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
];

function ReserveHistory() {
    return (
        <div>
            <div className="head-wrapper">
                <div className="head-title">预约记录</div>
                <div>
                <Input.Group compact>
                    <Select style={{ width: 100 }} defaultValue={RESERVE_SERACH_OPTIONS[0].id || ''}>
                        {RESERVE_SERACH_OPTIONS.map(item =>
                            <Option value={item.id} key={item.id}>{item.name}</Option>
                        )}
                    </Select>
                    <RangePicker picker="month" style={{ width: 200 }} />
                    <Search className="search-bar" defaultValue="" placeholder="搜索图书..." onSearch={onSearch} enterButton />
                </Input.Group>
                </div>
            </div>
            <Table columns={columns} dataSource={RESERVE_RECORD} />
        </div>
    )
}

export default ReserveHistory