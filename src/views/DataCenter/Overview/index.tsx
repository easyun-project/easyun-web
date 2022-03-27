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




export const DataCenterOverview = ():JSX.Element => {
    // const navigate = useNavigate();
    // const userState = useSelector((state: RootState) => {
    //     return state.user.user;
    // });

    const params = useParams();
    const dcName = params.dc;
    const dataCenterState = useSelector((state: RootState) => {
        return state.server;
    });
    const dataCenter = dataCenterState;

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
                        <h1>Easyun Datacenter</h1>
                        <div>
                        instance Type : test
                        </div>
                        <div>Private Ip: test</div>
                        <div>Public Ip: test</div>
                    </div>
                </Col>
                <Col span={8}>
                </Col>
                <Col span={8}>
                    <div id="operationPanel">
                        <div className={classnames('my-2')}>
                        Status:
                            <span className={classnames(color, 'mx-2')}>datacenter status</span>
                            {/* {datacenterState.loading ? <LoadingOutlined /> : null} */}
                        </div>

                    </div>
                </Col>
            </Row>

        </div>
    );

};


export default DataCenterOverview;