import React from 'react';
import {
    ColumnDef, flexRender, getCoreRowModel, getSortedRowModel,
    getPaginationRowModel, SortingState, useReactTable, RowSelectionState,
} from '@tanstack/react-table';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';

interface DataTableProps<TData> {
    columns: ColumnDef<TData, any>[];
    data: TData[];
    /** 启用行选择 */
    selectable?: boolean;
    onSelectionChange?: (rows: TData[]) => void;
    /** 每页行数，0 = 不分页 */
    pageSize?: number;
    /** 启用排序 */
    sortable?: boolean;
}

export function DataTable<TData>({
    columns, data, selectable, onSelectionChange, pageSize = 0, sortable = true,
}: DataTableProps<TData>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

    const table = useReactTable({
        data,
        columns,
        state: { sorting, rowSelection },
        onSortingChange: setSorting,
        onRowSelectionChange: (updater) => {
            const next = typeof updater === 'function' ? updater(rowSelection) : updater;
            setRowSelection(next);
            if (onSelectionChange) {
                const selectedRows = Object.keys(next)
                    .filter(k => next[k])
                    .map(k => data[Number(k)]);
                onSelectionChange(selectedRows);
            }
        },
        getCoreRowModel: getCoreRowModel(),
        ...(sortable && { getSortedRowModel: getSortedRowModel() }),
        ...(pageSize > 0 && { getPaginationRowModel: getPaginationRowModel() }),
        enableRowSelection: !!selectable,
        initialState: pageSize > 0 ? { pagination: { pageSize } } : undefined,
    });

    return (
        <div>
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map(hg => (
                        <TableRow key={hg.id}>
                            {selectable && (
                                <TableHead className="w-10">
                                    <input type="checkbox"
                                        checked={table.getIsAllRowsSelected()}
                                        onChange={table.getToggleAllRowsSelectedHandler()} />
                                </TableHead>
                            )}
                            {hg.headers.map(header => (
                                <TableHead key={header.id}
                                    className={header.column.getCanSort() && sortable ? 'cursor-pointer select-none' : ''}
                                    onClick={header.column.getToggleSortingHandler()}>
                                    <div className="flex items-center gap-1">
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {sortable && header.column.getCanSort() && (
                                            header.column.getIsSorted() === 'asc' ? <ChevronUp className="size-3" />
                                                : header.column.getIsSorted() === 'desc' ? <ChevronDown className="size-3" />
                                                    : <ChevronsUpDown className="size-3 opacity-30" />
                                        )}
                                    </div>
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map(row => (
                            <TableRow key={row.id} data-state={row.getIsSelected() ? 'selected' : undefined}>
                                {selectable && (
                                    <TableCell className="w-10">
                                        <input type="checkbox"
                                            checked={row.getIsSelected()}
                                            onChange={row.getToggleSelectedHandler()} />
                                    </TableCell>
                                )}
                                {row.getVisibleCells().map(cell => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length + (selectable ? 1 : 0)} className="text-center py-10 text-gray-400">
                                No data
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {pageSize > 0 && table.getPageCount() > 1 && (
                <div className="flex items-center justify-between px-4 py-2">
                    <span className="text-sm text-gray-500">
                        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </span>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                            Previous
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                            Next
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
