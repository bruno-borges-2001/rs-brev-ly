import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { LinkOut } from '@/infra/db/types'
import { type Either, makeLeft, makeRight } from '@/shared/either'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { LinkAlreadyExistsError } from './errors/link-already-exists'

const createLinkInput = z.object({
  url: z.string().url(),
  shortUrl: z.string().min(1),
})

type CreateLinkInput = z.input<typeof createLinkInput>

export async function createLink(
  input: CreateLinkInput
): Promise<Either<LinkAlreadyExistsError, LinkOut>> {
  const { url, shortUrl } = createLinkInput.parse(input)

  const existingLink = await db.select({
    id: schema.links.id,
  }).from(schema.links).where(eq(schema.links.shortUrl, shortUrl))

  if (existingLink.length > 0) {
    return makeLeft(new LinkAlreadyExistsError())
  }

  const response = await db.insert(schema.links).values({
    url,
    shortUrl,
  }).returning()

  return makeRight({
    id: response[0].id,
    url: response[0].url,
    shortUrl: response[0].shortUrl,
    accessCount: response[0].accessCount,
    createdAt: response[0].createdAt,
  })
}
