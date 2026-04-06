// react related
import React from 'react';
// redux related
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
// UI contents
import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';
// services and interface/schema
import { AzSummary } from '@/constant/dataCenter';
// view and components
import FlagUtil from '@/utils/flagUtil';
import TimeUtil from '@/utils/time';



function AzSummaryCard(props: AzSummary) {
    const { azName, subnetNum } = props;
    const color = subnetNum > 0 ? '#FFBF00' : '#d9d9d9';
    return (
        <div className="w-4/24">
            <span>
                <div className={"rounded-md border-2 border-gray-400"} style={{ minWidth: 120 }}>{azName}</div>
            </span>
        </div>
    );
}


function VpcSummaryCard(props: any) {
    const { title, value } = props;

    return (
        <div className="w-3/24">
            <div style={{ height: 120 }}>
                
            </div>
        </div>
    );
}


export default function DataCenterOverview(): JSX.Element {
    const { t } = useTranslation();
    const dcState = useSelector((state: RootState) => state.dataCenter);
    const dcLoading = dcState.loading;
    const dcBasic = dcState.current;
    const dcSummary = dcState.summary.datacenter;

    if (!dcBasic) {
        return <div className="flex w-full items-center justify-center h-96"></div>;
    }
    const flagUtil = new FlagUtil();
    return (
        <div className={"ml-3 mt-5"}>
            <div id="dcBasic">
                <div className="flex gap-4">
                    <div className="w-2/24">
                        <Icon icon="ic:round-cloud-circle" color="#e9862e" width={100} fr={undefined} />
                    </div>
                    <div className="flex-1">
                        <div className="flex gap-4">
                            <div className="w-4/24">
                                <h3> {dcBasic!.dcName} </h3>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="w-8/24">
                                <div style={{ whiteSpace: 'nowrap' }}>
                                    <span>{t('datacenter.overview.dcInfo.vpcid')}</span> <span>{dcBasic?.vpcID}</span>
                                </div>
                                <div style={{ whiteSpace: 'nowrap' }}>
                                    <span>{t('datacenter.overview.dcInfo.cidrv4')}</span> <span>{dcBasic?.cidrBlock}</span>
                                </div>
                            </div>
                            <div className="w-8/24">
                            </div>
                            <div className="w-8/24">
                                <div className={"my-2"}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <span>{t('datacenter.overview.dcInfo.region')}</span>
                                        <span>{flagUtil.getRegionName(dcBasic!.regionCode)}</span>
                                        <Icon icon={flagUtil.getFlagIconByRegion(dcBasic!.regionCode)}
                                            color="#5c6f9a"
                                            width="25" height="25"
                                            fr={undefined} />
                                    </div>
                                    <div>
                                        <span>{t('datacenter.overview.dcInfo.createDate')}</span> <span>{TimeUtil.utcConvertTimeZone({ date: dcBasic?.createDate })}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <hr className="my-4 border-gray-200" />

            <div id='azSummary'>
                <h4>{t('datacenter.overview.dcDist.title')}</h4>
                
                    <div className="flex flex-wrap">
                        {/* <div className="flex gap-2 items-center"> */}
                        {dcSummary?.azSummary?.map((item, index) => <AzSummaryCard key={index} azName={item.azName || ''} subnetNum={item.subnetNum || 0} />)}
                        {/* </div> */}
                    </div>
                
            </div>

            <div id='vpcSummary'>
                <p className='pt-4'>{t('datacenter.overview.dcDist.para')}</p>
                <div className="flex flex-wrap">
                    <VpcSummaryCard title='Public Subnets' value={dcSummary?.vpcSummary?.pubNum} />
                    <VpcSummaryCard title='Internet Gateways' value={dcSummary?.vpcSummary?.igwNum} />
                    <VpcSummaryCard title='Security Groups' value={dcSummary?.vpcSummary?.sgNum} />
                    <VpcSummaryCard title='Route Tables' value={dcSummary?.vpcSummary?.rtbNum} />
                </div>
                <div className="flex flex-wrap">
                    <VpcSummaryCard title='Private Subnets' value={dcSummary?.vpcSummary?.priNum} />
                    <VpcSummaryCard title='NAT Gateways' value={dcSummary?.vpcSummary?.natNum} />
                    <VpcSummaryCard title='Network ACLs' value={dcSummary?.vpcSummary?.aclNum} />
                    <VpcSummaryCard title='Static IP(EIP)' value={dcSummary?.vpcSummary?.eipNum} />
                </div>
            </div>
        </div>
    );
};
