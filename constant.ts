import type { GroupBase } from 'react-select';

export const CLOTH_PAGE_SIZE = 10;
export const WORKER_PAGE_SIZE = 8;
export const CUTTING_ASSIGN_PAGE_SIZE = 10;

export const options: GroupBase<any>[] = [
  {
    label: 'Sizes',
    options: [
      { value: 's', label: 'S' },
      { value: 'm', label: 'M' },
      { value: 'l', label: 'L' },
      { value: 'xl', label: 'XL' },
      { value: 'xxl', label: 'XXL' },
      { value: 'f', label: 'Free' },
    ],
  },
];

export const SELECT_GRAY_THEME_COLOR = '#8f8f8f20';
export const SELECT_GRAY_THEME_COLOR_PRESSED = '#8f8f8f40';

export const generateTheme = (theme: any) => {
  return {
    ...theme,
    borderRadius: 6,
    colors: {
      ...theme.colors,
      primary: '#3333334e',
      primary25: SELECT_GRAY_THEME_COLOR,
      dangerLight: '#f1c0c0',
      danger: '#5d3535',
      primary50: SELECT_GRAY_THEME_COLOR_PRESSED,
    },
  };
};
