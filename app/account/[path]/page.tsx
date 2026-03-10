'use client';

import { authClient } from '@/lib/auth/client';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Mail, User, Shield, Loader2 } from 'lucide-react';

export default function AccountPage() {
  const { data, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <main className="app-loading">
        <Image src="/alumina-isotipo.webp" alt="Alumina" width={48} height={60} priority />
        <div className="app-loading-spinner" />
      </main>
    );
  }

  if (!data?.session) {
    return (
      <main className="acct-page">
        <div className="acct-empty">
          <Shield size={40} style={{ color: 'rgba(240, 237, 232, 0.15)' }} />
          <p className="acct-empty-text">You need to be signed in to view this page.</p>
          <Link href="/auth/sign-in" className="af-submit" style={{ width: 'auto', padding: '0.75rem 2rem' }}>
            Sign In
          </Link>
        </div>
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
    <main className="acct-page">
      <div className="acct-inner">
        {/* Back link */}
        <Link href="/" className="acct-back">
          <ArrowLeft size={15} />
          <span>Back to Dashboard</span>
        </Link>

        {/* Profile Header */}
        <div className="acct-profile">
          <div className="acct-avatar">{initials}</div>
          <h1 className="acct-name">{data.user?.name}</h1>
          <p className="acct-email">{data.user?.email}</p>
        </div>

        {/* Account Details Card */}
        <div className="acct-card">
          <div className="acct-card-header">
            <h2>Account Details</h2>
          </div>

          <div className="acct-card-body">
            <div className="acct-row">
              <div className="acct-row-icon">
                <User size={15} />
              </div>
              <div className="acct-row-content">
                <span className="acct-row-label">Name</span>
                <span className="acct-row-value">{data.user?.name}</span>
              </div>
            </div>

            <div className="acct-row">
              <div className="acct-row-icon">
                <Mail size={15} />
              </div>
              <div className="acct-row-content">
                <span className="acct-row-label">Email</span>
                <span className="acct-row-value">{data.user?.email}</span>
              </div>
            </div>

            <div className="acct-row">
              <div className="acct-row-icon">
                <Shield size={15} />
              </div>
              <div className="acct-row-content">
                <span className="acct-row-label">Password</span>
                <span className="acct-row-value">••••••••</span>
              </div>
              <Link href="/auth/forgot-password" className="acct-row-action">
                Change
              </Link>
            </div>
          </div>
        </div>

        {/* Branding */}
        <div className="acct-footer">
          <Image src="/alumina-isotipo.webp" alt="Alumina" width={24} height={30} style={{ opacity: 0.2 }} />
        </div>
      </div>
    </main>
  );
}
