import React, { useEffect, useState, useRef } from 'react';
import DataCenterService from '@/service/dataCenterService';
import { QueryNewDcParm, DcDropDown } from '@/constant/dataCenter';
import { classnames } from '@@/tailwindcss-classnames';
import SubnetOption from '@/components/Datacenter/SubnetOptionCard';
import SecGroupOption from '@/components/Datacenter/SecGroupOptionCard';
import { CButton } from '@/components/Common/CButton';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Divider, Typography, message, Select, Input, Form, Progress } from 'antd';
import { RootState } from '@/redux/store';
import { listAllDataCenter, getDataCenterParams } from '@/redux/dataCenterSlice';
import { DataCenterParams, DCProgressInfo, RegionItem, SecurityGroupParms, SubnetParms } from '@/constant/dataCenter';
import FlagUtil from '@/utils/flagUtil';

const { Title, Text } = Typography;

const AddDataCenter = (): JSX.Element => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const flagUtil = new FlagUtil();

    const [inputDcName, setInputDcName] = useState('');
    const [regionCode, setRegionCode] = useState('');
    const [cidrBlock, setCidrBlock] = useState('');
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
    const [secGroup0, setSecGroup0] = useState<SecurityGroupParms>({
        enablePing: false,
        enableSSH: false,
        enableRDP: false,
        tagName: '',
    });
    const [secGroup1, setSecGroup1] = useState<SecurityGroupParms>({
        enablePing: false,
        enableSSH: false,
        enableRDP: false,
        tagName: '',
    });
    const [secGroup2, setSecGroup2] = useState<SecurityGroupParms>({
        enablePing: false,
        enableSSH: false,
        enableRDP: false,
        tagName: '',
    });

    const [validStatus, setValidStatus] = useState(false);
    const [dcProgress, setDCProgress] = useState<DCProgressInfo>({ current: 0, description: '' });

    const dataCenterState = useSelector((state: RootState) => {
        return state.dataCenter;
    });

    const dcParams = dataCenterState.datacenterParams?.dcParms;
    const dropDown = dataCenterState.datacenterParams?.dropDown;
    const regionList = dataCenterState.regionList;
    // 获取创建数据中心的默认参数
    const getdcParams = (parms: QueryNewDcParm) => {
        if (parms.dc === '') dispatch(getDataCenterParams({ dc: 'default' }));
        else dispatch(getDataCenterParams(parms));
    };
    // 批量更新 elements params
    const updateDcParams = () => {
        if (dcParams) {
            setRegionCode(dcParams.dcRegion);
            setCidrBlock(dcParams.dcVPC.cidrBlock);
            setPubSubnet1(dcParams.pubSubnet1);
            setPubSubnet2(dcParams.pubSubnet2);
            setPriSubnet1(dcParams.priSubnet1);
            setPriSubnet2(dcParams.priSubnet2);
            setSecGroup0(dcParams.securityGroup0);
            setSecGroup1(dcParams.securityGroup1);
            setSecGroup2(dcParams.securityGroup2);
            // setSSHKey(dcParams);
        }
    };
    // 页面载入后首次渲染
    useEffect(() => {
        dispatch(getDataCenterParams({ dc: 'default' }));
        updateDcParams();
    }, []);

    // dispatch后重新渲染页面
    useEffect(() => {
        updateDcParams();
    }, [dispatch]);

    //由于timer不能在在重新渲染时被重置，因此需要用useRef保存
    const refTimer = useRef<number>(0);
    useEffect(() => {
        console.log(inputDcName);
        clearTimeout(refTimer.current);
        // 重新开启一个定时器
        refTimer.current = setTimeout(
            () => getdcParams({ dc: inputDcName, region: regionCode }), 600);
    }, [inputDcName, regionCode, cidrBlock]);

    // 创建数据中心
    const createDateCenter = async (params: DataCenterParams) => {
        if (params.dcName === '') {
            message.error('Please Input a valid Datacenter Name!');
            return;
        }
        const created = await DataCenterService.createDataCenter(params);
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
        const taskResult = await DataCenterService.getTaskResult(taskId);
        if (taskResult === undefined) {
            message.error('can not get task result');
            return;
        }
        if (taskResult.current === taskResult.total) {
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

                    <Title level={5} className='mt-4 mb-2'>Defining DataCenter Networking</Title>
                    <Text style={{ width: 150 }} className={classnames('inline-block', 'ml-4')}>CIDR block(IPv4):</Text>
                    <Input defaultValue={dcParams?.dcVPC.cidrBlock} style={{ width: 280 }}
                        onChange={(e) => { setCidrBlock(e.target.value); }}
                        className={classnames('border')} type="text" />
                    <Row gutter={12}>
                        <SubnetOption subnet={dcParams?.pubSubnet1} dropdown={dropDown} index={1} isPublic={true}
                            classes={classnames('w-96', 'inline-block')} />
                        <SubnetOption subnet={dcParams?.pubSubnet2} dropdown={dropDown} index={2} isPublic={true}
                            classes={classnames('w-96', 'inline-block')} />
                    </Row>
                    <Row gutter={12}>
                        <SubnetOption subnet={dcParams?.priSubnet1} dropdown={dropDown} index={1} isPublic={false}
                            classes={classnames('w-96', 'inline-block')} />
                        <SubnetOption subnet={dcParams?.priSubnet2} dropdown={dropDown} index={2} isPublic={false}
                            classes={classnames('w-96', 'inline-block')} />
                    </Row>

                    <Title level={5} className='mt-4 mb-2'>Defining DataCenter Security Group</Title>
                    <Row gutter={16}>
                        <SecGroupOption sg={dcParams?.securityGroup0} setSg={setSecGroup0}
                            classes={classnames('mx-4', 'inline-block')}
                            ibList={<p>TCP 660: 0.0.0.0/0</p>} />
                        <SecGroupOption sg={dcParams?.securityGroup1} setSg={setSecGroup1}
                            classes={classnames('mx-4', 'inline-block')}
                            ibList={<>
                                <p>TCP 80: 0.0.0.0/0</p>
                                <p>TCP 443: 0.0.0.0/0</p>
                            </>} />
                        <SecGroupOption sg={dcParams?.securityGroup2} setSg={setSecGroup2}
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
                            disabled={!validStatus}
                            type='primary'
                            click={() => {
                                if (inputDcName == 'easyun') {
                                    setValidStatus(false);
                                    message.error('easyun DataCenter name is not allowed,please change it');
                                    return;
                                }
                                const elemDcParams: DataCenterParams = {
                                    dcName: inputDcName,
                                    dcRegion: regionCode,
                                    dcVPC: {
                                        cidrBlock: cidrBlock ?? '',
                                    },
                                    priSubnet1: priSubnet1,
                                    priSubnet2: priSubnet2,
                                    pubSubnet1: pubSubnet1,
                                    pubSubnet2: pubSubnet2,
                                    securityGroup0: secGroup0,
                                    securityGroup1: secGroup1,
                                    securityGroup2: secGroup2,
                                    // keypair: sshKey
                                };
                                // console.log(dcParams);
                                // console.log(elemDcParams);
                                createDateCenter(dcParams!);
                            }}
                        >Create</CButton>
                    </div>
                </Col>
            </Row>

        </div>
    );
};


export default AddDataCenter;

