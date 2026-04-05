import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Result } from 'antd';
import { Button } from '@/components/ui/button';


const AddDcResult = (): JSX.Element => {
    const navigate = useNavigate();

    return (
        <Result
            status="success"
            title="Successfully Create New Cloud Datacenter !"
            subTitle="A Datacenter is the first step in your journey to the cloud."
            extra={
                <>
                    <Button  onClick={() => { navigate('/home'); }}>Go Home</Button>
                    <Button  onClick={() => { navigate('/datacenter/add'); }}>Add Another</Button>
                </>
            }
        />
    );
};

export default AddDcResult;