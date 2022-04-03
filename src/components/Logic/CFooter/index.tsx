import React from 'react';
import { classnames, TTailwindString } from '@@/tailwindcss-classnames';

interface Props {
    classes?: TTailwindString;
}

export const CFooter = (props: Props): JSX.Element => {
    const container = classnames('bg-gray-600', 'text-white', 'h-9', 'w-full','flex', 'items-center','justify-center');
    const content = classnames('ml-6');
    return (
        <footer className={container}>
            <span className={content}>Copyright ©️ 2021-2022 Easyun Community</span>
        </footer>
    );
};
