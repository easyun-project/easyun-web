import * as React from 'react';
import { useEffect,useState } from 'react';
import { NoResource } from '@/views/Resource';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { classnames } from '@@/tailwindcss-classnames';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Dropdown, Menu, Table, Modal, Input } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import serverService from '@/service/serverService';
import { LoadingOutlined } from '@ant-design/icons';
import { getServerList } from '@/redux/serverSlice';

export const serverColumns = [
    {
        title: 'Instance ID',
        dataIndex: 'svrId',
        key: 'svrId',
        render: (text:string):React.ReactNode => <Link
            to={`${text}`}
            className={classnames('text-blue-500', 'underline')}>
            {text}
        </Link>
    },
    {
        title: 'Name(tag)',
        dataIndex: 'tagName',
        key: 'tagName',
        sorter: (a, b) => a.tagName.length - b.tagName.length,
    },
    {
        title: 'Instance state',
        dataIndex: 'svrState',
        key: 'svrState',
        sorter: (a, b) => {
            const order = ['pending','running','shutting-down','stopped','terminated'];
            return order.indexOf(a.svrState) - order.indexOf(b.svrState);},

        render: (text:string):React.ReactNode => {
            if (text === 'running' || text === 'pending') {
                return <span className={classnames('text-green-400')}>{text}</span>;
            } else if (text === 'stopped' || text === 'shutting-down') {
                return <span className={classnames('text-gray-500')}>{text}</span>;
            }
            else {return <span className={classnames('text-red-500')}>{text}</span>;}
        },
    },
    {
        title: 'Instance type',
        dataIndex: 'insType',
        key: 'insType',
    },
    {
        title: 'vCPU',
        dataIndex: 'vpuNum',
        key: 'vpuNum',
        sorter: (a, b) => a.vpuNum - b.vpuNum,
    },
    {
        title: 'RAM',
        dataIndex: 'ramSize',
        key: 'ramSize',
        sorter: (a, b) => a.ramSize - b.ramSize,
        render: (text:string):React.ReactNode => <span>{text}GiB</span>,
    },
    {
        title: 'Storage(EBS)',
        dataIndex: 'volumeSize',
        key: 'volumeSize',
        sorter: (a, b) => a.volumeSize - b.volumeSize,
        render: (text:string):React.ReactNode => <span>{text}GB</span>,
    },
    {
        title: 'OS',
        dataIndex: 'osName',
        key: 'osName',
    },
    {
        title: 'Region & AZ',
        dataIndex: 'azName',
        key: 'azName',
    },
    {
        title: 'Public IPv4',
        dataIndex: 'pubIp',
        key: 'pubIp',
    },
];



export const ServerList = ():JSX.Element => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const serverState = useSelector((state: RootState) =>  state.server);
    const serverDataSource = serverState.servers;


    const [selectedServers, changeSelectedServers] = useState<React.Key[]>([]);
    const [acting,changeActing] = useState(false);
    const [isModalVisble,changeIsModalVisble] = useState(false);
    const [newName, changeNewName] = useState('');
    const [settingName,changeSettingName] = useState(false);
    const dc = useSelector((state: RootState) => {
        return state.dataCenter.currentDc.basicInfo?.dcName;
    });

    useEffect(() => {
        if(dc){
            // dispatch(getServerList());
            // dispatch(getDataCenterSecgroup({ dc }));
        }
        else{navigate('/home');}
    }, []);



    const newServerDataSource = serverDataSource.map((item)=> ({ ...item, 'key':item.svrId }));
    const actionMenu = (
        <Menu onClick={(e) => {
            changeActing(true);
            if (e.key === 'delete'){
                if (window.confirm('Are you sure to delete(irrevocable)?')){
                    serverService.deleteServerState({ svrIds: selectedServers }).then(
                        ()=>{alert('delete success');
                            dispatch(getServerList());},
                        ()=>alert('delete failed')
                    );
                }
            }
            else{
                serverService.changeServerState({
                    action: e.key,
                    svr_ids: selectedServers
                }).then(
                    ()=>{
                        alert('action success');
                        dispatch(getServerList());
                        changeActing(false);
                    },
                    ()=>{
                        alert('action failed');
                        changeActing(false);
                    }
                );
            }

            // console.log(selectedServers);
        }}>
            <Menu.Item key="start">
                    Start
            </Menu.Item>
            <Menu.Item key="stop">
                    Stop
            </Menu.Item>
            <Menu.Item key="restart">
                    Restart
            </Menu.Item>
            <Menu.Item danger key="delete">
                    Delete
            </Menu.Item>
        </Menu>
    );

    const modifyMenu = () => {

        return (
            (
                <Menu>
                    <Menu.Item key="Name(Tag)" onClick={()=>changeIsModalVisble(true)}>
                    Name(Tag)
                    </Menu.Item>
                    <Menu.Item key="Configuration">
                    Configuration
                    </Menu.Item>
                </Menu>
            ));
    };


    if (serverDataSource.length !== 0) {
        return (
            <>
                <div id="operation" className={classnames('my-3', 'float-right')}>
                    <Dropdown overlay={actionMenu} className={classnames('inline-block', 'mr-2')}>
                        <Button>
                            Actions {acting ? <LoadingOutlined className={classnames('align-middle')} /> : <DownOutlined /> }
                        </Button>
                    </Dropdown>
                    <Dropdown overlay={modifyMenu} className={classnames('inline-block', 'mr-2')}>
                        <Button>
                            Modify <DownOutlined />
                        </Button>
                    </Dropdown>
                    <Modal title='hello' visible={isModalVisble}
                        footer={[
                            <Button key="back" onClick={()=>changeIsModalVisble(false)}>
                                Cancel
                            </Button>,
                            <Button key="submit" type="primary" loading={settingName} onClick={
                                ()=>{
                                    changeSettingName(true);
                                    serverService.changeServerName({
                                        svr_name:newName,
                                        svr_ids:selectedServers as string[]
                                    }).then(()=>{
                                        changeSettingName(false);
                                        changeIsModalVisble(false);
                                        dispatch(getServerList());
                                    },
                                    ()=>changeSettingName(false)
                                    );}
                            }>
                                OK
                            </Button>,
                        ]}
                        onCancel={()=>changeIsModalVisble(false)}
                    >
                        <Input placeholder='Please enter server name' onChange={e=>changeNewName(e.target.value)}/>
                    </Modal>
                    <button onClick={() => navigate('/resource/server/add')}
                        className={classnames('btn-yellow')}>Add Server</button>
                </div>
                <Table loading={serverState.loading} bordered={true} dataSource={newServerDataSource} columns={serverColumns} rowSelection={{
                    type: 'checkbox',
                    onChange:(selectedRowKeys:React.Key[])=>{
                        changeSelectedServers(selectedRowKeys);
                    }
                }}/>
            </>
        );
    } else {
        return (
            <NoResource resourceName={'server'} buttonName={'add server'} routePath={'add'}/>
        );
    }
};