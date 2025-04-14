import { isLeft, isRight, unwrapEither } from '@/shared/either'
import { makeLink } from '@/test/factories/make-link'
import { randomUUID } from 'node:crypto'
import { describe, expect, it } from 'vitest'
import { deleteLink } from './delete-link'
import { LinkNotFoundError } from './errors/link-not-found'

describe('get-links', () => {
  it('should be able to delete a link', async () => {
    const namePattern = randomUUID()

    const link = await makeLink({ url: `${namePattern}.com` })

    const sut = await deleteLink({
      linkId: link.id,
    })

    expect(isRight(sut)).toBe(true)
    if (!isRight(sut)) return
    expect(unwrapEither(sut).url).toEqual(link.url)
    expect(unwrapEither(sut).shortUrl).toEqual(link.shortUrl)
    expect(unwrapEither(sut).accessCount).toEqual(link.accessCount)
  })

  it('should not be able to delete a link that does not exist', async () => {
    const sut = await deleteLink({
      linkId: 'https://example.com',
    })

    expect(isLeft(sut)).toBe(true)
    expect(unwrapEither(sut)).toBeInstanceOf(LinkNotFoundError)
  })
})
