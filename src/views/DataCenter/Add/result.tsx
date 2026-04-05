import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AddDcResult = (): JSX.Element => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="text-4xl">✅</div>
            <div className="text-xl">Successfully Create New Cloud Datacenter!</div>
            <div className="flex gap-4">
                <Button onClick={() => navigate('/home')}>Go Home</Button>
                <Button onClick={() => navigate('/datacenter/add')}>Add Another</Button>
            </div>
        </div>
    );
};

export default AddDcResult;
