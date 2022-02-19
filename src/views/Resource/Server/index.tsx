import * as React from 'react';
import { useEffect } from 'react';
import { NoResource, ResourceTable } from '@/views/Resource';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { getServerList } from '@/redux/serverSlice';
import { classnames } from '@@/tailwindcss-classnames';
import { CPartialLoading } from '@/components/Common/CPartialLoading';
import { CButton } from '@/components/Common/CButton';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Dropdown, Menu, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';

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
    },
    {
        title: 'Instance state',
        dataIndex: 'svrState',
        key: 'svrState',
        render: (text:string):React.ReactNode => {
            if (text === 'running') {
                return <span className={classnames('text-green-400')}>{text}</span>;
            } else if (text === 'stopped') {
                return <span className={classnames('text-gray-500')}>{text}</span>;
            }
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
    },
    {
        title: 'RAM',
        dataIndex: 'ramSize',
        key: 'ramSize',
        render: (text:string):React.ReactNode => <span>{text}GiB</span>,
    },
    {
        title: 'Storage(EBS)',
        dataIndex: 'volumeSize',
        key: 'volumeSize',
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

const actionMenu = () => {
    const handleMenuClick = (e) => {
        message.info(`Click on menu item => ${e.key}.`);
    };

    return (
        (
            <Menu onClick={handleMenuClick}>
                <Menu.Item key="Start">
                    Start
                </Menu.Item>
                <Menu.Item key="Stop">
                    Stop
                </Menu.Item>
                <Menu.Item key="Delete">
                    Delete
                </Menu.Item>
                <Menu.Item key="Restart">
                    Restart
                </Menu.Item>
            </Menu>
        ));
};
const modifyMenu = () => {
    const handleMenuClick = (e) => {
        message.info(`Click on menu item => ${e.key}.`);
    };

    return (
        (
            <Menu onClick={handleMenuClick}>
                <Menu.Item key="Name(Tag)">
                    Name(Tag)
                </Menu.Item>
                <Menu.Item key="Configuration">
                    Configuration
                </Menu.Item>
            </Menu>
        ));
};
export const ServerList = ():JSX.Element => {
    const navigate = useNavigate();
    const serverState = useSelector((state: RootState) => {
        return state.server;
    });

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getServerList());
    }, [dispatch]);

    const serverDataSource = serverState.servers;
    const newServerDataSource = serverDataSource.map((item)=> ({ ...item, 'key':item.svrId }));

    if (serverState.loading) {
        return (
            <CPartialLoading classes={classnames('h-96')}/>
        );
    } else if (serverDataSource) {
        return (
            <>
                <div id="operation" className={classnames('my-3', 'float-right')}>
                    <Dropdown overlay={actionMenu} className={classnames('inline-block', 'mr-2')}>
                        <Button>
                            Actions <DownOutlined />
                        </Button>
                    </Dropdown>
                    <Dropdown overlay={modifyMenu} className={classnames('inline-block', 'mr-2')}>
                        <Button>
                            Modify <DownOutlined />
                        </Button>
                    </Dropdown>
                    <CButton
                        click={() => navigate('/resource/server/add')}
                        classes={classnames('inline-block', 'bg-yellow-550', 'mr-3', 'block', 'text-white', 'rounded-3xl', 'px-5', 'py-1')}>
                        Add Server
                    </CButton>
                </div>
                <ResourceTable dataSource={newServerDataSource} columns={serverColumns}/>
                {/*<ServerDetail server={serverDataSource[1]}/>*/}
            </>
        );
    } else {
        return (
            <>
                <div id="operation">
                    <Dropdown overlay={actionMenu} className={classnames('inline-block')}>
                        <Button>
                            Action
                        </Button>
                    </Dropdown>
                    <CButton
                        click={() => navigate('server/add')}
                        classes={classnames('inline-block', 'bg-yellow-550', 'block', 'text-white', 'rounded-3xl', 'px-5', 'py-1')}>
                        Add Server
                    </CButton>
                </div>
                <NoResource resourceName={'server'} buttonName={'add server'} routePath={'server/add'}/>
            </>
        );
    }
};