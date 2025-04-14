import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { faker } from '@faker-js/faker'
import type { InferInsertModel } from 'drizzle-orm'

export async function makeLink(
  overrides?: Partial<InferInsertModel<typeof schema.links>>
) {
  const url = faker.internet.url()
  const result = await db
    .insert(schema.links)
    .values({
      url,
      shortUrl: `https://example.com/${url}`,
      ...overrides,
    })
    .returning()

  return result[0]
}
