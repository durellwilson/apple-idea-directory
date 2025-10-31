import './globals.css'

export const metadata = {
  title: 'Apple Idea Directory - Infinite App Ideas',
  description: 'AI-powered directory of innovative Apple ecosystem app ideas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black text-white">{children}</body>
    </html>
  )
}
