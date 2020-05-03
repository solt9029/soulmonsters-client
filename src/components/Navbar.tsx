import React, { Component } from 'react';
import styled from 'styled-components';
import { NavLink as RRDNavLink, RouteComponentProps } from 'react-router-dom';
import {
  Collapse,
  Navbar as RNavbar,
  NavbarToggler,
  Button,
  NavbarBrand,
  Nav,
  Container,
  NavLink as RNavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { UserInterface } from '../models/User';
import { Link } from 'react-router-dom';

const ServiceLogo = styled(NavbarBrand)`
  background: url('/images/icon.png') no-repeat left center;
  background-size: contain;
  border-radius: 50%;
  height: 45px;
  width: 45px;
`;

const UserLogo = styled(DropdownToggle)`
  ${(props) => `background: url('${props.imageUrl}') no-repeat left center;`}
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

const Brand = styled.span`
  font-size: 1em;
`;

const StyledNavLink = styled(RNavLink)`
  font-size: 1em;
`;

const StyledCollapse = styled(Collapse)`
  margin-top: 5px;
  margin-bottom: 5px;
`;

interface Props extends RouteComponentProps {
  user?: UserInterface;
  startLogin?: () => void;
  startLogout?: () => void;
}

interface State {
  isCollapseOpen: boolean;
  isDropdownOpen: boolean;
}

export default class Navbar extends Component<Props, State> {
  state = { isCollapseOpen: false, isDropdownOpen: false };

  toggleCollapse = () => {
    this.setState((state) => ({ isCollapseOpen: !state.isCollapseOpen }));
  };

  toggleDropdown = () => {
    this.setState((state) => ({ isDropdownOpen: !state.isDropdownOpen }));
  };

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.location.pathname === nextProps.location.pathname) {
      return;
    }
    this.setState({ isCollapseOpen: false });
  }

  startLogout = () => {
    if (this.props.startLogout !== undefined) {
      this.props.startLogout();
    }
  };

  startLogin = () => {
    if (this.props.startLogin !== undefined) {
      this.props.startLogin();
    }
  };

  render() {
    return (
      <RNavbar className="py-0" color="light" light expand="md">
        <Container>
          <ServiceLogo tag={Link} to="/" imageUrl="/images/icon.png" />
          <NavbarBrand>
            <Brand>ソウルモンスターズ</Brand>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleCollapse} className="my-2" />
          <StyledCollapse isOpen={this.state.isCollapseOpen} navbar>
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
            <Nav>
              {(() => {
                if (this.props.user?.data === null) {
                  return (
                    <Button
                      color="info"
                      className="my-2 mr-2"
                      onClick={this.startLogin}
                    >
                      ログイン
                    </Button>
                  );
                }
                return (
                  <Dropdown
                    isOpen={this.state.isDropdownOpen}
                    toggle={this.toggleDropdown}
                  >
                    <UserLogo imageUrl={this.props.user?.data?.photoURL} />
                    <DropdownMenu>
                      <DropdownItem onClick={this.startLogout}>
                        ログアウト
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                );
              })()}
            </Nav>
          </StyledCollapse>
        </Container>
      </RNavbar>
    );
  }
}
