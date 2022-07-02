import React, { useState, useEffect } from "react";
import { Collapse, Row, Col, Typography } from "antd";
// import HTMLReactParser from "html-react-parser";

// import { useGetExchangesQuery } from "../services/cryptoApi";
// import Loader from "./Loader";

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const [data, setData] = useState([]);
  const getUsers = async () => {
    const response = await fetch(`https://api.coincap.io/v2/assets`);
    const res = await response.json();
    console.log(res.data);
    setData(res.data);
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Row>
        <Col span={5}>Exchanges</Col>
        <Col span={5}>Price in USD</Col>
        <Col span={5}>24h Trade Volume in $</Col>
        <Col span={4}>Change in %</Col>
        <Col span={5}>Url for Details</Col>
      </Row>
      <Row>
        {data.map((exchange) => (
          <Col span={24}>
            <Collapse>
              <Panel
                key={exchange.rank}
                showArrow={false}
                header={
                  <Row key={exchange.rank}>
                    <Col span={5}>
                      <Text>
                        <strong>{exchange.rank}.</strong>
                      </Text>
                      <Text>
                        <strong>{exchange.name}</strong>
                      </Text>
                      <Text>
                        <strong>({exchange.symbol})</strong>
                      </Text>
                    </Col>
                    <Col span={5}>
                      <strong>{Number(exchange.priceUsd).toFixed(2)}</strong>
                    </Col>
                    <Col span={5}>
                      <strong>
                        {Number(exchange.volumeUsd24Hr).toFixed(2)}
                      </strong>
                    </Col>
                    <Col span={4}>
                      <strong>
                        {Number(exchange.changePercent24Hr).toFixed(2)}
                      </strong>
                    </Col>
                    <Col span={5}>
                      <a href={exchange.explorer} rel="noreferrer">
                        {" "}
                        {exchange.name} url
                      </a>
                    </Col>
                  </Row>
                }
              ></Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;
