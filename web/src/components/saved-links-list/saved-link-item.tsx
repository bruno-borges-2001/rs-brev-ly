import { Copy, Trash } from "phosphor-react";
import { Link } from "react-router";
import { toast } from "sonner";
import useDeleteLink from "../../api/use-delete-link";
import { SavedLink } from "../../api/use-saved-links";
import Button from "../__ui__/button";

export default function SavedLinkItem({ link }: { link: SavedLink }) {
  const { mutateAsync: deleteLink } = useDeleteLink()

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href + encodeURIComponent(link.shortUrl))
    toast.success('Link copiado para a área de transferência')
  }

  return (
    <div className="flex items-center gap-5 py-4 border-y border-gray-200">
      <div className="space-y-1 flex-1">
        <Link to={`/${encodeURIComponent(link.shortUrl)}`} target="_blank">
          <p className="t-md text-blue-base hover:underline">{link.shortUrl}</p>
        </Link>
        <p className="t-sm text-gray-500">{link.url}</p>
      </div>

      <p className="t-sm text-gray-500">{link.accessCount} acesso{link.accessCount !== 1 ? 's' : ''}</p>

      <div className="flex gap-1">
        <Button variant="icon" className="text-gray-600" onClick={handleCopy}>
          <Copy />
        </Button>
        <Button variant="icon" className="text-gray-600" onClick={() => confirm('Tem certeza que deseja deletar este link?') && deleteLink(link.id)}>
          <Trash />
        </Button>
      </div>
    </div>
  )
}