import { Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { postApiV1Datacenter, getApiV1DatacenterTask, getApiV1DatacenterList, deleteApiV1Datacenter } from '@/api-client';

const { Option } = Select;

export const DictListSelect = (props): JSX.Element => {
    const { propDcName } = props;
    const [dcList, setDictList] = useState<Array<any>>([]);
    const [dcName, setDcName] = useState<string>(propDcName);

    useEffect(() => {
        getDataCenterList();
    }, []);

    const getDataCenterList = () => {
        getApiV1DatacenterList().then(({ data }) => {
            const res = (data?.detail || []) as any[];
            setDictList(res);
            !dcName && res.length > 0 && changeDictName(res[0].dcName);
        });
    };

    const changeDictName = (dcName) => {
        setDcName(dcName);
        props.onChangeClick(dcName);
    };

    const dictView = () => {
        const domList = dcList.map(item => {
            return <Option key={item.vpcID} value={item.dcName}>{item.dcName}</Option>;
        });
        return domList;
    };

    return (<Select key={dcName} onChange={changeDictName} defaultValue={dcName}
        className={"w-32"}>
        {dictView()}
    </Select>);
};
