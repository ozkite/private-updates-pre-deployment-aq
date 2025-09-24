"use client"

import { useMiniPay } from "@/contexts/minipay-context"
import { Card, CardContent } from "@/components/ui/card"
import { type Language, getTranslation } from "@/lib/translations"

interface MiniPayBrowserNoticeProps {
  language: Language
}

export function MiniPayBrowserNotice({ language }: MiniPayBrowserNoticeProps) {
  const { isMiniPayBrowser } = useMiniPay()

  // Only show if not in MiniPay browser
  if (isMiniPayBrowser) {
    return null
  }

  return (
    <Card className="border-none shadow-md mt-6">
      <CardContent className="p-4">
        <div className="text-center py-2">
          <p className="text-amber-600 text-sm font-medium">{getTranslation("notInMiniPay", language)}</p>
          <p className="text-xs text-gray-500 mt-1">{getTranslation("openInMiniPay", language)}</p>
        </div>
      </CardContent>
    </Card>
  )
}
