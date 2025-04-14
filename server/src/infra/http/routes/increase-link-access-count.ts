import { increaseAccessCount } from '@/app/functions/increase-access-count'
import { isLeft, unwrapEither } from '@/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const increaseLinkAccessCountRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/link/:id',
    {
      schema: {
        summary: 'Increase Link Access Count',
        tags: ['links'],
        params: z.object({
          id: z.string(),
        }),
        response: {
          200: z.object({
            link: z.object({
              url: z.string(),
              shortUrl: z.string(),
              accessCount: z.number(),
            }),
          }),
          404: z.object({
            message: z.string(),
          })
        }
      },
    },
    async (request, reply) => {
      const { id } = request.params

      const result = await increaseAccessCount({ linkId: id })

      if (isLeft(result)) {
        switch (result.left.constructor.name) {
          case 'LinkNotFoundError':
            return reply.status(404).send({ message: 'Link not found' })
          default:
            return reply.status(500).send({ message: 'Internal server error' })
        }
      }

      return reply.status(200).send({ link: unwrapEither(result) })
    }
  )
}
