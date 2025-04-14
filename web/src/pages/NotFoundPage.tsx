import { Link } from "react-router";
import { NotFound } from "../assets";

export default function NotFoundPage() {
  return (
    <div className="h-dvh w-screen flex items-center justify-center">
      <div className="bg-gray-100 flex flex-col gap-6 items-center justify-center px-12 py-16 rounded-lg text-center">
        <NotFound />
        <p className="t-xl text-gray-600">Link não encontrado</p>
        <p className="t-md text-gray-500">
          <br />
          O link que você está tentando acessar não existe, foi removido ou é uma URL inválida.
          Saiba mais em <Link to="/" replace className="text-blue-base hover:underline cursor-pointer">brev.ly.</Link>
        </p>
      </div>
    </div>
  )
}
