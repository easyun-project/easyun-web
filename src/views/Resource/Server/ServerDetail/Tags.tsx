import React, { useState,useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Input } from 'antd';
import { ArrowRightOutlined, TagOutlined } from '@ant-design/icons';
import { useDispatch,useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { updateServerTags } from '@/redux/serverSlice';
import serverService from '@/service/serverService';

export default function Tags() {
    const dispatch = useDispatch();
    // 获取到tags并且做一定的处理
    const initServerTags = useSelector((state:RootState)=>{
        const  tags  = state.server.currentServer!.svrTags;
        const serverTags:Record<string,string> = {};
        tags.map((item)=>serverTags[item.Key] = item.Value);
        return serverTags;
    }
    );
    const svrId = useSelector((state:RootState)=>state.server.currentServer!.svrProperty.instanceId);
    const [serverTags, changeServerTags] = useState<Record<string, string>>(initServerTags);
    const [isAdding, changeIsAdding] = useState(false);
    const [isChanging, changeIsChanging] = useState(false);
    const [tagKey, changeKey] = useState('');
    const [tagValue, changeValue] = useState('');
    useEffect(()=>{
        const tags:Record<'Key'|'Value',string>[] = [];
        for (const key in serverTags){
            tags.push({
                'Key':key,
                'Value':serverTags[key]
            });
        }
        dispatch(updateServerTags(tags));
    }
    ,[serverTags]);
    const deleteTag = (i:string) => {
        const newServerTags = { ...serverTags };
        delete newServerTags[i];
        changeServerTags(newServerTags);
    };

    const genTagsArray = () => {
        const tagsArray:JSX.Element[] = [];
        for (const i in serverTags) {
            // 如果处于正在修改中，则不显示
            if(i !== tagKey || !isChanging){
                tagsArray.push
                (<div
                    key={i} className='grid grid-cols-4 p-2 my-4 w-96 rounded-border'>
                    <div><TagOutlined className='pr-2'/>{i}</div>
                    <div><ArrowRightOutlined className='pr-2' />{serverTags[i]}</div>
                    <div className='col-start-4'>
                        <Icon fr={undefined}
                            icon="ep:edit"
                            className='inline-block mx-1  cursor-pointer'
                            width="24" height="24"
                            color='#dd6b10'
                            onClick={() => {
                                changeKey(i);
                                changeValue(serverTags[i]);
                                // deleteTag(i);
                                changeIsChanging(true);
                            }} />
                        <Icon fr={undefined}
                            icon="clarity:times-line"
                            className='inline-block mx-1  cursor-pointer'
                            width="24" height="24"
                            color='#dd6b10'
                            onClick={() => {
                                if (window.confirm('Are you sure delete this tag?'))
                                {   serverService.deleteServerTags({
                                    tag:{ Key:i,Value:serverTags[i] },
                                    svrId
                                });
                                deleteTag(i);}
                            }} />
                    </div>
                </div>);
            }

        }
        return tagsArray;
    };
    return <div>
        <div>Key-value tags</div>
        {/* 显示已有的tags */}
        {genTagsArray()}
        {isAdding || isChanging
            // 显示添加或者修改的界面
            ? <div className='flex items-center'>
                <div className='flex justify-between p-2  w-96 active-border'>
                    <div>
                        <span>Key</span>
                        <Input
                            disabled={isChanging}
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
                        />
                    </div>
                </div>
                <div className='justify-center  items-center'>
                    {isChanging
                        ? undefined
                        : <Icon fr={undefined}
                            icon="icons8:cancel"
                            className='mx-1 cursor-pointer'
                            width="24" height="24"
                            color='red'
                            onClick={() => {
                                changeIsAdding(false);
                                changeKey('');
                                changeValue('');
                            }}/>}

                    <Icon fr={undefined}
                        icon="icons8:checked"
                        className='mx-1 cursor-pointer'
                        width="24" height="24"
                        color="green"
                        onClick={() => {
                            if (tagKey !== '' && tagValue !== '' && tagKey.toLowerCase() !== 'name')
                            {
                                changeServerTags(
                                    {
                                        ...serverTags,
                                        [tagKey]: tagValue
                                    });
                                serverService.updateServerTags({
                                    tag:{ Key:tagKey,Value:tagValue },
                                    svrId
                                });
                                changeIsAdding(false);
                                changeIsChanging(false);
                                changeKey('');
                                changeValue('');
                            }
                            else{
                                alert('invalid key or value');
                            }
                        }
                        } />
                </div>
            </div>
            // 显示一个添加的按键
            : <button onClick={() => changeIsAdding(true)}
                className='inline  text-yellow-550'>
                <Icon icon="carbon:add"
                    className='inline-block  mx-1'
                    width="15"
                    height="15"
                    fr={undefined} />
                Add key-value tag</button>}
    </div>;
}
