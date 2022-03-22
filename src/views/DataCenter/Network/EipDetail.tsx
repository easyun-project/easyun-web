import React from 'react';
import { useLocation } from 'react-router-dom';

export default function EipDetail() {
    //结构赋值的连续性写法
    const { state:{ pubIp } }  = useLocation() as {state:{pubIp:string}};
    return (
        <div>{pubIp}</div>

    );
}
