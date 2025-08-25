import { UserUploadRecord } from '@/types';
import { getResizeImage } from '@/utils/image';
import { useMemo, useState } from 'react';
import { Input } from '../generated/input';

interface UserUploadPhotoProps {
  files: UserUploadRecord[];
  onSelect: (file: string) => void;
}

export function UserUploadPhotoTab({ onSelect, files }: UserUploadPhotoProps) {
  const [search, setSearch] = useState('');

  const imageFiles = useMemo(() => {
    return files
      .filter(file => file.fileType.startsWith('image/'))
      .filter(file => file.fileName.toLowerCase().includes(search.toLowerCase()));
  }, [files, search]);

  return (
    <div className="flex flex-col w-full">
      <div className="p-2 py-4 border-b">
        <Input
          placeholder="Search files..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="p-4 grid grid-cols-5 gap-4 overflow-y-auto w-full grow">
        {imageFiles.map(file => (
          <div
            key={file.id}
            onClick={() => onSelect(file.id)}
            className="flex flex-col items-center cursor-pointer gap-2"
          >
            <div className="w-full aspect-square flex items-center justify-center border-2 border-gray-300 rounded overflow-hidden">
              <img
                src={getResizeImage(file.fileUrl, { width: 200, height: 200 })}
                alt={file.fileName}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="text-xs text-gray-700 line-clamp-1 text-center">{file.fileName}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
