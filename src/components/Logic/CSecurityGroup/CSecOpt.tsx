import React from 'react';
import { classnames } from '@@/tailwindcss-classnames';
import { useState } from 'react';

interface CSecOptProps {
    secgroups: CSecOptInfo[]
    changeSlectedSecgroups: React.Dispatch<React.SetStateAction<string[]>>
    multi:boolean
}

export interface CSecOptInfo {
    sgId: string
    tagName: string
}

const CSecOpt = (props:CSecOptProps): JSX.Element => {
    const { secgroups,changeSlectedSecgroups,multi } = props;
    const [current, setcurrent] = useState<string[]>([]);
    const currentStyle = classnames('border-2', 'rounded-lg','border-yellow-550', 'm-5','h-20', 'w-20', 'text-center','align-middle','inline-block');
    const otherStyle = classnames('border-2', 'rounded-lg','border-blue-900', 'm-5','h-20', 'w-20', 'text-center','align-middle','inline-block');
    return (
        <div>
            {secgroups.map((item)=>
                <button
                    className={current.includes(item.tagName) ? currentStyle : otherStyle}
                    key={item.sgId}
                    value={item.tagName}
                    onClick={
                        multi
                            ? (e) => {
                                const tobeChanged = [...current];
                                current.includes(item.tagName)
                                    ? tobeChanged.splice(tobeChanged.indexOf(e.currentTarget.value), 1)
                                    : tobeChanged.push(e.currentTarget.value);
                                setcurrent(tobeChanged);
                                changeSlectedSecgroups(tobeChanged);
                            }
                            : (e) => {
                                setcurrent([e.currentTarget.value]);
                                changeSlectedSecgroups([e.currentTarget.value]);
                            } }
                >
                    {item.tagName}
                </button>)}
        </div>
    );
};

export default CSecOpt;