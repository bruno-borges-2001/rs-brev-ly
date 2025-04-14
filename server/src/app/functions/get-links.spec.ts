import { isRight, unwrapEither } from '@/shared/either'
import { makeLink } from '@/test/factories/make-link'
import { randomUUID } from 'node:crypto'
import { describe, expect, it } from 'vitest'
import { getLinks } from './get-links'

describe('get-links', () => {
  it('should be able to get the links', async () => {
    const namePattern = randomUUID()

    const link1 = await makeLink({ url: `${namePattern}.com` })
    const link2 = await makeLink({ url: `${namePattern}.com` })
    const link3 = await makeLink({ url: `${namePattern}.com` })
    const link4 = await makeLink({ url: `${namePattern}.com` })
    const link5 = await makeLink({ url: `${namePattern}.com` })

    const sut = await getLinks({
      searchQuery: namePattern,
    })

    expect(isRight(sut)).toBe(true)
    expect(unwrapEither(sut).total).toEqual(5)
    expect(unwrapEither(sut).links).toEqual([
      expect.objectContaining({ id: link5.id }),
      expect.objectContaining({ id: link4.id }),
      expect.objectContaining({ id: link3.id }),
      expect.objectContaining({ id: link2.id }),
      expect.objectContaining({ id: link1.id }),
    ])
  })
})
