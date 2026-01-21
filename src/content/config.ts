import { defineCollection, z } from 'astro:content';

const countriesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    introText: z.string().optional(),
    // We can expand this schema later as needed
  }),
});

export const collections = {
  'countries': countriesCollection,
};
