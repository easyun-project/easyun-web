import React from 'react';
import { Icon } from '@iconify/react';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/ui/data-table';

type EventRow = {
    eventd: string; status: string; category: string;
    region_zone: string; start_time: string; last_update_time: string; affected_resources: string;
};

const openlogItem = () => window.open('https://console.aws.amazon.com/phd/home/?region=us-east-1#/event-log', '_blank');
const openCloudWatch = () => window.open('https://console.aws.amazon.com/cloudwatch/home/?region=us-east-1', '_blank');

const columns: ColumnDef<EventRow>[] = [
    { header: 'Event', accessorKey: 'eventd', cell: ({ getValue }) => (
        <span onClick={openlogItem} className="text-blue-600 cursor-pointer">{getValue() as string}</span>
    )},
    { header: 'Status', accessorKey: 'status' },
    { header: 'Category', accessorKey: 'category' },
    { header: 'Region/Zone', accessorKey: 'region_zone' },
    { header: 'Start time', accessorKey: 'start_time' },
    { header: 'Last update', accessorKey: 'last_update_time' },
    { header: 'Affected resources', accessorKey: 'affected_resources' },
];

const data: EventRow[] = Array(100).fill(0).map((_, i) => ({
    eventd: 'S3 operation issue', status: 'Closed', category: 'Issue',
    region_zone: 'us-east-1', start_time: '2021.09.01 06:23:11',
    last_update_time: '2021.12.01 16:23:11', affected_resources: '-',
}));

export default function Event() {
    return (
        <div className="p-4">
            <div className="font-bold text-xl">Event Log</div>
            <div className="flex flex-wrap my-4">
                <div className="w-1/3">
                    <span className="text-blue-600 cursor-pointer flex items-center gap-1" onClick={openCloudWatch}>
                        Amazon CloudWatch Events <Icon icon="ri:share-box-fill" fr={undefined} />
                    </span>
                </div>
                <div className="w-1/3 flex items-center gap-1">
                    Last refreshed less than 1 min ago
                    <Icon className="text-yellow-550" icon="ci:refresh" fr={undefined} />
                </div>
            </div>
            <DataTable columns={columns} data={data} pageSize={20} />
        </div>
    );
}
