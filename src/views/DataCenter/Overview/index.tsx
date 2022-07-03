// react related
import React from 'react';
// redux related
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
// UI contents
import { useTranslation } from 'react-i18next';
import { classnames } from '@@/tailwindcss-classnames';
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
        <Col span={2}>
            <Badge size="small" count={subnetNum} showZero offset={[ -15, 15 ]} color={color}>
                <Card className={classnames('rounded-md', 'border-2', 'border-gray-400')}>{azName}</Card>
            </Badge>
        </Col>
    );
}


function VpcSummaryCard(props: any) {
    const { title, value } = props;

    return (
        <Col span={3}>
            <Card hoverable >
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

    // const dispatch = useDispatch();
    // useEffect(() => {
    //     const params: DcNameQueryParm = {
    //         dc: thisDC!.dcName
    //     };
    //     dispatch(getDataCenter(params));
    // }, []);
    const flagUtil = new FlagUtil();
    return (
        <div className={classnames('ml-3', 'mt-5')}>
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
                            <Col span={5}>
                                <Text strong>{t('datacenter.overview.dcInfo.vpcid')}</Text> <Text copyable>{dcBasic?.vpcID}</Text>
                                <br />
                                <Text strong>{t('datacenter.overview.dcInfo.cidrv4')}</Text> <Text copyable>{dcBasic?.cidrBlock}</Text>
                            </Col>
                            <Col span={12}>
                            </Col>
                            <Col span={5}>
                                <div className={classnames('my-2')}>
                                    <Text strong>{t('datacenter.overview.dcInfo.region')}</Text> <Text>{flagUtil.getRegionName(dcBasic!.regionCode)}</Text>
                                    <span className={classnames('inline-block', 'pr-1', 'h-4')}>
                                        <Icon className={'ml-5'} icon={flagUtil.getFlagIconByRegion(dcBasic!.regionCode)}
                                            color="#5c6f9a"
                                            width="25" height="25"
                                            fr={undefined} />
                                    </span>
                                    <br />
                                    <Text strong>{t('datacenter.overview.dcInfo.createDate')}</Text> <Text>{TimeUtil.utcConvertTimeZone({ date: dcBasic?.createDate })}</Text>
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
                        {dcSummary?.azSummary.map((item, index) => <AzSummaryCard key={index} azName={item.azName} subnetNum={item.subnetNum} />)}
                        {/* </Space> */}
                    </Row>
                </Spin>
            </div>

            <div id='vpcSummary'>
                <Paragraph className='pt-4'>{t('datacenter.overview.dcDist.para')}</Paragraph>
                <Row gutter={[ 16, 24 ]} className='py-2'>
                    <VpcSummaryCard title='Public Subnets' value={dcSummary?.vpcSummary.pubNum} />
                    <VpcSummaryCard title='Internet Gateways' value={dcSummary?.vpcSummary.igwNum} />
                    <VpcSummaryCard title='Security Groups' value={dcSummary?.vpcSummary.sgNum} />
                    <VpcSummaryCard title='Route Tables' value={dcSummary?.vpcSummary.rtbNum} />
                </Row>
                <Row gutter={[ 16, 24 ]} className='py-2'>
                    <VpcSummaryCard title='Private Subnets' value={dcSummary?.vpcSummary.priNum} />
                    <VpcSummaryCard title='NAT Gateways' value={dcSummary?.vpcSummary.natNum} />
                    <VpcSummaryCard title='Network ACLs' value={dcSummary?.vpcSummary.aclNum} />
                    <VpcSummaryCard title='Static IP(EIP)' value={dcSummary?.vpcSummary.eipNum} />
                </Row>
            </div>
        </div>
    );
};
