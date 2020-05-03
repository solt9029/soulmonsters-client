import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { NavLink as RRDNavLink, RouteComponentProps } from 'react-router-dom';
import {
  Collapse,
  Navbar as RNavbar,
  NavbarToggler,
  Button,
  NavbarBrand,
  Nav,
  NavLink as RNavLink,
} from 'reactstrap';
import { UserInterface } from '../models/User';

const Logo = styled(NavbarBrand)`
  background: url('/images/icon.png') no-repeat left center;
  background-size: contain;
  height: 45px;
  width: 45px;
`;

const Brand = styled.span`
  font-size: 1.2em;
`;

const StyledNavLink = styled(RNavLink)`
  font-size: 1em;
`;

interface Props extends RouteComponentProps {
  user?: UserInterface;
}

interface State {
  isOpen: boolean;
}

export default class Navbar extends Component<Props, State> {
  state = { isOpen: false };

  toggle = () => {
    this.setState((state) => ({ isOpen: !state.isOpen }));
  };

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.location.pathname === nextProps.location.pathname) {
      return;
    }
    this.setState({ isOpen: false });
  }

  render() {
    return (
      <RNavbar className="py-0" color="light" light expand="md">
        <Logo />
        <NavbarBrand>
          <Brand>ソウルモンスターズ</Brand>
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} className="my-2" />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {this.props.user?.data !== null && (
              <React.Fragment>
                <StyledNavLink tag={RRDNavLink} exact to="/deck">
                  デッキ構築
                </StyledNavLink>
                <StyledNavLink tag={RRDNavLink} exact to="/game">
                  ソウルバトル
                </StyledNavLink>
              </React.Fragment>
            )}

            <StyledNavLink tag={RRDNavLink} exact to="/rule">
              ルール
            </StyledNavLink>
            <StyledNavLink tag={RRDNavLink} exact to="/help">
              ヘルプ
            </StyledNavLink>
          </Nav>

          {this.props.location.pathname === '/deck' && (
            <Fragment>
              <Button color="info" className="my-2 mr-2">
                ソウルバトル開始！
              </Button>
            </Fragment>
          )}
        </Collapse>
      </RNavbar>
    );
  }
}
