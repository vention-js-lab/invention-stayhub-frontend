export enum AccommodationListSortBy {
  Price = 'price',
  AllowedNumberOfPeople = 'allowedNumberOfPeople',
  NumberOfRooms = 'numberOfRooms',
  CreatedAt = 'createdAt',
}

export const accommdationSortByMap = [
  { key: AccommodationListSortBy.Price, name: 'Price' },
  { key: AccommodationListSortBy.NumberOfRooms, name: 'Count of rooms' },
  { key: AccommodationListSortBy.AllowedNumberOfPeople, name: 'Allowed number of people' },
  { key: AccommodationListSortBy.CreatedAt, name: 'Creation date' },
];
