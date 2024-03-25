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
