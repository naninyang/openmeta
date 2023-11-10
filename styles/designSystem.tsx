export const hex: { [key: string]: string } = {
  black: '#000000',
  white: '#FFFFFF',
  dark: '#171717',
  light: '#E5C3C3',
  danger: '#ED1651',
  deep: '#26348E',
  accent: '#492071',
  night: '#212875',
  deepnight: '#A3A19C',
  code_bg: '#212121',
  code_props: '#AADAFA',
  code_value: '#C5947C',
  code_misc: '#DCDCDC',
};

export const mq = {
  maxExtraSmall: `@media screen and (max-width: ${rem(575)})`,
  minSmall: `@media screen and (min-width: ${rem(576)})`,
  maxSmall: `@media screen and (max-width: ${rem(767)})`,
  minMedium: `@media screen and (min-width: ${rem(768)})`,
  maxMedium: `@media screen and (max-width: ${rem(991)})`,
  minLarge: `@media screen and (min-width: ${rem(992)})`,
  maxLarge: `@media screen and (max-width: ${rem(1199)})`,
  minExtraLarge: `@media screen and (min-width: ${rem(1200)})`,
  maxExtraLarge: `@media screen and (max-width: ${rem(1399)})`,
};

export const ar: { support: string } = {
  support: `@supports not (aspect-ratio: 1)`,
};

export const mixIn: { [key: string]: any } = {
  row: {
    display: 'flex',
    flexWrap: 'wrap',
    '&>*': {
      flexShrink: 0,
      width: '100%',
      maxWidth: '100%',
    },
  },
  col: {
    flex: '1 0 0%',
  },
  coln: {
    flex: '0 0 auto',
  },
  colAuto: {
    flex: '0 0 auto',
    width: 'auto',
  },
  ellipsis: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  screenReaderOnly: {
    position: 'absolute',
    overflow: 'hidden',
    margin: 0,
    width: '1px',
    height: '1px',
    clip: 'rect(1px, 1px, 1px, 1px)',
  },
  visuallyHiddenFocuable: {
    overflow: 'visible',
    zIndex: 20,
    width: 'auto',
    height: 'auto',
    clip: 'auto',
  },
  imageRendering: {
    imageRendering: '-webkit-optimize-contrast',
    backfaceVisibility: 'hidden',
  },
};

export function lineAbbr(clamp: number, height: number, lineheight: number): string {
  return `
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${clamp};
  max-height: ${height / 16}rem;
  line-height: ${lineheight};
  `;
}

export function rem(px: number): string {
  const result = px / 16;
  return `${result}rem`;
}

export function vw(px: number, width: number): string {
  const result = (px * 100) / width;
  return `${result}vw`;
}
