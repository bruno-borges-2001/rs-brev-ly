import { findLink } from '@/app/functions/find-link'
import { increaseAccessCount } from '@/app/functions/increase-access-count'
import { isLeft, unwrapEither } from '@/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const accessLinkRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/link/access',
    {
      schema: {
        summary: 'Access Link',
        tags: ['links'],
        querystring: z.object({
          shortUrl: z.string(),
        }),
        response: {
          200: z.object({
            url: z.string(),
          }),
          404: z.object({
            message: z.string(),
          })
        }
      },
    },
    async (request, reply) => {
      const { shortUrl } = request.query

      const result = await findLink({ shortUrl })

      if (isLeft(result)) {
        switch (result.left.constructor.name) {
          case 'LinkNotFoundError':
            return reply.status(404).send({ message: 'Link not found' })
          default:
            return reply.status(500).send({ message: 'Internal server error' })
        }
      }

      const { id, url } = unwrapEither(result)

      await increaseAccessCount({ linkId: id })

      return reply.status(200).send({ url })
    }
  )
}
