import { SimpleSelect as Select, SimpleOption as Option } from '@/components/ui/simple-select';
import { Input } from '@/components/ui/input';
import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { DcDropDown, SubnetParms } from '@/constant/dataCenter';

interface SubnetProps {
    index: number;
    isPublic: boolean;
    classes?: string;
    subnet?: SubnetParms;
    dropdown?: DcDropDown;
}

export const SubnetOption = (props: SubnetProps): JSX.Element => {
    const { subnet, dropdown, isPublic } = props;
    const title = subnet?.tagName;
    let classes = props.classes;
    if (isPublic) {
        classes = clsx(classes, 'bg-green-50');
    } else {
        classes = clsx(classes, 'bg-yellow-50');
    }
    const [ selectedAz, setSlectedAz ] = useState(subnet?.azName);

    useEffect(() => {
        setSlectedAz(subnet?.azName);
    }, [subnet?.azName, selectedAz]);

    return (
        <div className={clsx(classes, 'mx-3', 'my-2', 'p-3', 'rounded-xl')}>
            {
                props.isPublic ?
                    <Icon className={"relative float-right mr-1 mt-1"}
                        width="25" height="25"
                        icon="et:global" color="green" fr={undefined}/> :
                    <Icon className={"relative top-0 right-0 float-right mr-1 mt-1"}
                        icon="ant-design:lock-outlined" color='orange'
                        width="25" height="25"
                        fr={undefined}/>
            }
            <div>
                <h5 className='mb-2'>{title}</h5>

                <div className="my-1">
                    <span className='inline-block'>CIDR Block(ipv4):</span>
                    <Input className='h-6' value={subnet?.cidrBlock} />
                </div>

                <div className="my-1">
                    <span className='inline-block'>Availability Zone:</span>
                    {/* <Select className='h-6' defaultValue={subnet?.azName}>
                        {props.dropdown?.azList.map((item, index) => (
                            <Option key={index} value={index}>{item} </Option>
                        ))}
                    </Select> */}
                    <select className='pl-2 h-6 border'
                        onChange={(e)=>setSlectedAz(dropdown?.azList[e.target.value])} >
                        {
                            dropdown?.azList.map((item, index) => {
                                // return ( <option key={index} value={index}>{item}</option> );
                                if (item === selectedAz) {
                                    return <option key={index} value={index} selected>{item}</option>;
                                }
                                else {
                                    return ( <option key={index} value={index}>{item}</option> );
                                }
                            })
                        }
                    </select>
                </div>

                <div className="my-1">
                    <span className='inline-block'>Gateway:</span>
                    <select className='pl-2 h-6 border' defaultValue={0}>
                        {
                            <option value={subnet?.gwName}> {subnet?.gwName} </option>
                            // props.dropdown?.rtbList.map((item, index) => {
                            //     return ( <option key={index} value={index}>{item}</option> );
                            // })
                        }
                    </select>
                </div>

                <div className="my-1">
                    <span className='inline-block'>Route Table:</span>
                    <select className='pl-2 h-6 border' defaultValue={0}>
                        {
                            <option value={subnet?.routeTable}> {subnet?.routeTable} </option>
                            // props.dropdown?.rtbList.map((item, index) => {
                            //     return ( <option key={index} value={index}>{item}</option> );
                            // })
                        }
                    </select>

                </div>

            </div>
        </div>
    );
};

export default SubnetOption;