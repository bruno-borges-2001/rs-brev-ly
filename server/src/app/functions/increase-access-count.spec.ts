import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { isLeft, isRight, unwrapEither } from '@/shared/either'
import { makeLink } from '@/test/factories/make-link'
import { eq } from 'drizzle-orm'
import { randomUUID } from 'node:crypto'
import { describe, expect, it } from 'vitest'
import { LinkNotFoundError } from './errors/link-not-found'
import { increaseAccessCount } from './increase-access-count'
describe('increase-access-count', () => {
  it('should be able to increase the access count', async () => {
    const namePattern = randomUUID()

    const link = await makeLink({ url: `${namePattern}.com` })

    const sut = await increaseAccessCount({
      linkId: link.id,
    })

    expect(isRight(sut)).toBe(true)

    const updatedLink = await db.query.links.findFirst({
      where: eq(schema.links.id, link.id),
    })

    expect(updatedLink?.accessCount).toBe(1)
  })

  it('should not be able to find a link', async () => {
    const sut = await increaseAccessCount({
      linkId: 'https://example.com',
    })

    expect(isLeft(sut)).toBe(true)
    expect(unwrapEither(sut)).toBeInstanceOf(LinkNotFoundError)
  })

  it('should not be able to increase the access count with an invalid format', async () => {
    const sut = await increaseAccessCount({
      linkId: 'invalid-format',
    })

    expect(isLeft(sut)).toBe(true)
  })
})
