import { Logo } from "../assets";
import CreateLinkForm from "../components/create-link-form";
import SavedLinksList from "../components/saved-links-list";

export default function App() {
  return (
    <div className="mx-auto max-w-245 mt-5 px-3 sm:mt-22">
      <Logo />
      <main className="flex flex-col sm:flex-row gap-x-5 gap-y-3 mt-3 sm:mt-5">
        <CreateLinkForm />
        <SavedLinksList />
      </main>
    </div>
  )
}
