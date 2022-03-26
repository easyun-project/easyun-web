import React from 'react';
import { useParams } from 'react-router-dom';

export default function SubnetDetail() {
    const params = useParams();
    const { subnetId } = params;
    return (
        <div>{subnetId}</div>
    );
}
