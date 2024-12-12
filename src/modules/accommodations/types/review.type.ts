export interface Review {
  id: string;
  content: string | null;
  rating: number;
  createdAt: string;
  updatedAt: string;
  user: {
    firstName: string | null;
    lastName: string | null;
    photo: string | null;
    createdAt: string;
    country: string | null;
  };
}
