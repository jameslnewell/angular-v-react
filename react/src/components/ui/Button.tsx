import * as React from 'react';
import styled from 'styled-components';
import { A200, A300, A400 } from './colors';
import { focus } from './mixins';
import Spinner from './Spinner';

const StyledButton = styled.button`
  display: inline-block;
  box-sizing: border-box;
  padding: 0.5em 1em;
  color: white;
  font-size: 1em;
  line-height: 1;
  border: 1px solid #ccc;
  border-radius: 2px;
  background-color: ${A300};
  transition: background-color 0.5s, width 0.5s;

  &:hover, &:focus {
    background-color: ${A200};
  }

  &:active {
    background-color: ${A400};
  }

  &:disabled {
    background-color: #ccc;
  }

  ${focus}

`;

export interface ButtonProps {
  isLoading?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

export default class Button extends React.Component<ButtonProps> {

  handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const { onClick } = this.props;
    if (onClick) {
      onClick();
    }
  }

  render() {
    const { isLoading, isDisabled, onClick, children } = this.props;
    return (
      <StyledButton disabled={isLoading || isDisabled} onClick={onClick}>
        {isLoading ? <Spinner color="white" /> : children}
      </StyledButton>
    );
  }
}