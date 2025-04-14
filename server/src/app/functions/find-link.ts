import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/shared/either'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { LinkNotFoundError } from './errors/link-not-found'

const findLinkInput = z.object({
  shortUrl: z.string().min(1),
})

type FindLinkInput = z.input<typeof findLinkInput>

export async function findLink(
  input: FindLinkInput
): Promise<Either<LinkNotFoundError, { id: string, url: string }>> {
  const { shortUrl } = findLinkInput.parse(input)

  const link = await db.select({
    id: schema.links.id,
    url: schema.links.url,
  }).from(schema.links).where(eq(schema.links.shortUrl, shortUrl))

  if (link.length === 0) {
    return makeLeft(new LinkNotFoundError())
  }

  return makeRight({ id: link[0].id, url: link[0].url })
}
