import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { isRight } from '@/shared/either'
import { makeLink } from '@/test/factories/make-link'
import { eq } from 'drizzle-orm'
import { randomUUID } from 'node:crypto'
import { describe, expect, it } from 'vitest'
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
})
