'use client';

import { authClient } from '@/lib/auth/client';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Mail, User, Shield, Loader2 } from 'lucide-react';

export default function AccountPage() {
  const { data, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <main className="min-h-screen flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #071210 0%, #0a1a17 50%, #071210 100%)' }}
      >
        <Loader2 size={32} className="auth-spinner" style={{ color: '#EFC2B3' }} />
      </main>
    );
  }

  if (!data?.session) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-4 p-4"
        style={{ background: 'linear-gradient(135deg, #071210 0%, #0a1a17 50%, #071210 100%)' }}
      >
        <Shield size={48} style={{ color: 'rgba(255,255,255,0.2)' }} />
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>
          You need to be signed in to view this page.
        </p>
        <Link
          href="/auth/sign-in"
          className="auth-submit"
          style={{ width: 'auto', padding: '0.625rem 1.5rem', marginTop: '0.5rem' }}
        >
          Sign In
        </Link>
      </main>
    );
  }

  const initials = (data.user?.name || data.user?.email || 'U')
    .split(' ')
    .map((n: string) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <main className="min-h-screen p-4 sm:p-6"
      style={{ background: 'linear-gradient(135deg, #071210 0%, #0a1a17 50%, #071210 100%)' }}
    >
      <div className="max-w-xl mx-auto pt-4 sm:pt-8">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm mb-8 transition-colors"
          style={{ color: 'rgba(255,255,255,0.45)' }}
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>

        {/* Profile Header */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold mb-4"
            style={{
              background: 'linear-gradient(135deg, #EFC2B3 0%, #e5a896 100%)',
              color: '#071210',
              boxShadow: '0 4px 24px rgba(239, 194, 179, 0.25)',
            }}
          >
            {initials}
          </div>
          <h1 className="text-xl font-semibold text-white">{data.user?.name}</h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>{data.user?.email}</p>
        </div>

        {/* Account Details Card */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div className="px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <h2 className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Account Details
            </h2>
          </div>

          <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <div className="flex items-center gap-4 px-5 py-4">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(239, 194, 179, 0.1)' }}
              >
                <User size={16} style={{ color: '#EFC2B3' }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Name</p>
                <p className="text-sm text-white truncate">{data.user?.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 px-5 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(239, 194, 179, 0.1)' }}
              >
                <Mail size={16} style={{ color: '#EFC2B3' }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Email</p>
                <p className="text-sm text-white truncate">{data.user?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 px-5 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(239, 194, 179, 0.1)' }}
              >
                <Shield size={16} style={{ color: '#EFC2B3' }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Password</p>
                <p className="text-sm text-white">********</p>
              </div>
              <Link
                href="/auth/forgot-password"
                className="text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
                style={{
                  color: '#EFC2B3',
                  background: 'rgba(239, 194, 179, 0.08)',
                  border: '1px solid rgba(239, 194, 179, 0.12)',
                }}
              >
                Change
              </Link>
            </div>
          </div>
        </div>

        {/* Branding */}
        <div className="flex justify-center mt-10 opacity-30">
          <Image src="/alumina-isotipo.webp" alt="Alumina" width={28} height={35} />
        </div>
      </div>
    </main>
  );
}
