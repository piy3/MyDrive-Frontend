'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Folders_files from '@/components/ui/folder_file';

const FolderPage = () => {
  const params = useParams();
  let folderIds = params.folderId || [];

  // Ensure folderIds is an array
  if (!Array.isArray(folderIds)) {
    folderIds = [folderIds];
  }

  // folderIds: ['id1:name1', 'id2:name2']
  const folderSegments = folderIds.map(segment => {
    const [id, name] = decodeURIComponent(segment).split(':');
    return { id, name };
  });

  const currentFolderId = folderSegments?.[folderSegments.length - 1]?.id || null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Folder: {folderSegments?.[folderSegments.length - 1]?.name || currentFolderId}
      </h1>

      {/* ✅ Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-blue-600 text-sm flex-wrap">
        <Link href="/mydrive" className="hover:underline font-medium">Home</Link>
        {folderSegments.map((segment, idx) => {
          const href = `/mydrive/${folderSegments
            .slice(0, idx + 1)
            .map(f => `${f.id}:${encodeURIComponent(f.name)}`)
            .join('/')}`;
          return (
            <span key={segment.id} className="flex items-center gap-2">
              <span>/</span>
              <Link href={href} className="hover:underline font-medium">
                {segment.name || segment.id}
              </Link>
            </span>
          );
        })}
      </nav>

      <Folders_files parentFolderId={currentFolderId} />
    </div>
  );
};

export default FolderPage;
