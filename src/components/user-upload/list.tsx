import { UserUploadRecord } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../generated/table';
import { renderIconFromContentType } from '@/utils/icons';
import { formatAgo, formatSize } from '@/utils/format';
import { Input } from '../generated/input';
import { useState } from 'react';

export function UserUploadListTab({
  files,
  onSelect,
}: {
  files: UserUploadRecord[];
  onSelect: (file: string) => void;
}) {
  const [search, setSearch] = useState('');

  const filteredFiles = files.filter(file =>
    file.fileName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full">
      <div className="p-2 py-4 border-b">
        <Input
          placeholder="Search files..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <Table>
        <TableHeader className="sticky top-0">
          <TableRow className="bg-secondary">
            <TableHead>File Description</TableHead>
            <TableHead className="text-right">Size</TableHead>
            <TableHead style={{ width: 150 }}>Created at</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredFiles.map(file => (
            <TableRow
              key={file.id}
              className="cursor-pointer"
              onClick={() => onSelect(file.fileUrl)}
            >
              <TableCell>
                <div className="flex gap-2 items-center line-clamp-1">
                  {renderIconFromContentType(file.fileType)}
                  {file.fileName}
                </div>
              </TableCell>
              <TableCell className="text-right">{formatSize(file.fileSize)}</TableCell>
              <TableCell>{formatAgo(file.createdAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
