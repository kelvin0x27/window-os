import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Windows 11',
  description: 'Windows 11 Web Clone',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      data-os-theme='win11'
      data-theme='dark'
      suppressHydrationWarning
    >
      <body
        className='antialiased overflow-hidden text-os-text bg-os-surface'
        suppressHydrationWarning
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `document.addEventListener('contextmenu',function(e){e.preventDefault();},false);`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
