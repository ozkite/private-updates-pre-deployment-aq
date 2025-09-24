export type Language = "en" | "es" | "pt"

interface Translations {
  payUtilityBill: string
  convertCrypto: string
  recentActivity: string
  viewAll: string
  selectCountry: string
  searchCountries: string
  payServices: string
  searchServices: string
  notInMiniPay: string
  openInMiniPay: string
}

export const translations: Record<Language, Translations> = {
  en: {
    payUtilityBill: "Pay Utility Bill",
    convertCrypto: "Convert Crypto",
    recentActivity: "Recent Activity",
    viewAll: "View All",
    selectCountry: "Select Your Country",
    searchCountries: "Search countries",
    payServices: "Pay Services",
    searchServices: "Search services or providers",
    notInMiniPay: "Not running in MiniPay browser",
    openInMiniPay: "For the best experience, open this app in MiniPay.",
  },
  es: {
    payUtilityBill: "Pagar Servicios Públicos",
    convertCrypto: "Convertir Crypto",
    recentActivity: "Actividad Reciente",
    viewAll: "Ver Todo",
    selectCountry: "Selecciona Tu País",
    searchCountries: "Buscar países",
    payServices: "Pagar Servicios",
    searchServices: "Buscar servicios o proveedores",
    notInMiniPay: "No se está ejecutando en el navegador MiniPay",
    openInMiniPay: "Para una mejor experiencia, abre esta app en MiniPay.",
  },
  pt: {
    payUtilityBill: "Pagar Contas de Serviços",
    convertCrypto: "Converter Crypto",
    recentActivity: "Atividade Recente",
    viewAll: "Ver Tudo",
    selectCountry: "Selecione Seu País",
    searchCountries: "Buscar países",
    payServices: "Pagar Serviços",
    searchServices: "Buscar serviços ou provedores",
    notInMiniPay: "Não está rodando no navegador MiniPay",
    openInMiniPay: "Para uma melhor experiência, abra este app no MiniPay.",
  },
}

export function getTranslation(key: keyof Translations, language: Language): string {
  return translations[language][key]
}

// Detect browser language and return the closest match
export function detectLanguage(): Language {
  if (typeof window === "undefined") return "en"

  const browserLang = navigator.language.toLowerCase().split("-")[0]

  if (browserLang === "es") return "es"
  if (browserLang === "pt") return "pt"

  return "en"
}
