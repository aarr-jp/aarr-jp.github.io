import { IBM_Plex_Sans_JP as PrimaryFont } from "next/font/google";

export const primaryFont = PrimaryFont({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["300", "400", "500", "700"],
  variable: "--primaryFont",
});