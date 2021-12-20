import * as React from 'react';
import {CHeader} from '@/components/Logic/CHeader';
import {CFooter} from '@/components/Logic/CFooter';
import {useNavigate} from 'react-router-dom';
import {Table, Tabs} from "antd";
import {classnames} from "@@/tailwindcss-classnames";
import {CButton} from "@/components/Common/CButton";
import {ServerModel} from "@/constant/server";
import {ServerList} from "@/views/Resource/Server";

const {TabPane} = Tabs;

interface NotDataProps {
    resourceName: string,
    buttonName: string,
    routePath: string

}


export const NoResource = (props: NotDataProps) => {
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
    dataSource: ServerModel[] | undefined | object[];
    columns: object[]
}

export const ResourceTable = (props: TableProps) => {
    return (
        <Table bordered={true} dataSource={props.dataSource} columns={props.columns}/>
    )
}
export const Resource = (): JSX.Element => {
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    };

    return (
        <>
            <div>
                <CHeader/>
                <div className={classnames('ml-3')}>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Server" key="Server">
                            <ServerList/>
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
            </div>
            <CFooter/></>
    );
};


export default Resource;