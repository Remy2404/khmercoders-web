import { ApiAuthContext, withOptionalApiAuth } from '../../../middleware';
import { NextRequest, NextResponse } from 'next/server';
import { getUserLinkCode } from '@/server/services/userLinkCode';

export const GET = withOptionalApiAuth(
  async (req: NextRequest, { db }: Partial<ApiAuthContext>) => {
    try {
      if (!db) {
        return NextResponse.json(
          { error: 'Database connection is not available' },
          { status: 503 }
        );
      }
      const code = req.nextUrl.pathname.split('/').pop();

      if (!code) {
        return NextResponse.json({ error: 'Link code is required' }, { status: 400 });
      }
      const userLinkCode = await getUserLinkCode(db, code);
      if (!userLinkCode) {
        return NextResponse.json({ error: 'Invalid link code' }, { status: 404 });
      }
      const now = new Date();
      if (now > new Date(userLinkCode.expiresAt)) {
        return NextResponse.json({ error: 'Link code has expired' }, { status: 410 });
      }
      return NextResponse.json({ success: true, userId: userLinkCode.userId }, { status: 200 });
    } catch (error) {
      console.error('Error verifying link code:', error);
      return NextResponse.json({ error: 'Failed to verify link code' }, { status: 500 });
    }
  }
);
