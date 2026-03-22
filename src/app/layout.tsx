import "kiso.css";

import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import ThemeProvider from "../theme/theme-provider";

export const metadata: Metadata = {
  title: {
    template: "%s | 荒連資料館",
    absolute: "荒連資料館 - 荒らし連合軍について",
  },
  description: "荒らし連合軍に関する情報をまとめるウィキ",
  openGraph: {
    siteName: "荒連資料館",
  },
};

export default function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head />
      <body suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}