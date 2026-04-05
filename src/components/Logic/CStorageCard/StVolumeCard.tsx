import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '@/redux/store';
import { RootState } from '@/redux/store';
import { useNavigate, Link } from 'react-router-dom';
import { StVolumeInfo } from '@/constant/storage';
import { deleteApiV1StorageVolume } from '@/api-client';
import { listAllVolume } from '@/redux/stvolumeSlice';
import { ResourceCard } from '@/components/ui/resource-card';
import { toast } from 'sonner';

const CStVolumeCard = (props: StVolumeInfo): JSX.Element => {
    const { volumeId, volumeAz, volumeSize, volumeAttach } = props;
    const navigate = useNavigate();
    const dcName = useSelector((state: RootState) => state.dataCenter.current!.dcName) || '';
    const dispatch = useDispatch<AppDispatch>();

    const attachInfo = volumeAttach.length === 0
        ? 'Not attached'
        : <span>Attached to {volumeAttach.map((svr, i) =>
            <Link key={svr.svrId} to={'/resource/server/' + svr.svrId} className="ml-1 text-blue-600">
                {svr.svrId}{i < volumeAttach.length - 1 ? ',' : ''}
            </Link>
        )}</span>;

    return (
        <ResourceCard
            icon="clarity:storage-line"
            title={volumeId || ''}
            titleLink={volumeId}
            subtitle={`${volumeSize} GiB`}
            actions={[
                { label: 'Manage', onClick: () => navigate(`/resource/volume/${volumeId}`, { state: props }) },
                {
                    label: 'Delete', danger: true, onClick: () => {
                        (deleteApiV1StorageVolume as any)({ body: { dcName, volumeIds: [volumeId] } })
                            .then(() => { dispatch(listAllVolume({ dc: dcName })); toast.success('Delete volume success'); });
                    }
                },
            ]}
            footerLeft={attachInfo}
            footerRight={volumeAz}
        />
    );
};

export default CStVolumeCard;
