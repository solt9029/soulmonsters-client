import React from 'react';
import { Col, Card as RCard, CardImg } from 'reactstrap';
import styled from 'styled-components';

const StyledCol = styled(Col)`
  margin-bottom: 12px;
  padding-right: 6px;
  padding-left: 6px;
`;

interface Props {
  imageUrl: string;
}

export default function Card({ imageUrl }: Props) {
  return (
    <StyledCol lg={3} md={4} sm={6} xs={6}>
      <RCard>
        <CardImg src={imageUrl} />
      </RCard>
    </StyledCol>
  );
}
