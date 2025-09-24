"use client"
import { Globe } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export type Language = "en" | "es" | "pt"

interface LanguageSwitcherProps {
  onChange: (language: Language) => void
  currentLanguage: Language
}

export function LanguageSwitcher({ onChange, currentLanguage }: LanguageSwitcherProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
          <Globe className="h-5 w-5" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => onChange("en")}
          className={currentLanguage === "en" ? "bg-primary/10 font-medium" : ""}
        >
          English 🇺🇸
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onChange("es")}
          className={currentLanguage === "es" ? "bg-primary/10 font-medium" : ""}
        >
          Español 🇲🇽
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onChange("pt")}
          className={currentLanguage === "pt" ? "bg-primary/10 font-medium" : ""}
        >
          Português 🇧🇷
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
