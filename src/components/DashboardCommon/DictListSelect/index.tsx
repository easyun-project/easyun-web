import { Select } from 'antd';
import { classnames } from '@@/tailwindcss-classnames';
import React, { useEffect, useState } from 'react';
import DataCenterService from '@/service/dataCenterService';

const { Option } = Select;

export const DictListSelect = (props): JSX.Element => {
    const { propDcName } = props;
    const [dcList, setDictList] = useState<Array<any>>([]);
    const [dcName, setDcName] = useState<string>(propDcName);

    useEffect(() => {
        getDataCenterList();
    }, []);

    const getDataCenterList = () => {
        DataCenterService.getDataCenterList().then(res => {
            setDictList(res);
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

    return (<Select onChange={changeDictName} defaultValue={dcName} className={classnames('w-32')}>
        {dictView()}
    </Select>);
};
