import React from 'react';
import { classnames, TTailwindString } from '@@/tailwindcss-classnames';
import { Menu, Dropdown } from 'antd';
import { Icon } from '@iconify/react';
import stbucket from '@@/src/assets/images/stbucket.png';
import { useNavigate } from 'react-router-dom';


export default function Home():JSX.Element {
    const navigate = useNavigate();
    const menu = (
        <Menu>
            <Menu.Item key="resource" onClick={()=>navigate('/resource')}>
          Resource
            </Menu.Item>
            <Menu.Item key="manage" onClick={()=>navigate('/datacenter')}>
          Manage
            </Menu.Item>
            <Menu.Item
                danger
                key="delete"
                onClick={() => console.log('click delete')
                }
            >
        Delete
            </Menu.Item>
        </Menu>
    );
    const Name = 'Easyun';
    const Vpc = 'Vpc';
    const CIDR = 'CIDR: 10.10.0.0';
    const Region = 'US-East';
    return (
        <div
            className={classnames(
                'flex',
                'flex-col',
                'bg-gray-200',
                'border',
                'w-96',
                'rounded',
                'p-2',
                'mx-8',
                'my-4',
            )}
        >
            <div className={classnames('flex', 'flex-row', 'mb-2')}>
                <img
                    src={stbucket}
                    alt="stbucket.png"
                    className={classnames('w-12', 'h-12')}
                />
                <div className={classnames('flex-grow')}>
                    <a href='/resource' className={classnames('text-blue-600') }>{Name}</a>
                    <div className={classnames('text-xs', 'text-gray-500')}>{Vpc}</div>
                </div>
                <Dropdown overlay={menu}>
                    <Icon
                        icon="fluent:more-vertical-20-filled"
                        fr={undefined}
                        className={classnames('cursor-pointer', 'hover:bg-yellow-650')}
                    />
                </Dropdown>
            </div>
            <div
                className={classnames(
                    'flex',
                    'flex-row',
                    'justify-between',
                    'border-t-2',
                    'border-gray-300',
                    'border-dashed'
                )}
            >
                <div className={classnames('text-xs', 'text-gray-500')}>{CIDR}</div>
                <div className={classnames('text-xs', 'text-gray-500', 'pr-5')}>{Region}</div>
            </div>
        </div>
    );
}
