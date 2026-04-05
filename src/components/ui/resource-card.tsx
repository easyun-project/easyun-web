import React from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export interface ActionMenuItem {
    label: string;
    onClick: () => void;
    danger?: boolean;
}

interface ResourceCardProps {
    /** 左侧图标：iconify name 或 img src */
    icon: string | React.ReactNode;
    /** 标题（可点击跳转） */
    title: string;
    /** 标题链接 */
    titleLink?: string;
    /** 副标题（通常是 ID） */
    subtitle?: string;
    /** 右上角状态文字 */
    status?: string;
    /** 底部左侧信息 */
    footerLeft?: React.ReactNode;
    /** 底部右侧信息 */
    footerRight?: React.ReactNode;
    /** 三点菜单项 */
    actions?: ActionMenuItem[];
    /** 背景色 class */
    bgClass?: string;
    /** 额外子内容 */
    children?: React.ReactNode;
}

export function ResourceCard({
    icon, title, titleLink, subtitle, status,
    footerLeft, footerRight, actions, bgClass = 'bg-gray-200', children,
}: ResourceCardProps) {
    const iconNode = typeof icon === 'string'
        ? (icon.startsWith('/') || icon.startsWith('http') || icon.startsWith('data:')
            ? <img src={icon} alt={title} width="50" className="inline" />
            : <Icon icon={icon} width="50" fr={undefined} />)
        : icon;

    return (
        <div className={`flex flex-col p-2 w-96 rounded-border ${bgClass}`}>
            <div className="flex m-1 mb-2">
                <div className="shrink-0">{iconNode}</div>
                <div className="grow ml-2">
                    {titleLink
                        ? <Link to={titleLink} className="text-lg text-blue-600">{title}</Link>
                        : <div className="text-lg">{title}</div>}
                    {subtitle && <div className="mt-1 text-xs text-gray-500">{subtitle}</div>}
                </div>
                <div className="flex flex-col items-end">
                    {actions && actions.length > 0 && (
                        <DropdownMenu>
                            <DropdownMenuTrigger >
                                <button className="cursor-pointer hover:text-yellow-550">
                                    <Icon icon="fluent:more-vertical-20-filled" width="20" fr={undefined} />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {actions.map((action) => (
                                    <DropdownMenuItem
                                        key={action.label}
                                        onClick={action.onClick}
                                        className={action.danger ? 'text-red-600 focus:text-red-600' : ''}
                                    >
                                        {action.label}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                    {status && <div className="mt-4 text-xs text-gray-500">{status}</div>}
                </div>
            </div>
            {children}
            {(footerLeft || footerRight) && (
                <div className="flex justify-between items-center pt-1 mx-2 border-t-2 border-gray-300 border-dashed">
                    <div className="text-xs text-gray-500">{footerLeft}</div>
                    <div className="text-xs text-gray-500">{footerRight}</div>
                </div>
            )}
        </div>
    );
}
