import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from '@nextui-org/react';
import { Link as RouterLink } from 'react-router-dom';
import { LogoHNB } from '../assets/LogoHNB';

const Header = () => {
  return (
    <Navbar>
      <RouterLink to={'/'}>
        <NavbarBrand>
          <LogoHNB />
          <p className="font-bold text-inherit">HNB</p>
        </NavbarBrand>
      </RouterLink>
      <NavbarContent
        className="hidden sm:flex gap-4"
        justify="center"
      ></NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
