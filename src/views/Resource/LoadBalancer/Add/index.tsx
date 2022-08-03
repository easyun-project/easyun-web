import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Icon } from '@iconify/react';
import { classnames } from '@@/tailwindcss-classnames';
import CPlatform from '@/components/Logic/CPlatform';
import { CButton } from '@/components/Common/CButton';
import { Row, Col, Divider, Typography, message, Select, Input, Form, Progress, Cascader, Card } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
// import LoadbalancerService from '@/service/LoadbalancerService';
import { RegionItem  } from '@/constant/dataCenter';
import FlagUtil from '@/utils/flagUtil';


const { Title, Text } = Typography;


export interface InsTypeFamily {
    catdesCode: string
    catgName: string
    familyDes: string
    familyName: string
}


const AddLoadbalancer = (): JSX.Element => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const flagUtil = new FlagUtil();

    const [creating, setCreating] = useState(false);
    //Loadbalancer tag and name
    const [tagName, setTagName] = useState('LoadBalancer-');
    const [regionCode, setRegionCode] = useState('');

    const [validStatus, setValidStatus] = useState(false);

    const cloudState = useSelector((state: RootState) => {
        return state.cloud;
    });
    const regionList = cloudState.regionList;
    const dcParams = cloudState.datacenterParams?.dcParms;

    useEffect(() => {
        console.log('add loadbalancer');
    }, []);


    return (
        <>
            <Row gutter={16}>
                <Col span={24}>
                    <Icon className='inline-block mx-1' width="25"
                        icon="ant-design:plus-circle-twotone" />
                    <Title level={3} style={{ display: 'inline-block' }}>Add a new load balancer</Title>
                    <span>A load balancer distributes traffic among multiple servers to share the load.</span>
                </Col>
            </Row>
            <Divider />

            <Card title="Identify your load balancer" className={classnames('rounded-border', 'mt-5')}>
                <span>Your Lightsail load balancers must all have unique names.</span>
                <div className='flex items-center'>
                    <Input className={classnames('w-36')} type="text"
                        defaultValue={tagName}
                        onChange={e => setTagName(e.target.value)} />
                </div>
            </Card>

            <Row gutter={16}>
                <Col span={16}>
                    <Title level={5}>Identify your Loadbalancer</Title>
                    <Form autoComplete="off" layout='inline'
                        initialValues={{ defaultValue: tagName }}
                    >
                        <Form.Item label="Name:" name="dcName" className='ml-4'
                            rules={[{ required: true, message: 'Please input the load balancer name!' }]}
                        >
                            <Input style={{ width: 280 }}
                                onChange={(e) => { setTagName(e.target.value); }}
                                onBlur={(e) => {
                                    if (!e.target.value) setValidStatus(false);
                                    else setValidStatus(true);
                                }}
                                type="text" placeholder='Datacenter name' />
                        </Form.Item>
                    </Form>

                    <Text style={{ width: 61 }} className={classnames('inline-block', 'ml-4', 'my-2')}>Region:</Text>
                    <Select defaultValue={dcParams?.dcRegion} style={{ width: 280 }} listHeight={360} disabled={!validStatus}
                        onChange={(value) => {
                            setRegionCode(value);
                            // getDcParams();
                        }} >
                        {regionList?.map((item: RegionItem, index) => {
                            return (<Select.Option key={index} value={item.regionCode}> {item.regionCode} - {item.regionName} </Select.Option>);
                        })}
                    </Select>
                    <Icon icon={flagUtil.getFlagIconByRegion(regionCode)}
                        className={classnames('ml-5', 'inline-block')} color="#5c6f9a" width="25" height="25" fr={undefined} />
                </Col>
            </Row>


            <Row gutter={16} id="create-buttons">
                <Col span={16}>
                    <div className={classnames('flex', 'justify-center', 'm-16')}>
                        <CButton click={() => {
                            navigate('/resource/loadbalancer');
                        }} classes={classnames('bg-gray-400', 'text-white')}>
                            <Icon className={classnames('inline-block', 'mr-2')} icon="akar-icons:arrow-left"
                                color="white"
                                width="20" height="20" fr={undefined} />
                            Back</CButton>
                        <CButton
                            disabled={!validStatus}
                            type='primary'
                            click={() => {
                                if (tagName == '') {
                                    setValidStatus(false);
                                    message.error('Please input a valid load balancer name');
                                    return;
                                }

                                setCreating(true);
                                // LoadbalancerService.addLoadbalancer({
                                //     'BlockDeviceMappings': disks,
                                //     'ImageId': selectedAmi,
                                //     'InstanceType': selectedIns,
                                //     'KeyName': selectedKey,
                                //     'SecurityGroupIds': slectedSecgroups,
                                //     'SubnetId': selectedSubnet,
                                //     'dcName': dc,
                                //     'svrNumber': svrNumber,
                                //     'tagName': tagName
                                // }).then(
                                //     () => {
                                //         changeCreating(false);
                                //         alert('创建成功');
                                //         navigate('/resource/loadbalancer');
                                //     },
                                //     () => {
                                //         changeCreating(false);
                                //         alert('创建失败');
                                //     },
                                // );
                            }}
                        >Create</CButton>
                    </div>
                </Col>
            </Row>
        </>
    );
};


export default AddLoadbalancer;