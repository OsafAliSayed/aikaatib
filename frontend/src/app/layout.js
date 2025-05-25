import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/page/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'AIKaatib - AI-Powered Blog Writing Assistant',
  description: 'Create engaging blog content with the help of AI. AIKaatib helps you write better, faster, and more consistently.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#1a202c" />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content="AI, Blog Writing, Content Creation, AIKaatib" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Sora:wght@100..800&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.className} dark`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}