import { AuthView } from '@neondatabase/auth/react';

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { path: 'sign-in' },
    { path: 'sign-up' },
    { path: 'sign-out' },
    { path: 'forgot-password' },
    { path: 'reset-password' },
  ];
}

export default async function AuthPage({ params }: { params: Promise<{ path: string }> }) {
  const { path } = await params;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Alumina <span className="text-emerald-400">At Home</span>
          </h1>
          <p className="text-gray-400">Your longevity journey starts here</p>
        </div>
        
        {/* Auth View */}
        <AuthView path={path} />
      </div>
    </main>
  );
}
