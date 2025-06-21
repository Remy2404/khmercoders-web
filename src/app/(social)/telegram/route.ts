import { KCLinks } from '@/data/link';
import { NextResponse } from 'next/server';

export const GET = async () => {
  return NextResponse.redirect(KCLinks.telegramLink);
};

export const dynamic = 'force-dynamic';
