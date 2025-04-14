import { isLeft, isRight, unwrapEither } from '@/shared/either'
import { makeLink } from '@/test/factories/make-link'
import { randomUUID } from 'node:crypto'
import { describe, expect, it } from 'vitest'
import { LinkNotFoundError } from './errors/link-not-found'
import { findLink } from './find-link'

describe('get-links', () => {
  it('should be able to get the links', async () => {
    const namePattern = randomUUID()

    const link = await makeLink({ url: `${namePattern}.com` })

    const sut = await findLink({
      shortUrl: link.shortUrl,
    })

    expect(isRight(sut)).toBe(true)
    if (!isRight(sut)) return
    expect(unwrapEither(sut).url).toEqual(link.url)
  })

  it('should not be able to find a link', async () => {
    const sut = await findLink({
      shortUrl: 'https://example.com',
    })

    expect(isLeft(sut)).toBe(true)
    expect(unwrapEither(sut)).toBeInstanceOf(LinkNotFoundError)
  })
})
