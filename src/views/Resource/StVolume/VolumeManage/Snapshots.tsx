import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';

export default function Snapshots() {
    const { t } = useTranslation();
    const [creating, setCreating] = useState(false);
    return (
        <>
            <div>{t('volumeManageSnapshots.title')}</div>
            <div>{t('volumeManageSnapshots.tip')}</div>
            {
                creating
                    ? <div>创建中</div>
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
