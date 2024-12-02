export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC',
}

export const sortOrderMap = [
  { key: SortOrder.Asc, name: 'From lower to highest' },
  { key: SortOrder.Desc, name: 'From highest to lower' },
];
