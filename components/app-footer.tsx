import { type Language, getTranslation } from "@/lib/translations"

interface AppFooterProps {
  language: Language
}

export function AppFooter({ language }: AppFooterProps) {
  return (
    <footer className="mt-auto py-4 text-center text-sm text-gray-500">
      <p>{getTranslation("footerMessage", language)}</p>
    </footer>
  )
}
