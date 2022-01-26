import React from 'react';
import { classnames } from '@@/tailwindcss-classnames';
import { AntdTable, TableConfig, TableProp } from '@/components/Common/CTable/AntdTable';
import { Icon } from '@iconify/react';
import { DashCard, GraphicalData } from '@/components/DashboardCommon/DashCard';
import './index.less';

// const mock1 = {
//     config: {
//         isShowTitle: true,
//         isShowTableHeader: false,
//         title: 'DataCenter Summary'
//     },
//     tableTitle: ['name', 'country', 'light', 'Subnet'],
//     data: [
//         {
//             name: 'us-east-1a',
//             country: {
//                 icon: 'china',
//                 text: 'US East(N.Virginia)'
//             },
//             light: true,
//             subnet: '2 Subnet'
//         },
//         {
//             name: 'us-east-1a',
//             country: {
//                 icon: 'united-states',
//                 text: 'US East(N.Virginia)'
//             },
//             light: true,
//             subnet: '2 Subnet'
//         },
//         {
//             name: 'us-east-1a',
//             country: {
//                 icon: 'sweden',
//                 text: 'US East(N.Virginia)'
//             },
//             light: false,
//             subnet: '2 Subnet'
//         },
//         {
//             name: 'us-east-1a',
//             country: {
//                 icon: 'bahrain',
//                 text: 'US East(N.Virginia)'
//             },
//             light: false,
//             subnet: '2 Subnet'
//         },
//         {
//             name: 'us-east-1a',
//             country: {
//                 icon: 'brazil',
//                 text: 'US East(N.Virginia)'
//             },
//             light: false,
//             subnet: '2 Subnet'
//         },
//         {
//             name: 'us-east-1a',
//             country: {
//                 icon: 'japan',
//                 text: 'US East(N.Virginia)'
//             },
//             light: false,
//             subnet: '2 Subnet'
//         },
//         {
//             name: 'us-east-1a',
//             country: {
//                 icon: 'canada',
//                 text: 'US East(N.Virginia)'
//             },
//             light: false,
//             subnet: '2 Subnet'
//         },
//         {
//             name: 'us-east-1a',
//             country: {
//                 icon: 'united-kingdom',
//                 text: 'US East(N.Virginia)'
//             },
//             light: false,
//             subnet: '2 Subnet'
//         }
//     ]
// };
// const mock2 = [
//     {
//         title: 'Server Summary',
//         leftData: {
//             quantity: '25',
//             name: 'VM',
//             description: '(s)'
//         },
//         rightData: [
//             {
//                 icon: {
//                     name: 'akar-icons:circle-fill',
//                     color: '#92d050'
//                 },
//                 label: 'Running:',
//                 value: '15'
//             },
//             {
//                 icon: {
//                     name: 'akar-icons:circle-fill',
//                     color: '#afabab'
//                 },
//                 label: 'Stop:',
//                 value: '4'
//             },
//             {
//                 icon: false,
//                 label: 'cCPU:',
//                 value: '76'
//             },
//             {
//                 icon: false,
//                 label: 'RAM:',
//                 value: '119'
//             }
//         ]
//     },
//     {
//         title: 'Database Summary',
//         leftData: {
//             quantity: '7',
//             name: 'instance',
//             description: '(s)'
//         },
//         rightData: [
//             {
//                 label: 'RDS MySQL:',
//                 value: '3'
//             },
//             {
//                 label: 'RDS MariaDB:',
//                 value: '2'
//             },
//             {
//                 label: 'RDS POSTgreSQL:',
//                 value: '1'
//             },
//             {
//                 label: 'Aurora Provisioned:',
//                 value: '0'
//             },
//             {
//                 label: 'ElastiCache:',
//                 value: '1'
//             }
//         ]
//     },
//     {
//         title: 'Server Summary',
//         leftData: {
//             quantity: '25',
//             name: 'VM',
//             description: '(s)'
//         },
//         rightData: [
//             {
//                 icon: {
//                     name: 'akar-icons:circle-fill',
//                     color: '#92d050'
//                 },
//                 label: 'Running:',
//                 value: '15'
//             },
//             {
//                 icon: {
//                     name: 'akar-icons:circle-fill',
//                     color: ''
//                 },
//                 label: 'Stop:',
//                 value: '4'
//             },
//             {
//                 icon: false,
//                 label: 'cCPU:',
//                 value: '76'
//             },
//             {
//                 icon: false,
//                 label: 'RAM:',
//                 value: '119'
//             }
//         ]
//     },
//     {
//         title: 'Database Summary',
//         leftData: {
//             quantity: '7',
//             name: 'instance',
//             description: '(s)'
//         },
//         rightData: [
//             {
//                 label: 'RDS MySQL:',
//                 value: '3'
//             },
//             {
//                 label: 'RDS MariaDB:',
//                 value: '2'
//             },
//             {
//                 label: 'RDS POSTgreSQL:',
//                 value: '1'
//             },
//             {
//                 label: 'Aurora Provisioned:',
//                 value: '0'
//             },
//             {
//                 label: 'ElastiCache:',
//                 value: '1'
//             }
//         ]
//     },
//     {
//         title: 'Server Summary',
//         leftData: {
//             quantity: '25',
//             name: 'VM',
//             description: '(s)'
//         },
//         rightData: [
//             {
//                 icon: {
//                     name: 'akar-icons:circle-fill',
//                     color: '#92d050'
//                 },
//                 label: 'Running:',
//                 value: '15'
//             },
//             {
//                 icon: {
//                     name: 'akar-icons:circle-fill',
//                     color: ''
//                 },
//                 label: 'Stop:',
//                 value: '4'
//             },
//             {
//                 icon: false,
//                 label: 'cCPU:',
//                 value: '76'
//             },
//             {
//                 icon: false,
//                 label: 'RAM:',
//                 value: '119'
//             }
//         ]
//     },
//     {
//         title: 'Database Summary',
//         leftData: {
//             quantity: '7',
//             name: 'instance',
//             description: '(s)'
//         },
//         rightData: [
//             {
//                 label: 'RDS MySQL:',
//                 value: '3'
//             },
//             {
//                 label: 'RDS MariaDB:',
//                 value: '2'
//             },
//             {
//                 label: 'RDS POSTgreSQL:',
//                 value: '1'
//             },
//             {
//                 label: 'Aurora Provisioned:',
//                 value: '0'
//             },
//             {
//                 label: 'ElastiCache:',
//                 value: '1'
//             }
//         ]
//     }
// ];
// const mock3 = {
//     title: 'helthy Summary',
//     leftData: {
//         title: 'Alarms:',
//         listData: [
//             { icon: 'emojione:white-heavy-check-mark', label: 'In alarm', value: 0 },
//             { icon: 'emojione:white-heavy-check-mark', label: 'Insufficient data', value: 0 },
//             { icon: 'emojione:white-heavy-check-mark', label: 'OK', value: 0 }
//         ]
//     },
//     rightData: {
//         title: 'CloudWatch Dashbords(Favorite):',
//         listData: [
//             {
//                 icon: 'bx:bx-link-external',
//                 label: '',
//                 value: 'Easyun Overview'
//             },
//             {
//                 icon: 'bx:bx-link-external',
//                 label: '',
//                 value: 'Easyun Overview'
//             },
//             {
//                 icon: 'bx:bx-link-external',
//                 label: '',
//                 value: 'Easyun Overview'
//             },
//             {
//                 icon: 'bx:bx-link-external',
//                 label: '',
//                 value: 'Easyun Overview'
//             }
//         ]
//     }
// };
// const mock5 = [
//     {
//         config: {
//             isShowTitle: true,
//             isShowTableHeader: true,
//             title: 'Serve List',
//             isFull: true,
//             tabelRowTitleClassNames: classnames('bg-gray-300'),
//             tabbelColumnTitleClassNames: classnames('text-blue-500', 'underline')
//         },
//         tableTitle: ['Instance ID', 'Name(Tag)', 'State', 'instance type', 'vCPU', 'RAM', 'Storage(EBS)', 'OS', 'Region & AZ', 'Public IPv4', 'Launch Time'],
//         data: [
//             {
//                 InstanceID: 'i-0f5asf056asfasf0',
//                 name: 'ec2-ins-xx1',
//                 State: 'Running',
//                 instanceType: 't2.micro',
//                 vCPU: '2',
//                 RAM: '4',
//                 Storage: '8 Gib',
//                 OS: 'Ubuntu',
//                 'Region & AZ': 'ap-northeast-1b',
//                 'Public IPv4': '54.169.51.72',
//                 'Launch Time': '08/01 17:21'
//             },
//             {
//                 InstanceID: 'i-0f5asf056asfasf0',
//                 name: 'ec2-ins-xx1',
//                 State: 'Running',
//                 instanceType: 't2.micro',
//                 vCPU: '2',
//                 RAM: '4',
//                 Storage: '8 Gib',
//                 OS: 'Ubuntu',
//                 'Region & AZ': 'ap-northeast-1b',
//                 'Public IPv4': '54.169.51.72',
//                 'Launch Time': '08/01 17:21'
//             },
//             {
//                 InstanceID: 'i-0f5asf056asfasf0',
//                 name: 'ec2-ins-xx1',
//                 State: 'Running',
//                 instanceType: 't2.micro',
//                 vCPU: '2',
//                 RAM: '4',
//                 Storage: '8 Gib',
//                 OS: 'Ubuntu',
//                 'Region & AZ': 'ap-northeast-1b',
//                 'Public IPv4': '54.169.51.72',
//                 'Launch Time': '08/01 17:21'
//             },
//             {
//                 InstanceID: 'i-0f5asf056asfasf0',
//                 name: 'ec2-ins-xx1',
//                 State: 'Running',
//                 instanceType: 't2.micro',
//                 vCPU: '2',
//                 RAM: '4',
//                 Storage: '8 Gib',
//                 OS: 'Ubuntu',
//                 'Region & AZ': 'ap-northeast-1b',
//                 'Public IPv4': '54.169.51.72',
//                 'Launch Time': '08/01 17:21'
//             },
//             {
//                 InstanceID: 'i-0f5asf056asfasf0',
//                 name: 'ec2-ins-xx1',
//                 State: 'Running',
//                 instanceType: 't2.micro',
//                 vCPU: '2',
//                 RAM: '4',
//                 Storage: '8 Gib',
//                 OS: 'Ubuntu',
//                 'Region & AZ': 'ap-northeast-1b',
//                 'Public IPv4': '54.169.51.72',
//                 'Launch Time': '08/01 17:21'
//             }
//         ]
//     },
//     {
//         config: {
//             isShowTitle: true,
//             isShowTableHeader: true,
//             title: 'Serve List',
//             isFull: true,
//             tabelRowTitleClassNames: classnames('bg-gray-300'),
//             tabbelColumnTitleClassNames: classnames('text-blue-500', 'underline')
//         },
//         tableTitle: ['Instance ID', 'Name(Tag)', 'State', 'instance type', 'vCPU', 'RAM', 'Storage(EBS)', 'OS', 'Region & AZ', 'Public IPv4', 'Launch Time'],
//         data: [
//             {
//                 InstanceID: 'i-0f5asf056asfasf0',
//                 name: 'ec2-ins-xx1',
//                 State: 'Running',
//                 instanceType: 't2.micro',
//                 vCPU: '2',
//                 RAM: '4',
//                 Storage: '8 Gib',
//                 OS: 'Ubuntu',
//                 'Region & AZ': 'ap-northeast-1b',
//                 'Public IPv4': '54.169.51.72',
//                 'Launch Time': '08/01 17:21'
//             },
//             {
//                 InstanceID: 'i-0f5asf056asfasf0',
//                 name: 'ec2-ins-xx1',
//                 State: 'Running',
//                 instanceType: 't2.micro',
//                 vCPU: '2',
//                 RAM: '4',
//                 Storage: '8 Gib',
//                 OS: 'Ubuntu',
//                 'Region & AZ': 'ap-northeast-1b',
//                 'Public IPv4': '54.169.51.72',
//                 'Launch Time': '08/01 17:21'
//             },
//             {
//                 InstanceID: 'i-0f5asf056asfasf0',
//                 name: 'ec2-ins-xx1',
//                 State: 'Running',
//                 instanceType: 't2.micro',
//                 vCPU: '2',
//                 RAM: '4',
//                 Storage: '8 Gib',
//                 OS: 'Ubuntu',
//                 'Region & AZ': 'ap-northeast-1b',
//                 'Public IPv4': '54.169.51.72',
//                 'Launch Time': '08/01 17:21'
//             },
//             {
//                 InstanceID: 'i-0f5asf056asfasf0',
//                 name: 'ec2-ins-xx1',
//                 State: 'Running',
//                 instanceType: 't2.micro',
//                 vCPU: '2',
//                 RAM: '4',
//                 Storage: '8 Gib',
//                 OS: 'Ubuntu',
//                 'Region & AZ': 'ap-northeast-1b',
//                 'Public IPv4': '54.169.51.72',
//                 'Launch Time': '08/01 17:21'
//             },
//             {
//                 InstanceID: 'i-0f5asf056asfasf0',
//                 name: 'ec2-ins-xx1',
//                 State: 'Running',
//                 instanceType: 't2.micro',
//                 vCPU: '2',
//                 RAM: '4',
//                 Storage: '8 Gib',
//                 OS: 'Ubuntu',
//                 'Region & AZ': 'ap-northeast-1b',
//                 'Public IPv4': '54.169.51.72',
//                 'Launch Time': '08/01 17:21'
//             }
//         ]
//     },
//     {
//         config: {
//             isShowTitle: true,
//             isShowTableHeader: true,
//             title: 'Serve List',
//             isFull: true,
//             tabelRowTitleClassNames: classnames('bg-gray-300'),
//             tabbelColumnTitleClassNames: classnames('text-blue-500', 'underline')
//         },
//         tableTitle: ['Instance ID', 'Name(Tag)', 'State', 'instance type', 'vCPU', 'RAM', 'Storage(EBS)', 'OS', 'Region & AZ', 'Public IPv4', 'Launch Time'],
//         data: [
//             {
//                 InstanceID: 'i-0f5asf056asfasf0',
//                 name: 'ec2-ins-xx1',
//                 State: 'Running',
//                 instanceType: 't2.micro',
//                 vCPU: '2',
//                 RAM: '4',
//                 Storage: '8 Gib',
//                 OS: 'Ubuntu',
//                 'Region & AZ': 'ap-northeast-1b',
//                 'Public IPv4': '54.169.51.72',
//                 'Launch Time': '08/01 17:21'
//             },
//             {
//                 InstanceID: 'i-0f5asf056asfasf0',
//                 name: 'ec2-ins-xx1',
//                 State: 'Running',
//                 instanceType: 't2.micro',
//                 vCPU: '2',
//                 RAM: '4',
//                 Storage: '8 Gib',
//                 OS: 'Ubuntu',
//                 'Region & AZ': 'ap-northeast-1b',
//                 'Public IPv4': '54.169.51.72',
//                 'Launch Time': '08/01 17:21'
//             },
//             {
//                 InstanceID: 'i-0f5asf056asfasf0',
//                 name: 'ec2-ins-xx1',
//                 State: 'Running',
//                 instanceType: 't2.micro',
//                 vCPU: '2',
//                 RAM: '4',
//                 Storage: '8 Gib',
//                 OS: 'Ubuntu',
//                 'Region & AZ': 'ap-northeast-1b',
//                 'Public IPv4': '54.169.51.72',
//                 'Launch Time': '08/01 17:21'
//             },
//             {
//                 InstanceID: 'i-0f5asf056asfasf0',
//                 name: 'ec2-ins-xx1',
//                 State: 'Running',
//                 instanceType: 't2.micro',
//                 vCPU: '2',
//                 RAM: '4',
//                 Storage: '8 Gib',
//                 OS: 'Ubuntu',
//                 'Region & AZ': 'ap-northeast-1b',
//                 'Public IPv4': '54.169.51.72',
//                 'Launch Time': '08/01 17:21'
//             },
//             {
//                 InstanceID: 'i-0f5asf056asfasf0',
//                 name: 'ec2-ins-xx1',
//                 State: 'Running',
//                 instanceType: 't2.micro',
//                 vCPU: '2',
//                 RAM: '4',
//                 Storage: '8 Gib',
//                 OS: 'Ubuntu',
//                 'Region & AZ': 'ap-northeast-1b',
//                 'Public IPv4': '54.169.51.72',
//                 'Launch Time': '08/01 17:21'
//             }
//         ]
//     }
// ];

interface TableType {
    [key: string]: {
        cardTitle?: string,
        config: TableConfig
        data: TableProp
    }
}

interface GraphicalType {
    [key: string]: {
        cardTitle: string,
        content: GraphicalData
    }
}

const tableList: TableType = {
    dataCenter: {
        cardTitle: 'DataCenter Summary',
        config: {
            showHeader: false,
            pagination: false,
        },
        data: {
            columns: [
                {
                    title: '',
                    dataIndex: 'name',
                    key: 'name',
                }, {
                    title: '',
                    dataIndex: 'country',
                    key: 'country',
                    render: country => {
                        return <div>
                            <span className={classnames('inline-block', 'pr-1', 'h-4')}>
                                <Icon className={'ml-5'} icon={`twemoji:flag-for-flag-${country['icon']}`}
                                    color='#5c6f9a'
                                    width='25' height='25'
                                    fr={undefined}/>
                            </span>
                            <span>{country.text}</span>
                        </div>;
                    }
                }, {
                    title: '',
                    dataIndex: 'light',
                    key: 'light',
                }, {
                    title: '',
                    dataIndex: 'subnet',
                    key: 'subnet',
                },
            ],
            dataSource: [
                {
                    name: 'us-east-1a',
                    country: {
                        icon: 'china',
                        text: 'US East(N.Virginia)'
                    },
                    light: true,
                    subnet: '2 Subnet'
                },
                {
                    name: 'us-east-1a',
                    country: {
                        icon: 'united-states',
                        text: 'US East(N.Virginia)'
                    },
                    light: true,
                    subnet: '2 Subnet'
                },
                {
                    name: 'us-east-1a',
                    country: {
                        icon: 'sweden',
                        text: 'US East(N.Virginia)'
                    },
                    light: false,
                    subnet: '2 Subnet'
                },
                {
                    name: 'us-east-1a',
                    country: {
                        icon: 'bahrain',
                        text: 'US East(N.Virginia)'
                    },
                    light: false,
                    subnet: '2 Subnet'
                },
                {
                    name: 'us-east-1a',
                    country: {
                        icon: 'brazil',
                        text: 'US East(N.Virginia)'
                    },
                    light: false,
                    subnet: '2 Subnet'
                },
                {
                    name: 'us-east-1a',
                    country: {
                        icon: 'japan',
                        text: 'US East(N.Virginia)'
                    },
                    light: false,
                    subnet: '2 Subnet'
                },
                {
                    name: 'us-east-1a',
                    country: {
                        icon: 'canada',
                        text: 'US East(N.Virginia)'
                    },
                    light: false,
                    subnet: '2 Subnet'
                },
                {
                    name: 'us-east-1a',
                    country: {
                        icon: 'united-kingdom',
                        text: 'US East(N.Virginia)'
                    },
                    light: false,
                    subnet: '2 Subnet'
                }
            ]
        }
    },
    // server: {
    //     cardTitle: 'Server List',
    // },
    // Database: {},
    // storageList: {}
};


const graphicalData: GraphicalType = {
    'Server': {
        cardTitle: 'Sever Summary',
        content: {
            leftData: {
                value: '1111',
                unit: 'VM(S)'
            },
            rightData: [
                {
                    icon: {
                        name: 'akar-icons:circle-fill',
                        color: '#92d050'
                    },
                    label: 'Running',
                    value: 15
                },
                {
                    icon: {
                        name: 'akar-icons:circle-fill',
                        color: '#afabab'
                    },
                    label: 'Stop',
                    value: 15
                },
            ]
        }
    }
};

export const Dashboard = (props): JSX.Element => {
    const tableView = (type) => {
        return <AntdTable key="dataCenter"
                          config={tableList[type]['config']}
                          data={tableList[type]['data']}/>;
    };

    const healthyView = () => {
        return <div className={classnames('grid', 'grid-cols-2', 'h-full')}>
            <div className={classnames('text-base')}>
                <div className={classnames('text-lg')}>Alarms:</div>
                <div className="Alarms">
                    <div>In alarm(0)</div>
                    <div>Insufficient data(0)</div>
                    <div>OK(0)</div>
                </div>
            </div>
            <div className={classnames('text-base')}>
                <div className={classnames('text-lg')}>CloudWatch Dashboards(Favorite):</div>
                <ul className="CloudWatch">
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                </ul>
            </div>
        </div>;
    };

    return (
        <div className={classnames('min-h-screen', 'p-3', 'space-y-4')}>
            <div className={classnames('grid', 'grid-cols-2', 'gap-4')}>
                <DashCard cardTitle={tableList['dataCenter']['cardTitle']} content={tableView('dataCenter')}/>
                <DashCard cardTitle={'healthy Summary'} content={healthyView()}/>
            </div>
            <div className={classnames('grid', 'grid-cols-3', 'gap-4')}>
                <DashCard type='Graphical' cardTitle={graphicalData['Server']['cardTitle']} content={graphicalData['Server']['content']}/>
                <DashCard type='Graphical' cardTitle={graphicalData['Server']['cardTitle']} content={graphicalData['Server']['content']}/>
                <DashCard type='Graphical' cardTitle={graphicalData['Server']['cardTitle']} content={graphicalData['Server']['content']}/>
            </div>
        </div>
    );

};

export default Dashboard;
