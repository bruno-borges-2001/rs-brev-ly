import { isRight, unwrapEither } from '@/shared/either'
import { randomUUID } from 'node:crypto'
import { describe, expect, it } from 'vitest'
import { createLink } from './create-link'

describe('create-link', () => {
  it('should be able to create a link', async () => {
    const shortUrl = `https://example.com/example/${randomUUID()}`
    const sut = await createLink({
      url: 'https://example.com',
      shortUrl,
    })

    expect(isRight(sut)).toBe(true)
    if (!isRight(sut)) return
    expect(unwrapEither(sut).shortUrl).toBe(shortUrl)
  })
})
