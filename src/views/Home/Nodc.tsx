import React from 'react';
import { classnames } from '@@/tailwindcss-classnames';
import { useNavigate } from 'react-router-dom';

export default function Nodc() {
    const navigate = useNavigate();
    return (
        <div className={classnames('min-h-screen','flex','items-center','justify-center')}>
            <button className={classnames('btn-yellow')} onClick={()=>navigate('/datacenter')}>Create a new datacenter</button>
        </div>
    );
}
