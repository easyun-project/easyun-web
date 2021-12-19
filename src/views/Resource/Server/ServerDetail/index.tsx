import React from "react";
import {Icon} from "@iconify/react";
import {ServerModel} from "@/constant/server";
import {CButton} from "@/components/Common/CButton";
import {classnames, TTailwindString} from "@@/tailwindcss-classnames";
import {Col, message, Row, Tabs} from "antd";

interface ServerDetailProps {
    server: ServerModel
}

const {TabPane} = Tabs;


export const ServerDetail = (props: ServerDetailProps) => {
    const {server} = props;

    let color: TTailwindString
    if (server.svr_state === 'running') {
        color = classnames('text-green-600')
    } else if (server.svr_state == 'stopped') {
        color = classnames('text-red-700')
    } else {
        color = classnames('text-yellow-550')
    }

    return (
        <>
            <Row>
                <Col span={2}>
                    <Icon
                        icon="logos:ubuntu"
                        width={60}
                        fr={undefined}/>
                </Col>
                <Col span={12}>
                    <div id="serverInfo">
                        <h1>{server.svr_name}</h1>
                        <div>
                            instance Type : {server.ins_type}({server.vcpu}vCPU, {server.ram} Gib)
                        </div>
                        {/*<div>Private Ip: {server.pri_ip}</div>*/}
                        <div>Public Ip: {server.pub_ip}</div>
                    </div>
                </Col>
                <Col span={8}>
                    <div id="operationPanel">
                        <div className={classnames('my-2')}>
                            Status:
                            <span className={classnames(color, 'ml-2')}>{server.svr_state}</span>
                        </div>
                        <CButton
                            click={() => {
                                message.info("I think you stop the instance")
                            }}
                            classes={classnames('mr-2', 'inline-block', 'bg-yellow-550', 'block', 'text-white', 'rounded-3xl', 'px-5', 'py-2')}>
                            Stop
                        </CButton>
                        <CButton
                            click={() => {
                                message.info("I think you reboot the instance")
                            }}
                            classes={classnames('mr-2', 'inline-block', 'bg-yellow-550', 'block', 'text-white', 'rounded-3xl', 'px-5', 'py-2')}>
                            Reboot
                        </CButton>
                        <CButton
                            click={() => {
                                message.error("I think you delete the instance")
                            }}
                            classes={classnames('inline-block', 'bg-red-700', 'block', 'text-white', 'rounded-3xl', 'px-5', 'py-2')}>
                            Delete instance
                        </CButton>
                    </div>
                </Col>
            </Row>
            <Tabs className={classnames('pl-3')} defaultActiveKey="1">
                <TabPane tab="Detail" key="Detail">

                </TabPane>
                <TabPane tab="Disk" key="Disk">
                </TabPane>
                <TabPane tab="Networking" key="Networking">

                </TabPane>
                <TabPane tab="Security" key="Security">

                </TabPane>
                <TabPane tab="Tags" key="Tags">


                </TabPane>
                <TabPane tab="Connect" key="Connect">

                </TabPane>
            </Tabs>

        </>
    )
}

export default ServerDetail;