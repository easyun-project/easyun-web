import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '@/redux/store';
import { RootState } from '@/redux/store';
import { deleteApiV1StorageBucket } from '@/api-client';
import { listAllBucket } from '@/redux/stbucketSlice';
import { ResourceCard } from '@/components/ui/resource-card';

const CStBucketCard = (props): JSX.Element => {
    const { bucketId, bucketRegion, bucketAccess: { description, status } } = props;
    const dcName = useSelector((state: RootState) => state.dataCenter.current!.dcName) || '';
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    return (
        <ResourceCard
            icon="bi:bucket"
            title={bucketId}
            subtitle={status}
            actions={[
                { label: 'Manage', onClick: () => navigate(`/resource/object/${bucketId}`, { state: props }) },
                {
                    label: 'Delete', danger: true, onClick: () => {
                        (deleteApiV1StorageBucket as any)({ query: { dc: dcName, bucket_id: bucketId } })
                            .then(() => { alert('删除成功'); dispatch(listAllBucket({ dc: dcName })); });
                    }
                },
            ]}
            footerLeft={description}
            footerRight={bucketRegion}
        />
    );
};

export default CStBucketCard;
