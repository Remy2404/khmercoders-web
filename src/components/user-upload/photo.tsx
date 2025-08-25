import { UserUploadRecord } from '@/types';
import { getResizeImage } from '@/utils/image';
import { useMemo } from 'react';

interface UserUploadPhotoProps {
  files: UserUploadRecord[];
  onSelect: (file: string) => void;
}

export function UserUploadPhotoTab({ onSelect, files }: UserUploadPhotoProps) {
  const imageFiles = useMemo(() => {
    return files.filter(file => file.fileType.startsWith('image/'));
  }, [files]);

  return (
    <div className="p-4 grid grid-cols-4 gap-4 overflow-y-auto">
      {imageFiles.map(file => (
        <div
          key={file.id}
          onClick={() => onSelect(file.id)}
          className="flex flex-col items-center cursor-pointer"
        >
          <img
            src={getResizeImage(file.fileUrl, { width: 200, height: 200 })}
            alt={file.fileName}
            className="w-32 h-32 border-2 border-gray-300 rounded object-cover"
          />
          <span className="mt-2 text-xs text-gray-700 truncate w-32 text-center">
            {file.fileName}
          </span>
        </div>
      ))}
    </div>
  );
}
