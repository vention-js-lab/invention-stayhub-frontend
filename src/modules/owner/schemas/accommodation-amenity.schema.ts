import { z } from 'zod';

export const amenitySchema = z.object({
  hasWifi: z.boolean().optional(),
  hasParking: z.boolean().optional(),
  hasSwimmingPool: z.boolean().optional(),
  hasPetAllowance: z.boolean().optional(),
  hasBackyard: z.boolean().optional(),
  hasSmokingAllowance: z.boolean().optional(),
  hasHospitalNearby: z.boolean().optional(),
  hasLaundryService: z.boolean().optional(),
  hasKitchen: z.boolean().optional(),
  hasAirConditioning: z.boolean().optional(),
  hasTv: z.boolean().optional(),
  hasAirportTransfer: z.boolean().optional(),
  isCloseToCenter: z.boolean().optional(),
  isChildFriendly: z.boolean().optional(),
  isQuietArea: z.boolean().optional(),
});

export type CreateAccommodationAmenity = z.infer<typeof amenitySchema>;
