import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '@/redux/store';
import { RootState } from '@/redux/store';
import { StaticIpInfo } from '@/constant/dataCenter';
import { deleteApiV1DatacenterStaticip } from '@/api-client';
import { listAllStaticIp } from '@/redux/staticipSlice';
import { updateCurrentDC } from '@/redux/dataCenterSlice';
import { ResourceCard } from '@/components/ui/resource-card';

export default function EipCard(props: StaticIpInfo) {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const dc = useSelector((state: RootState) => state.dataCenter.current!.dcName) || '';
    const { tagName, publicIp, assoTarget, boarderGroup, eipId } = props;

    const attachInfo = assoTarget.eniId
        ? <span className="text-xs text-gray-500">
            Attached to
            {assoTarget.eniType !== 'nat_gateway'
                ? <Link to={'/resource/server/' + assoTarget.svrId} className="ml-1 text-blue-600">{assoTarget.tagName}</Link>
                : <span className="ml-1">{assoTarget.tagName}</span>}
        </span>
        : <span className="text-xs text-red-500">Not Attached</span>;

    return (
        <ResourceCard
            icon="iconoir:ip-address"
            title={tagName}
            titleLink={publicIp}
            subtitle={eipId}
            actions={[
                { label: 'Detail', onClick: () => { dispatch(updateCurrentDC(props) as any); navigate(publicIp); } },
                {
                    label: 'Delete', danger: true, onClick: () => {
                        (deleteApiV1DatacenterStaticip as any)({ eipId: eipId || '', dcName: dc, publicIp: publicIp || '' })
                            .then(() => dispatch(listAllStaticIp({ dc })), err => alert(err));
                    }
                },
            ]}
            footerLeft={attachInfo}
            footerRight={<><div>{publicIp}</div><div>{boarderGroup}</div></>}
        />
    );
}
