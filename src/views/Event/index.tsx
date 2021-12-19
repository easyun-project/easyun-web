import React from "react";
import { CHeader } from "@/components/Logic/CHeader";
import { CFooter } from "@/components/Logic/CFooter";
import eventService from "@/service/eventService";
import "./index.css";

import { Icon } from "@iconify/react";
import { Row, Col, Table } from "antd";
const Event = (): JSX.Element => {
  const columns = [
    {
      title: "Eventd",
      dataIndex: "eventd",
      key: "eventd",
      render: (text) => (
        <span onClick={openlogItem} className="color-link">
          {text}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Region/Zone",
      key: "region_zone",
      dataIndex: "region_zone",
    },
    {
      title: "Start time",
      key: "start_time",
      dataIndex: "start_time",
    },
    {
      title: "last update time",
      key: "last_update_time",
      dataIndex: "last_update_time",
    },
    {
      title: "Affected resources",
      key: "affected_resources",
      dataIndex: "affected_resources",
    },
  ];
  const data = Array(100).fill(0).map((item,index)=>{
      return {
        key: index,
        eventd: "S3 operation issuse",
        status: "Closed",
        category: "Issuse",
        region_zone: "us-east-1",
        start_time: "2021.09.01 06:23:11",
        last_update_time: "2021.12.01 16:23:11",
        affected_resources: "-",
      };
  })
  const openCloudWatch=()=>{
    const url = `https://console.aws.amazon.com/cloudwatch/home/?region=us-east-1`;
    window.open(url, "_blank");
  }
    const openlogItem = () => {
      const url = `https://console.aws.amazon.com/phd/home/?region=us-east-1#/event-log`;
      window.open(url, "_blank");
    };
  return (
    <div>
      <CHeader />
      <div className="content-body">
        <div className="color-black-weight800">Event Log</div>
        <div className="margin-t-b20">
          <Row>
            <Col span={8}>
              <div
                className="flex-align-center  color-link"
                onClick={openCloudWatch}
              >
                <div className="left-text">Amazon CloudWatch Events</div>
                <Icon icon="ri:share-box-fill" />
              </div>
            </Col>
            <Col span={8} offset={8}>
              <div className="flex-align-center">
                <div className="left-text">
                  Last refreshed less than 1 min ago
                </div>
                <Icon className="yellow-text-color" icon="ci:refresh" />
              </div>
            </Col>
          </Row>
        </div>
        <div className="width100">
          <Table
            pagination={false}
            bordered
            columns={columns}
            dataSource={data}
          />
        </div>
      </div>
      <div className="fix-footer">
        <CFooter />
      </div>
    </div>
  );
};

export default Event;
