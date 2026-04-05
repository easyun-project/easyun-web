// react related
import React from 'react';
// redux related
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
// UI contents
import { useTranslation } from 'react-i18next';
import { Row, Col, Typography, Divider, Badge, Card, Statistic, Spin } from 'antd';
import { Icon } from '@iconify/react';
// services and interface/schema
import { AzSummary } from '@/constant/dataCenter';
// view and components
import FlagUtil from '@/utils/flagUtil';
import TimeUtil from '@/utils/time';

const { Title, Paragraph, Text } = Typography;


function AzSummaryCard(props: AzSummary) {
    const { azName, subnetNum } = props;
    const color = subnetNum > 0 ? '#FFBF00' : '#d9d9d9';
    return (
        <Col span={4}>
            <Badge size="small" count={subnetNum} showZero offset={[ -15, 15 ]} color={color}>
                <Card className={"rounded-md border-2 border-gray-400"} style={{ minWidth: 120 }}>{azName}</Card>
            </Badge>
        </Col>
    );
}


function VpcSummaryCard(props: any) {
    const { title, value } = props;

    return (
        <Col span={3}>
            <Card hoverable style={{ height: 120 }}>
                <Statistic title={title} value={value} />
            </Card>
        </Col>
    );
}


export default function DataCenterOverview(): JSX.Element {
    const { t } = useTranslation();
    const dcState = useSelector((state: RootState) => state.dataCenter);
    const dcLoading = dcState.loading;
    const dcBasic = dcState.current;
    const dcSummary = dcState.summary.datacenter;

    if (!dcBasic) {
        return <Spin spinning tip="Loading..." className="mt-20 flex justify-center" />;
    }
    const flagUtil = new FlagUtil();
    return (
        <div className={"ml-3 mt-5"}>
            <div id="dcBasic">
                <Row gutter={16}>
                    <Col span={2}>
                        <Icon icon="ic:round-cloud-circle" color="#e9862e" width={100} fr={undefined} />
                    </Col>
                    <Col span={22}>
                        <Row gutter={16}>
                            <Col span={4}>
                                <Title level={3}> {dcBasic!.dcName} </Title>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={8}>
                                <div style={{ whiteSpace: 'nowrap' }}>
                                    <Text strong>{t('datacenter.overview.dcInfo.vpcid')}</Text> <Text copyable>{dcBasic?.vpcID}</Text>
                                </div>
                                <div style={{ whiteSpace: 'nowrap' }}>
                                    <Text strong>{t('datacenter.overview.dcInfo.cidrv4')}</Text> <Text copyable>{dcBasic?.cidrBlock}</Text>
                                </div>
                            </Col>
                            <Col span={8}>
                            </Col>
                            <Col span={8}>
                                <div className={"my-2"}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <Text strong>{t('datacenter.overview.dcInfo.region')}</Text>
                                        <Text>{flagUtil.getRegionName(dcBasic!.regionCode)}</Text>
                                        <Icon icon={flagUtil.getFlagIconByRegion(dcBasic!.regionCode)}
                                            color="#5c6f9a"
                                            width="25" height="25"
                                            fr={undefined} />
                                    </div>
                                    <div>
                                        <Text strong>{t('datacenter.overview.dcInfo.createDate')}</Text> <Text>{TimeUtil.utcConvertTimeZone({ date: dcBasic?.createDate })}</Text>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>

            <Divider />

            <div id='azSummary'>
                <Title level={4}>{t('datacenter.overview.dcDist.title')}</Title>
                <Spin spinning={dcLoading} tip="Loading...">
                    <Row gutter={[ 16, 24 ]} className='py-2'>
                        {/* <Space size='middle'> */}
                        {dcSummary?.azSummary?.map((item, index) => <AzSummaryCard key={index} azName={item.azName || ''} subnetNum={item.subnetNum || 0} />)}
                        {/* </Space> */}
                    </Row>
                </Spin>
            </div>

            <div id='vpcSummary'>
                <Paragraph className='pt-4'>{t('datacenter.overview.dcDist.para')}</Paragraph>
                <Row gutter={[ 16, 24 ]} className='py-2'>
                    <VpcSummaryCard title='Public Subnets' value={dcSummary?.vpcSummary?.pubNum} />
                    <VpcSummaryCard title='Internet Gateways' value={dcSummary?.vpcSummary?.igwNum} />
                    <VpcSummaryCard title='Security Groups' value={dcSummary?.vpcSummary?.sgNum} />
                    <VpcSummaryCard title='Route Tables' value={dcSummary?.vpcSummary?.rtbNum} />
                </Row>
                <Row gutter={[ 16, 24 ]} className='py-2'>
                    <VpcSummaryCard title='Private Subnets' value={dcSummary?.vpcSummary?.priNum} />
                    <VpcSummaryCard title='NAT Gateways' value={dcSummary?.vpcSummary?.natNum} />
                    <VpcSummaryCard title='Network ACLs' value={dcSummary?.vpcSummary?.aclNum} />
                    <VpcSummaryCard title='Static IP(EIP)' value={dcSummary?.vpcSummary?.eipNum} />
                </Row>
            </div>
        </div>
    );
};
