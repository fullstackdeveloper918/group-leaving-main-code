"use client";
import React from 'react'
import { Row, Col, Typography } from 'antd';
  // import 'antd/dist/antd.css';

const { Text } = Typography;

const logoStyle = {
  maxHeight: '50px',
  maxWidth: '150px',
};
const Join_company = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px 0' }}>
    <Text style={{ fontSize: 24 }}>
      Join over <Text strong>5,000,000</Text> other people using our group greeting cards
    </Text>
    <Row gutter={[16, 16]} justify="center" style={{ marginTop: '30px' }}>
      <Col>
        <img 
          src="https://upload.wikimedia.org/wikipedia/en/thumb/5/58/Coat_of_Arms_of_the_United_Kingdom_Government.svg/1920px-Coat_of_Arms_of_the_United_Kingdom_Government.svg.png" 
          alt="Gov UK" 
          style={logoStyle} 
        />
      </Col>
      <Col>
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" 
          alt="Amazon" 
          style={logoStyle} 
        />
      </Col>
      <Col>
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/4/44/Meta_logo.svg" 
          alt="Meta" 
          style={logoStyle} 
        />
      </Col>
      <Col>
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/2/2e/United_Nations_emblem_blue.svg" 
          alt="United Nations" 
          style={logoStyle} 
        />
      </Col>
    </Row>
  </div>
  )
}

export default Join_company