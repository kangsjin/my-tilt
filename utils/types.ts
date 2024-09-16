import { z } from "zod";

export const User = z.object({
  name: z.string(),
  email: z.string().email(),
});

export const Property = z.object({
  _id: z.string(),
  name: z.string(),
  type: z.string(),
  beds: z.number(),
  baths: z.number(),
  square_feet: z.number(),
  rent: z.string(),
  location: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zipcode: z.string(),
  }),
  amenities: z.array(z.string()),
  rates: z.object({
    weekly: z.number(),
    monthly: z.number(),
    nightly: z.number(),
  }),
  seller_info: z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
  }),
  images: z.array(z.string()),
});

export type PropertyType = z.infer<typeof Property>;
