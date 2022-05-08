import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Result } from 'antd';
import { CButton } from '@/components/Common/CButton';


const AddDcResult = (): JSX.Element => {
    const navigate = useNavigate();

    return (
        <Result
            status="success"
            title="Successfully Create New Cloud Datacenter !"
            subTitle="A Datacenter is the first step in your journey to the cloud."
            extra={
                <>
                    <CButton type="primary" click={() => { navigate('/home'); }}>Go Home</CButton>
                    <CButton type="primary" click={() => { navigate('/datacenter/add'); }}>Add Another</CButton>
                </>
            }
        />
    );
};

export default AddDcResult;