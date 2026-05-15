// Root layout — passes through to [locale]/layout.tsx which defines <html>/<body>
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
