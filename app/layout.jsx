import './globals.css';

export const metadata = {
  title: 'Lir New Alliance Guide',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
