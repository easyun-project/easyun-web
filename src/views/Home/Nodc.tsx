import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function Nodc() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    return (
        <div className={"min-h-screen flex items-center justify-center"}>
            <button className={"btn-yellow"} onClick={()=>navigate('/datacenter/add')}>{t('home.addButton')}</button>
        </div>
    );
}
