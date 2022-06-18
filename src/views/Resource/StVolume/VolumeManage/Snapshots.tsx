import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';
import WithEdit from '@/components/Logic/CWithEdit';
import { Dropdown, Input, Menu } from 'antd';

export default function Snapshots() {
    const { t } = useTranslation();
    const [ creating, setCreating ] = useState(false);
    const [ newSnapshotName, setNewSnapshotName ] = useState('');
    const snapshotList = [ 'disk-1', 'disk-2' ];
    const menu = (
        <Menu>
            <Menu.Item
                danger
                key="delete"
                onClick={() =>console.log('delete snapshot')}
            >
        Delete
            </Menu.Item>
        </Menu>
    );
    return (
        <>
            <div className='text-2xl font-bold'>{t('volumeManageSnapshots.title')}</div>
            <div>{t('volumeManageSnapshots.tip')}</div>
            {snapshotList.map(snapshot=>
                <div className='flex justify-between w-96 border-b-2' key={snapshot}>
                    <span className='flex items-center'><Icon icon="clarity:hard-disk-line" />December 30,2021</span>
                    <span>{snapshot} </span>
                    <Dropdown overlay={menu}>
                        <Icon
                            icon="fluent:more-vertical-20-filled"
                            width="20"
                            fr={undefined}
                            className='hover:text-yellow-550 cursor-pointer'
                        />
                    </Dropdown>
                </div>)}
            {
                creating
                    ? <WithEdit visible={creating} onOk={()=>setCreating(!creating)} onCancel={()=>setCreating(!creating)}>
                        <div className='mb-2'>Give your snapshot a name.</div>
                        <Input type='text' className='w-96' value={newSnapshotName} onChange={e=>setNewSnapshotName(e.target.value)}></Input>
                    </WithEdit>
                    : <button onClick={() => setCreating(true)} className='inline text-yellow-550'>
                        <Icon
                            icon="carbon:add"
                            className='inline-block mx-1'
                            width="15"
                            height="15"
                        />
                        {t('volumeManageSnapshots.creat')}
                    </button>
            }

        </>
    );
}
