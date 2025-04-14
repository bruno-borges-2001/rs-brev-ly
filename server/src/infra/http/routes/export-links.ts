import { exportLinks } from '@/app/functions/export-links'
import { unwrapEither } from '@/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const exportLinksRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/link/export',
    {
      schema: {
        summary: 'Export Links',
        tags: ['links'],
        querystring: z.object({
          searchQuery: z.string().optional(),
        }),
        response: {
          200: z.object({
            url: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { searchQuery } = request.query

      const result = await exportLinks({ searchQuery })
      const { reportUrl } = unwrapEither(result)
      return reply.status(201).send({ url: reportUrl })
    }
  )
}
