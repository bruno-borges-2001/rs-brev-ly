import { deleteLink } from '@/app/functions/delete-link'
import { isLeft, unwrapEither } from '@/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const deleteLinkRoute: FastifyPluginAsyncZod = async server => {
  server.delete(
    '/link/:id',
    {
      schema: {
        summary: 'Delete Link',
        tags: ['links'],
        params: z.object({
          id: z.string(),
        }),
        response: {
          200: z.object({
            link: z.object({
              id: z.string(),
              url: z.string(),
              shortUrl: z.string(),
              accessCount: z.number(),
              createdAt: z.date(),
            }),
            message: z.string(),
          }),
          404: z.object({
            message: z.string(),
          })
        }
      },
    },
    async (request, reply) => {
      const { id } = request.params

      const result = await deleteLink({ linkId: id })

      if (isLeft(result)) {
        switch (result.left.constructor.name) {
          case 'LinkNotFoundError':
            return reply.status(404).send({ message: 'Link not found' })
          default:
            return reply.status(500).send({ message: 'Internal server error' })
        }
      }

      return reply.status(200).send({ link: unwrapEither(result), message: 'Link deleted' })
    }
  )
}
