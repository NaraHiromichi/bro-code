import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Ubuntu } from "@next/font/google";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-ubuntu",
});

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
