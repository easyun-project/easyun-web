import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Result } from 'antd';
import { CButton } from '@/components/Common/CButton';


const NotFound = (): JSX.Element => {
    const navigate = useNavigate();

    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<CButton type="primary" click={() => { navigate('/home'); }}>Back Home</CButton>}
        />
    );
};

export default NotFound;
