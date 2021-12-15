import * as React from 'react';
import {CHeader} from '@/components/Logic/CHeader';
import {CFooter} from '@/components/Logic/CFooter';
import {useNavigate} from 'react-router-dom';
import {Table, Tabs} from "antd";
import {classnames} from "@@/tailwindcss-classnames";
import {CButton} from "@/components/Common/CButton";

const {TabPane} = Tabs;

interface NotDataProps {
    resourceName: string,
    buttonName: string,
    routePath: string

}


const NoResource = (props: NotDataProps) => {
    const navigate = useNavigate();

    return (
        <div className={classnames('m-20', 'flex', 'flex-col', 'items-center', 'h-screen')}>
            <div className={classnames('text-3xl', 'm-1')}>you have no {props.resourceName} right now.</div>
            <div className={classnames('text-sm', 'm-1')}>
                Add a cloud {props.resourceName} and get started with Easyun!
            </div>
            <div>
                <CButton
                    click={() => navigate(props.routePath)}
                    classes={classnames('bg-yellow-550', 'block', 'text-white', 'rounded-3xl', 'px-5', 'py-3')}>
                    {props.buttonName}
                </CButton>
            </div>
        </div>
    )

}


interface TableProps {
    dataSource: object[];
    columns: object[]
}

const ResourceTable = (props: TableProps) => {
    return (
        <Table bordered={true} dataSource={props.dataSource} columns={props.columns}/>
    )
}

const serverDataSource = [
    {
        instanceId: 'i-obajb812jn6689n',
        name: 'Web_server_pro',
        instanceState: "Running",
        instanceType: 't3a.medium',
        vCPU: 2,
        RAM: 4,
        storage: '32G',
        os: 'Amazon Linux',
        regionAndAZ: 'cn-northeast-1a',
        publicIpv4: '53.644.16.22'
    },
    {
        instanceId: 'i-obajb812jn6689n',
        name: 'Web_server_pro',
        instanceState: "Running",
        instanceType: 't3a.medium',
        vCPU: 2,
        RAM: 4,
        storage: '32G',
        os: 'Amazon Linux',
        regionAndAZ: 'cn-northeast-1a',
        publicIpv4: '53.644.16.22'
    }, {
        instanceId: 'i-obajb812jn6689n',
        name: 'Web_server_pro',
        instanceState: "Running",
        instanceType: 't3a.medium',
        vCPU: 2,
        RAM: 4,
        storage: '32G',
        os: 'Amazon Linux',
        regionAndAZ: 'cn-northeast-1a',
        publicIpv4: '53.644.16.22'
    }, {
        instanceId: 'i-obajb812jn6689n',
        name: 'Web_server_pro',
        instanceState: "Running",
        instanceType: 't3a.medium',
        vCPU: 2,
        RAM: 4,
        storage: '32G',
        os: 'Amazon Linux',
        regionAndAZ: 'cn-northeast-1a',
        publicIpv4: '53.644.16.22'
    }, {
        instanceId: 'i-obajb812jn6689n',
        name: 'Web_server_pro',
        instanceState: "Running",
        instanceType: 't3a.medium',
        vCPU: 2,
        RAM: 4,
        storage: '32G',
        os: 'Amazon Linux',
        regionAndAZ: 'cn-northeast-1a',
        publicIpv4: '53.644.16.22'
    }, {
        instanceId: 'i-obajb812jn6689n',
        name: 'Web_server_pro',
        instanceState: "Running",
        instanceType: 't3a.medium',
        vCPU: 2,
        RAM: 4,
        storage: '32G',
        os: 'Amazon Linux',
        regionAndAZ: 'cn-northeast-1a',
        publicIpv4: '53.644.16.22'
    }, {
        instanceId: 'i-obajb812jn6689n',
        name: 'Web_server_pro',
        instanceState: "Running",
        instanceType: 't3a.medium',
        vCPU: 2,
        RAM: 4,
        storage: '32G',
        os: 'Amazon Linux',
        regionAndAZ: 'cn-northeast-1a',
        publicIpv4: '53.644.16.22'
    }, {
        instanceId: 'i-obajb812jn6689n',
        name: 'Web_server_pro',
        instanceState: "Running",
        instanceType: 't3a.medium',
        vCPU: 2,
        RAM: 4,
        storage: '32G',
        os: 'Amazon Linux',
        regionAndAZ: 'cn-northeast-1a',
        publicIpv4: '53.644.16.22'
    }, {
        instanceId: 'i-obajb812jn6689n',
        name: 'Web_server_pro',
        instanceState: "Running",
        instanceType: 't3a.medium',
        vCPU: 2,
        RAM: 4,
        storage: '32G',
        os: 'Amazon Linux',
        regionAndAZ: 'cn-northeast-1a',
        publicIpv4: '53.644.16.22'
    }, {
        instanceId: 'i-obajb812jn6689n',
        name: 'Web_server_pro',
        instanceState: "Running",
        instanceType: 't3a.medium',
        vCPU: 2,
        RAM: 4,
        storage: '32G',
        os: 'Amazon Linux',
        regionAndAZ: 'cn-northeast-1a',
        publicIpv4: '53.644.16.22'
    }, {
        instanceId: 'i-obajb812jn6689n',
        name: 'Web_server_pro',
        instanceState: "Running",
        instanceType: 't3a.medium',
        vCPU: 2,
        RAM: 4,
        storage: '32G',
        os: 'Amazon Linux',
        regionAndAZ: 'cn-northeast-1a',
        publicIpv4: '53.644.16.22'
    }, {
        instanceId: 'i-obajb812jn6689n',
        name: 'Web_server_pro',
        instanceState: "Running",
        instanceType: 't3a.medium',
        vCPU: 2,
        RAM: 4,
        storage: '32G',
        os: 'Amazon Linux',
        regionAndAZ: 'cn-northeast-1a',
        publicIpv4: '53.644.16.22'
    }, {
        instanceId: 'i-obajb812jn6689n',
        name: 'Web_server_pro',
        instanceState: "Running",
        instanceType: 't3a.medium',
        vCPU: 2,
        RAM: 4,
        storage: '32G',
        os: 'Amazon Linux',
        regionAndAZ: 'cn-northeast-1a',
        publicIpv4: '53.644.16.22'
    }, {
        instanceId: 'i-obajb812jn6689n',
        name: 'Web_server_pro',
        instanceState: "Running",
        instanceType: 't3a.medium',
        vCPU: 2,
        RAM: 4,
        storage: '32G',
        os: 'Amazon Linux',
        regionAndAZ: 'cn-northeast-1a',
        publicIpv4: '53.644.16.22'
    }, {
        instanceId: 'i-obajb812jn6689n',
        name: 'Web_server_pro',
        instanceState: "Running",
        instanceType: 't3a.medium',
        vCPU: 2,
        RAM: 4,
        storage: '32G',
        os: 'Amazon Linux',
        regionAndAZ: 'cn-northeast-1a',
        publicIpv4: '53.644.16.22'
    }, {
        instanceId: 'i-obajb812jn6689n',
        name: 'Web_server_pro',
        instanceState: "Running",
        instanceType: 't3a.medium',
        vCPU: 2,
        RAM: 4,
        storage: '32G',
        os: 'Amazon Linux',
        regionAndAZ: 'cn-northeast-1a',
        publicIpv4: '53.644.16.22'
    }, {
        instanceId: 'i-obajb812jn6689n',
        name: 'Web_server_pro',
        instanceState: "Running",
        instanceType: 't3a.medium',
        vCPU: 2,
        RAM: 4,
        storage: '32G',
        os: 'Amazon Linux',
        regionAndAZ: 'cn-northeast-1a',
        publicIpv4: '53.644.16.22'
    }, {
        instanceId: 'i-obajb812jn6689n',
        name: 'Web_server_pro',
        instanceState: "Running",
        instanceType: 't3a.medium',
        vCPU: 2,
        RAM: 4,
        storage: '32G',
        os: 'Amazon Linux',
        regionAndAZ: 'cn-northeast-1a',
        publicIpv4: '53.644.16.22'
    }, {
        instanceId: 'i-obajb812jn6689n',
        name: 'Web_server_pro',
        instanceState: "Running",
        instanceType: 't3a.medium',
        vCPU: 2,
        RAM: 4,
        storage: '32G',
        os: 'Amazon Linux',
        regionAndAZ: 'cn-northeast-1a',
        publicIpv4: '53.644.16.22'
    }, {
        instanceId: 'i-obajb812jn6689n',
        name: 'Web_server_pro',
        instanceState: "Running",
        instanceType: 't3a.medium',
        vCPU: 2,
        RAM: 4,
        storage: '32G',
        os: 'Amazon Linux',
        regionAndAZ: 'cn-northeast-1a',
        publicIpv4: '53.644.16.22'
    },

];

const serverColumns = [
    {
        title: 'Instance ID',
        dataIndex: 'instanceId',
        key: 'instanceId',
    },
    {
        title: 'Name(tag)',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Instance state',
        dataIndex: 'instanceState',
        key: 'instanceState',
    },
    {
        title: 'Instance type',
        dataIndex: 'instanceType',
        key: 'instanceType',
    },
    {
        title: 'vCPU',
        dataIndex: 'vCPU',
        key: 'vCPU',
    },
    {
        title: 'RAM',
        dataIndex: 'RAM',
        key: 'RAM',
    },
    {
        title: 'Storage(EBS)',
        dataIndex: 'storage',
        key: 'storage',
    },
    {
        title: 'OS',
        dataIndex: 'os',
        key: 'os',
    },
    {
        title: 'Region & AZ',
        dataIndex: 'regionAndAZ',
        key: 'regionAndAZ',
    },
    {
        title: 'Public IPv4',
        dataIndex: 'publicIpv4',
        key: 'publicIpv4',
    },
];


export const Resource = (): JSX.Element => {
    const [value, setValue] = React.useState(0);


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <div>
                <CHeader/>
                <Tabs className={classnames('pl-3')} defaultActiveKey="1">
                    <TabPane tab="Server" key="Server">
                        {/*<NoResource resourceName={"server"} buttonName={"Add Server"} routePath={"/AddServer"}/>*/}
                        <ResourceTable dataSource={serverDataSource} columns={serverColumns}/>
                    </TabPane>
                    <TabPane tab="Storage" key="Storage">
                        <NoResource resourceName={"storage"} buttonName={"Add Storage"} routePath={"/AddStorage"}/>

                    </TabPane>
                    <TabPane tab="Databases" key="Databases">
                        <NoResource resourceName={"databases"} buttonName={"Add Databases"}
                                    routePath={"/AddDatabases"}/>

                    </TabPane>
                    <TabPane tab="Networking" key="Networking">
                        <NoResource resourceName={"networking"} buttonName={"Add Networking"}
                                    routePath={"/AddNetworking"}/>

                    </TabPane>
                    <TabPane tab="Containers" key="Containers">
                        <NoResource resourceName={"containers"} buttonName={"Add Container"}
                                    routePath={"/AddContainer"}/>

                    </TabPane>
                    <TabPane tab="Backups" key="Backups">
                        <NoResource resourceName={"backups"} buttonName={"Add Backup"} routePath={"/AddBackup"}/>

                    </TabPane>
                </Tabs>
            </div>
            <CFooter/></>
    );
};


export default Resource;