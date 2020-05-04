import React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Container, Row, Col, CardImg } from 'reactstrap';
import Card from '../components/Card';

const Zone = styled.div<{ isLeft: boolean }>`
  height: 100vh;
  width: 100%;
  background-size: cover;
  background-color: #222;
  border: solid 5px #ccc;
  border-left-width: ${(props) => (props.isLeft ? '5px' : '0px')};
  border-collapse: collapse;
`;

const StyledContainer = styled(Container)`
  margin-top: 12px;
`;

export default function Deck() {
  return (
    <div style={{ display: 'flex', backgroundColor: '#222' }}>
      <Zone isLeft={true} />
      <Zone isLeft={false}>
        <StyledContainer>
          <Row>
            <Card imageUrl="https://lh3.googleusercontent.com/sY5qrKrdQYNakOlTcPuv5m6dy5EJEqqfa1dqYDwh8lVseTO1DOwkVU9MCQ3YMsHsHSI7azX56jwaMMr7K9VeLIzrJ0NEZtu21kD085txpSYZ2pAKg-sAbtp3D4A4uBpB7A6GsCeHwODOoUOK4Va_GIWCRrpFQB3t0zGg6zZNUev0oWhLF-QP2UtG42RSY_sFZj-ACO3d8vqqoN_EG3hTFSZ4UtvdnYTHlltxJj6X-pONkfGpMD5QcotCkkyNEBbCqaw2NItpyDtHjjvPjQkQRlLvs-hXskX_kvzDCqH8iD-GK6GupPmaH0BCgbRUZMWrlNHu0iaTnWLtV-TWMNqswr9jwDKk_IGOOc4U0eMr_d_6hSSlWYanctZcHxAltraeZJj7VmsN2y6s9FKSzMvwX3yXoRw7FGKHD08o3JUuTp5uzWXStjpL_gdLvn_579yIpYXM4P2F11Psb685FPFr8pJkSge2KhkaBUyBVI0eAHFiBz87J3-zp9GuzbgL7weBKL6vnJhfo76Kx4Oy0nxUlTfHtlhWCp93Me0rSSmXw4uAtqshgdkjlGRi-j3OHr6m40iKY-y1RlGpt2iWfi1mquTn24mIVv0be8w4qAiHPRJJtqHXpo-_wvA6iUBOff374fu3oYDFL1OYl4n8pT3h72F4rVPrtCAhh0lR_MLMt2Cp3Tz0PsmWZjevBzGQDLX0bSXe44pFDYt4b3qNC1JSK-gdnk4DIyIfeuLfaJ5xsXYcIl1gRgkUyJE=w500-h715-no" />
            <Card imageUrl="https://lh3.googleusercontent.com/sY5qrKrdQYNakOlTcPuv5m6dy5EJEqqfa1dqYDwh8lVseTO1DOwkVU9MCQ3YMsHsHSI7azX56jwaMMr7K9VeLIzrJ0NEZtu21kD085txpSYZ2pAKg-sAbtp3D4A4uBpB7A6GsCeHwODOoUOK4Va_GIWCRrpFQB3t0zGg6zZNUev0oWhLF-QP2UtG42RSY_sFZj-ACO3d8vqqoN_EG3hTFSZ4UtvdnYTHlltxJj6X-pONkfGpMD5QcotCkkyNEBbCqaw2NItpyDtHjjvPjQkQRlLvs-hXskX_kvzDCqH8iD-GK6GupPmaH0BCgbRUZMWrlNHu0iaTnWLtV-TWMNqswr9jwDKk_IGOOc4U0eMr_d_6hSSlWYanctZcHxAltraeZJj7VmsN2y6s9FKSzMvwX3yXoRw7FGKHD08o3JUuTp5uzWXStjpL_gdLvn_579yIpYXM4P2F11Psb685FPFr8pJkSge2KhkaBUyBVI0eAHFiBz87J3-zp9GuzbgL7weBKL6vnJhfo76Kx4Oy0nxUlTfHtlhWCp93Me0rSSmXw4uAtqshgdkjlGRi-j3OHr6m40iKY-y1RlGpt2iWfi1mquTn24mIVv0be8w4qAiHPRJJtqHXpo-_wvA6iUBOff374fu3oYDFL1OYl4n8pT3h72F4rVPrtCAhh0lR_MLMt2Cp3Tz0PsmWZjevBzGQDLX0bSXe44pFDYt4b3qNC1JSK-gdnk4DIyIfeuLfaJ5xsXYcIl1gRgkUyJE=w500-h715-no" />
            <Card imageUrl="https://lh3.googleusercontent.com/sY5qrKrdQYNakOlTcPuv5m6dy5EJEqqfa1dqYDwh8lVseTO1DOwkVU9MCQ3YMsHsHSI7azX56jwaMMr7K9VeLIzrJ0NEZtu21kD085txpSYZ2pAKg-sAbtp3D4A4uBpB7A6GsCeHwODOoUOK4Va_GIWCRrpFQB3t0zGg6zZNUev0oWhLF-QP2UtG42RSY_sFZj-ACO3d8vqqoN_EG3hTFSZ4UtvdnYTHlltxJj6X-pONkfGpMD5QcotCkkyNEBbCqaw2NItpyDtHjjvPjQkQRlLvs-hXskX_kvzDCqH8iD-GK6GupPmaH0BCgbRUZMWrlNHu0iaTnWLtV-TWMNqswr9jwDKk_IGOOc4U0eMr_d_6hSSlWYanctZcHxAltraeZJj7VmsN2y6s9FKSzMvwX3yXoRw7FGKHD08o3JUuTp5uzWXStjpL_gdLvn_579yIpYXM4P2F11Psb685FPFr8pJkSge2KhkaBUyBVI0eAHFiBz87J3-zp9GuzbgL7weBKL6vnJhfo76Kx4Oy0nxUlTfHtlhWCp93Me0rSSmXw4uAtqshgdkjlGRi-j3OHr6m40iKY-y1RlGpt2iWfi1mquTn24mIVv0be8w4qAiHPRJJtqHXpo-_wvA6iUBOff374fu3oYDFL1OYl4n8pT3h72F4rVPrtCAhh0lR_MLMt2Cp3Tz0PsmWZjevBzGQDLX0bSXe44pFDYt4b3qNC1JSK-gdnk4DIyIfeuLfaJ5xsXYcIl1gRgkUyJE=w500-h715-no" />
            <Card imageUrl="https://lh3.googleusercontent.com/sY5qrKrdQYNakOlTcPuv5m6dy5EJEqqfa1dqYDwh8lVseTO1DOwkVU9MCQ3YMsHsHSI7azX56jwaMMr7K9VeLIzrJ0NEZtu21kD085txpSYZ2pAKg-sAbtp3D4A4uBpB7A6GsCeHwODOoUOK4Va_GIWCRrpFQB3t0zGg6zZNUev0oWhLF-QP2UtG42RSY_sFZj-ACO3d8vqqoN_EG3hTFSZ4UtvdnYTHlltxJj6X-pONkfGpMD5QcotCkkyNEBbCqaw2NItpyDtHjjvPjQkQRlLvs-hXskX_kvzDCqH8iD-GK6GupPmaH0BCgbRUZMWrlNHu0iaTnWLtV-TWMNqswr9jwDKk_IGOOc4U0eMr_d_6hSSlWYanctZcHxAltraeZJj7VmsN2y6s9FKSzMvwX3yXoRw7FGKHD08o3JUuTp5uzWXStjpL_gdLvn_579yIpYXM4P2F11Psb685FPFr8pJkSge2KhkaBUyBVI0eAHFiBz87J3-zp9GuzbgL7weBKL6vnJhfo76Kx4Oy0nxUlTfHtlhWCp93Me0rSSmXw4uAtqshgdkjlGRi-j3OHr6m40iKY-y1RlGpt2iWfi1mquTn24mIVv0be8w4qAiHPRJJtqHXpo-_wvA6iUBOff374fu3oYDFL1OYl4n8pT3h72F4rVPrtCAhh0lR_MLMt2Cp3Tz0PsmWZjevBzGQDLX0bSXe44pFDYt4b3qNC1JSK-gdnk4DIyIfeuLfaJ5xsXYcIl1gRgkUyJE=w500-h715-no" />
          </Row>
        </StyledContainer>
      </Zone>
    </div>
  );
}
