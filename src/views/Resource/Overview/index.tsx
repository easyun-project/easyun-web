import { ArrowUp, ArrowDown } from 'lucide-react';
// react related
import React from 'react';
// redux related
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
// UI contents
import { useTranslation } from 'react-i18next';
import { DataTable, fromLegacyColumns } from '@/components/ui/data-table';
// services and interface/schema
// import { CostSummary, CostUsageItem, PeriodTotalCost, PeriodMonthlyCost } from '@/constant/resource';



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
        trendIcon = isRise ? <ArrowUp /> : <ArrowDown />;
        valueColor = isRise ? { color: '#cf1322' } : { color: '#3f8600' };
    }
    return (
        <div className='mb-2 min-w-fit border-l-4'>
            {/* <div.Meta title={unit+' '+amount.toFixed(2)} description={text} /> */}
            <div>
                <div className="text-xs text-gray-500">{text}</div>
                <div className="text-lg font-semibold" style={valueColor}>
                    <span className="text-sm">{unit}</span> {amount.toFixed(2)} {trendIcon}
                </div>
            </div>
        </div>
    );
};


function LatestWeekDailyCost(props) {
    const { costList } = props;
    return (
        <div>{
            // 通过.slice() 深拷贝 避免 .reverse() 对原数组影响
            costList.slice().reverse().map((item, index) =>
                <div key={index}>
                    {<span>{item.totalCost.unit}</span>} <span>{item.totalCost.value}</span>
                </div>
            )
        }</div>
    );
}

function RescSummaryCard(props) {
    const { title, value } = props;
    return (
        <div className="w-3/24">
            <div >
                
            </div>
        </div>
    );
}

export const ResourceOverview = (): JSX.Element => {
    const { t } = useTranslation();
    const dcState = useSelector((state: RootState) => state.dataCenter);
    const dcLoading = dcState.loading;
    const costSummary = dcState.summary.cost as any;
    const rescSummary = dcState.summary.resource as any;

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
        <div className={"ml-3 mt-5"}>
            <div>
                <div className="flex flex-wrap">
                    <div className="w-4/24">
                        <h4>{t('resource.overview.costSummary.title')}</h4>
                        
                            {/* <div className="flex gap-4"> */}
                            <TotalCostCard value={currMonthTotalCost.value} unit={currMonthTotalCost.unit} text={t('resource.overview.totalCost.current')} />
                            <TotalCostCard value={forecastTotalCost.value} unit={forecastTotalCost.unit} text={t('resource.overview.totalCost.forecast')} isRise={(forecastTotalCost.value >= lastMonthTotalCost.value)} />
                            <TotalCostCard value={lastMonthTotalCost.value} unit={lastMonthTotalCost.unit} text={t('resource.overview.totalCost.last')} />
                            {/* </div> */}
                        
                    </div>

                    <div className="w-4/24">
                        <h4 className="ml-12">{t('resource.overview.lastWeek.title')}</h4>
                        
                            <LatestWeekDailyCost costList={costSummary?.latestWeekCost} />
                        
                    </div>

                    <div className="w-1/24"></div>

                    <div className="flex-1">
                        <h4>{costDate?.substr(0, 7)}{t('resource.overview.costUsage.title')}</h4>
                        <DataTable
                            pageSize={10}
                            columns={fromLegacyColumns(costColumns)} data={costData} />
                    </div>
                </div>
            </div>

            <div id='vpcSummary'>
                <h4>{t('resource.overview.resSummary.title')}</h4>
                <p >{t('resource.overview.resSummary.para')}</p>
                <div className="flex flex-wrap">
                    <RescSummaryCard title='Server (EC2)' value={rescSummary?.serverNum} />
                    <RescSummaryCard title='Database (RDS)' value={rescSummary?.rdsNum} />
                    <RescSummaryCard title='Load Balancer (ELB)' value={rescSummary?.elbNum} />
                    <RescSummaryCard title='Target Group' value={rescSummary?.elbtgNum} />
                </div>
                <div className="flex flex-wrap">
                    <RescSummaryCard title='Volume (EBS)' value={rescSummary?.volumeNum} />
                    <RescSummaryCard title='Bucket (S3) ' value={rescSummary?.bucketNum} />
                    <RescSummaryCard title='Filesystem (EFS) ' value={rescSummary?.efsNum} />
                    <RescSummaryCard title='Volume Backup' value={rescSummary?.volbackupNum} />
                    <RescSummaryCard title='Filesystem Backup' value={rescSummary?.efsbackupNum} />
                    <RescSummaryCard title='Database Backup' value={rescSummary?.rdsbackupNum} />
                </div>
            </div>
        </div>
    );
};

export default ResourceOverview;
