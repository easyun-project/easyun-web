// react related
import React, { useEffect, useState } from 'react';
// redux related
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
// UI contents
import { classnames, TTailwindString } from '@@/tailwindcss-classnames';
import { Row, Col, Typography, Table, Badge, Timeline, Card, Statistic, Spin, Divider } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
// services and interface/schema
import { CostSummary, CostUsageItem, PeriodTotalCost, PeriodMonthlyCost } from '@/constant/resource';


const { Title, Paragraph, Text } = Typography;
const { Column, ColumnGroup } = Table;


export interface CostCardProps {
    text?: string
    isRise?: boolean | undefined
    unit: string
    value: string
}

const TotalCostCard = (props:CostCardProps): JSX.Element => {
    const { value, unit, text, isRise } = props;
    const amount:number = +value;
    let trendIcon, valueColor;
    if(typeof isRise === 'undefined'){
        trendIcon = null;
        valueColor = null;
    } else {
        trendIcon = isRise ? <ArrowUpOutlined /> : <ArrowDownOutlined />;
        valueColor = isRise ? { color: '#cf1322' } : { color: '#3f8600' };
    }
    return(
        <Card className='mb-0 min-w-fit border-1 w2'>
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


function LatestWeekDailyCost(props:any) {
    const { costList } = props;
    return (
        <Timeline  mode='left' className='mt-8' >{
            // 通过.slice() 深拷贝 避免 .reverse() 对原数组影响
            costList.slice().reverse().map((item, index)=>
                <Timeline.Item key={index} label={item.timePeriod.Start}>
                    {<Text italic type="secondary">{item.totalCost.unit}</Text>} <Text>{item.totalCost.value}</Text>
                </Timeline.Item>
            )
        }</Timeline>
    );
}

function RescSummaryCard(props:any){
    const { title, value } = props;
    return (
        <Col className="gutter-row" span={3}>
            <Card hoverable >
                <Statistic title={title} value={value} />
            </Card>
        </Col>
    );
}

export const ResourceOverview = (): JSX.Element => {
    const resourceState = useSelector((state: RootState) => state.resource);
    const costSummary = resourceState.costSummary;
    const rescSummary = resourceState.resourceSummary;
    const rescLoading = resourceState.loading;

    const costDate = costSummary?.currMonthCost.timePeriod.Start;
    const costTotal = costSummary?.currMonthCost.totalCost.value;
    const costUnit = costSummary?.currMonthCost.totalCost.unit;
    const groupList = costSummary?.currMonthCost.groupCost;

    let forecastTotalCost = { 'unit': 'N/A', 'value' : '0.00' };
    if(typeof costSummary?.forecastTotal !== 'undefined'){ forecastTotalCost = costSummary?.forecastTotal.totalCost; }
    const currMonthTotalCost = costSummary!.currMonthTotal.totalCost;
    const lastMonthTotalCost = costSummary!.lastMonthTotal.totalCost;

    const costColumns = [
        {
            title: 'Service',
            dataIndex: 'service',
            key: 'service',
            width: '40%'
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            width: '25%'
        },
        {
            title: 'Unit',
            dataIndex: 'unit',
            key: 'unit',
            width: '10%'
        },
        {
            title: 'Cost',
            dataIndex: 'cost',
            key: 'cost',
            render: (text:string):React.ReactNode => <span>{costUnit} {text}</span>,
            width: '25%'
        }
    ];

    const costData = groupList?.map((item, index) => ({
        'key' : index,
        'service': item.service,
        'quantity': item.usage.value,
        'unit': item.usage.unit,
        'cost': item.cost.value
    })
    );


    return (
        <div className={classnames('ml-3', 'mt-5')}>
            <div>
                <Row gutter= {[16,24]} className='py-2'>
                    <Col className='gutter-row' span={4}>
                        <Title level={4}>Cost Summary</Title>
                        <Spin spinning={rescLoading} tip="Loading...">
                            <TotalCostCard value={currMonthTotalCost.value} unit={currMonthTotalCost.unit} text='Current Month Cost'/>
                            <TotalCostCard value={forecastTotalCost.value} unit={forecastTotalCost.unit} text='Forcasted Month Cost' isRise={(forecastTotalCost.value >= lastMonthTotalCost.value) ? true : false}/>
                            <TotalCostCard value={lastMonthTotalCost.value} unit={lastMonthTotalCost.unit} text='Last Month Cost' />
                            {/* <CostSummaryBadge
                            curr={costSummary!.currMonthTotal.totalCost}
                            forcast={forecastTotalCost}
                            last={costSummary!.lastMonthTotal.totalCost}
                        /> */}
                        </Spin>
                    </Col>

                    {/* <Col className="gutter-row" span={1}></Col> */}

                    <Col className='gutter-row' span={4}>
                        <Title className="ml-12" level={4}>Latest week daily cost: </Title>
                        <Spin spinning={rescLoading} tip="Loading...">
                            <LatestWeekDailyCost costList = {costSummary?.latestWeekCost}/>
                        </Spin>
                    </Col>

                    <Col className='gutter-row' span={1}></Col>

                    <Col className='gutter-row' span={14}>
                        <Title level={4}>{costDate?.substr(0,7)} Month cost and usage by service:</Title>
                        <Table
                            loading={rescLoading} size="middle" pagination={{ pageSize: 10 }}
                            scroll={{ y: 280, scrollToFirstRowOnChange:true }}
                            columns={costColumns} dataSource={costData} />
                    </Col>
                </Row>
            </div>

            <div id='vpcSummary'>
                <Title level={4}>Resource Summary</Title>
                <Paragraph >You are using the following cloud resource in this Datacenter:</Paragraph>
                <Row gutter= {[16,24]} className='py-2'>
                    <RescSummaryCard title='Server (EC2)' value={rescSummary?.serverNum} />
                    <RescSummaryCard title='Database (RDS)' value={rescSummary?.rdsNum} />
                    <RescSummaryCard title='Load Balancer (ELB)' value={rescSummary?.elbNum} />
                    <RescSummaryCard title='Target Group' value={rescSummary?.elbtgNum} />
                </Row>
                <Row gutter= {[16,24]} className='py-2'>
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
