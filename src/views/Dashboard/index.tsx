import React from 'react';
import { CTable } from '@/components/Common/CTable';
import { classnames, TTailwindString } from '@@/tailwindcss-classnames';
import { Icon } from '@iconify/react';
import { CCard } from '@/components/Common/CCard';
import { DashCard } from '@/components/Pages/dashbords/DashCard';
import { CHeader } from '@/components/Logic/CHeader';
import { CFooter } from '@/components/Logic/CFooter';

const mock1 = {
	config: {
		isShowTitle: true,
		isShowTableHeader: false,
		title: 'DataCenter Summary'
	},
	tableTitle: ['name', 'country', 'light', 'Subnet'],
	data: [
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
};
const mock2 = [
	{
		title: 'Server Summary',
		leftData: {
			quantity: '25',
			name: 'VM',
			description: '(s)'
		},
		rightData: [
			{
				icon: {
					name: 'akar-icons:circle-fill',
					color: '#92d050'
				},
				label: 'Running:',
				value: '15'
			},
			{
				icon: {
					name: 'akar-icons:circle-fill',
					color: '#afabab'
				},
				label: 'Stop:',
				value: '4'
			},
			{
				icon: false,
				label: 'cCPU:',
				value: '76'
			},
			{
				icon: false,
				label: 'RAM:',
				value: '119'
			}
		]
	},
	{
		title: 'Database Summary',
		leftData: {
			quantity: '7',
			name: 'instance',
			description: '(s)'
		},
		rightData: [
			{
				label: 'RDS MySQL:',
				value: '3'
			},
			{
				label: 'RDS MariaDB:',
				value: '2'
			},
			{
				label: 'RDS POSTgreSQL:',
				value: '1'
			},
			{
				label: 'Aurora Provisioned:',
				value: '0'
			},
			{
				label: 'ElastiCache:',
				value: '1'
			}
		]
	},
	{
		title: 'Server Summary',
		leftData: {
			quantity: '25',
			name: 'VM',
			description: '(s)'
		},
		rightData: [
			{
				icon: {
					name: 'akar-icons:circle-fill',
					color: '#92d050'
				},
				label: 'Running:',
				value: '15'
			},
			{
				icon: {
					name: 'akar-icons:circle-fill',
					color: ''
				},
				label: 'Stop:',
				value: '4'
			},
			{
				icon: false,
				label: 'cCPU:',
				value: '76'
			},
			{
				icon: false,
				label: 'RAM:',
				value: '119'
			}
		]
	},
	{
		title: 'Database Summary',
		leftData: {
			quantity: '7',
			name: 'instance',
			description: '(s)'
		},
		rightData: [
			{
				label: 'RDS MySQL:',
				value: '3'
			},
			{
				label: 'RDS MariaDB:',
				value: '2'
			},
			{
				label: 'RDS POSTgreSQL:',
				value: '1'
			},
			{
				label: 'Aurora Provisioned:',
				value: '0'
			},
			{
				label: 'ElastiCache:',
				value: '1'
			}
		]
	},
	{
		title: 'Server Summary',
		leftData: {
			quantity: '25',
			name: 'VM',
			description: '(s)'
		},
		rightData: [
			{
				icon: {
					name: 'akar-icons:circle-fill',
					color: '#92d050'
				},
				label: 'Running:',
				value: '15'
			},
			{
				icon: {
					name: 'akar-icons:circle-fill',
					color: ''
				},
				label: 'Stop:',
				value: '4'
			},
			{
				icon: false,
				label: 'cCPU:',
				value: '76'
			},
			{
				icon: false,
				label: 'RAM:',
				value: '119'
			}
		]
	},
	{
		title: 'Database Summary',
		leftData: {
			quantity: '7',
			name: 'instance',
			description: '(s)'
		},
		rightData: [
			{
				label: 'RDS MySQL:',
				value: '3'
			},
			{
				label: 'RDS MariaDB:',
				value: '2'
			},
			{
				label: 'RDS POSTgreSQL:',
				value: '1'
			},
			{
				label: 'Aurora Provisioned:',
				value: '0'
			},
			{
				label: 'ElastiCache:',
				value: '1'
			}
		]
	}
];
const mock3 = {
	title: 'helthy Summary',
	leftData: {
		title: 'Alarms:',
		listData: [
			{ icon: 'emojione:white-heavy-check-mark', label: 'In alarm', value: 0 },
			{ icon: 'emojione:white-heavy-check-mark', label: 'Insufficient data', value: 0 },
			{ icon: 'emojione:white-heavy-check-mark', label: 'OK', value: 0 }
		]
	},
	rightData: {
		title: 'CloudWatch Dashbords(Favorite):',
		listData: [
			{
				icon: 'bx:bx-link-external',
				label: '',
				value: 'Easyun Overview'
			},
			{
				icon: 'bx:bx-link-external',
				label: '',
				value: 'Easyun Overview'
			},
			{
				icon: 'bx:bx-link-external',
				label: '',
				value: 'Easyun Overview'
			},
			{
				icon: 'bx:bx-link-external',
				label: '',
				value: 'Easyun Overview'
			}
		]
	}
};
const mock5 = [
	{
		config: {
			isShowTitle: true,
			isShowTableHeader: true,
			title: 'Serve List',
			isFull: true,
			tabelRowTitleClassNames: classnames('bg-gray-300'),
			tabbelColumnTitleClassNames: classnames('text-blue-500', 'underline')
		},
		tableTitle: ['Instance ID', 'Name(Tag)', 'State', 'instance type', 'vCPU', 'RAM', 'Storage(EBS)', 'OS', 'Region & AZ', 'Public IPv4', 'Launch Time'],
		data: [
			{
				InstanceID: 'i-0f5asf056asfasf0',
				name: 'ec2-ins-xx1',
				State: 'Running',
				instanceType: 't2.micro',
				vCPU: '2',
				RAM: '4',
				Storage: '8 Gib',
				OS: 'Ubuntu',
				'Region & AZ': 'ap-northeast-1b',
				'Public IPv4': '54.169.51.72',
				'Launch Time': '08/01 17:21'
			},
			{
				InstanceID: 'i-0f5asf056asfasf0',
				name: 'ec2-ins-xx1',
				State: 'Running',
				instanceType: 't2.micro',
				vCPU: '2',
				RAM: '4',
				Storage: '8 Gib',
				OS: 'Ubuntu',
				'Region & AZ': 'ap-northeast-1b',
				'Public IPv4': '54.169.51.72',
				'Launch Time': '08/01 17:21'
			},
			{
				InstanceID: 'i-0f5asf056asfasf0',
				name: 'ec2-ins-xx1',
				State: 'Running',
				instanceType: 't2.micro',
				vCPU: '2',
				RAM: '4',
				Storage: '8 Gib',
				OS: 'Ubuntu',
				'Region & AZ': 'ap-northeast-1b',
				'Public IPv4': '54.169.51.72',
				'Launch Time': '08/01 17:21'
			},
			{
				InstanceID: 'i-0f5asf056asfasf0',
				name: 'ec2-ins-xx1',
				State: 'Running',
				instanceType: 't2.micro',
				vCPU: '2',
				RAM: '4',
				Storage: '8 Gib',
				OS: 'Ubuntu',
				'Region & AZ': 'ap-northeast-1b',
				'Public IPv4': '54.169.51.72',
				'Launch Time': '08/01 17:21'
			},
			{
				InstanceID: 'i-0f5asf056asfasf0',
				name: 'ec2-ins-xx1',
				State: 'Running',
				instanceType: 't2.micro',
				vCPU: '2',
				RAM: '4',
				Storage: '8 Gib',
				OS: 'Ubuntu',
				'Region & AZ': 'ap-northeast-1b',
				'Public IPv4': '54.169.51.72',
				'Launch Time': '08/01 17:21'
			}
		]
	},
	{
		config: {
			isShowTitle: true,
			isShowTableHeader: true,
			title: 'Serve List',
			isFull: true,
			tabelRowTitleClassNames: classnames('bg-gray-300'),
			tabbelColumnTitleClassNames: classnames('text-blue-500', 'underline')
		},
		tableTitle: ['Instance ID', 'Name(Tag)', 'State', 'instance type', 'vCPU', 'RAM', 'Storage(EBS)', 'OS', 'Region & AZ', 'Public IPv4', 'Launch Time'],
		data: [
			{
				InstanceID: 'i-0f5asf056asfasf0',
				name: 'ec2-ins-xx1',
				State: 'Running',
				instanceType: 't2.micro',
				vCPU: '2',
				RAM: '4',
				Storage: '8 Gib',
				OS: 'Ubuntu',
				'Region & AZ': 'ap-northeast-1b',
				'Public IPv4': '54.169.51.72',
				'Launch Time': '08/01 17:21'
			},
			{
				InstanceID: 'i-0f5asf056asfasf0',
				name: 'ec2-ins-xx1',
				State: 'Running',
				instanceType: 't2.micro',
				vCPU: '2',
				RAM: '4',
				Storage: '8 Gib',
				OS: 'Ubuntu',
				'Region & AZ': 'ap-northeast-1b',
				'Public IPv4': '54.169.51.72',
				'Launch Time': '08/01 17:21'
			},
			{
				InstanceID: 'i-0f5asf056asfasf0',
				name: 'ec2-ins-xx1',
				State: 'Running',
				instanceType: 't2.micro',
				vCPU: '2',
				RAM: '4',
				Storage: '8 Gib',
				OS: 'Ubuntu',
				'Region & AZ': 'ap-northeast-1b',
				'Public IPv4': '54.169.51.72',
				'Launch Time': '08/01 17:21'
			},
			{
				InstanceID: 'i-0f5asf056asfasf0',
				name: 'ec2-ins-xx1',
				State: 'Running',
				instanceType: 't2.micro',
				vCPU: '2',
				RAM: '4',
				Storage: '8 Gib',
				OS: 'Ubuntu',
				'Region & AZ': 'ap-northeast-1b',
				'Public IPv4': '54.169.51.72',
				'Launch Time': '08/01 17:21'
			},
			{
				InstanceID: 'i-0f5asf056asfasf0',
				name: 'ec2-ins-xx1',
				State: 'Running',
				instanceType: 't2.micro',
				vCPU: '2',
				RAM: '4',
				Storage: '8 Gib',
				OS: 'Ubuntu',
				'Region & AZ': 'ap-northeast-1b',
				'Public IPv4': '54.169.51.72',
				'Launch Time': '08/01 17:21'
			}
		]
	},
	{
		config: {
			isShowTitle: true,
			isShowTableHeader: true,
			title: 'Serve List',
			isFull: true,
			tabelRowTitleClassNames: classnames('bg-gray-300'),
			tabbelColumnTitleClassNames: classnames('text-blue-500', 'underline')
		},
		tableTitle: ['Instance ID', 'Name(Tag)', 'State', 'instance type', 'vCPU', 'RAM', 'Storage(EBS)', 'OS', 'Region & AZ', 'Public IPv4', 'Launch Time'],
		data: [
			{
				InstanceID: 'i-0f5asf056asfasf0',
				name: 'ec2-ins-xx1',
				State: 'Running',
				instanceType: 't2.micro',
				vCPU: '2',
				RAM: '4',
				Storage: '8 Gib',
				OS: 'Ubuntu',
				'Region & AZ': 'ap-northeast-1b',
				'Public IPv4': '54.169.51.72',
				'Launch Time': '08/01 17:21'
			},
			{
				InstanceID: 'i-0f5asf056asfasf0',
				name: 'ec2-ins-xx1',
				State: 'Running',
				instanceType: 't2.micro',
				vCPU: '2',
				RAM: '4',
				Storage: '8 Gib',
				OS: 'Ubuntu',
				'Region & AZ': 'ap-northeast-1b',
				'Public IPv4': '54.169.51.72',
				'Launch Time': '08/01 17:21'
			},
			{
				InstanceID: 'i-0f5asf056asfasf0',
				name: 'ec2-ins-xx1',
				State: 'Running',
				instanceType: 't2.micro',
				vCPU: '2',
				RAM: '4',
				Storage: '8 Gib',
				OS: 'Ubuntu',
				'Region & AZ': 'ap-northeast-1b',
				'Public IPv4': '54.169.51.72',
				'Launch Time': '08/01 17:21'
			},
			{
				InstanceID: 'i-0f5asf056asfasf0',
				name: 'ec2-ins-xx1',
				State: 'Running',
				instanceType: 't2.micro',
				vCPU: '2',
				RAM: '4',
				Storage: '8 Gib',
				OS: 'Ubuntu',
				'Region & AZ': 'ap-northeast-1b',
				'Public IPv4': '54.169.51.72',
				'Launch Time': '08/01 17:21'
			},
			{
				InstanceID: 'i-0f5asf056asfasf0',
				name: 'ec2-ins-xx1',
				State: 'Running',
				instanceType: 't2.micro',
				vCPU: '2',
				RAM: '4',
				Storage: '8 Gib',
				OS: 'Ubuntu',
				'Region & AZ': 'ap-northeast-1b',
				'Public IPv4': '54.169.51.72',
				'Launch Time': '08/01 17:21'
			}
		]
	}
];

interface propsType {
	config?: string;
}

interface stateType {
	flag: boolean;
}

export class Dashboard extends React.Component<propsType, stateType> {
	constructor(props: propsType) {
		super(props);
		this.state = {
			flag: false
		};
	}

	switchViewHandler = (view = 'Graphical'): any => {
		const bol = view === 'List' ? true : false;
		this.setState({ flag: bol });
	};

	render(): JSX.Element {
		return (
			<div>
				<CHeader />
				<div className={classnames('flex', 'justify-between', 'flex-wrap')}>
					<CTable dataConfig={mock1} />
					<DashCard dataConfig={mock3} />
				</div>
				<div className={this.state.flag ? classnames('flex', 'mx-4', 'items-center', 'justify-between') : classnames('flex', 'mx-4', 'items-center', 'justify-end')}>
					{this.state.flag ? <div className={classnames('font-semibold', 'text-3xl')}>Cloud Resource</div> : null}
					<div className={classnames('border-yellow-500', 'inline-block', 'border', 'p-2')}>
						<span>View: </span>
						<span className={`${classnames('cursor-pointer')} ${this.state.flag ? 'font-normal' : 'font-semibold'}`} onClick={this.switchViewHandler.bind(this, 'Graphical')}>
							Graphical
						</span>
						<span className={classnames('p-2')}>|</span>
						<span className={`${classnames('cursor-pointer')} ${this.state.flag ? 'font-semibold' : 'font-normal'}`} onClick={this.switchViewHandler.bind(this, 'List')}>
							List
						</span>
					</div>
				</div>
				{this.state.flag ? (
					<div>
						{mock5.map((item, index) => (
							<CTable dataConfig={item} key={index} />
						))}
					</div>
				) : (
					<div className={classnames('flex', 'flex-wrap')}>
						{mock2.map((item, index) => (
							<CCard dataConfig={item} key={index} />
						))}
					</div>
				)}

				<CFooter />
			</div>
		);
	}
}

export default Dashboard;
