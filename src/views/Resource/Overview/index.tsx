// react related
import React from 'react';
// redux related
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
// UI contents
import { useTranslation } from 'react-i18next';
import { classnames } from '@@/tailwindcss-classnames';
import { Row, Col, Typography, Table, Timeline, Card, Statistic, Spin } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
// services and interface/schema
// import { CostSummary, CostUsageItem, PeriodTotalCost, PeriodMonthlyCost } from '@/constant/resource';

const { Title, Paragraph, Text } = Typography;


export interface CostCardProps {
    text?: string
    isRise?: boolean | undefined
    unit: string
    value: string
}

const TotalCostCard = (props: CostCardProps): JSX.Element => {
    const { value, unit, text, isRise } = props;
    const amount: number = +value;
    let trendIcon, valueColor;
    if (typeof isRise === 'undefined') {
        trendIcon = null;
        valueColor = null;
    } else {
        trendIcon = isRise ? <ArrowUpOutlined /> : <ArrowDownOutlined />;
        valueColor = isRise ? { color: '#cf1322' } : { color: '#3f8600' };
    }
    return (
        <Card className='mb-2 min-w-fit border-l-4'>
            {/* <Card.Meta title={unit+' '+amount.toFixed(2)} description={text} /> */}
            <Statistic
                title={text}
                value={amount}
                precision={2}
                valueStyle={valueColor}
                prefix={<Text italic className='text-sm'>{unit}</Text>}
                suffix={trendIcon}
            />
        </Card>
    );
};


function LatestWeekDailyCost(props) {
    const { costList } = props;
    return (
        <Timeline mode='left' className='mt-8 min-w-fit' >{
            // 通过.slice() 深拷贝 避免 .reverse() 对原数组影响
            costList.slice().reverse().map((item, index) =>
                <Timeline.Item key={index} label={item.timePeriod.Start}>
                    {<Text italic type="secondary">{item.totalCost.unit}</Text>} <Text>{item.totalCost.value}</Text>
                </Timeline.Item>
            )
        }</Timeline>
    );
}

function RescSummaryCard(props) {
    const { title, value } = props;
    return (
        <Col span={3}>
            <Card hoverable >
                <Statistic title={title} value={value} />
            </Card>
        </Col>
    );
}

export const ResourceOverview = (): JSX.Element => {
    const { t } = useTranslation();
    const dcState = useSelector((state: RootState) => state.dataCenter);
    const dcLoading = dcState.loading;
    const costSummary = dcState.summary.cost;
    const rescSummary = dcState.summary.resource;

    const costDate = costSummary?.currMonthCost.timePeriod.Start;
    // const costTotal = costSummary?.currMonthCost.totalCost.value;
    const costUnit = costSummary?.currMonthCost.totalCost.unit;
    const groupList = costSummary?.currMonthCost.groupCost;

    let forecastTotalCost = { 'unit': 'N/A', 'value': '0.00' };
    if (typeof costSummary?.forecastTotal !== 'undefined') { forecastTotalCost = costSummary?.forecastTotal.totalCost; };
    const currMonthTotalCost = costSummary!.currMonthTotal.totalCost;
    const lastMonthTotalCost = costSummary!.lastMonthTotal.totalCost;

    const costColumns = [
        {
            title: t('resource.overview.costCol.service'),
            dataIndex: 'service',
            key: 'service',
            width: '40%'
        },
        {
            title: t('resource.overview.costCol.quantity'),
            dataIndex: 'quantity',
            key: 'quantity',
            width: '25%'
        },
        {
            title: t('resource.overview.costCol.unit'),
            dataIndex: 'unit',
            key: 'unit',
            width: '10%'
        },
        {
            title: t('resource.overview.costCol.cost'),
            dataIndex: 'cost',
            key: 'cost',
            render: (text: string): React.ReactNode => <span>{costUnit} {text}</span>,
            width: '25%'
        }
    ];

    const costData = groupList?.map((item, index) => ({
        'key': index,
        'service': item.service,
        'quantity': item.usage.value,
        'unit': item.usage.unit,
        'cost': item.cost.value
    }));


    return (
        <div className={classnames('ml-3', 'mt-5')}>
            <div>
                <Row gutter={[16, 24]} className='py-2'>
                    <Col span={4}>
                        <Title level={4}>{t('resource.overview.costSummary.title')}</Title>
                        <Spin spinning={dcLoading} tip="Loading...">
                            {/* <Row gutter={16}> */}
                            <TotalCostCard value={currMonthTotalCost.value} unit={currMonthTotalCost.unit} text={t('resource.overview.totalCost.current')} />
                            <TotalCostCard value={forecastTotalCost.value} unit={forecastTotalCost.unit} text={t('resource.overview.totalCost.forecast')} isRise={(forecastTotalCost.value >= lastMonthTotalCost.value)} />
                            <TotalCostCard value={lastMonthTotalCost.value} unit={lastMonthTotalCost.unit} text={t('resource.overview.totalCost.last')} />
                            {/* </Row> */}
                        </Spin>
                    </Col>

                    <Col span={4}>
                        <Title className="ml-12" level={4}>{t('resource.overview.lastWeek.title')}</Title>
                        <Spin spinning={dcLoading} tip="Loading...">
                            <LatestWeekDailyCost costList={costSummary?.latestWeekCost} />
                        </Spin>
                    </Col>

                    <Col span={1}></Col>

                    <Col span={14}>
                        <Title level={4}>{costDate?.substr(0, 7)}{t('resource.overview.costUsage.title')}</Title>
                        <Table
                            loading={dcLoading} size="middle" pagination={{ pageSize: 10 }}
                            scroll={{ y: 280, scrollToFirstRowOnChange: true }}
                            columns={costColumns} dataSource={costData} />
                    </Col>
                </Row>
            </div>

            <div id='vpcSummary'>
                <Title level={4}>{t('resource.overview.resSummary.title')}</Title>
                <Paragraph >{t('resource.overview.resSummary.para')}</Paragraph>
                <Row gutter={[ 16, 24 ]} className='py-2'>
                    <RescSummaryCard title='Server (EC2)' value={rescSummary?.serverNum} />
                    <RescSummaryCard title='Database (RDS)' value={rescSummary?.rdsNum} />
                    <RescSummaryCard title='Load Balancer (ELB)' value={rescSummary?.elbNum} />
                    <RescSummaryCard title='Target Group' value={rescSummary?.elbtgNum} />
                </Row>
                <Row gutter={[ 16, 24 ]} className='py-2'>
                    <RescSummaryCard title='Volume (EBS)' value={rescSummary?.volumeNum} />
                    <RescSummaryCard title='Bucket (S3) ' value={rescSummary?.bucketNum} />
                    <RescSummaryCard title='Filesystem (EFS) ' value={rescSummary?.efsNum} />
                    <RescSummaryCard title='Volume Backup' value={rescSummary?.volbackupNum} />
                    <RescSummaryCard title='Filesystem Backup' value={rescSummary?.efsbackupNum} />
                    <RescSummaryCard title='Database Backup' value={rescSummary?.rdsbackupNum} />
                </Row>
            </div>
        </div>
    );
};

export default ResourceOverview;
