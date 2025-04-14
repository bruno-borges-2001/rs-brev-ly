import { makeLink } from '@/test/factories/make-link'
import { randomUUID } from 'node:crypto'
import { describe, expect, it, vi } from 'vitest'
import { exportLinks } from './export-links'

import * as upload from '@/infra/storage/upload-file-to-storage'
import { isRight, unwrapEither } from '@/shared/either'

describe('export-links', () => {
  it('should be able export links', async () => {
    const filename = `${randomUUID()}.csv`

    const uploadStub = vi
      .spyOn(upload, 'uploadFileToStorage')
      .mockImplementationOnce(async () => {
        return {
          key: filename,
          url: `https://example.com/${filename}`,
        }
      })

    const namePattern = randomUUID()

    const link1 = await makeLink({ url: `${namePattern}.com` })
    const link2 = await makeLink({ url: `${namePattern}.com` })
    const link3 = await makeLink({ url: `${namePattern}.com` })
    const link4 = await makeLink({ url: `${namePattern}.com` })
    const link5 = await makeLink({ url: `${namePattern}.com` })

    const sut = await exportLinks({
      searchQuery: namePattern,
    })

    const generatedCSVStream = uploadStub.mock.calls[0][0].contentStream

    const csvAsString = await new Promise<string>((resolve, reject) => {
      const chunks: Buffer[] = []

      generatedCSVStream.on('data', (chunk: Buffer) => {
        chunks.push(chunk)
      })

      generatedCSVStream.on('end', () => {
        resolve(Buffer.concat(chunks).toString('utf-8'))
      })

      generatedCSVStream.on('error', reject)
    })

    const csvAsArray = csvAsString
      .trim()
      .split('\n')
      .map(line => line.split(','))

    expect(isRight(sut)).toBe(true)
    expect(unwrapEither(sut)).toEqual({
      reportUrl: `https://example.com/${filename}`,
    })
    expect(csvAsArray).toEqual([
      ['ID', 'URL', 'Short URL', 'Access Count', 'Created At'],
      [link1.id, link1.url, link1.shortUrl, String(link1.accessCount), expect.any(String)],
      [link2.id, link2.url, link2.shortUrl, String(link2.accessCount), expect.any(String)],
      [link3.id, link3.url, link3.shortUrl, String(link3.accessCount), expect.any(String)],
      [link4.id, link4.url, link4.shortUrl, String(link4.accessCount), expect.any(String)],
      [link5.id, link5.url, link5.shortUrl, String(link5.accessCount), expect.any(String)],
    ])
  })
})
