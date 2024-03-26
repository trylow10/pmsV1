import type { GroupBase } from 'react-select';

export const PAGE_SIZE = 3;

export const options: GroupBase<any>[] = [
  {
    label: 'Sizes',
    options: [
      { value: 's', label: 'S' },
      { value: 'm', label: 'M' },
      { value: 'l', label: 'L' },
    ],
  },
];

export const SELECT_GRAY_THEME_COLOR = '#8f8f8f20';
export const SELECT_GRAY_THEME_COLOR_PRESSED = '#8f8f8f40';
