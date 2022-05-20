import React from 'react';
import { Icon } from '@iconify/react';
import { LoadingOutlined,CheckOutlined,CloseOutlined } from '@ant-design/icons';
import { Switch } from 'antd';

export default function icons() {
    return <div>
        超链接
        <a className='text-blue-500' href="https://aws.amazon.com/cn/ec2" target="_blank" rel="noreferrer">
            superlink text
            <Icon fr={undefined}
                icon="akar-icons:link-out"
                className='inline-block mx-1 text-blue-500'
                width="15"
                height="15"
            />
        </a>
        添加按钮
        <button onClick={() => console.log('click')} className='inline text-yellow-550'>
            <Icon
                icon="carbon:add"
                className='inline-block mx-1'
                width="15"
                height="15"
            />
            Create new disk
        </button>
        删除图标
        <Icon fr={undefined}
            icon="clarity:times-line"
            className='inline-block mx-1 cursor-pointer'
            width="24" height="24"
            color='#dd6b10'
            onClick={() => console.log('delete') }/>
        加载图标
        <LoadingOutlined />
        取消图标
        <Icon fr={undefined}
            icon="icons8:cancel"
            className='mx-1 cursor-pointer'
            width="24" height="24"
            color='red'
        />
        确认图标
        <Icon fr={undefined}
            icon="icons8:checked"
            className='mx-1 cursor-pointer'
            width="24" height="24"
            color="green"

        />
        <Switch
            checkedChildren={<CheckOutlined className= 'align-middle'/>}
            unCheckedChildren={<CloseOutlined className= 'align-middle'/>}
            defaultChecked
        />
    </div>;
}
