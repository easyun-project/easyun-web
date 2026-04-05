import React from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface TabItem {
    key: string;
    label: string;
}

interface TabLayoutProps {
    /** URL 中模块的位置（如 /datacenter/subnet → pathIndex=2 取 subnet） */
    pathIndex?: number;
    /** 基础路由前缀（如 /datacenter） */
    basePath: string;
    /** Tab 列表 */
    tabs: TabItem[];
    /** 额外 className */
    className?: string;
}

export function TabLayout({ pathIndex = 2, basePath, tabs, className }: TabLayoutProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const current = location.pathname.split('/')[pathIndex] || tabs[0]?.key;

    return (
        <div className={cn('m-3', className)}>
            <nav className="flex border-b border-gray-200 mb-4">
                {tabs.map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => navigate(`${basePath}/${tab.key}`)}
                        className={cn(
                            'px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors',
                            current === tab.key
                                ? 'border-yellow-550 text-yellow-550'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        )}
                    >
                        {tab.label}
                    </button>
                ))}
            </nav>
            <Outlet />
        </div>
    );
}
