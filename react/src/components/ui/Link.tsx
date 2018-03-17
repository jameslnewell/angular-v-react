import * as React from 'react';
import styled from 'styled-components';
import { B200, B300, B400 } from './colors';

const StyledLink = styled.a`
  color: ${B300};
  &:hover, &:focus {
    color: ${B200};
  }
  &:active {
    color: ${B400};
  }
`;

export interface LinkProps {
  href?: string;
  target?: string;
  children?: React.ReactNode;
}

export default class Link extends React.Component<LinkProps> {
  render() {
    const { href, target, children } = this.props;
    return (
      <StyledLink href={href} target={target}>
        {children}
      </StyledLink>
    );
  }
}