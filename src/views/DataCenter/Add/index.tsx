import React, { useEffect, useState, useRef } from 'react';
import { classnames } from '@@/tailwindcss-classnames';
import SubnetOption from '@/components/Datacenter/SubnetOptionCard';
import SecGroupOption from '@/components/Datacenter/SecGroupOptionCard';
import { CButton } from '@/components/Common/CButton';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import dataCenterService from '@/service/dataCenterService';
import { Row, Col, Divider, Typography, message, Select, Input, Form, Progress } from 'antd';
import { RootState } from '@/redux/store';
import { getDataCenterParams, getRegionList, listAllDataCenter } from '@/redux/dataCenterSlice';
import { DataCenterParams, DCProgressInfo, RegionItem, SecurityGroupParms, SubnetParms } from '@/constant/dataCenter';
import FlagUtil from '@/utils/flagUtil';

const { Title, Text } = Typography;

const AddDataCenter = (): JSX.Element => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const flagUtil = new FlagUtil();

    const [inputDcName, setInputDcName] = useState('');
    const [regionCode, setRegionCode] = useState('');
    const [cidr, setCidr] = useState('');
    const [pubSubnet1, setPubSubnet1] = useState<SubnetParms>({
        cidrBlock: '',
        azName: '',
        gwName: '',
        routeTable: '',
        tagName: '',
    });
    const [pubSubnet2, setPubSubnet2] = useState<SubnetParms>({
        cidrBlock: '',
        azName: '',
        gwName: '',
        routeTable: '',
        tagName: '',
    });
    const [priSubnet1, setPriSubnet1] = useState<SubnetParms>({
        cidrBlock: '',
        azName: '',
        gwName: '',
        routeTable: '',
        tagName: '',
    });
    const [priSubnet2, setPriSubnet2] = useState<SubnetParms>({
        cidrBlock: '',
        azName: '',
        gwName: '',
        routeTable: '',
        tagName: '',
    });
    const [sg0, setSg0] = useState<SecurityGroupParms>({
        enablePing: false,
        enableSSH: false,
        enableRDP: false,
        tagName: '',
    });
    const [sg1, setSg1] = useState<SecurityGroupParms>({
        enablePing: false,
        enableSSH: false,
        enableRDP: false,
        tagName: '',
    });
    const [sg2, setSg2] = useState<SecurityGroupParms>({
        enablePing: false,
        enableSSH: false,
        enableRDP: false,
        tagName: '',
    });

    const [validStatus, setValidStatus] = useState<undefined | 'error'>(undefined);
    const [dcProgress, setDCProgress] = useState<DCProgressInfo>({ current: 0, description: '' });

    const dataCenterState = useSelector((state: RootState) => {
        return state.dataCenter;
    });

    const data = dataCenterState.defaultDcParams;
    const regionList = dataCenterState.regionList;

    //由于timer不能在在重新渲染时被重置，因此需要用useRef保存
    const refTimer = useRef<number>(0);
    useEffect(() => {
        clearTimeout(refTimer.current);
        // 重新开启一个定时器
        refTimer.current = setTimeout(
            () => getDcParams(), 600);
    }, [inputDcName, regionCode]);

    useEffect(() => {
        dispatch(getDataCenterParams({ dc: 'default', region: 'us-east-1' }));
        // dispatch(getRegionList());
        if (data) {
            setInputDcName(data.dcParms.dcName);
            setRegionCode(data.dcParms.dcRegion);
            setCidr(data.dcParms.dcVPC.cidrBlock);
            setPubSubnet1(data.dcParms.pubSubnet1);
            setPubSubnet2(data.dcParms.pubSubnet2);
            setPriSubnet1(data.dcParms.priSubnet1);
            setPriSubnet2(data.dcParms.priSubnet2);
            setSg0(data.dcParms.securityGroup0);
            setSg1(data.dcParms.securityGroup1);
            setSg2(data.dcParms.securityGroup2);
            // setSSHKey(data.dcParms);
        }
    }, [dispatch]);

    const getDcParams = () => {
        dispatch(getDataCenterParams({ region: regionCode, dc: inputDcName }));
    };

    // 创建数据中心
    const createDateCenter = async (params: DataCenterParams) => {
        if (params.dcName === '') {
            message.error('Please Input a valid Datacenter Name!');
            return;
        }
        const created = await dataCenterService.createDataCenter(params);
        if (!created) {
            return;
        }
        const intervalId = setInterval(
            () => { getRealTimeTaskResult(created.taskId); },
            1000
        );
        setIntervalId(intervalId);
    };

    //定时循环调用task result接口，获取执行结果
    const [intervalId, setIntervalId] = useState<number>(0);
    const getRealTimeTaskResult = async (taskId: string) => {
        const taskResult = await dataCenterService.getTaskResult(taskId);
        if (taskResult === undefined) {
            message.error('can not get task result');
            return;
        }
        if (taskResult.total === taskResult.current) {
            clearInterval(intervalId);
            dispatch(listAllDataCenter());
            navigate('/datacenter/add/result');
        } else {
            setDCProgress({
                current: taskResult.current,
                description: taskResult.description,
            });
        }
    };

    return (
        <div>
            <Row gutter={16}>
                <Col span={24}>
                    <Icon className='inline-block mx-1' width="25"
                        icon="ant-design:plus-circle-twotone" />
                    <Title level={3} style={{ display: 'inline-block' }}>Create New Cloud DataCenter</Title>
                    {
                        dcProgress.current > 0 && (
                            <div>
                                <Progress percent={dcProgress.current} status="active" />
                                <span>{dcProgress.description}</span>
                            </div>
                        )
                    }
                </Col>
            </Row>
            <Divider />
            <Row gutter={16}>
                <Col span={16}>
                    <Title level={5}>Identify your Datacenter</Title>
                    <Form autoComplete="off" layout='inline'
                        initialValues={{ defaultValue: inputDcName }}
                    >
                        <Form.Item label="Name:" name="dcName" className='ml-4'
                            rules={[{ required: true, message: 'Please input the datacenter name!' }]}
                        >
                            <Input style={{ width: 280 }}
                                onChange={(e) => { setInputDcName(e.target.value); }}
                                onBlur={(e) => {
                                    if (!e.target.value) {
                                        setValidStatus('error');
                                    } else {
                                        setValidStatus(undefined);
                                    }
                                }}
                                type="text" placeholder='Datacenter name' />
                        </Form.Item>
                    </Form>

                    <Text style={{ width: 61 }} className={classnames('inline-block', 'ml-4', 'my-2')}>Region:</Text>
                    <Select defaultValue="us-east-1" style={{ width: 280 }} listHeight={360} disabled={!!validStatus}
                        onChange={(value) => {
                            setRegionCode(value);
                            // getDcParams();
                        }} >
                        {regionList?.map((item: RegionItem, index) => {
                            return (<Select.Option key={index} value={item.regionCode}> {item.regionCode} - {item.regionName} </Select.Option>);
                        })}
                    </Select>
                    <Icon className={classnames('ml-5', 'inline-block')}
                        icon={flagUtil.getFlagIconByRegion(regionCode)}
                        color="#5c6f9a"
                        width="25" height="25"
                        fr={undefined} />

                    <Title level={5} className='mt-4 mb-2'>Defining DataCenter Networking</Title>
                    <Text style={{ width: 150 }} className={classnames('inline-block', 'ml-4')}>CIDR block(IPv4):</Text>
                    <Input defaultValue={data?.dcParms.dcVPC.cidrBlock} style={{ width: 280 }}
                        onChange={(e) => { setCidr(e.target.value); }}
                        className={classnames('border')} type="text" />
                    <Row gutter={12}>
                        <SubnetOption subnet={data?.dcParms.pubSubnet1} dropdown={data?.dropDown} index={1} isPublic={true}
                            classes={classnames('w-96', 'inline-block')} />
                        <SubnetOption subnet={data?.dcParms.pubSubnet2} dropdown={data?.dropDown} index={2} isPublic={true}
                            classes={classnames('w-96', 'inline-block')} />
                    </Row>
                    <Row gutter={12}>
                        <SubnetOption subnet={data?.dcParms.priSubnet1} dropdown={data?.dropDown} index={1} isPublic={false}
                            classes={classnames('w-96', 'inline-block')} />
                        <SubnetOption subnet={data?.dcParms.priSubnet2} dropdown={data?.dropDown} index={2} isPublic={false}
                            classes={classnames('w-96', 'inline-block')} />
                    </Row>

                    <Title level={5} className='mt-4 mb-2'>Defining DataCenter Security Group</Title>
                    <Row gutter={16}>
                        <SecGroupOption sg={data?.dcParms.securityGroup0}
                            classes={classnames('mx-4', 'inline-block')}
                            ibList={<p>TCP 660: 0.0.0.0/0</p>} />
                        <SecGroupOption sg={data?.dcParms.securityGroup1}
                            classes={classnames('mx-4', 'inline-block')}
                            ibList={<>
                                <p>TCP 80: 0.0.0.0/0</p>
                                <p>TCP 443: 0.0.0.0/0</p>
                            </>} />
                        <SecGroupOption sg={data?.dcParms.securityGroup2}
                            classes={classnames('mx-4', 'inline-block')}
                            ibList={<>
                                <p>TCP 3306: 0.0.0.0/0</p>
                                <p>TCP 1443: 0.0.0.0/0</p>
                                <p>TCP 5432: 0.0.0.0/0</p>
                                <p>TCP 1521: 0.0.0.0/0</p>
                            </>} />
                    </Row>

                </Col>
                {/* <Col span={8}>
                    <p>picture here</p>
                </Col> */}
            </Row>

            <Row gutter={16}>
                <Col span={16}>
                    <div className={classnames('flex', 'justify-center', 'm-16')}>
                        <CButton click={() => {
                            dispatch(listAllDataCenter()); // 临时使用，便于调试
                            navigate('/home');
                        }} classes={classnames('bg-gray-400', 'text-white')}>
                            <Icon className={classnames('inline-block', 'mr-2')} icon="akar-icons:arrow-left"
                                color="white"
                                width="20" height="20" fr={undefined} />
                            Back</CButton>
                        <CButton
                            disabled={!!validStatus}
                            type='primary'
                            click={() => {
                                if (inputDcName == 'easyun') {
                                    setValidStatus('error');
                                    message.error('easyun DataCenter name is not allowed,please change it');
                                    return;
                                }
                                const params: DataCenterParams = {
                                    dcName: inputDcName,
                                    dcRegion: regionCode,
                                    dcVPC: {
                                        cidrBlock: cidr ?? '',
                                    },
                                    priSubnet1: priSubnet1,
                                    priSubnet2: priSubnet2,
                                    pubSubnet1: pubSubnet1,
                                    pubSubnet2: pubSubnet2,
                                    securityGroup0: sg0,
                                    securityGroup1: sg1,
                                    securityGroup2: sg2,
                                    // keypair: sshKey
                                };
                                createDateCenter(params);
                            }}
                        >Create</CButton>
                    </div>
                </Col>
            </Row>

        </div>
    );
};


export default AddDataCenter;
