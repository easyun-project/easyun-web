import React, { useState, useEffect } from 'react';
import { classnames, TTailwindString } from '@@/tailwindcss-classnames';
import { Icon } from '@iconify/react';
import { Typography, Select, Input } from 'antd';
import { DcDropDown, SubnetParms } from '@/constant/dataCenter';

interface SubnetProps {
    index: number;
    isPublic: boolean;
    classes?: TTailwindString;
    subnet?: SubnetParms;
    dropdown?: DcDropDown;
}

export const SubnetOption = (props: SubnetProps): JSX.Element => {
    const { subnet, dropdown, isPublic } = props;
    const title = subnet?.tagName;
    let classes = props.classes;
    if (isPublic) {
        classes = classnames(classes, 'bg-green-50');
    } else {
        classes = classnames(classes, 'bg-yellow-50');
    }
    const [ selectedAz, setSlectedAz ] = useState(subnet?.azName);

    useEffect(() => {
        setSlectedAz(subnet?.azName);
    }, [subnet?.azName, selectedAz]);

    return (
        <div className={classnames(classes, 'mx-3', 'my-2', 'p-3', 'rounded-xl')}>
            {
                props.isPublic ?
                    <Icon className={classnames('relative', 'float-right', 'mr-1', 'mt-1')}
                        width="25" height="25"
                        icon="et:global" color="green" fr={undefined}/> :
                    <Icon className={classnames('relative', 'top-0', 'right-0', 'float-right', 'mr-1', 'mt-1')}
                        icon="ant-design:lock-outlined" color='orange'
                        width="25" height="25"
                        fr={undefined}/>
            }
            <div>
                <Typography.Title level={5} className='mb-2'>{title}</Typography.Title>

                <div className="my-1">
                    <Typography.Text style={{ width: 130 }} className='inline-block'>CIDR Block(ipv4):</Typography.Text>
                    <Input style={{ width: 168 }} className='h-6' value={subnet?.cidrBlock} />
                </div>

                <div className="my-1">
                    <Typography.Text style={{ width: 130 }} className='inline-block'>Availability Zone:</Typography.Text>
                    {/* <Select style={{ width: 168 }} className='h-6' defaultValue={subnet?.azName}>
                        {props.dropdown?.azList.map((item, index) => (
                            <Select.Option key={index} value={index}>{item} </Select.Option>
                        ))}
                    </Select> */}
                    <select style={{ width: 168 }} className='pl-2 h-6 border'
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
                    <Typography.Text style={{ width: 130 }} className='inline-block'>Gateway:</Typography.Text>
                    <select style={{ width: 168 }} className='pl-2 h-6 border' defaultValue={0}>
                        {
                            <option value={subnet?.gwName}> {subnet?.gwName} </option>
                            // props.dropdown?.rtbList.map((item, index) => {
                            //     return ( <option key={index} value={index}>{item}</option> );
                            // })
                        }
                    </select>
                </div>

                <div className="my-1">
                    <Typography.Text style={{ width: 130 }} className='inline-block'>Route Table:</Typography.Text>
                    <select style={{ width: 168 }} className='pl-2 h-6 border' defaultValue={0}>
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