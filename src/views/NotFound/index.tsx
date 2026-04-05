import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFound = (): JSX.Element => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="text-6xl font-bold text-gray-300">404</div>
            <div className="text-xl">Page Not Found</div>
            <Button onClick={() => navigate('/home')}>Back Home</Button>
        </div>
    );
};

export default NotFound;
