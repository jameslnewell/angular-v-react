import * as React from 'react';
import styled from 'styled-components';

export type AlertType = 'error' | 'info';

export interface WrapperProps {
  type: AlertType;
}

const Wrapper = styled.div`
  font-size: 0.85em;
  ${({ type }: WrapperProps) => {
    if (type === 'error') {
      return 'color: red;'
    } else {
      return 'color: blue;';
    }
  }}
`;

export interface AlertProps {
  type: AlertType;
  children?: React.ReactNode;
}

export default class Alert extends React.Component<AlertProps> {
  render() {
    const { type, children } = this.props;
    return (
      <Wrapper type={type}>
        {type === 'error' ? '❌' : 'ℹ️'} {children}
      </Wrapper>
    );
  }
}
