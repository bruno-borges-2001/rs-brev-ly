import { Link } from "phosphor-react";

export default function NoLinksState() {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-3 p-6 text-gray-500">
      <Link size={32} />
      <p className="t-xs uppercase">ainda não existem links cadastrados</p>
    </div>
  )
}