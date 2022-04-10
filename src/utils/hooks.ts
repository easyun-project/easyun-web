import { useEffect, useState } from 'react';

// 初始化
export const useMount = (callback) => {
    useEffect(() => {
        callback();
    }, []);
};
