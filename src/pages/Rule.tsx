import React from 'react';
import { ListGroup, ListGroupItem, Col } from 'reactstrap';
import styled from 'styled-components';
import Footer from '../components/Footer';
import { Row, Container } from '../styled/reactstrap';

const Title = styled.h3`
  /* margin-left: 12px; */
`;

const SubTitle = styled.h5`
  /* margin-left: 12px; */
`;

const Description = styled.div`
  /* margin-left: 12px; */
`;

const Img = styled.img`
  width: 100%;
  /* margin-left: 12px; */
`;

export default function Rule() {
  return (
    <>
      <Container marginTop={12}>
        <Row marginBottom={50}>
          <Col lg={12}>
            <Title>カードの種類</Title>
          </Col>
          <Col lg={12}>
            <ul>
              <li>モンスターカード</li>
              <li>サークルモンスターカード</li>
              <li>クイックカード</li>
              <li>ブロックカード</li>
            </ul>
          </Col>
          <Col lg={2} xs={3}>
            <Img
              alt="monsterCard"
              src="https://lh3.googleusercontent.com/k23uZNlje2ER4DxaHKr_HSnd0slrRQHXk8BfhO2umxfzHUm0WiHZdXI71momtKrl9BkSIAjElb0HehDdzv98uCQxAUCJ84iyB5zTpuINGzL7-bpo-jvj1z3iiJ4pP-VQkC8o5PXBQlhFhSaCpMfHxLBzIJyTvBYz76BwsKvtRgFXqkHYMy901rK7E_xkLsF1_fXq0Cy51fVUZvIT9grXLQz3r1y_Ma9CigYPJWlt63gWTfM_yZSlqxXwflSMV9_r98EpZjtqwN-2hnYnWI29sOl62VjQiw__08vWxHz3Cj-5Tr5ioZbRxcyRcPZfRtC_l9OoCBiR2QrzRBJbQy7ieF7hcinSBk53vrXTLfPf-B1fSd7KzKl71O9k-9xcilNhzcc4xniIiHal5M8gl-nqV3EP7ytxfEMsFw03eyjd9O3RSVne0JBeb2oEyONqz0EPmrcau17hxz-piPpFozs8gw2mLOHvaG7CUuC1WWQqnp68vCTi5PRjYQWyIEIwZTuVhuQXMXuzuLpK9L76t-OwA4k5nUyubtrXRzzL1Zg0HVD3Z6fjw4c03DZ5wHlIG0CMN-lhCaJbe_8BB0rm9NQW1WjMpORz_xJfPtB-WPWAYt8uyheJ62ISEoNwUEed85KFys06j5K0lewrLXKyJyriRkSabyMnhRw9BoMScamRNhJVzMVB35NHF5hxsX9HUC1T4rImFTuzfHHM1YuttSe8fW-f5i7hYqcHOHvssBv39c_StQ0I6qJ3EZI=w500-h715-no"
            />
          </Col>
          <Col lg={2} xs={3}>
            <Img
              alt="monsterCard"
              src="https://lh3.googleusercontent.com/k23uZNlje2ER4DxaHKr_HSnd0slrRQHXk8BfhO2umxfzHUm0WiHZdXI71momtKrl9BkSIAjElb0HehDdzv98uCQxAUCJ84iyB5zTpuINGzL7-bpo-jvj1z3iiJ4pP-VQkC8o5PXBQlhFhSaCpMfHxLBzIJyTvBYz76BwsKvtRgFXqkHYMy901rK7E_xkLsF1_fXq0Cy51fVUZvIT9grXLQz3r1y_Ma9CigYPJWlt63gWTfM_yZSlqxXwflSMV9_r98EpZjtqwN-2hnYnWI29sOl62VjQiw__08vWxHz3Cj-5Tr5ioZbRxcyRcPZfRtC_l9OoCBiR2QrzRBJbQy7ieF7hcinSBk53vrXTLfPf-B1fSd7KzKl71O9k-9xcilNhzcc4xniIiHal5M8gl-nqV3EP7ytxfEMsFw03eyjd9O3RSVne0JBeb2oEyONqz0EPmrcau17hxz-piPpFozs8gw2mLOHvaG7CUuC1WWQqnp68vCTi5PRjYQWyIEIwZTuVhuQXMXuzuLpK9L76t-OwA4k5nUyubtrXRzzL1Zg0HVD3Z6fjw4c03DZ5wHlIG0CMN-lhCaJbe_8BB0rm9NQW1WjMpORz_xJfPtB-WPWAYt8uyheJ62ISEoNwUEed85KFys06j5K0lewrLXKyJyriRkSabyMnhRw9BoMScamRNhJVzMVB35NHF5hxsX9HUC1T4rImFTuzfHHM1YuttSe8fW-f5i7hYqcHOHvssBv39c_StQ0I6qJ3EZI=w500-h715-no"
            />
          </Col>
          <Col lg={2} xs={3}>
            <Img
              alt="monsterCard"
              src="https://lh3.googleusercontent.com/k23uZNlje2ER4DxaHKr_HSnd0slrRQHXk8BfhO2umxfzHUm0WiHZdXI71momtKrl9BkSIAjElb0HehDdzv98uCQxAUCJ84iyB5zTpuINGzL7-bpo-jvj1z3iiJ4pP-VQkC8o5PXBQlhFhSaCpMfHxLBzIJyTvBYz76BwsKvtRgFXqkHYMy901rK7E_xkLsF1_fXq0Cy51fVUZvIT9grXLQz3r1y_Ma9CigYPJWlt63gWTfM_yZSlqxXwflSMV9_r98EpZjtqwN-2hnYnWI29sOl62VjQiw__08vWxHz3Cj-5Tr5ioZbRxcyRcPZfRtC_l9OoCBiR2QrzRBJbQy7ieF7hcinSBk53vrXTLfPf-B1fSd7KzKl71O9k-9xcilNhzcc4xniIiHal5M8gl-nqV3EP7ytxfEMsFw03eyjd9O3RSVne0JBeb2oEyONqz0EPmrcau17hxz-piPpFozs8gw2mLOHvaG7CUuC1WWQqnp68vCTi5PRjYQWyIEIwZTuVhuQXMXuzuLpK9L76t-OwA4k5nUyubtrXRzzL1Zg0HVD3Z6fjw4c03DZ5wHlIG0CMN-lhCaJbe_8BB0rm9NQW1WjMpORz_xJfPtB-WPWAYt8uyheJ62ISEoNwUEed85KFys06j5K0lewrLXKyJyriRkSabyMnhRw9BoMScamRNhJVzMVB35NHF5hxsX9HUC1T4rImFTuzfHHM1YuttSe8fW-f5i7hYqcHOHvssBv39c_StQ0I6qJ3EZI=w500-h715-no"
            />
          </Col>
          <Col lg={2} xs={3}>
            <Img
              alt="monsterCard"
              src="https://lh3.googleusercontent.com/k23uZNlje2ER4DxaHKr_HSnd0slrRQHXk8BfhO2umxfzHUm0WiHZdXI71momtKrl9BkSIAjElb0HehDdzv98uCQxAUCJ84iyB5zTpuINGzL7-bpo-jvj1z3iiJ4pP-VQkC8o5PXBQlhFhSaCpMfHxLBzIJyTvBYz76BwsKvtRgFXqkHYMy901rK7E_xkLsF1_fXq0Cy51fVUZvIT9grXLQz3r1y_Ma9CigYPJWlt63gWTfM_yZSlqxXwflSMV9_r98EpZjtqwN-2hnYnWI29sOl62VjQiw__08vWxHz3Cj-5Tr5ioZbRxcyRcPZfRtC_l9OoCBiR2QrzRBJbQy7ieF7hcinSBk53vrXTLfPf-B1fSd7KzKl71O9k-9xcilNhzcc4xniIiHal5M8gl-nqV3EP7ytxfEMsFw03eyjd9O3RSVne0JBeb2oEyONqz0EPmrcau17hxz-piPpFozs8gw2mLOHvaG7CUuC1WWQqnp68vCTi5PRjYQWyIEIwZTuVhuQXMXuzuLpK9L76t-OwA4k5nUyubtrXRzzL1Zg0HVD3Z6fjw4c03DZ5wHlIG0CMN-lhCaJbe_8BB0rm9NQW1WjMpORz_xJfPtB-WPWAYt8uyheJ62ISEoNwUEed85KFys06j5K0lewrLXKyJyriRkSabyMnhRw9BoMScamRNhJVzMVB35NHF5hxsX9HUC1T4rImFTuzfHHM1YuttSe8fW-f5i7hYqcHOHvssBv39c_StQ0I6qJ3EZI=w500-h715-no"
            />
          </Col>
        </Row>

        <Row marginBottom={50}>
          <Col lg={12}>
            <Title>ゾーンの種類</Title>
          </Col>
          <Col md={6}>
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
        </Row>

        <Row marginBottom={50}>
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
        </Row>

        <Row marginBottom={50}>
          <Col lg={12}>
            <Title>ルール</Title>
          </Col>
          <Col lg={12}>
            <ul>
              <li>
                ソウルバトルは、お互いに手札5枚、ライフ8000、先攻はエナジー0、後攻はエナジー1の状態で開始する。先攻は攻撃できない。
              </li>
              <li>ライフが0になるか、デッキが0枚になった瞬間負けとなる。 </li>
              <li>
                ●で書かれた文章がコスト、■で書かれた文章が条件となる。モンスターの効果やクイックカード、ブロックカードを発動する場合、コストを払ってから発動する。
              </li>
              <li>バトルゾーンには何枚でもモンスターを置くことができる。</li>
              <li>手札は何枚でも持つことができる。</li>
              <li>
                モンスターには6つの属性（赤、青、白、緑、紫、黒）と、5つの種族（○、△、□、☆、★）がある。
              </li>
              <li>
                同時に複数の効果が発動した場合、ターンプレイヤーから発動し、発動の順番はそのプレイヤーが決める。例：自分の【ビッグデルジュージ】の効果で自分の【固形燃料怪人メタノル】、【相変わらずよく分からない花】、相手の【固形燃料怪人メタノル】、【相変わらずよく分からない花】が同時にモルグゾーンに置かれた場合、まずターンプレイヤーである自分の【固形燃料怪人メタノル】と【相変わらずよく分からない花】の効果の発動の順番を決め、それらを処理する。その後相手は【固形燃料怪人メタノル】と【相変わらずよく分からない花】の効果の発動の順番を決め、それらを処理する。
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}
