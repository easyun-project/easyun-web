import React from 'react';

import { classnames } from '@@/tailwindcss-classnames';
import { Icon } from '@iconify/react';

export default function icons() {
    return <div>
        超链接
        <a className={classnames('text-blue-500')} href="https://aws.amazon.com/cn/ec2" target="_blank" rel="noreferrer">
            superlink text
            <Icon fr={undefined}
                icon="akar-icons:link-out"
                className={classnames('inline-block', 'mx-1', 'text-blue-500')}
                width="15"
                height="15"
            />
        </a>
        添加按钮
        <button onClick={() => console.log('click')} className={classnames('inline', 'text-yellow-550')}>
            <Icon fr={undefined}
                icon="carbon:add"
                className={classnames('inline-block', 'mx-1')}
                width="15"
                height="15"
            />
            Create new disk
        </button>
        删除图标
        <Icon fr={undefined}
            icon="clarity:times-line"
            className={classnames('inline-block','mx-1', 'cursor-pointer')}
            width="24" height="24"
            color='#dd6b10'
            onClick={() => console.log('delete') }/>

    </div>;
}
