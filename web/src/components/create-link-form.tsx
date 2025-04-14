import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FieldErrors, FieldPath, useForm } from "react-hook-form";

import { Warning } from "phosphor-react";
import useCreateLink from "../api/use-create-link";
import Button from "./__ui__/button";
import Input from "./__ui__/input";

const PREFIX = 'brev.ly/'

const createLinkSchema = z.object({
  originalUrl: z.string().min(1, { message: 'Campo obrigatório' }).url({ message: 'URL inválida' }),
  shortUrl: z
    .string()
    .min(1, { message: 'Campo obrigatório' })
    .refine((value) => encodeURIComponent(value) === value, { message: 'URL inválida' })
    .transform((value) => `${PREFIX}${value}`)
})

type CreateLinkFormData = z.infer<typeof createLinkSchema>

const ErrorMessage = ({ field, error }: { field: FieldPath<CreateLinkFormData>, error: FieldErrors<CreateLinkFormData> }) => {
  if (!error[field]?.message) return null

  return (
    <div className="flex items-center gap-2">
      <Warning className="text-red-danger" />
      <p className="t-sm text-gray-500">{error[field]?.message}</p>
    </div>
  )
}

export default function CreateLinkForm() {
  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset
  } = useForm<z.infer<typeof createLinkSchema>>({
    resolver: zodResolver(createLinkSchema)
  })

  const { mutate: createLink, isLoading } = useCreateLink()

  const onSubmit = async (data: CreateLinkFormData) => {
    createLink({ url: data.originalUrl, shortUrl: data.shortUrl }, { onSuccess: () => reset() })

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="sm:sticky top-10 bg-gray-100 min-w-90 w-full sm:max-w-95 p-5 rounded-lg flex flex-col gap-6 h-fit">
      <p className="t-lg text-gray-600">Novo link</p>

      <div className="flex flex-col gap-4">
        <Input
          label="link original"
          placeholder="www.exemplo.com.br"
          {...register('originalUrl')}
          append={<ErrorMessage field="originalUrl" error={errors} />}
          variant={errors.originalUrl?.message ? "error" : "default"}
        />
        <Controller
          name="shortUrl"
          control={control}
          render={({ field }) => (
            <Input
              label="link encurtado"
              placeholder={PREFIX}
              prefix={PREFIX}
              {...field}
              value={field.value ?? ""}
              append={<ErrorMessage field="shortUrl" error={errors} />}
              variant={errors.shortUrl?.message ? "error" : "default"}
            />
          )}
        />
      </div>

      <Button type="submit" disabled={isLoading || isSubmitting}>Salvar Link</Button>
    </form>
  )
}