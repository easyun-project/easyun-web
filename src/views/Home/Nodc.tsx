import React from 'react';
import { useTranslation } from 'react-i18next';
import { classnames } from '@@/tailwindcss-classnames';
import { useNavigate } from 'react-router-dom';

export default function Nodc() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    return (
        <div className={classnames('min-h-screen','flex','items-center','justify-center')}>
            <button className={classnames('btn-yellow')} onClick={()=>navigate('/datacenter')}>{t('home.addButton')}</button>
        </div>
    );
}
