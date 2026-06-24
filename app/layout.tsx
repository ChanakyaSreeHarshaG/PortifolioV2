import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ui/ThemeToggle';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'G. Chanakya Sree Harsha | Data Analyst Portfolio',
  description: 'Data Analyst portfolio of G. Chanakya Sree Harsha. Specialized in Python, SQL, Power BI, and Medallion Architecture.',
  keywords: ['Data Analyst', 'SQL Developer', 'Power BI Developer', 'Medallion Architecture', 'Enterprise Data Warehouse', 'Python', 'ETL', 'Portfolio'],
  authors: [{ name: 'G. Chanakya Sree Harsha' }],
  metadataBase: new URL('https://chanakyasreeharshag.github.io'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'G. Chanakya Sree Harsha | Data Analyst Portfolio',
    description: 'Data Analyst portfolio of G. Chanakya Sree Harsha. Specialized in Python, SQL, Power BI, and Medallion Architecture.',
    url: 'https://chanakyasreeharshag.github.io',
    siteName: 'G. Chanakya Sree Harsha Portfolio',
    images: [
      {
        url: '/portifolio.png',
        width: 1200,
        height: 630,
        alt: 'G. Chanakya Sree Harsha Portfolio Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'G. Chanakya Sree Harsha | Data Analyst Portfolio',
    description: 'Data Analyst portfolio of G. Chanakya Sree Harsha. Specialized in Python, SQL, Power BI, and Medallion Architecture.',
    images: ['/portifolio.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            var theme = localStorage.getItem('theme') || 'light';
            document.documentElement.setAttribute('data-theme', theme);
          })();
        ` }} />
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

