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
            // 没有传dcName且数据中心长度大于0，则默认选中第一个数据中心。
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
        className={classnames('w-32')}>
        {dictView()}
    </Select>);
};
