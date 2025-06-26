'use client';

import { getFileListAction } from '@/actions/file';
import { UserUploadRecord } from '@/types';
import { useState, useEffect, useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/generated/table';
import { formatAgo, formatSize } from '@/utils/format';
import { renderIconFromContentType } from '@/utils/icons';
import { Button } from '@/components/generated/button';
import { useUserUpload } from '@/components/user-upload/context';
import { Copy, Ellipsis, Trash } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/generated/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

export default function StorageDetailPage() {
  const [files, setFiles] = useState<UserUploadRecord[]>([]);
  const { openUserUpload } = useUserUpload();

  useEffect(() => {
    getFileListAction()
      .then(setFiles)
      .catch(() => {});
  }, []);

  const handleUploadClick = useCallback(() => {
    openUserUpload('upload')
      .then(() => {
        getFileListAction()
          .then(setFiles)
          .catch(() => {});
      })
      .catch(console.error);
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">File Manager</h1>

      <div className="my-4">
        <Button onClick={handleUploadClick}>Upload</Button>
      </div>

      <div className="border rounded-lg shadow-sm">
        <FileTable files={files} />
      </div>
    </div>
  );
}

function FileTable({ files }: { files: UserUploadRecord[] }) {
  const { toast } = useToast();

  if (files.length === 0) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>File Description</TableHead>
            <TableHead className="text-right">Size</TableHead>
            <TableHead style={{ width: 150 }}>Created at</TableHead>
            <TableHead style={{ width: 50 }}></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={4} className="text-center text-muted-foreground">
              No files found
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>File Description</TableHead>
          <TableHead className="text-right">Size</TableHead>
          <TableHead style={{ width: 150 }}>Created at</TableHead>
          <TableHead style={{ width: 50 }}></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {files.map(file => {
          return (
            <TableRow className="cursor-pointer" key={file.id}>
              <TableCell>
                <div className="flex gap-2 items-center line-clamp-1">
                  {renderIconFromContentType(file.fileType)}
                  {file.fileName}
                </div>
              </TableCell>
              <TableCell className="text-right">{formatSize(file.fileSize)}</TableCell>
              <TableCell>{formatAgo(file.createdAt)}</TableCell>
              <TableCell>
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger>
                    <Ellipsis className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="bottom" align="start">
                    <DropdownMenuItem
                      onSelect={() => {
                        navigator.clipboard.writeText(file.fileUrl);
                        toast({
                          title: 'Link copied to clipboard',
                          description: file.fileUrl,
                          duration: 2000,
                        });
                      }}
                    >
                      <Copy />
                      Copy link
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled>
                      <Trash />
                      Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
