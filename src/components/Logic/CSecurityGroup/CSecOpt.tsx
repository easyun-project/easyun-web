import React from 'react';
import { classnames } from '@@/tailwindcss-classnames';
import { useState } from 'react';

const CSecOpt = (): JSX.Element => {
    const sgs = [
        {
            'sgDes': 'default VPC security group',
            'sgId': 'sg-0a818f9a74c0657ad',
            'tagName': 'easyun-sg-default'
        },
        {
            'sgDes': 'allow web application access',
            'sgId': 'sg-02f0f5390e1cba746',
            'tagName': 'easyun-sg-webapp'
        },
        {
            'sgDes': 'allow database access',
            'sgId': 'sg-05df5c8e8396d06e9',
            'tagName': 'easyun-sg-database'
        }
    ];
    const [current, setcurrent] = useState(['easyun-sg-default']);
    const currentStyle = classnames('border-2', 'rounded-lg','border-yellow-550', 'm-5','h-20', 'w-20', 'text-center','align-middle','inline-block');
    const otherStyle = classnames('border-2', 'rounded-lg','border-blue-900', 'm-5','h-20', 'w-20', 'text-center','align-middle','inline-block');
    return (
        <div>
            {sgs.map((item)=>
                <button
                    className={current.includes(item.tagName) ? currentStyle : otherStyle}
                    key={item.sgId}
                    value={item.tagName}
                    onClick={(e)=>{
                        const tobeChanged = [...current];
                        current.includes(item.tagName) ?
                            tobeChanged.splice(tobeChanged.indexOf(e.currentTarget.value), 1) :
                            tobeChanged.push(e.currentTarget.value);
                        setcurrent(tobeChanged);
                    }
                    }>
                    {item.tagName}
                </button>)}
        </div>
    );
};

export default CSecOpt;