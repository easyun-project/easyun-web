

export interface ServerModel {
    ebs: number,
    ins_type: string,
    os: string,
    pub_ip: string,
    ram: number,
    rg_az: string,
    svr_id: string,
    svr_name: string,
    svr_state: string,
    vcpu: number,
}

export const serverColumns = [
    {
        title: 'Instance ID',
        dataIndex: 'svr_id',
        key: 'svr_id',
    },
    {
        title: 'Name(tag)',
        dataIndex: 'svr_name',
        key: 'svr_name',
    },
    {
        title: 'Instance state',
        dataIndex: 'svr_state',
        key: 'svr_state',
    },
    {
        title: 'Instance type',
        dataIndex: 'ins_type',
        key: 'ins_type',
    },
    {
        title: 'vCPU',
        dataIndex: 'vcpu',
        key: 'vcpu',
    },
    {
        title: 'RAM',
        dataIndex: 'ram',
        key: 'ram',
    },
    {
        title: 'Storage(EBS)',
        dataIndex: 'ebs',
        key: 'ebs',
    },
    {
        title: 'OS',
        dataIndex: 'os',
        key: 'os',
    },
    {
        title: 'Region & AZ',
        dataIndex: 'rg_az',
        key: 'rg_az',
    },
    {
        title: 'Public IPv4',
        dataIndex: 'pub_ip',
        key: 'pub_ip',
    },
];