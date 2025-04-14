import { AxiosError } from "axios";
import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { api } from "../api";
import { LogoIcon } from "../assets";

export default function Access() {
  const { shortUrl } = useParams()
  const navigate = useNavigate()

  const handleRedirect = useCallback(async () => {
    try {
      const response = await api.get<{ url: string }>('/link/access', { params: { shortUrl } })
      window.location.href = response.data.url
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.status === 404) {
          navigate('/404')
          return
        }
      }
    }
  }, [shortUrl, navigate])

  useEffect(() => {
    // DEBOUNCE CRIADO PARA EVITAR CHAMADA DUPLA DEVIDO AO STRICT MODE DO REACT
    const timeout = setTimeout(handleRedirect, 1000)
    return () => clearTimeout(timeout)
  }, [handleRedirect])

  return (
    <div className="h-dvh w-screen flex items-center justify-center">
      <div className="bg-gray-100 flex flex-col gap-6 items-center justify-center px-12 py-16 rounded-lg text-center">
        <LogoIcon />
        <p className="t-xl text-gray-600">Redirecionando...</p>
        <p className="t-md text-gray-500">
          O link será aberto automaticamente em alguns instantes.
          <br />
          Não foi redirecionado? <button onClick={handleRedirect} className="text-blue-base hover:underline cursor-pointer">Acesse aqui</button>
        </p>
      </div>
    </div>
  )
}
