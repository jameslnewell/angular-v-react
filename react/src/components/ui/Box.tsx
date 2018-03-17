import styled from 'styled-components';

export interface BoxProps {
  mx?: string | number;
  my?: string | number;
  mt?: string | number;
  mr?: string | number;
  mb?: string | number;
  ml?: string | number;
  width?: 'min' | 'max' | number;
}

const mx = ({ mx }: BoxProps) => {
  if (mx) {
    return `margin: 0 ${typeof mx === 'string' ? mx : `${mx}em`};`
  } else {
    return '';
  }
};

const my = ({ my }: BoxProps) => {
  if (my) {
    return `margin: ${typeof my === 'string' ? my : `${my}em`} 0;`
  } else {
    return '';
  }
};

const mt = ({ mt }: BoxProps) => {
  if (mt) {
    return `margin-top: ${typeof mt === 'string' ? mt : `${mt}em`};`
  } else {
    return '';
  }
};

const mr = ({ mr }: BoxProps) => {
  if (mr) {
    return `margin-right: ${typeof mr === 'string' ? mr : `${mr}em`};`
  } else {
    return '';
  }
};

const mb = ({ mb }: BoxProps) => {
  if (mb) {
    return `margin-bottom: ${typeof mb === 'string' ? mb : `${mb}em`};`
  } else {
    return '';
  }
};

const ml = ({ mr }: BoxProps) => {
  if (ml) {
    return `margin-left: ${typeof ml === 'string' ? ml : `${ml}em`};`
  } else {
    return '';
  }
};

const width = ({ width }: BoxProps) => {
  if (width === 'min') {
    return 'flex-shrink: 0;'
  } else if (width === 'max') {
    return 'flex-grow: 1;'
  } else if (width) {
    return `
      width: ${width}%;
    `;
  } else {
    return '';
  }
};

const Box = styled.div`
  display: flex;
  margin: 0;
  padding: 0;
  ${mx}
  ${my}
  ${mt}
  ${mr}
  ${mb}
  ${ml}
  ${width}
`;

export default Box;