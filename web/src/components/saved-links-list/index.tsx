import { DownloadSimple } from "phosphor-react";

import useExportLinks from "../../api/use-export-links";
import useSavedLinks from "../../api/use-saved-links";

import { cn } from "../../lib/utils";

import Button from "../__ui__/button";
import LoadingIndicator from "../__ui__/loading-indicator";

import NoLinksState from "./no-links-state";
import SavedLinkItem from "./saved-link-item";

export default function SavedLinksList() {
  const { data: savedLinks, isLoading } = useSavedLinks()
  const { mutateAsync: exportLinks, isLoading: isExporting } = useExportLinks()

  const handleDownloadCSV = async () => {
    if (!savedLinks?.total) return

    try {
      const { url } = await exportLinks()

      const a = document.createElement('a')
      a.href = url
      a.download = 'links.csv'
      a.click()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <section className="bg-gray-100 min-w-90 flex-1 p-5 rounded-lg h-fit flex flex-col gap-5">
      <header className="flex items-center justify-between">
        <p className="t-lg text-gray-600">Meus Links</p>

        <Button className="relative" variant="secondary" disabled={isExporting || !savedLinks?.total} onClick={handleDownloadCSV}>
          <div className={cn("flex items-center gap-2", isExporting && 'opacity-0')}>
            <DownloadSimple />
            <p>Baixar CSV</p>
          </div>

          {isExporting && (
            <div className="absolute inset-0 flex items-center justify-center">
              <LoadingIndicator className="h-4 w-4" />
            </div>
          )}
        </Button>
      </header>

      {isLoading ? (
        <div className="p-6 w-full flex items-center justify-center">
          <LoadingIndicator />
        </div>
      ) : savedLinks?.total ? (
        savedLinks.links.map(link => (
          <SavedLinkItem key={link.id} link={link} />
        ))
      ) : (
        <NoLinksState />
      )}
    </section>
  )
}