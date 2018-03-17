import * as React from 'react';
import styled from 'styled-components';
import { A300 } from './colors';
import { focus } from './mixins';

const StyledInput = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: 0 0.5em;
  font-size: 1em;
  line-height: 2em;
  border-radius: 2px;
  border: 1px solid #ccc;
  ${focus}
`;

export interface InputProps {
  autoFocus?: boolean;
  placeholder?: string;
  onChange?: (val: string) => void;
}

export default class Input extends React.Component<InputProps> {

  el?: HTMLInputElement;

  focus() {
    if (this.el) {
      this.el.focus();
    }
  }

  select() {
    if (this.el) {
      this.el.select();
    }
  }

  handleMount = (el: HTMLInputElement) => {
    this.el = el;
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(event.target.value);
    }
  }

  render() {
    const { autoFocus, placeholder } = this.props;
    return (
      <StyledInput autoFocus={autoFocus} placeholder={placeholder} innerRef={this.handleMount} onChange={this.handleChange} />
    );
  }

}