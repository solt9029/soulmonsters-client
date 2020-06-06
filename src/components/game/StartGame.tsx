import React from 'react';
import { Row } from 'reactstrap';
import { Container } from '../../styled/reactstrap';
import styled from 'styled-components';
import { useActiveGameIdQuery } from '../../graphql/generated/graphql-client';

const StyledContainer = styled(Container)`
  text-align: center;
`;

export default function StartGame() {
  return <div>sample</div>;
}
