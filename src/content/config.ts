import { defineCollection, z } from 'astro:content';

const countriesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    introText: z.string().optional(),
  }),
});

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    dateModified: z.coerce.date().optional(),
    author: z.string().default('SMSPM Team'),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  'countries': countriesCollection,
  'blog': blogCollection,
};
