import * as React from 'react';
import styled, { keyframes } from 'styled-components';

const bounceDelay = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  } 40% {
    transform: scale(1.0);
  }
`;

const Ball = styled.div`
  width: 1em;
  height: 1em;
  background-color: ${({ color = 'black' }: { color?: string }) => color};
  border-radius: 100%;
  display: inline-block;
  animation: ${bounceDelay} 1.4s infinite ease-in-out both;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 56px;

  ${Ball}:nth-child(1) {
    animation-delay: -0.32s;
  }

  ${Ball}:nth-child(2) {
    animation-delay: -0.16s;
  }

`;

export interface SpinnerProps {
  color?: string;
}

export default class Spinner extends React.Component<SpinnerProps> {
  render() {
    const { color } = this.props;
    return (
      <Wrapper>
        <Ball color={color} />
        <Ball color={color} />
        <Ball color={color} />
      </Wrapper>
    );
  }
}