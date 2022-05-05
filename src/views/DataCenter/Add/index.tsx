import React, { useEffect, useState } from 'react';
import { CSubnet } from '@/components/Logic/CSubnet';
import { classnames } from '@@/tailwindcss-classnames';
import CSecurityGroup from '@/components/Logic/CSecurityGroup';
import { CButton } from '@/components/Common/CButton';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import dataCenterService from '@/service/dataCenterService';
import { Row, Col, Divider, Typography, message, Input, Button, Progress } from 'antd';
import { RootState } from '@/redux/store';
import { getDataCenterParams, getRegionList, listAllDataCenter } from '@/redux/dataCenterSlice';
import { DataCenterParams, DCProgressInfo, RegionItem, SecurityGroupParms, SubnetParms } from '@/constant/dataCenter';
import FlagUtil from '@/utils/flagUtil';

const { Title, Text } = Typography;

const AddDataCenter = (): JSX.Element => {
    const navigate = useNavigate();

    const userState = useSelector((state: RootState) => {
        return state.user.user;
    });

    const [inputDcName, setInputDcName] = useState('');
    const [regionCode, setRegionCode] = useState('');
    const flagUtil = new FlagUtil();

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
    const [dcStatus, setDcStatus] = useState<undefined | 'error'>(undefined);
    const [intervalId, setIntervalId] = useState<number>(0);
    const [dcProgress, setDCProgress] = useState<DCProgressInfo>({ current:0,description:'' });

    const dataCenterState = useSelector((state: RootState) => {
        return state.dataCenter;
    });
    const data = dataCenterState.defaultDcParams;
    const regionList = dataCenterState.regionList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDataCenterParams({ dc: 'easyun' }));
        dispatch(getRegionList());
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

    // 创建数据中心
    const createDateCenter = async (params: DataCenterParams) => {
        if (params.dcName === '') {
            message.error('数据中心名称不能为空');
            return;
        }

        if (userState) {
            const created = await dataCenterService.createDataCenter(params);
            if (!created) {
                return;
            }
            const intervalId = setInterval(() => {
                getRealTimeTaskResult(created.taskId);
            }, 1000);
            setIntervalId(intervalId);
        }
    };


    const getRealTimeTaskResult = async (taskId: string) => {
        const taskResult = await dataCenterService.getTaskResult(taskId);

        if (taskResult === undefined) {
            message.error('can not get task result');
            return;
        }
        if (taskResult.total === taskResult.current) {
            clearInterval(intervalId);
            dispatch(listAllDataCenter());
            navigate('/home');
        } else{
            setDCProgress({
                current: taskResult.current,
                description: taskResult.description,
            });
        }
    };


    const getDcParams = () => {
        dispatch(getDataCenterParams({ region: regionCode, dc: inputDcName }));
    };

    return (
        <div>
            <Row gutter={16}>
                <Col span={24}>
                    <Icon icon="ant-design:plus-circle-twotone" width="25"
                        className={classnames('inline-block', 'mx-1')}/>
                    <Title level={3} style={{ display: 'inline' }}>Create New Cloud DataCenter</Title>
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
            <Divider/>
            <Row gutter={16}>
                <Col span={12}>
                    <Text strong>Identify your Datacenter</Text>
                    <Input
                        onChange={(e) => {
                            setInputDcName(e.target.value);
                            getDcParams();
                        }}
                        status={dcStatus}
                        defaultValue={inputDcName}
                        onBlur={(e) => {
                            if (!e.target.value) {
                                setDcStatus('error');
                            } else {
                                setDcStatus(undefined);
                            }
                            // fixme 切换region时反应不及时，导致创建数据中心失败问题暂未解决
                            // setRegionCode(data!.dcParms!.dcRegion | "");
                            getDcParams();
                        }
                        }
                        className={classnames('border', 'ml-3')} type="text"
                        placeholder=' Datacenter name'/>
                    <br/>

                    <Title level={4}>Easyun DataCenter Networking</Title>
                    <div className={classnames('ml-16')}>Region:
                        <select onChange={(e) => {
                            setRegionCode(e.target.value);
                            getDcParams();
                            if (!inputDcName) {
                                message.error('please input dcName');
                            }
                        }
                        } // 更新regioncode后还需更新dcparms
                        className={classnames('border', 'ml-3', 'px-2')}>
                            <option value="">{data?.dcParms.dcRegion}
                            </option>
                            {regionList?.map((item: RegionItem, index) => {
                                return <option
                                    key={index}
                                    value={item.regionCode}>
                                    {item.regionCode} - {item.regionName}
                                </option>;
                            })}
                        </select>
                        <Icon className={classnames('ml-5', 'inline-block')}
                            icon={flagUtil.getFlagIconByRegion(regionCode)}
                            color="#5c6f9a"
                            width="25" height="25"
                            fr={undefined}/>
                    </div>
                    <div className={classnames('ml-5')}>
                        <span className={classnames('mr-2')}>IPv4 CIDR block:</span>
                        <input onChange={(e) => {
                            setCidr(e.target.value);
                        }}
                        className={classnames('border')} type="text"
                        defaultValue={data?.dcParms.dcVPC.cidrBlock}/>
                    </div>
                    <CSubnet subnet={data?.dcParms.pubSubnet1} dropdown={data?.dropDown} index={1} isPublic={true}
                        classes={classnames('w-96', 'inline-block')}/>
                    <CSubnet subnet={data?.dcParms.pubSubnet2} dropdown={data?.dropDown} index={2} isPublic={true}
                        classes={classnames('w-96', 'inline-block')}/>
                    <br/>
                    <CSubnet subnet={data?.dcParms.priSubnet1} dropdown={data?.dropDown} index={1} isPublic={false}
                        classes={classnames('w-96', 'inline-block')}/>
                    <CSubnet subnet={data?.dcParms.priSubnet1} dropdown={data?.dropDown} index={2} isPublic={false}
                        classes={classnames('w-96', 'inline-block')}/>


                    <div className={classnames('ml-5', 'mt-10', 'font-bold')}>Easyun DataCenter Security Group</div>
                    <CSecurityGroup sg={data?.dcParms.securityGroup0}
                        classes={classnames('mx-5', 'w-64', 'inline-block')}/>
                    <CSecurityGroup sg={data?.dcParms.securityGroup1}
                        classes={classnames('mx-5', 'w-64', 'inline-block')}/>
                    <CSecurityGroup sg={data?.dcParms.securityGroup2}
                        classes={classnames('mx-5', 'w-64', 'inline-block')}/>


                </Col>
                <Col span={8}>
                    <p>picture here</p>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={16}>
                    <div className={classnames('flex', 'justify-center', 'm-16')}>
                        <CButton click={() => {
                            navigate('/home');
                        }} classes={classnames('bg-gray-400', 'text-white', 'rounded-2xl', 'w-32', 'h-9', 'mx-5')}>
                            <Icon className={classnames('inline-block', 'mr-2')} icon="akar-icons:arrow-left"
                                color="white"
                                width="20" height="20" fr={undefined}/>
                            Back</CButton>
                        <Button
                            disabled={!!dcStatus}
                            onClick={() => {
                                if (inputDcName == 'easyun') {
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
                        >Create</Button>
                    </div>
                </Col>
            </Row>


        </div>
    );
};


export default AddDataCenter;
