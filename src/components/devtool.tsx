'use client';
import { LucideDatabase, Settings } from 'lucide-react';
import { Button } from './generated/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './generated/dropdown-menu';
import { UserLevelBadge } from './user-level-badge';
import { UserLevel } from '@/types';
import Link from 'next/link';

export function KhmerCoderDevtool() {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-full fixed bottom-16 left-5 h-9 w-9">
          <Settings />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" side="bottom">
        <DropdownMenuLabel>KhmerCoders Devtool</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            window.location.href = '/dev_only/login?id=usr_01HQTG5BBRX3XY1JJVNN6CZ7ZB';
          }}
        >
          <span className="w-6 h-6 bg-yellow-500 rounded-full"></span>
          Login as <strong>Visal In</strong> <UserLevelBadge level={UserLevel.SuperAdmin} />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            (window.location.href = '/dev_only/login?id=usr_01HQTG5BBRX3XY1JJVNN6CZ7ZC')
          }
        >
          <span className="w-6 h-6 bg-yellow-500 rounded-full"></span>
          Login as <strong>Srey Pich</strong> <UserLevelBadge level={UserLevel.Premium} />
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuLabel>Browsing D1 Databases</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link href="/dev_only/d1?db=main">
            <LucideDatabase className="mr-2" />
            Main Database
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dev_only/d1?db=chat">
            <LucideDatabase className="mr-2" />
            Chatbot Database
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
