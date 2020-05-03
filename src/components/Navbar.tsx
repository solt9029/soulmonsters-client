import React, { useState, useEffect } from 'react';
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

export default function Navbar(props: Props) {
  const [isCollapseOpen, setIsCollapseOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleCollapse = () => {
    setIsCollapseOpen(!isCollapseOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    setIsCollapseOpen(false);
    setIsDropdownOpen(false);
  }, [props.location.pathname]);

  const startLogout = () => {
    props.startLogout !== undefined && props.startLogout();
  };

  const startLogin = () => {
    props.startLogin !== undefined && props.startLogin();
  };

  return (
    <RNavbar className="py-0" color="light" light expand="md">
      <Container>
        <ServiceLogo tag={Link} to="/" imageUrl="/images/icon.png" />
        <NavbarBrand tag={Link} to="/">
          <Brand>ソウルモンスターズ</Brand>
        </NavbarBrand>
        <NavbarToggler onClick={toggleCollapse} className="my-2" />
        <StyledCollapse isOpen={isCollapseOpen} navbar>
          <Nav className="mr-auto" navbar>
            {props.user?.data !== null && (
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
              if (props.user?.data === null) {
                return (
                  <Button color="info" onClick={startLogin}>
                    ログイン
                  </Button>
                );
              }
              return (
                <Dropdown isOpen={isDropdownOpen} toggle={toggleDropdown}>
                  <UserLogo imageUrl={props.user?.data?.photoURL} />
                  <DropdownMenu>
                    <DropdownItem onClick={startLogout}>
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
