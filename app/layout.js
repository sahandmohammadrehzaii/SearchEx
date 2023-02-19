import { Session } from 'next-auth'
import { headers } from 'next/headers'
import AuthContext from '@/context/AuthContext';
import Footer from '@/components/shared/Footer'
import './globals.scss'
import { ThemeProvider, ThemeContext } from '@/context/ThemeContext';


async function getSession(cookies) {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/session`, {
    headers: {
      cookies,
    },
  });

  const session = await response.json();

  return Object.keys(session).length > 0 ? session : null;
}

export default async function RootLayout({ children }) {

  const session = await getSession(headers().get('cookie') ?? '');

  return (
    <ThemeProvider>
      <html lang="en" >
        <head />
        <body>
          <main>
            <AuthContext session={session}>
              {children}
            </AuthContext>
          </main>
          <Footer />
        </body>
      </html>
    </ThemeProvider>
  )
}
