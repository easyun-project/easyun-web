import React, { useEffect, useState } from 'react';
import { CSubnet } from '@/components/Logic/CSubnet';
import { classnames } from '@@/tailwindcss-classnames';
import CSecurityGroup from '@/components/Logic/CSecurityGroup';
import { CButton } from '@/components/Common/CButton';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import dataCenterService from '@/service/dataCenterService';
import { message } from 'antd';
import { RootState } from '@/redux/store';
import { getDataCenterParms, getDatacenterRegion } from '@/redux/dataCenterSlice';
import { DataCenterParms, Region, SecurityGroupParms, SubnetParms } from '@/constant/dataCenter';
import FlagUtil from '@/utils/flagUtil';


const AddDataCenter = (): JSX.Element => {
    const navigate = useNavigate();

    const userState = useSelector((state: RootState) => {
        return state.user.user;
    });

    const [inputDcName, setInputDcName] = useState('');
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

    const [sshKey, setSSHKey] = useState<string>('');
    const [flag, setFlag] = useState<string>('JPN');

    const dataCenterState = useSelector((state: RootState) => {
        return state.dataCenter;
    });
    const data = dataCenterState.defaultDcParams;
    const region = dataCenterState.region;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDataCenterParms());
        dispatch(getDatacenterRegion());
        if (data) {
            setInputDcName(data.dcParms.dcName);
            setCidr(data.dcParms.dcVPC.cidrBlock);
            setPubSubnet1(data.dcParms.pubSubnet1);
            setPubSubnet2(data.dcParms.pubSubnet1);
            setPriSubnet1(data.dcParms.priSubnet1);
            setPriSubnet2(data.dcParms.priSubnet2);
            setSg0(data.dcParms.securityGroup0);
            setSg1(data.dcParms.securityGroup1);
            setSg2(data.dcParms.securityGroup2);
            // setSSHKey(data.dcParms);
        }
    }, [dispatch]);

    // 创建数据中心
    const createDateCenter = async (params: DataCenterParms) => {
        if (params.dcName === '') {
            message.error('数据中心名称不能为空');
            return;
        }
        console.log(params);

        if (userState) {
            const created = await dataCenterService.createDataCenter(params);
            if (created) {
                navigate('/home');
                return;
            }
            message.info('创建数据中心失败');
        }
    };

    const getDataCenter = () => {
        dispatch(getDataCenterParms(inputDcName));
    };

    return (
        <div>
            <div className={classnames('my-3')}>
                <Icon icon="ant-design:plus-circle-twotone" width="25" className={classnames('inline-block', 'mx-1')}
                    fr={undefined}/>
                Create New Cloud DataCenter
            </div>
            <hr/>
            <div className={classnames('mx-5', 'my-3')}>
                Identify your Datacenter
                <input
                    onChange={(e) => {
                        setInputDcName(e.target.value);
                    }}
                    onBlur={getDataCenter}
                    className={classnames('border', 'ml-3')} type="text"
                    placeholder='new datacenter name'/>
            </div>
            <div className={classnames('ml-5', 'mt-2')}>Easyun DataCenter Networking</div>
            <div className={classnames('ml-24')}>Region:
                <select
                    className={classnames('border', 'ml-3','px-2')}
                    onChange={(e)=>{
                        setFlag(e.target.value);
                    }}>
                    <option value="">{data?.dcParms.dcRegion}
                    </option>
                    {region?.map((item: Region) => {
                        return <option
                            key={item.regionCode}
                            value={item.countryCode}>
                            {item.regionCode}
                        </option>;
                    })}
                </select>
                <Icon className={classnames('ml-5','inline-block')} icon={FlagUtil.getFlagIcon(flag)}
                    color="#5c6f9a"
                    width="25" height="25"
                    fr={undefined}/>
            </div>
            <div className={classnames('ml-5')}>
                <span className={classnames('mr-2')}>IPv4 CIDR block:</span>
                <input
                    onChange={(e) => {
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
            <CSecurityGroup sg={data?.dcParms.securityGroup0} classes={classnames('mx-5', 'w-64', 'inline-block')}/>
            <CSecurityGroup sg={data?.dcParms.securityGroup1} classes={classnames('mx-5', 'w-64', 'inline-block')}/>
            <CSecurityGroup sg={data?.dcParms.securityGroup2} classes={classnames('mx-5', 'w-64', 'inline-block')}/>

            <div className={classnames('flex', 'justify-center', 'm-16')}>
                <CButton click={() => {
                    navigate('/home');
                }} classes={classnames('bg-gray-400', 'text-white', 'rounded-2xl', 'w-32', 'h-9', 'mx-5')}>
                    <Icon className={classnames('inline-block', 'mr-2')} icon="akar-icons:arrow-left" color="white"
                        width="20" height="20" fr={undefined}/>
                    Back</CButton>
                <CButton click={() => {
                    const params: DataCenterParms = {
                        dcName: inputDcName,
                        dcRegion: data?.dcParms.dcRegion ?? '',
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
                }} classes={classnames('bg-yellow-550', 'text-white', 'rounded-2xl', 'w-32', 'px-5')}>Create</CButton>
            </div>

        </div>
    );
};


export default AddDataCenter;
