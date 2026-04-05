import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

interface SortOption {
    label: string;
    value: string;
}

interface ResourceListPageProps {
    /** 页面标题 */
    title: string;
    /** 是否加载中 */
    loading?: boolean;
    /** 数据列表（空数组显示空状态） */
    items: any[] | undefined;
    /** 排序选项 */
    sortOptions?: SortOption[];
    /** 当前排序值 */
    sortBy?: string;
    /** 排序变更回调 */
    onSortChange?: (value: string) => void;
    /** 添加按钮文字 */
    addButtonText?: string;
    /** 添加按钮跳转路径 */
    addPath?: string;
    /** 自定义添加按钮（优先于 addPath） */
    addButton?: React.ReactNode;
    /** 空状态提示 */
    emptyTitle?: string;
    emptyDescription?: string;
    /** 列表渲染 */
    children: React.ReactNode;
}

export function ResourceListPage({
    title, loading, items, sortOptions, sortBy, onSortChange,
    addButtonText, addPath, addButton, emptyTitle, emptyDescription, children,
}: ResourceListPageProps) {
    const navigate = useNavigate();

    if (loading) {
        return (
            <div className="flex w-full items-center justify-center h-96">
                <Spinner className="size-8" />
            </div>
        );
    }

    const addEl = addButton || (addPath && (
        <Button onClick={() => navigate(addPath)} className="btn-yellow">
            {addButtonText || `Add ${title}`}
        </Button>
    ));

    if (!items || items.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center m-10">
                <div className="m-1 text-3xl">{emptyTitle || `No ${title} found.`}</div>
                <div className="my-2 text-sm text-gray-700">
                    {emptyDescription || `Add a ${title} to get started with Easyun!`}
                </div>
                {addEl}
            </div>
        );
    }

    return (
        <>
            <div className="mx-8 mt-2 text-xl font-bold align-middle">{`Select a ${title}`}</div>
            <div className="flex justify-between items-center mx-8">
                {sortOptions && sortBy && onSortChange ? (
                    <div className="flex text-sm items-center">
                        <span>Sort by </span>
                        <DropdownMenu>
                            <DropdownMenuTrigger >
                                <button className="mx-1 font-bold text-yellow-550 cursor-pointer inline-flex items-center">
                                    {sortBy} <ChevronDown className="ml-1 size-3" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {sortOptions.map((opt) => (
                                    <DropdownMenuItem key={opt.value} onClick={() => onSortChange(opt.value)}>
                                        {opt.label}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                ) : <div />}
                {addEl}
            </div>
            <div className="grid gap-4 justify-items-center items-center mt-4 lg:grid-cols-2 2xl:grid-cols-3">
                {children}
            </div>
        </>
    );
}
