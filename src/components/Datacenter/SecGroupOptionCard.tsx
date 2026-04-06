import { Checkbox } from '@/components/ui/checkbox';
import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

import { SecurityGroupParms } from '@/constant/dataCenter';

interface SecGroupProps {
    classes?: string,
    ibList: JSX.Element | undefined,
    sg: SecurityGroupParms | undefined,
    setSg
}

const SecGroupOption = (props: SecGroupProps): JSX.Element => {
    const { sg, setSg, ibList, classes } = props;
    const [ checkedPing, setCheckedPing ] = useState(sg?.enablePing);
    const [ checkedSSH, setCheckedSSH ] = useState(sg?.enableSSH);
    const [ checkedRDP, setCheckedRDP ] = useState(sg?.enableRDP);

    useEffect(() => {
        setCheckedPing(sg?.enablePing);
        setCheckedSSH(sg?.enableSSH);
        setCheckedRDP(sg?.enableRDP);
        // console.log(sg);
    }, [sg]);


    return (
        <div className={clsx(classes)}>
            <div className={"my-1 p-3 border-2 border-yellow-550 rounded-xl w-56"}>
                <Icon className={"inline-block mr-2"} width="25" height="25" color='black'
                    icon="ant-design:lock-outlined" fr={undefined}/>
                {sg?.tagName}
            </div>

            <div className={"border-2 border-dashed border-yellow-550 rounded w-56 p-3"}>
                <span style={{ width: 150 }} className='inline-block'>Enable Ping:</span>
                <Checkbox checked={checkedPing}
                    onCheckedChange={(v)=>setCheckedPing(!!v)} />
                
                <br />
                <span style={{ width: 150 }} className='inline-block'>Enable SSH:</span>
                <Checkbox checked={checkedSSH}
                    onCheckedChange={(v)=>setCheckedSSH(!!v)} />
                
                <br />
                <span style={{ width: 150 }} className='inline-block'>Enable RDP:</span>
                <Checkbox checked={checkedRDP}
                    onCheckedChange={(v)=>setCheckedRDP(!!v)} />
                

                <span className={"inline-block mt-4"}>In Bound Port:</span>
                {ibList}
            </div>

        </div>
    );
};

export default SecGroupOption;