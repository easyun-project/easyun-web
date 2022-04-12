export interface ResourceSummary {
    bucketNum: number,
    efsNum: number,
    efsbackupNum: number,
    elbNum: number,
    elbtgNum: number,
    rdsNum: number,
    rdsbackupNum: number,
    serverNum: number,
    volbackupNum: number,
    volumeNum: number
}

export interface CostUsageItem {
    metric?: string
    unit: string
    value: string
}

export interface TimePeriodItem {
    Start: string
    End: string
}


export interface GroupCostUsage {
    service: string
    cost: CostUsageItem    
    usage: CostUsageItem
}

export interface PeriodMonthlyCost {
    timePeriod: TimePeriodItem
    groupCost: GroupCostUsage[]
    totalCost: CostUsageItem
}

export interface PeriodTotalCost {
    timePeriod: TimePeriodItem
    totalCost: CostUsageItem
}

export interface CostSummary {
    currMonthTotal: PeriodTotalCost
    lastMonthTotal: PeriodTotalCost
    forecastTotal?: PeriodTotalCost
    latestWeekCost: PeriodTotalCost[]
    currMonthCost: PeriodMonthlyCost
}
