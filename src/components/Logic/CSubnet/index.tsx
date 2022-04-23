import React from 'react';
import { classnames, TTailwindString } from '@@/tailwindcss-classnames';
import { Icon } from '@iconify/react';
import { DcDropDown, SubnetParms } from '@/constant/dataCenter';

interface Props {
    index: number;
    isPublic: boolean;
    classes?: TTailwindString;
    subnet?: SubnetParms;
    dropdown?: DcDropDown;
}

export const CSubnet = (props: Props): JSX.Element => {
    const subnet = props.subnet;
    const title = subnet?.tagName;
    let classes = props.classes;
    if (props.isPublic) {
        classes = classnames(classes, 'bg-green-50');
    } else {
        classes = classnames(classes, 'bg-yellow-50');
    }
    return (
        <div className={classnames(classes, 'mx-3', 'my-2', 'p-3')}>
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
                <div color="text.secondary" className={classnames('mb-2')}>
                    {title}
                </div>
                <div className="grid grid-cols-5 gap-4">
                    <div className="col-span-2">ipv4 CIDR Block</div>
                    <div className={classnames('col-span-3')}>
                        <input defaultValue={subnet?.cidrBlock} className={classnames('h-6', 'border', 'my-1', 'w-40')}/>
                    </div>
                </div>
                <div className="grid grid-cols-5 gap-4">
                    <div className="col-span-2">Availability Zone</div>
                    <div className="col-span-3">
                        <select className={classnames('h-6', 'border', 'w-40', 'px-2', 'my-1')} defaultValue={1}>
                            {
                                props.dropdown?.azList.map((item, index) => {
                                    return (
                                        <option
                                            key={index}
                                            value={index}>{item}
                                        </option>
                                    );
                                })
                            }

                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-5 gap-4">
                    <div className="col-span-2">Gateway</div>
                    <div className="col-span-3">
                        <select className={classnames('h-6', 'border', 'w-40', 'my-1', 'px-2')} defaultValue={1}>
                            {
                                props.dropdown?.gwList.map((item, index) => {
                                    return (
                                        <option key={index} value={index}>{item}</option>
                                    );
                                })
                            }
                        </select></div>
                </div>
                <div className="grid grid-cols-5 gap-4">
                    <div className="col-span-2">Route Table</div>
                    <div className="col-span-3">
                        <select className={classnames('h-6', 'border', 'w-40', 'px-2')} defaultValue={1}>
                            {
                                props.dropdown?.rtbList.map((item, index) => {
                                    return (
                                        <option key={index} value={index}>{item}</option>
                                    );
                                })
                            }
                        </select>
                    </div>
                </div>

            </div>
        </div>
    );
};
