import { A300 } from './colors';

export const focus = `
  outline: none;
  &:focus {
    border: 1px solid ${A300};
    box-shadow: #ccc 0px 0px 3px 1px;
  }
`;