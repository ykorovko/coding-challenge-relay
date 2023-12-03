// @flow strict
import Link from 'next/link';
import { memo, useCallback, useState, useEffect } from 'react';
import {
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Button,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

type Props = {
  children: React$Node,
};

const MainContainer = ({ children }: Props): React$Node => {
  return (
    <>
      <AppBar position="static">
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton color="inherit" aria-label="open drawer">
            <MenuIcon />
          </IconButton>

          <ul style={{ display: 'flex', listStyleType: 'none' }}>
            <li>
              <Link href="/">
                <Button style={{ color: '#fff' }}>Home</Button>
              </Link>
            </li>

            <li>
              <Link href="/create">
                <Button style={{ color: '#fff' }}>Create</Button>
              </Link>
            </li>
          </ul>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl">{children}</Container>
    </>
  );
};

export default (memo<Props>(MainContainer): React$AbstractComponent<
  Props,
  mixed,
>);
