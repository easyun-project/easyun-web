import React, { useState } from 'react';
import { classnames } from '@@/tailwindcss-classnames';
import { Icon } from '@iconify/react';
import { Input } from 'antd';
import { ArrowRightOutlined, TagOutlined } from '@ant-design/icons';

export default function Tags() {
    const [serverTags, changeServerTags] = useState<Record<string, string>>({ 'Env': 'Dev', 'Project': 'Blog' });
    const [isAdding, changeIsAdding] = useState(false);
    const [isChanging, changeIsChanging] = useState(false);
    const [tagKey, changeKey] = useState('');
    const [tagValue, changeValue] = useState('');
    const deleteTag = (i:string) => {
        const newServerTags = { ...serverTags };
        delete newServerTags[i];
        changeServerTags(newServerTags);
    };

    const genTagsArray = () => {
        const tagsArray:JSX.Element[] = [];
        for (const i in serverTags) {
            tagsArray.push
            (<div
                key={i} className={classnames('rounded-border','p-2','my-4','w-96','grid','grid-cols-4')}>
                <div><TagOutlined className={classnames('pr-2')}/>{i}</div>
                <div><ArrowRightOutlined className={classnames('pr-2')} />{serverTags[i]}</div>
                <div className={classnames('col-start-4')}>
                    <Icon fr={undefined}
                        icon="ep:edit"
                        className={classnames('inline-block','mx-1', 'cursor-pointer')}
                        width="24" height="24"
                        color='#dd6b10'
                        onClick={() => {
                            changeKey(i);
                            changeValue(serverTags[i]);
                            deleteTag(i);
                            changeIsChanging(true);
                        }} />
                    <Icon fr={undefined}
                        icon="clarity:times-line"
                        className={classnames('inline-block','mx-1', 'cursor-pointer')}
                        width="24" height="24"
                        color='#dd6b10'
                        onClick={() => {
                            if (window.confirm('Are you sure delete this tag?'))
                            {deleteTag(i);}
                        }} />
                </div>
            </div>);
        }
        return tagsArray;
    };
    return <div>
        <div>Key-value tags</div>
        {/* 显示已有的tags */}
        {genTagsArray()}
        {isAdding || isChanging
            // 显示添加或者修改的界面
            ? <div className={classnames('flex','flex-row','items-center')}>
                <div className={classnames('flex','flex-row','active-border', 'w-96')}>
                    <div>
                        <span>Key</span>
                        <Input
                            defaultValue={tagKey}
                            placeholder="Tag key (e.g. Project)"
                            prefix={<TagOutlined className="site-form-item-icon"/>}
                            onChange={(e)=>changeKey(e.target.value)}
                        />
                    </div>
                    <div>
                        <span>Value</span>
                        <Input
                            defaultValue={tagValue}
                            placeholder="Tag value (e.g. Blog)"
                            prefix={<ArrowRightOutlined className="site-form-item-icon" />}
                            onChange={(e)=>changeValue(e.target.value)}
                        /></div>
                </div>
                <div className={classnames('justify-center', 'items-center')}>
                    {isChanging
                        ? undefined
                        : <Icon fr={undefined}
                            icon="icons8:cancel"
                            className={classnames('mx-1','cursor-pointer')}
                            width="24" height="24"
                            color='red'
                            onClick={() => changeIsAdding(false)}/>}

                    <Icon fr={undefined}
                        icon="icons8:checked"
                        className={classnames('mx-1','cursor-pointer')}
                        width="24" height="24"
                        color="green"
                        onClick={() => {
                            if (tagKey !== '' && tagValue !== '')
                            {
                                changeServerTags(
                                    {
                                        ...serverTags,
                                        [tagKey]: tagValue
                                    });
                            }
                            changeIsAdding(false);
                            changeIsChanging(false);
                            changeKey('');
                            changeValue('');
                        }} />

                </div>
            </div>
            // 显示一个添加的按键
            : <button onClick={() => changeIsAdding(true)}
                className={classnames('inline', 'text-yellow-550')}>
                <Icon icon="carbon:add"
                    className={classnames('inline-block', 'mx-1')}
                    width="15"
                    height="15"
                    fr={undefined} />

                Add key-value tag</button>}

    </div>;
}
