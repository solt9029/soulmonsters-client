import React, { useContext } from 'react';
import { Container, Row, Col } from '../../styled/reactstrap';
import { Card, CardImg } from 'reactstrap';
import styled from 'styled-components';
import {
  useGameQuery,
  Zone,
  useActiveGameIdQuery,
} from '../../graphql/generated/graphql-client';
import { AppContext } from '../App';

const StyledCol = styled(Col)`
  color: white;
  align-items: center;
  -webkit-align-items: center;
  display: flex;
  overflow-x: auto;
  ::before,
  ::after {
    content: '';
    margin: auto;
  }
`;

const StyledRow = styled(Row)`
  display: flex;
  height: 100px;
`;

const StyledCard = styled(Card)`
  min-width: 60px;
  width: 60px;
  margin: 5px;
`;

const UserLogo = styled.div<{ picture?: string | null }>`
  ${(props) => `background: url('${props.picture}') no-repeat left center;`}
  background-size: contain;
  border-radius: 50%;
  border: none;
  &:focus {
    box-shadow: none;
  }
  &:hover {
    border-color: #eee;
  }
  height: 45px;
  width: 45px;
`;

const UserInfo = styled.div`
  margin-left: 10px;
`;

const UserName = styled.div`
  font-weight: bold;
`;

export default function GameCardArea() {
  const {
    state: { user },
  } = useContext(AppContext);

  const activeGameIdQueryResult = useActiveGameIdQuery();

  const { data, error, loading } = useGameQuery({
    variables: { id: activeGameIdQueryResult.data?.activeGameId || 1 },
  });

  return (
    <Container marginTop={20} marginBottom={20}>
      <Row>
        <StyledCol lg={12}>
          <UserLogo picture={user?.data?.photoURL} />
          <UserInfo>
            <UserName>でれ出現</UserName>
            <div>ライフ：8000</div>
          </UserInfo>
        </StyledCol>
      </Row>
      <StyledRow marginTop={5}>
        <StyledCol lg={12}>
          {data?.game.gameCards
            .filter(
              (value) =>
                value.zone === Zone.Hand &&
                value.currentUserId !== user.data?.uid
            )
            .map(() => (
              <StyledCard>
                <CardImg src="https://lh3.googleusercontent.com/pw/ACtC-3e_TwurBT8oL0wbI1qD8Vw6fkZrqu1xGbcEFb0kHH_JGXbLyh3oyOhSJb53C_kgtIBwlBWOIB1MANxe3Kv3Nu5d5HXlBfa4dYUF_sTSRVrkg8VQovzxWH65l1GzRx7M3seYi3AnMBb2Blu19e6gkhCEMw=w500-h715-no?authuser=0" />
              </StyledCard>
            ))}
        </StyledCol>
      </StyledRow>
      <StyledRow marginTop={5}>
        <StyledCol lg={2} xs={2}>
          {data?.game.gameCards
            .filter(
              (value) =>
                value.zone === Zone.Deck &&
                value.currentUserId !== user.data?.uid
            )
            .map(() => (
              <StyledCard>
                <CardImg src="https://lh3.googleusercontent.com/pw/ACtC-3e_TwurBT8oL0wbI1qD8Vw6fkZrqu1xGbcEFb0kHH_JGXbLyh3oyOhSJb53C_kgtIBwlBWOIB1MANxe3Kv3Nu5d5HXlBfa4dYUF_sTSRVrkg8VQovzxWH65l1GzRx7M3seYi3AnMBb2Blu19e6gkhCEMw=w500-h715-no?authuser=0" />
              </StyledCard>
            ))}
        </StyledCol>
        <StyledCol lg={10} xs={10}>
          {data?.game.gameCards
            .filter(
              (value) =>
                value.zone === Zone.Soul &&
                value.currentUserId !== user.data?.uid
            )
            .map(() => (
              <StyledCard>
                <CardImg src="https://lh3.googleusercontent.com/pw/ACtC-3e_TwurBT8oL0wbI1qD8Vw6fkZrqu1xGbcEFb0kHH_JGXbLyh3oyOhSJb53C_kgtIBwlBWOIB1MANxe3Kv3Nu5d5HXlBfa4dYUF_sTSRVrkg8VQovzxWH65l1GzRx7M3seYi3AnMBb2Blu19e6gkhCEMw=w500-h715-no?authuser=0" />
              </StyledCard>
            ))}
        </StyledCol>
      </StyledRow>
      <StyledRow marginTop={5}>
        <StyledCol lg={2} xs={2}>
          {data?.game.gameCards
            .filter(
              (value) =>
                value.zone === Zone.Morgue &&
                value.currentUserId !== user.data?.uid
            )
            .map(() => (
              <StyledCard>
                <CardImg src="https://lh3.googleusercontent.com/pw/ACtC-3e_TwurBT8oL0wbI1qD8Vw6fkZrqu1xGbcEFb0kHH_JGXbLyh3oyOhSJb53C_kgtIBwlBWOIB1MANxe3Kv3Nu5d5HXlBfa4dYUF_sTSRVrkg8VQovzxWH65l1GzRx7M3seYi3AnMBb2Blu19e6gkhCEMw=w500-h715-no?authuser=0" />
              </StyledCard>
            ))}
        </StyledCol>
        <StyledCol lg={10} xs={10}>
          {data?.game.gameCards
            .filter(
              (value) =>
                value.zone === Zone.Battle &&
                value.currentUserId !== user.data?.uid
            )
            .map(() => (
              <StyledCard>
                <CardImg src="https://lh3.googleusercontent.com/pw/ACtC-3e_TwurBT8oL0wbI1qD8Vw6fkZrqu1xGbcEFb0kHH_JGXbLyh3oyOhSJb53C_kgtIBwlBWOIB1MANxe3Kv3Nu5d5HXlBfa4dYUF_sTSRVrkg8VQovzxWH65l1GzRx7M3seYi3AnMBb2Blu19e6gkhCEMw=w500-h715-no?authuser=0" />
              </StyledCard>
            ))}
        </StyledCol>
      </StyledRow>

      <StyledRow marginTop={50}>
        <StyledCol lg={10} xs={10}>
          <StyledCard>
            <CardImg src="https://lh3.googleusercontent.com/pw/ACtC-3e_TwurBT8oL0wbI1qD8Vw6fkZrqu1xGbcEFb0kHH_JGXbLyh3oyOhSJb53C_kgtIBwlBWOIB1MANxe3Kv3Nu5d5HXlBfa4dYUF_sTSRVrkg8VQovzxWH65l1GzRx7M3seYi3AnMBb2Blu19e6gkhCEMw=w500-h715-no?authuser=0" />
          </StyledCard>
          <StyledCard>
            <CardImg src="https://lh3.googleusercontent.com/pw/ACtC-3e_TwurBT8oL0wbI1qD8Vw6fkZrqu1xGbcEFb0kHH_JGXbLyh3oyOhSJb53C_kgtIBwlBWOIB1MANxe3Kv3Nu5d5HXlBfa4dYUF_sTSRVrkg8VQovzxWH65l1GzRx7M3seYi3AnMBb2Blu19e6gkhCEMw=w500-h715-no?authuser=0" />
          </StyledCard>
        </StyledCol>
        <StyledCol lg={2} xs={2}>
          <StyledCard>
            <CardImg src="https://lh3.googleusercontent.com/pw/ACtC-3e_TwurBT8oL0wbI1qD8Vw6fkZrqu1xGbcEFb0kHH_JGXbLyh3oyOhSJb53C_kgtIBwlBWOIB1MANxe3Kv3Nu5d5HXlBfa4dYUF_sTSRVrkg8VQovzxWH65l1GzRx7M3seYi3AnMBb2Blu19e6gkhCEMw=w500-h715-no?authuser=0" />
          </StyledCard>
        </StyledCol>
      </StyledRow>
      <StyledRow marginTop={5}>
        <StyledCol lg={10} xs={10}>
          <StyledCard>
            <CardImg src="https://lh3.googleusercontent.com/pw/ACtC-3e_TwurBT8oL0wbI1qD8Vw6fkZrqu1xGbcEFb0kHH_JGXbLyh3oyOhSJb53C_kgtIBwlBWOIB1MANxe3Kv3Nu5d5HXlBfa4dYUF_sTSRVrkg8VQovzxWH65l1GzRx7M3seYi3AnMBb2Blu19e6gkhCEMw=w500-h715-no?authuser=0" />
          </StyledCard>
          <StyledCard>
            <CardImg src="https://lh3.googleusercontent.com/pw/ACtC-3e_TwurBT8oL0wbI1qD8Vw6fkZrqu1xGbcEFb0kHH_JGXbLyh3oyOhSJb53C_kgtIBwlBWOIB1MANxe3Kv3Nu5d5HXlBfa4dYUF_sTSRVrkg8VQovzxWH65l1GzRx7M3seYi3AnMBb2Blu19e6gkhCEMw=w500-h715-no?authuser=0" />
          </StyledCard>
        </StyledCol>
        <StyledCol lg={2} xs={2}>
          <StyledCard>
            <CardImg src="https://lh3.googleusercontent.com/pw/ACtC-3e_TwurBT8oL0wbI1qD8Vw6fkZrqu1xGbcEFb0kHH_JGXbLyh3oyOhSJb53C_kgtIBwlBWOIB1MANxe3Kv3Nu5d5HXlBfa4dYUF_sTSRVrkg8VQovzxWH65l1GzRx7M3seYi3AnMBb2Blu19e6gkhCEMw=w500-h715-no?authuser=0" />
          </StyledCard>
        </StyledCol>
      </StyledRow>
      <StyledRow marginTop={5}>
        <StyledCol lg={12}>
          {data?.game.gameCards
            .filter(
              (value) =>
                value.zone === Zone.Hand &&
                value.currentUserId === user.data?.uid
            )
            .map((value) => (
              <StyledCard>
                <CardImg src={value.card.picture} />
              </StyledCard>
            ))}
        </StyledCol>
      </StyledRow>
      <Row marginTop={5}>
        <StyledCol lg={12}>
          <UserLogo picture={user?.data?.photoURL} />
          <UserInfo>
            <UserName>でれ出現</UserName>
            <div>ライフ：8000</div>
          </UserInfo>
        </StyledCol>
      </Row>
    </Container>
  );
}
