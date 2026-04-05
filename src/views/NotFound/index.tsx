import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Result } from 'antd';
import { Button } from '@/components/ui/button';


const NotFound = (): JSX.Element => {
    const navigate = useNavigate();

    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button  onClick={() => { navigate('/home'); }}>Back Home</Button>}
        />
    );
};

export default NotFound;
