// react related
import React, { useEffect, useState } from 'react';
// redux related
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
// UI contents
import { classnames, TTailwindString } from '@@/tailwindcss-classnames';
import { Row, Col, Typography, Table, Badge, Card, Statistic, Spin, Divider } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
// services and interface/schema
import { CostSummary, CostUsageItem, PeriodTotalCost, PeriodMonthlyCost } from '@/constant/resource';
// view and components
import FlagUtil from '@/utils/flagUtil';
import TimeUtil from '@/utils/time';

const { Title, Paragraph, Text } = Typography;
const { Column, ColumnGroup } = Table;


export interface CostCardProps {
    text?: string
    isRise?: boolean | undefined
    unit: string
    value: string
}

const TotalCostCard = (props:CostCardProps): JSX.Element => {
    const { value, unit, text, isRise } = props
    const amount:number = +value
    let trendIcon, valueColor
    if(typeof isRise === 'undefined'){
        trendIcon = null
        valueColor = null
    } else {
        trendIcon = isRise ? <ArrowUpOutlined /> : <ArrowDownOutlined />
        valueColor = isRise ? { color: '#cf1322' } : { color: '#3f8600' }
    }
    return(
        <Card className='border-1 w2 min-w-fit'>
            {/* <Card.Meta title={unit+' '+amount.toFixed(2)} description={text} /> */}
            <Statistic 
                title={text}
                value={amount}
                precision={2}
                valueStyle={valueColor}
                prefix={unit}
                suffix={trendIcon}
            />
        </Card>
    )
}


function CostSummaryBadge(props:any){
    const { curr, next, last } = props
    return (
        <>
            <TotalCostCard value={curr.value} unit={curr.unit} text='Current Month Cost'/>
            <TotalCostCard value={next.value} unit={next.unit} text='Forcasted Month Cost' isRise={(next.value >= last.value) ? true : false}/>
            <TotalCostCard value={last.value} unit={last.unit} text='Last Month Cost' />
        </>
    )
}

function RecentCostBadge(props) {
    const { costList } = props
    return (
        // 通过.slice() 深拷贝 避免 .reverse() 对原数组影响
        costList.slice().reverse().map((item, index)=>
            <div key={index}>
            <Text > {item.timePeriod.Start}: </Text> 
            <Text strong>{item.totalCost.unit} {item.totalCost.value} </Text>
            <Divider />
            </div>
        )
    )
}

function CostUsageTable(props:any){
    const { time, total, list } = props
    // const costDate = time.Start
    // const costSum = `${total.unit} ${total.value}`

    const costColumns = [
        {
            title: 'Service',
            dataIndex: 'service',
            key: 'service'
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity'
        },  
        {
            title: 'Unit',
            dataIndex: 'unit',
            key: 'unit'
        },
        {
            title: 'Cost',
            dataIndex: 'cost',
            key: 'cost',
            render: (text:string):React.ReactNode => <span>USD {text}</span>,
        }
    ]

    const costData = [
        {
            key : 0,
            service: 'Amazon Elastic Compute Cloud - Compute',
            quantity: '192.4438207117',
            unit: 'N/A',
            cost: '2.0498391676'
        },
        {
            key : 1,
            service: 'EC2 - Other',
            quantity: '171.2346813346',
            unit: 'N/A',
            cost: '5.1432090358'
        },
        {
            key : 2,
            service: 'Amazon Relational Database Service',
            quantity: '215.833333338',
            unit: 'N/A',
            cost: '0.8953423303'
        },
        {
            key : 3,
            service: 'Amazon Elastic Load Balancing',
            quantity: '49.0094941522',
            unit: 'N/A',
            cost: '1.1025001125'
        },
        {
            key : 4,
            service: 'Amazon Simple Storage Service',
            quantity: '711.7201558573',
            unit: 'N/A',
            cost: '0.0002804787'
        },
        {
            key : 5,
            service: 'AWS Backup',
            quantity: '0.0000000046',
            unit: 'N/A',
            cost: 'USD 0.0000000002'
        },
    ]

    // for(let i=list.length; i>0; i--) {
    //     costData.push({
    //         key : i,
    //         service: list[i].service,
    //         quantity: list[i].usage.value,
    //         unit: list[i].usage.unit,
    //         cost: `${list[i].cost.unit} ${list[i].cost.value}`
    //     })
    // }

    return (
        <Table size="middle" columns={costColumns} dataSource={costData} />
    )
}

function RescSummaryCard(props:any){
    const { title, value } = props;
    return (
        <Col className="gutter-row" span={3}>
            <Card hoverable >
                <Statistic title={title} value={value} />
            </Card>
        </Col>
    )
}

export const ResourceOverview = (): JSX.Element => {
    const resourceState = useSelector((state: RootState) => state.resource);
    const costSummary = resourceState.costSummary
    const rescSummary = resourceState.resourceSummary
    const rescLoading = resourceState.loading

    return (
        <div className={classnames('ml-3', 'mt-5')}>
            <div>                
                <Row gutter= {[16,24]} className='py-2'>
                    <Col className="gutter-row" span={4}>
                    <Title level={4}>Cost Summary</Title>
                    <Spin spinning={rescLoading} tip="Loading...">
                    <CostSummaryBadge 
                        curr={costSummary?.currMonthTotal.totalCost} 
                        next={costSummary?.nextMonthTotal.totalCost} 
                        last={costSummary?.lastMonthTotal.totalCost} 
                    />
                    </Spin>
                    </Col>

                    <Col className="gutter-row" span={4}>
                    <Title level={4}>Last 5 days cost: </Title>
                    <Spin spinning={rescLoading} tip="Loading...">
                    <RecentCostBadge costList={costSummary?.last5daysCost}/>
                    </Spin>
                    </Col>

                    <Col className="gutter-row" span={12}>                    
                    <Title level={4}>Current cost and usage by service</Title>
                    <Spin spinning={rescLoading} tip="Loading...">
                    <CostUsageTable 
                        time = { costSummary?.currMonthCost?.timePeriod }
                        total = { costSummary?.currMonthCost?.totalCost }
                        list = { costSummary?.currMonthCost?.groupCost }                    
                    />
                    </Spin>
                    </Col>                                
                </Row>
            </div>
            <div id='vpcSummary'>
                <Title level={4}>Resource Summary</Title>
                <Paragraph >You are using the following cloud resource in Easyun Datacenter:</Paragraph>
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
