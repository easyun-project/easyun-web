import React from 'react';

interface Props {
    classes?: string;
}

export const CFooter = (props: Props): JSX.Element => {
    const container = "bg-gray-600 text-white h-9 w-full flex items-center justify-center";
    const content = "ml-6";
    return (
        <footer className={container}>
            <span className={content}>Copyright ©️ 2021-2022 Easyun Community</span>
        </footer>
    );
};
