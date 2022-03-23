import React,{ useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import serverService from '@/service/serverService';
import { useNavigate } from 'react-router-dom';
import { SeverDetailModel } from '@/constant/server';
import ServerCard from '@/components/Logic/CCard/ServerCard';

export default function EipDetail() {
    const navigate = useNavigate();
    //结构赋值的连续性写法
    const { state:{ pubIp } }  = useLocation() as {state:{pubIp:string}};
    const eipInfos = useSelector((state:RootState)=>state.dataCenter.currentDc.eip);
    const thisEip = eipInfos?.filter(item=>item.pubIp === pubIp)[0];
    const [attachedSvr,changeAttachedSvr] = useState<SeverDetailModel>();

    useEffect(() => {
        if(!thisEip) navigate(-1);
        else if(thisEip.assoTarget.svrId) serverService.getServerDetail(
            { serverId:thisEip.assoTarget.svrId }
        ).then(
            res =>changeAttachedSvr(res)
        );
    }, []);

    return (
        <>
            <div className='flex'>
                <Icon icon="iconoir:ip-address" color="#e9862e" width="60"fr={undefined}/>
                <div className='grow'>
                    <div className='flex  border-b-2 border-dashed'>
                        <div className='grow'>
                            <div>{thisEip?.tagName}</div>
                            <div>static IP, Not attached</div>
                            <div>{thisEip?.eipDomain}</div>
                        </div>
                        <div>
                            <button className="btn-red"> Release EIP</button>
                            {/* <div>Static Ip:<span className='font-bold'>{pubIp}</span></div> */}
                        </div>
                    </div>
                    <div>
                        <div>This static IP is avaliable for public connection worldwide.</div>
                        <div className='mt-5 text-xl font-bold'>{pubIp}</div>
                        <div>Attach to an instance</div>
                        <div>Attaching a static IP replaces that instance&apos;s dynamic IP address. </div>
                        <div>
                            {attachedSvr
                                ? <ServerCard {...attachedSvr}>
                                    <div>hello</div>
                                    <div>chillren</div>
                                </ServerCard>
                                : thisEip?.assoTarget.eniType === 'nat_gateway'
                                    ? 'nat_gateway'
                                    : 'not attached'}
                        </div>
                    </div>
                </div>
            </div>

        </>


    );
}
