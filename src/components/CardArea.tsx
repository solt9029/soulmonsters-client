import React from 'react';
import { Row, Col, UncontrolledAlert, Container } from 'reactstrap';
import Card from '../components/Card';
import { useCardsQuery } from '../graphql/generated/graphql-client';
import Area from '../styled/Area';

export default function CardArea() {
  const { data, error, loading } = useCardsQuery();

  return (
    <Area isRight>
      <Container style={{ marginTop: '12px' }}>
        <Row style={{ color: 'white' }}>
          {loading && (
            <Col style={{ marginBottom: '12px' }} lg={12}>
              カード情報をロード中です
            </Col>
          )}
          {error !== undefined && (
            <Col lg={12}>
              <UncontrolledAlert color="danger">
                カード情報の取得中にエラーが発生しました
              </UncontrolledAlert>
            </Col>
          )}
          {data?.cards.map((card, index) => (
            <Card picture={card.picture}></Card>
          ))}
        </Row>
      </Container>
    </Area>
  );
}
