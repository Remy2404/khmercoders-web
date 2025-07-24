'use client';

import Link from 'next/link';
import { ChevronRight, AtSign, User, Briefcase, Image, LucideIcon } from 'lucide-react';
import { MainLayout } from '@/components/blocks/layout/MainLayout';
import { StackNavigation } from '@/components/blocks/layout/StackNavigation';

interface SettingItemProps {
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
  showBorder?: boolean;
}

function SettingItem({
  href,
  icon: Icon,
  title,
  description,
  showBorder = true,
}: SettingItemProps) {
  return (
    <Link href={href} className="block">
      <div className={`p-4 hover:bg-muted/50 transition-colors ${showBorder ? 'border-b' : ''}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Icon className="h-5 w-5 text-muted-foreground" />
            <div>
              <h3 className="font-medium">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </Link>
  );
}

export default function ProfileSetupPage() {
  return (
    <MainLayout>
      <StackNavigation defaultBackURL="/" />

      <div>
        <p className="p-4">
          Complete your profile information to get the most out of KhmerCoders platform.
        </p>

        <div>
          <SettingItem
            href="/profile/setup/alias"
            icon={AtSign}
            title="Setup Alias"
            description="Choose your unique username alias"
          />

          <SettingItem
            href="/profile/setup/detail"
            icon={User}
            title="Profile Details"
            description="Update your personal information"
          />

          <SettingItem
            href="/profile/setup/experience"
            icon={Briefcase}
            title="Working Experience"
            description="Add your work history and skills"
          />

          <SettingItem
            href="/profile/setup/picture"
            icon={Image}
            title="Profile Picture"
            description="Upload or update your profile photo"
            showBorder={false}
          />
        </div>
      </div>
    </MainLayout>
  );
}
