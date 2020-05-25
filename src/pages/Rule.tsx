import React from 'react';
import { Container, Row, ListGroup, ListGroupItem, Col } from 'reactstrap';
import styled from 'styled-components';

const Title = styled.h3`
  margin-left: 12px;
`;

const SubTitle = styled.h5`
  margin-left: 12px;
`;

const Description = styled.div`
  margin-left: 12px;
`;

const StyledContainer = styled(Container)`
  margin-top: 12px;
`;

const Block = styled(Row)`
  margin-bottom: 50px;
`;

export default function Rule() {
  return (
    <StyledContainer>
      <Block>
        <Col lg={12}>
          <Title>カードの種類</Title>
        </Col>
        <Col lg={12}>
          <ListGroup>
            <ListGroupItem>モンスターカード</ListGroupItem>
            <ListGroupItem>サークルモンスターカード</ListGroupItem>
            <ListGroupItem>クイックカード</ListGroupItem>
            <ListGroupItem>ブロックカード</ListGroupItem>
          </ListGroup>
        </Col>
      </Block>

      <Block>
        <Col lg={12}>
          <Title>ゾーンの種類</Title>
        </Col>
        <Col lg={6} md={6}>
          <img width="100%" src="/images/zone.png" alt="zone" />
        </Col>
        <Col lg={12}>
          <SubTitle>①デッキゾーン</SubTitle>
        </Col>
        <Col lg={12}>
          <Description>
            <ul>
              <li>
                デッキを置く場所。デッキは40枚以上でなければならない。同名カードは3枚まで入れることができる。
              </li>
            </ul>
          </Description>
        </Col>
        <Col lg={12}>
          <SubTitle>②バトルゾーン</SubTitle>
        </Col>
        <Col lg={12}>
          <Description>
            <ul>
              <li>
                モンスターを置く場所。モンスターが戦闘で負けるとソウルゾーンに置かれる。モンスターがバトルゾーンからソウルゾーンに置かれたときエナジーが1増える。
              </li>
            </ul>
          </Description>
        </Col>
        <Col lg={12}>
          <SubTitle>③ソウルゾーン</SubTitle>
        </Col>
        <Col lg={12}>
          <Description>
            <ul>
              <li>
                戦闘で負けたモンスターが置かれる場所。クイックカードやブロックカードを発動する場合、手札からソウルゾーンに置いて発動する。
              </li>
            </ul>
          </Description>
        </Col>
        <Col lg={12}>
          <SubTitle>④モルグゾーン</SubTitle>
        </Col>
        <Col lg={12}>
          <Description>
            <ul>
              <li>
                【ソウルキャノン】や【ソウルバリア】、コスト等でカードが置かれる場所。
              </li>
            </ul>
          </Description>
        </Col>
      </Block>

      <Block>
        <Col lg={12}>
          <Title>ターンの流れ</Title>
        </Col>
        <Col lg={12}>
          <SubTitle>1. ドロータイム</SubTitle>
        </Col>
        <Col lg={12}>
          <Description>
            <ul>
              <li>デッキからカードを1枚ドローする。</li>
            </ul>
          </Description>
        </Col>
        <Col lg={12}>
          <SubTitle>2. エナジータイム</SubTitle>
        </Col>
        <Col lg={12}>
          <Description>
            <ul>
              <li>エナジーを2増やす。エナジーの最大値は8。</li>
            </ul>
          </Description>
        </Col>
        <Col lg={12}>
          <SubTitle>3. プットタイム</SubTitle>
        </Col>
        <Col lg={12}>
          <Description>
            <ul>
              <li>手札からカードを1枚までソウルゾーンに置くことができる。</li>
            </ul>
          </Description>
        </Col>
        <Col lg={12}>
          <SubTitle>4. サムシングタイム</SubTitle>
        </Col>
        <Col lg={12}>
          <Description>
            <ul>
              <li>
                【ソウルキャノン】ソウルゾーンのカードを4枚モルグゾーンに置き、相手のモンスター1枚をモルグゾーンに置くことができる。
              </li>
              <li>
                書かれている数字分エナジーを使ってモンスターカードを手札からバトルゾーンに置くことができる。
              </li>
              <li>
                サークルモンスターは、○で囲まれている数字の枚数自分のバトルゾーンに置かれているモンスターをモルグゾーンゾーンに置いて、手札からのみバトルゾーンに置くことができる。
              </li>
              <li>
                書かれている数字分エナジーを使ってクイックカードを手札からソウルゾーンに置き発動することができる。
              </li>
              <li>モンスターの表示形式を何度でも変更することができる。</li>
            </ul>
          </Description>
        </Col>
        <Col lg={12}>
          <SubTitle>5. バトルタイム</SubTitle>
        </Col>
        <Col lg={12}>
          <Description>
            <ul>
              <li>
                自分のモンスターで相手のモンスターを攻撃したり、相手を直接攻撃したりすることができる。
              </li>
              <li>
                【ソウルバリア】ソウルゾーンのカードを4枚モルグゾーンに置き、相手のモンスターからの攻撃を1回無効にすることができる。
              </li>
            </ul>
          </Description>
        </Col>
        <Col lg={12}>
          <SubTitle>6. エンドタイム</SubTitle>
        </Col>
        <Col lg={12}>
          <Description>
            <ul>
              <li>
                ターンの終わり。エンドタイムが終わると相手のドロータイムとなる。
              </li>
            </ul>
          </Description>
        </Col>
        <Col lg={12}>
          <SubTitle>7. 相手ターン</SubTitle>
        </Col>
        <Col lg={12}>
          <Description>
            <ul>
              <li>ブロックカードを発動することができる。 </li>
            </ul>
          </Description>
        </Col>
      </Block>
    </StyledContainer>
  );
}
