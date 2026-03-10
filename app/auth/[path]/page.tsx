import Image from 'next/image';
import AuthForms from '@/components/auth/AuthForms';

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

  const getPageTitle = (p: string) => {
    switch (p) {
      case 'sign-in': return 'Welcome Back';
      case 'sign-up': return 'Start Your Journey';
      case 'forgot-password': return 'Reset Password';
      case 'reset-password': return 'Create New Password';
      case 'sign-out': return 'Sign Out';
      default: return 'Authentication';
    }
  };

  const getPageSubtitle = (p: string) => {
    switch (p) {
      case 'sign-in': return 'Sign in to continue your longevity journey';
      case 'sign-up': return 'Create an account to optimize your health';
      case 'forgot-password': return 'Enter your email to reset your password';
      case 'reset-password': return 'Choose a new secure password';
      case 'sign-out': return 'See you soon!';
      default: return '';
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #071210 0%, #0a1a17 50%, #071210 100%)',
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(239, 194, 179, 0.3) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(239, 194, 179, 0.2) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(239, 194, 179, 0.15) 0%, transparent 60%)',
          }}
        />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(239, 194, 179, 0.15) 0%, rgba(239, 194, 179, 0.05) 100%)',
                border: '1px solid rgba(239, 194, 179, 0.2)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Image
                src="/alumina-isotipo.webp"
                alt="Alumina Logo"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 tracking-tight">
            Alumina <span style={{ color: '#EFC2B3' }}>At Home</span>
          </h1>

          <h2 className="text-lg sm:text-xl font-medium text-white/90 mb-2">
            {getPageTitle(path)}
          </h2>

          <p className="text-sm text-white/50">
            {getPageSubtitle(path)}
          </p>
        </div>

        {/* Auth Form Container */}
        <div
          className="rounded-2xl p-6 sm:p-8 shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <AuthForms path={path} />
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-white/30">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </main>
  );
}
