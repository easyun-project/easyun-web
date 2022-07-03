import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import serverService from '@/service/serverService';
import { useNavigate } from 'react-router-dom';
// import { SeverDetailModel } from '@/constant/server';
import ServerCard from '@/components/Logic/CCard/ServerCard';
import { LoadingOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import { useDispatch } from 'react-redux';
import StaticIPService from '@/service/dcmStaticipServices';
import { listAllStaticIp } from '@/redux/staticipSlice';
// import { classnames } from 'tailwindcss-classnames';
// import { WarningOutlined, InfoCircleOutlined } from '@ant-design/icons';
const { Option } = Select;

export default function EipDetail() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dc = useSelector((state:RootState)=>state.dataCenter.current!.dcName);
    //解构赋值的连续性写法
    const { state:{ publicIp } }  = useLocation() as {state:{publicIp:string}};
    const eipInfos = useSelector((state:RootState)=>state.staticip.list);
    const thisEip = eipInfos?.filter(item=>item.publicIp === publicIp)[0];
    const { servers } = useSelector((state:RootState)=>state.server);
    // const [attachedSvr,changeAttachedSvr] = useState<SeverDetailModel>();
    // const [loading,changeLoading] = useState(false);
    const [ attaching, changeAttaching ] = useState(false);
    const [ detaching, changeDetaching ] = useState(false);
    const [ selectedSvr, changeSelectedSvr ] = useState('');

    return (
        <div className='flex m-4'>
            <Icon className='mr-8' icon="iconoir:ip-address" color="#e9862e" width="100"fr={undefined}/>
            <div className='grow'>
                {/* static information */}
                <div className='flex  border-b-2 border-dashed'>
                    <div className='grow'>
                        <div className='text-2xl'>{thisEip?.tagName}</div>
                        <div className='my-2 text-xs text-gray-500'>
                            {thisEip?.assoTarget.eniType
                                ? <div>
                                    Attached to
                                    <span className='ml-1'>{thisEip?.assoTarget.tagName}</span>
                                </div>
                                : <div className='text-xs text-red-500'>Not Attached</div>
                            }
                            <div>{thisEip?.boarderGroup}</div>
                        </div>
                    </div>
                    <div className='self-center'>
                        <button className="w-32 btn-red" onClick={()=>{
                            if(confirm('Are you sure to release this Eip?'))
                            {StaticIPService.delete({
                                eipId: thisEip!.eipId,
                                dcName: dc,
                                publicIp
                            }).then(()=>navigate(-1));}
                        }}> Release EIP</button>
                    </div>
                </div>
                <div>
                    {thisEip?.assoTarget.eniType
                        ? <div className='flex items-center p-1 pr-10 my-2 w-max bg-amber-100 rounded-border'>
                            <Icon icon="charm:info" className='mx-2 text-xl text-blue-600' inline={true} />
                            <span className='font-semibold'>Static IP address are free only while attached to a Cloud Server</span>
                        </div>
                        : <div className='flex items-center p-1 pr-10 my-2 w-max bg-amber-100 border-yellow-550 rounded-border'>
                            <Icon icon="ant-design:warning-outlined" inline={true} className='mx-2 text-xl text-red-600'/>
                            <span>
                                <div className='font-semibold'>This static IP is not attached.</div>
                                <div className='text-gray-500'>You&apos;ll be charged until you attach this static IP to a cloud server.</div>
                            </span>
                        </div>}
                    <div className='my-5'>
                        <div>This static IP is avaliable for public connection worldwide.</div>
                        <div className='text-2xl font-bold'>{publicIp}</div>
                    </div>



                    {/* main functional area */}
                    <div>
                        {thisEip?.assoTarget.eniType === 'interface'
                        // already attached to a server
                            ? <>
                                <div className='text-xl font-semibold'>Detach from an instance</div>
                                { <ServerCard serverId={thisEip.assoTarget.svrId}>
                                    <button className='flex items-center self-start text-yellow-550' onClick={() => {
                                        changeDetaching(true);
                                        serverService.bindServerEip({
                                            action: 'detach',
                                            publicIp: publicIp,
                                            svrId: thisEip.assoTarget.svrId
                                        }).then(()=>{
                                            return dispatch(listAllStaticIp({ dc }));
                                        }).then(()=>changeDetaching(false));
                                    }}>
                                        {detaching
                                            ? <LoadingOutlined className='mx-1'/>
                                            : <Icon fr={undefined}
                                                icon="clarity:times-line"
                                                className='mx-1'
                                                width="24" height="24"
                                            />}
                                        <span>Detach</span>
                                    </button>
                                </ServerCard>}
                            </>


                            : <>
                                <div className='text-xl font-semibold'>Attach to an instance</div>
                                <div>Attaching a static IP replaces that instance&apos;s dynamic IP address. </div>
                                {thisEip?.assoTarget.eniType === 'nat_gateway'
                                // attached to a nat_gateway
                                    ? 'nat_gateway'
                                // not attached to a nat_gateway or a server
                                    : <div>
                                        <Select placeholder="Select a cloud server..." className='mb-4 w-96' onChange={
                                            value=>{
                                                changeSelectedSvr(value);
                                            }
                                        }>
                                            {servers.filter(server=>!server.isEip).map(server=><Option key={server.svrId} value={server.svrId}>{`${server.tagName} : ${server.svrId}`}</Option>)}
                                        </Select>
                                        {selectedSvr
                                            ? <ServerCard serverId={selectedSvr} active>
                                                <button className='flex items-center self-start text-green-700' onClick={() => {
                                                    changeAttaching(true);
                                                    serverService.bindServerEip({
                                                        action: 'attach',
                                                        publicIp: publicIp,
                                                        svrId: selectedSvr,
                                                    }).then(()=>{
                                                        return dispatch(listAllStaticIp({ dc }));
                                                    }).then(()=>changeAttaching(false)); }}>
                                                    {attaching
                                                        ? <LoadingOutlined className='mx-1'/>
                                                        : <Icon fr={undefined}
                                                            icon="icons8:checked"
                                                            className='mx-1'
                                                            width="24" height="24"
                                                        />}
                                                    <span>Attach</span>
                                                </button>
                                            </ServerCard>
                                            : undefined}
                                    </div>}
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
