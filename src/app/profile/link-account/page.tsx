'use client';

import { useSession } from '@/components/auth-provider';
import { useEffect, useState } from 'react';
import { getUserLinkCode, generateUserLinkCode, UserLinkCode } from '@/server/actions/userLinkCode';
import { Button } from '@/components/generated/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/generated/card';
import { Badge } from '@/components/generated/badge';
import { Copy, RefreshCw, Clock, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function LinkAccountPage() {
  const { session } = useSession();
  const { toast } = useToast();
  const [userLinkCode, setUserLinkCode] = useState<UserLinkCode>();
  const [isLoading, setIsLoading] = useState(true);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const fetchLinkCode = async () => {
    try {
      const code = await getUserLinkCode();
      setUserLinkCode(code);
    } catch (error) {
      console.error('Failed to fetch link code:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchLinkCode();
    }
  }, [session]);

  const handleRegenerateCode = async () => {
    setIsRegenerating(true);
    try {
      const newCode = await generateUserLinkCode();
      setUserLinkCode(newCode);
      toast({
        title: 'Code Regenerated',
        description: 'Your new link code has been generated successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to regenerate code. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleCopyCode = () => {
    if (userLinkCode?.code) {
      navigator.clipboard.writeText(userLinkCode.code);
      toast({
        title: 'Copied!',
        description: 'Link code copied to clipboard.',
      });
    }
  };

  const getTimeRemaining = () => {
    if (!userLinkCode?.expiresAt) return 0;
    const hoursRemaining = Math.ceil(
      (new Date(userLinkCode.expiresAt).getTime() - Date.now()) / 3600000
    );
    return Math.max(0, hoursRemaining);
  };

  if (!session) {
    return (
      <div className="container mx-auto py-8">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              You must be logged in to view this page.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Link Your Account</h1>
        <p className="text-muted-foreground">
          Connect your KhmerCoders account to Telegram to access your profile insights and unlock
          additional features.
        </p>
      </div>

      {isLoading ? (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="w-6 h-6 animate-spin mr-2" />
              <span>Loading your link code...</span>
            </div>
          </CardContent>
        </Card>
      ) : userLinkCode ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Your Telegram Link Code
            </CardTitle>
            <CardDescription>Use this code in Telegram to link your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="font-mono text-2xl font-bold tracking-wider">{userLinkCode.code}</div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyCode}
                className="flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                Copy
              </Button>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>
                Expires in {getTimeRemaining()} hour{getTimeRemaining() !== 1 ? 's' : ''}
              </span>
              {getTimeRemaining() <= 2 && (
                <Badge variant="destructive" className="ml-2">
                  Expires Soon
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground mb-4">
              No link code found. Generate one to get started.
            </p>
          </CardContent>
        </Card>
      )}

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Having trouble? Try regenerating a new code.
          </p>
          <Button
            onClick={handleRegenerateCode}
            disabled={isRegenerating}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isRegenerating ? 'animate-spin' : ''}`} />
            {isRegenerating ? 'Regenerating...' : 'Regenerate Code'}
          </Button>
        </div>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-4">
            <h3 className="font-semibold mb-2">How to link your account:</h3>
            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Open Telegram and find our bot</li>
              <li>
                Send the command <code className="bg-muted px-1 rounded">/link</code>
              </li>
              <li>Enter your link code when prompted</li>
              <li>Your account will be linked automatically</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
