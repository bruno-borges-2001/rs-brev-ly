import { createLink } from '@/app/functions/create-link'
import { isLeft, unwrapEither } from '@/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const createLinkRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/link/create',
    {
      schema: {
        summary: 'Create a link',
        consumes: ['application/json'],
        tags: ['links'],
        body: z.object({
          url: z.string().url(),
          shortUrl: z.string().min(1, { message: 'Campo obrigatório' }),
        }),
        response: {
          201: z
            .object({
              link: z.object({
                id: z.string(),
                url: z.string(),
                shortUrl: z.string(),
                accessCount: z.number(),
                createdAt: z.date(),
              }),
            })
            .describe('Create successful.'),
          400: z
            .object({ message: z.string() })
            .describe('Invalid link.'),
        },
      },
    },
    async (request, reply) => {
      const { url, shortUrl } = request.body

      if (!url || !shortUrl) {
        return reply.status(400).send({ message: 'No link provided' })
      }

      const result = await createLink({ url, shortUrl })

      if (isLeft(result)) {
        switch (result.left.constructor.name) {
          case "LinkAlreadyExistsError":
            return reply.status(400).send({ message: 'Link already exists.' })
          default:
            return reply.status(500).send({ message: 'Internal error' })
        }
      }

      return reply.status(201).send({ link: unwrapEither(result) })
    }
  )
}
