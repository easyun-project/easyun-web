import React, {useEffect} from 'react';
import {CHeader} from '@/components/Logic/CHeader';
import {CFooter} from '@/components/Logic/CFooter';
import {CSubnet} from '@/components/Logic/CSubnet';
import {classnames} from '@@/tailwindcss-classnames';
import CSecurityGroup from '@/components/Logic/CSecurityGrop';
import {CButton} from '@/components/Common/CButton';
import {Icon} from '@iconify/react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import dataCenterService, {CreateDataCenterParams} from "@/service/dataCenterService";
import {message} from "antd";
import {RootState} from "@/redux/store";
import {getDefaultDataCenter} from "@/redux/dataCenterSlice";


const DataCenter = (): JSX.Element => {
    const navigate = useNavigate();

    const userState = useSelector((state: RootState) => {
        return state.user.user
    })

    const dataCenterState = useSelector((state: RootState) => {
        return state.dataCenter
    })
    const data = dataCenterState.defaultDataCenter

    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDefaultDataCenter(userState!.token))
    }, [dispatch])

    // 创建数据中心
    const createDateCenter = async (params: CreateDataCenterParams) => {
        if (userState) {
            const created = await dataCenterService.createDataCenter(userState!.token, params)
            if (created) {
                navigate('/resource');
                return
            }
            message.info("创建数据中心失败")
        }
    }


    return (
        <div>
            <CHeader/>
            <div className={classnames('my-3')}>
                <Icon icon="ant-design:plus-circle-twotone" width="25" className={classnames('inline-block', 'mx-1')}
                      fr={undefined}/>
                Create New Cloud DataCenter
            </div>
            <div className={classnames('ml-5', 'mt-2')}>Easyun DataCenter Networking</div>
            <div className={classnames('ml-24')}>Region:
                <Icon className={classnames('inline-block', 'mx-1')} icon="emojione-v1:flag-for-japan" color="gray"
                      width="25" height="25" fr={undefined}/>
                {data?.az}
            </div>
            <div className={classnames('ml-5')}>
                <span className={classnames('mr-2')}>IPv4 CIDR block:</span>
                <input className={classnames('border')} type="text" defaultValue={data?.vpc_cidr}/>
            </div>
            <CSubnet subnet={data?.pub_subnet1} index={1} isPublic={true} classes={classnames('w-96', 'inline-block')}/>
            <CSubnet subnet={data?.pub_subnet2} index={2} isPublic={true} classes={classnames('w-96', 'inline-block')}/>
            <br/>
            <CSubnet subnet={data?.pri_subnet1} index={1} isPublic={false}
                     classes={classnames('w-96', 'inline-block')}/>
            <CSubnet subnet={data?.pri_subnet2} index={2} isPublic={false}
                     classes={classnames('w-96', 'inline-block')}/>


            <div className={classnames('ml-5', 'mt-10')}>Easyun DataCenter Security Group</div>
            <CSecurityGroup title={data?.secure_group1} classes={classnames('mx-5', 'w-64', 'inline-block')}/>
            <CSecurityGroup title={data?.secure_group2} classes={classnames('mx-5', 'w-64', 'inline-block')}/>
            <CSecurityGroup title={data?.secure_group3} classes={classnames('mx-5', 'w-64', 'inline-block')}/>

            <div className={classnames('flex', 'justify-center', 'm-16')}>
                <CButton click={() => {
                    navigate('/home');
                }} classes={classnames('bg-gray-400', 'text-white', 'rounded-2xl', 'w-32', 'h-9', 'mx-5')}>
                    <Icon className={classnames('inline-block', 'mr-2')} icon="akar-icons:arrow-left" color="white"
                          width="20" height="20" fr={undefined}/>
                    Back</CButton>
                <CButton click={() => {
                    const params: CreateDataCenterParams = {
                        keypair: data?.key,
                        private_subnet_1: data?.pri_subnet1,
                        private_subnet_2: data?.pri_subnet2,
                        public_subnet_1: data?.pub_subnet1,
                        public_subnet_2: data?.pri_subnet2,
                        region: data?.region,
                        sgs1_flag: '111',
                        sgs2_flag: '111',
                        sgs3_flag: '111',
                        vpc_cidr: data?.vpc_cidr,
                    }
                    createDateCenter(params)
                }} classes={classnames('bg-yellow-550', 'text-white', 'rounded-2xl', 'w-32', 'px-5')}>Create</CButton>
            </div>

            <CFooter/>
        </div>
    );
};


export default DataCenter;
