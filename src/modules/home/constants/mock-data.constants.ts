import { type AccommodationImage } from '../types/accommodation-image.type';
import AccomImage from '#/assets/images/card-temp-image.jpg';

export const MockData = {
  id: '805fefa5-4757-447f-9228-1eac990f2189',
  name: 'Lake House',
  description: 'Serene house overlooking a picturesque lake, perfect for relaxation.',
  coverImage: 'https://example.com/images/lakehouse.jpg',
  price: 350.0,
  available: true,
  availableFrom: '2024-05-31T19:00:00.000Z',
  availableTo: '2024-09-01T19:00:00.000Z',
  squareMeters: 140,
  numberOfRooms: 4,
  allowedNumberOfPeople: 8,
  createdAt: '2024-11-21T11:00:50.481Z',
  updatedAt: '2024-11-21T11:00:50.481Z',
  deletedAt: null,
  ownerId: '18eb5efe-fa4e-4e7b-916a-42fd2511a360',
  address: {
    id: 'd4414073-bd76-4f52-803f-d123f3928270',
    street: '50 Lakeside Rd',
    city: 'Lake Tahoe',
    country: 'USA',
    zipCode: '96150',
    latitude: '38.939900',
    longitude: '-119.977200',
    createdAt: '2024-11-21T11:00:50.500Z',
    updatedAt: '2024-11-21T11:00:50.500Z',
    accommodationId: '805fefa5-4757-447f-9228-1eac990f2189',
  },
  amenity: {
    id: '3fc6ddb8-634b-4876-93e3-7f69a4677190',
    hasWifi: true,
    hasParking: true,
    hasSwimmingPool: true,
    hasPetAllowance: true,
    hasBackyard: true,
    hasSmokingAllowance: false,
    hasHospitalNearby: false,
    hasLaundryService: false,
    hasKitchen: true,
    hasAirConditioning: false,
    hasTv: true,
    hasAirportTransfer: false,
    isCloseToCenter: false,
    isChildFriendly: true,
    isQuietArea: true,
    createdAt: '2024-11-21T11:00:50.507Z',
    updatedAt: '2024-11-21T11:00:50.507Z',
    accommodationId: '805fefa5-4757-447f-9228-1eac990f2189',
  },
  images: [
    {
      id: 'b4ff34a3-febd-48a5-adbf-3d020a014b29',
      url: 'https://example.com/images/lakehouse_view1.jpg',
      createdAt: '2024-11-21T11:00:50.513Z',
      updatedAt: '2024-11-21T11:00:50.513Z',
      accommodationId: '805fefa5-4757-447f-9228-1eac990f2189',
    },
    {
      id: '5b431efe-4755-4676-a2f7-ef5911ce4a64',
      url: 'https://example.com/images/lakehouse_view2.jpg',
      createdAt: '2024-11-21T11:00:50.513Z',
      updatedAt: '2024-11-21T11:00:50.513Z',
      accommodationId: '805fefa5-4757-447f-9228-1eac990f2189',
    },
  ],
};
export const images: AccommodationImage[] = [
  {
    id: '1',
    url: AccomImage,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    accommodationId: '101',
  },
  {
    id: '2',
    url: AccomImage,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    accommodationId: '101',
  },
  {
    id: '3',
    url: AccomImage,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    accommodationId: '101',
  },
  {
    id: '4',
    url: AccomImage,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    accommodationId: '101',
  },
  {
    id: '5',
    url: AccomImage,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    accommodationId: '101',
  },
];