// Currency data and conversion utilities

export interface Currency {
  code: string
  name: string
  symbol: string
  flag?: string
}

// Comprehensive list of supported currencies
export const SUPPORTED_CURRENCIES: Currency[] = [
  { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$" },
  { code: "MYR", name: "Malaysian Ringgit", symbol: "RM" },
  { code: "VND", name: "Vietnamese Dong", symbol: "₫" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "PHP", name: "Philippine Peso", symbol: "₱" },
  { code: "RUB", name: "Russian Ruble", symbol: "₽" },
  { code: "UAH", name: "Ukrainian Hryvnia", symbol: "₴" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp" },
  { code: "NGN", name: "Nigerian Naira", symbol: "₦" },
  { code: "ARS", name: "Argentine Peso", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "PKR", name: "Pakistani Rupee", symbol: "₨" },
  { code: "GHS", name: "Ghanaian Cedi", symbol: "₵" },
  { code: "KES", name: "Kenyan Shilling", symbol: "KSh" },
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "COP", name: "Colombian Peso", symbol: "$" },
  { code: "KZT", name: "Kazakhstani Tenge", symbol: "₸" },
  { code: "THB", name: "Thai Baht", symbol: "฿" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "MXN", name: "Mexican Peso", symbol: "$" },
  { code: "KGS", name: "Kyrgystani Som", symbol: "с" },
  { code: "EGP", name: "Egyptian Pound", symbol: "E£" },
  { code: "VES", name: "Venezuelan Bolívar", symbol: "Bs." },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "BYN", name: "Belarusian Ruble", symbol: "Br" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "SAR", name: "Saudi Riyal", symbol: "﷼" },
  { code: "BDT", name: "Bangladeshi Taka", symbol: "৳" },
  { code: "ZAR", name: "South African Rand", symbol: "R" },
  { code: "PLN", name: "Polish Złoty", symbol: "zł" },
  { code: "GEL", name: "Georgian Lari", symbol: "₾" },
  { code: "LKR", name: "Sri Lankan Rupee", symbol: "Rs" },
  { code: "MAD", name: "Moroccan Dirham", symbol: "DH" },
  { code: "PEN", name: "Peruvian Sol", symbol: "S/" },
  { code: "AMD", name: "Armenian Dram", symbol: "֏" },
  { code: "SEK", name: "Swedish Krona", symbol: "kr" },
  { code: "RON", name: "Romanian Leu", symbol: "lei" },
  { code: "NPR", name: "Nepalese Rupee", symbol: "रू" },
  { code: "DZD", name: "Algerian Dinar", symbol: "DA" },
  { code: "CZK", name: "Czech Koruna", symbol: "Kč" },
  { code: "ILS", name: "Israeli New Shekel", symbol: "₪" },
  { code: "MDL", name: "Moldovan Leu", symbol: "L" },
  { code: "BGN", name: "Bulgarian Lev", symbol: "лв" },
  { code: "NOK", name: "Norwegian Krone", symbol: "kr" },
  { code: "BSD", name: "Bahamian Dollar", symbol: "B$" },
  { code: "KWD", name: "Kuwaiti Dinar", symbol: "KD" },
  { code: "TJS", name: "Tajikistani Somoni", symbol: "ЅМ" },
  { code: "AZN", name: "Azerbaijani Manat", symbol: "₼" },
  { code: "KHR", name: "Cambodian Riel", symbol: "៛" },
  { code: "XAF", name: "Central African CFA Franc", symbol: "FCFA" },
  { code: "XOF", name: "West African CFA Franc", symbol: "CFA" },
  { code: "DOP", name: "Dominican Peso", symbol: "RD$" },
  { code: "CLP", name: "Chilean Peso", symbol: "$" },
  { code: "HUF", name: "Hungarian Forint", symbol: "Ft" },
  { code: "RSD", name: "Serbian Dinar", symbol: "дин." },
  { code: "LBP", name: "Lebanese Pound", symbol: "ل.ل" },
  { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$" },
  { code: "MNT", name: "Mongolian Tögrög", symbol: "₮" },
  { code: "JOD", name: "Jordanian Dinar", symbol: "JD" },
  { code: "TND", name: "Tunisian Dinar", symbol: "DT" },
  { code: "MMK", name: "Myanmar Kyat", symbol: "K" },
  { code: "AED", name: "United Arab Emirates Dirham", symbol: "د.إ" },
]

// Get currency by code
export function getCurrencyByCode(code: string): Currency | undefined {
  return SUPPORTED_CURRENCIES.find((currency) => currency.code.toLowerCase() === code.toLowerCase())
}

// Format amount according to currency
export function formatCurrencyAmount(amount: number, currencyCode: string): string {
  const currency = getCurrencyByCode(currencyCode)

  if (!currency) {
    return amount.toFixed(2)
  }

  // Format based on currency standards
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  } catch (error) {
    // Fallback formatting if Intl is not supported
    return `${currency.symbol} ${amount.toFixed(2)}`
  }
}

// Get popular currencies (for quick selection)
export function getPopularCurrencies(): Currency[] {
  const popularCodes = [
    "EUR", // Euro
    "BRL", // Brazilian Real
    "XOF", // West African CFA Franc
    "KES", // Kenyan Shilling
    "PHP", // Philippine Peso
    "COP", // Colombian Peso
    "GHS", // Ghanaian Cedi
    "GBP", // British Pound Sterling
    "ZAR", // South African Rand
    "CAD", // Canadian Dollar
    "AUD", // Australian Dollar
    "USD", // US Dollar
    "MXN", // Mexican Peso
    "NGN", // Nigerian Naira
  ]
  return SUPPORTED_CURRENCIES.filter((currency) => popularCodes.includes(currency.code))
}

// Mock exchange rate API (in a real app, this would call an actual API)
export async function getExchangeRate(fromCurrency: string, toCurrency: string): Promise<number> {
  // In a real implementation, this would fetch from an API like:
  // const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
  // const data = await response.json();
  // return data.rates[toCurrency];

  // For demo purposes, we'll use mock rates
  const mockRates: Record<string, Record<string, number>> = {
    USDT: {
      USD: 1,
      EUR: 0.92,
      GBP: 0.79,
      MXN: 18.5,
      NGN: 1600,
      KES: 135,
      GHS: 13.5,
      ZAR: 18.5,
      AUD: 1.52,
      CAD: 1.37,
      JPY: 150.2,
      INR: 83.5,
      BRL: 5.2,
      RUB: 92.3,
      CNY: 7.2,
    },
    cUSD: {
      USD: 1,
      EUR: 0.92,
      GBP: 0.79,
      MXN: 18.5,
      NGN: 1600,
      KES: 135,
      GHS: 13.5,
      ZAR: 18.5,
      AUD: 1.52,
      CAD: 1.37,
      JPY: 150.2,
      INR: 83.5,
      BRL: 5.2,
      RUB: 92.3,
      CNY: 7.2,
    },
  }

  // If we have a direct rate, use it
  if (mockRates[fromCurrency]?.[toCurrency]) {
    return mockRates[fromCurrency][toCurrency]
  }

  // For currencies not in our mock data, generate a realistic rate
  // This is just for demo purposes - real implementation would use API
  const baseValue =
    toCurrency === "JPY" || toCurrency === "KRW" || toCurrency === "IDR" || toCurrency === "VND"
      ? 100 + Math.random() * 50
      : 1 + Math.random() * 20

  return baseValue
}
