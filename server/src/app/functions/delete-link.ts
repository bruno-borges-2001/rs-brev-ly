import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { LinkOut } from '@/infra/db/types'
import { type Either, makeLeft, makeRight } from '@/shared/either'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { LinkNotFoundError } from './errors/link-not-found'

const deleteLinkInput = z.object({
  linkId: z.string(),
})

type DeleteLinkInput = z.input<typeof deleteLinkInput>


export async function deleteLink(
  input: DeleteLinkInput
): Promise<Either<LinkNotFoundError, LinkOut>> {
  const { linkId } = deleteLinkInput.parse(input)

  const response = await db.delete(schema.links).where(eq(schema.links.id, linkId)).returning()

  if (response.length === 0) {
    return makeLeft(new LinkNotFoundError())
  }

  return makeRight({
    id: response[0].id,
    url: response[0].url,
    shortUrl: response[0].shortUrl,
    accessCount: response[0].accessCount,
    createdAt: response[0].createdAt,
  })
}
