import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '@/redux/store';
import { RootState } from '@/redux/store';
import { Link, useNavigate } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Spinner } from '@/components/ui/spinner';
import { ChevronDown } from 'lucide-react';
import { NoResource } from '@/views/Resource';
import { postApiV1ServerAction, deleteApiV1Server, putApiV1ServerName } from '@/api-client';
import { listAllServer } from '@/redux/serverSlice';

export const serverColumns: ColumnDef<any>[] = [
    {
        header: 'Instance ID', accessorKey: 'svrId',
        cell: ({ getValue }) => <Link to={`${getValue()}`} className="text-blue-500 underline">{getValue() as string}</Link>,
    },
    { header: 'Name(tag)', accessorKey: 'tagName', enableSorting: true },
    {
        header: 'Instance state', accessorKey: 'svrState', enableSorting: true,
        cell: ({ getValue }) => {
            const v = getValue() as string;
            const color = (v === 'running' || v === 'pending') ? 'text-green-400'
                : (v === 'stopped' || v === 'shutting-down') ? 'text-gray-500' : 'text-red-500';
            return <span className={color}>{v}</span>;
        },
    },
    { header: 'Instance type', accessorKey: 'insType' },
    { header: 'vCPU', accessorKey: 'vpuNum', enableSorting: true },
    { header: 'RAM', accessorKey: 'ramSize', enableSorting: true, cell: ({ getValue }) => <span>{getValue() as number}GiB</span> },
    { header: 'Storage(EBS)', accessorKey: 'volumeSize', enableSorting: true, cell: ({ getValue }) => <span>{getValue() as number}GB</span> },
    { header: 'OS', accessorKey: 'osName' },
    { header: 'Region & AZ', accessorKey: 'azName' },
    { header: 'Public IPv4', accessorKey: 'publicIp' },
];

export default function ServerList() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const serverDataSource = useSelector((state: RootState) => state.server.servers);
    const dcName = useSelector((state: RootState) => state.dataCenter.current?.dcName);

    const [selectedServers, setSelectedServers] = useState<any[]>([]);
    const [acting, setActing] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newName, setNewName] = useState('');

    useEffect(() => { if (!dcName) navigate('/home'); }, []);

    const handleAction = (action: string) => {
        const ids = selectedServers.map(s => s.svrId);
        if (!ids.length) return;
        setActing(true);
        if (action === 'delete') {
            if (!confirm('Are you sure to delete (irrevocable)?')) { setActing(false); return; }
            deleteApiV1Server({ body: { svrIds: ids } as any }).then(
                () => { alert('delete success'); dispatch(listAllServer({ dc: dcName! })); setActing(false); },
                () => { alert('delete failed'); setActing(false); },
            );
        } else {
            postApiV1ServerAction({ body: { action, svr_ids: ids } as any }).then(
                () => { alert('action success'); dispatch(listAllServer({ dc: dcName! })); setActing(false); },
                () => { alert('action failed'); setActing(false); },
            );
        }
    };

    if (!serverDataSource.length) {
        return <NoResource resourceName="server" buttonName="add server" routePath="add" />;
    }

    return (
        <>
            <div className="my-3 float-right flex gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button variant="outline">
                            Actions {acting ? <Spinner className="size-4 ml-1" /> : <ChevronDown className="size-4 ml-1" />}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleAction('start')}>Start</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAction('stop')}>Stop</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAction('restart')}>Restart</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={() => handleAction('delete')}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button variant="outline">Modify <ChevronDown className="size-4 ml-1" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setIsModalVisible(true)}>Name(Tag)</DropdownMenuItem>
                        <DropdownMenuItem>Configuration</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Button onClick={() => navigate('/resource/server/add')} className="btn-yellow">Add Server</Button>
            </div>

            <Dialog open={isModalVisible} onOpenChange={setIsModalVisible}>
                <DialogContent>
                    <DialogHeader><DialogTitle>Rename Server</DialogTitle></DialogHeader>
                    <Input placeholder="Please enter server name" onChange={e => setNewName(e.target.value)} />
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsModalVisible(false)}>Cancel</Button>
                        <Button onClick={() => {
                            putApiV1ServerName({ body: { svr_name: newName, svr_ids: selectedServers.map(s => s.svrId) } as any })
                                .then(() => { setIsModalVisible(false); dispatch(listAllServer({ dc: dcName! })); });
                        }}>OK</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <div className="clear-both" />
            <DataTable
                columns={serverColumns}
                data={serverDataSource.map(s => ({ ...s, key: s.svrId }))}
                selectable
                onSelectionChange={setSelectedServers}
                pageSize={20}
            />
        </>
    );
}
