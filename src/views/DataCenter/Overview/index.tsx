// react related
import React, { useEffect, useState } from 'react';
import { Route } from 'react-router';
import { useNavigate, useParams } from 'react-router-dom';
// redux related
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { getDataCenter } from '@/redux/dataCenterSlice';
// UI contents
import { classnames, TTailwindString } from '@@/tailwindcss-classnames';
import { Menu, Col, message, Row, Tabs } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Icon } from '@iconify/react';
// services and interface/schema
import dataCenterService, { DcNameQueryParm } from '@/service/dataCenterService';
// view and components
import { CPartialLoading } from '@/components/Common/CPartialLoading';
import FlagUtil from '@/utils/flagUtil';
import TimeUtil from '@/utils/time';



export default function DataCenterOverview() {
    const dataCenterState = useSelector((state: RootState) => state.dataCenter);
    const thisDC = dataCenterState.currentDC.basicInfo
    const dcName = thisDC!.dcName
    const dcRegion = thisDC!.dcRegion

    const dispatch = useDispatch();
    const [seletedTab, changeSelectedTab] = useState('Detail');
    useEffect(() => {
        const params: DcNameQueryParm = {
            dc: dcName!
        };
        dispatch(getDataCenter(params));
    }, []);

    let color: TTailwindString;
    color = classnames('text-green-600');

    return (
        <div className={classnames('ml-3','mt-5')}>
            <Row>
                <Col span={2}>
                    <Icon icon="ic:round-cloud-circle" color="#e9862e" width={60} fr={undefined}/>
                </Col>
                <Col span={4}>
                    <div id="dcInfo">
                        <h1>{dcName}</h1>
                        <div>VPC ID: <span>{thisDC?.vpcID}</span></div>
                        <div>CIDR: <span>{thisDC?.vpcCidr}</span></div>
                    </div>
                </Col>
                <Col span={8}>
                </Col>
                <Col span={8}>
                    <div className={classnames('my-2')}>                        
                        Region: <span className={classnames(color, 'mx-2')}>{dcRegion}</span>
                        <span className={classnames('inline-block', 'pr-1', 'h-4')}>
                            <Icon className={'ml-5'} icon={FlagUtil.getFlagIcon('USA')}
                                color="#5c6f9a"
                                width="25" height="25"
                                fr={undefined}/>
                        </span>                        
                        {/* {datacenterState.loading ? <LoadingOutlined /> : null} */}
                    </div>
                </Col>
            </Row>
            <hr />
            <Row>
            <Col span={8}>
            <div id='azSummary'>
                        Availability Zone:

            </div>
            </Col>
            </Row>
            <Col span={8}></Col>
            <Row>
            <div id='vpcSummary'>
                        Datacenter VPC Resources summary:

            </div>
            </Row>            
        </div>
    );

};
