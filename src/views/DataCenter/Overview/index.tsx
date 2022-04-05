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
import { LoadingOutlined } from '@ant-design/icons';
import { Row, Col, Typography, Divider, Badge, Card, Statistic, Space } from 'antd';
import { Icon } from '@iconify/react';
// services and interface/schema
import dataCenterService, { DcNameQueryParm } from '@/service/dataCenterService';
import {VpcSummary, AzSummary} from '@/constant/dataCenter'
// view and components
import { CPartialLoading } from '@/components/Common/CPartialLoading';
import FlagUtil from '@/utils/flagUtil';
import TimeUtil from '@/utils/time';

const { Title, Paragraph, Text } = Typography;


function AzSummaryCard(props:AzSummary){
    const { azName, subnetNum } = props
    const color = subnetNum > 0 ? '#FFBF00' : '#d9d9d9'
    return (
        <Badge size="small" count={subnetNum} showZero offset={[-15, 15]} color={color}>
            <Card className={classnames('rounded-md','border-2','border-gray-400')}>{azName}</Card>
        </Badge>
    )
}


function VpcSummaryCard(props){
    const { title, value} = props;

    return (
        <Col className="gutter-row" span={3}>
            <Card hoverable >
            <Statistic
                title={title}
                value={value}
            />
            </Card>
        </Col>
    )
}


export default function DataCenterOverview():JSX.Element {
    const dataCenterState = useSelector((state: RootState) => state.dataCenter);
    const dcBasic = dataCenterState.currentDC.basicInfo
    const dcSummary = dataCenterState.currentDC.summary

    // const dispatch = useDispatch();
    // useEffect(() => {
    //     const params: DcNameQueryParm = {
    //         dc: thisDC!.dcName
    //     };
    //     dispatch(getDataCenter(params));
    // }, []);

    return (
        <div className={classnames('ml-3','mt-5')}>
            <div id="dcBasic">
                <Row gutter={16}>
                    <Col span={2}>
                        <Icon icon="ic:round-cloud-circle" color="#e9862e" width={100} fr={undefined}/>
                    </Col>
                    <Col span={22}>
                        <Row gutter={16}>
                            <Col span={4}>
                                <Title level={3}> {dcBasic!.dcName} </Title>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={4}>
                                <Text strong>ID:</Text> <Text copyable>{dcBasic?.vpcID}</Text>
                                <br/>
                                <Text strong>CIDR:</Text> <Text copyable>{dcBasic?.vpcCidr}</Text>
                            </Col>
                            <Col span={8}>
                            </Col>
                            <Col span={8}>
                                <div className={classnames('my-2')}>
                                    <Text strong>Region:</Text> <Text>{dcBasic!.dcRegion}</Text>
                                    <span className={classnames('inline-block', 'pr-1', 'h-4')}>
                                        <Icon className={'ml-5'} icon={FlagUtil.getFlagIcon('USA')}
                                            color="#5c6f9a"
                                            width="25" height="25"
                                            fr={undefined}/>
                                    </span>
                                    <br/>
                                    <Text strong>Create Date:</Text> <Text>{TimeUtil.utcConvertTimeZone({ date:dcBasic?.createDate })}</Text>
                                </div>
                            </Col>
                        </Row>
                    </Col>        
                </Row>
            </div>
            {/* {datacenterState.loading ? <LoadingOutlined /> : null} */}
            <Divider />

            <div id='azSummary'>
                <Title level={4}>DataCenter Distribution</Title>    
                <Space size='middle'>
                    {dcSummary?.azSummary.map((az)=> <AzSummaryCard azName={az.azName} subnetNum={az.subnetNum} /> )}               
                </Space>   
            </div>

            <div id='vpcSummary'>
                <Paragraph className='pt-4'>You are using following cloud datacenter(VPC) service:</Paragraph>
                <Row gutter= {[16,24]} className='py-2'>
                    <VpcSummaryCard title='Public Subnets' value={dcSummary?.vpcSummary.pubNum}/>
                    <VpcSummaryCard title='Internet Gateways' value={dcSummary?.vpcSummary.igwNum}/>
                    <VpcSummaryCard title='Security Groups' value={dcSummary?.vpcSummary.sgNum}/>
                    <VpcSummaryCard title='Route Tables' value={dcSummary?.vpcSummary.rtbNum}/>
                </Row>      
                <Row gutter= {[16,24]} className='py-2'>
                    <VpcSummaryCard title='Private Subnets' value={dcSummary?.vpcSummary.priNum}/>
                    <VpcSummaryCard title='NAT Gateways' value={dcSummary?.vpcSummary.natNum}/>
                    <VpcSummaryCard title='Network ACLs' value={dcSummary?.vpcSummary.aclNum}/>
                    <VpcSummaryCard title='Static IP(EIP)' value={dcSummary?.vpcSummary.eipNum}/>
                </Row>                
            </div>      
        </div>
    );
};
