export interface DriveFolder {
  id: string;
  name: string;
  brandId: string;
  parentFolderId: string | null;
  createdAt: string;
}

export interface DriveFile {
  id: string;
  name: string;
  brandId: string;
  folderId: string | null;
  downloadUrl: string;
  size: number;
  type: string;
  createdAt: string;
}
