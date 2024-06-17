export interface FileData {
  mime: string;
  name: string;
  type: 'FILE';
}

export interface FolderData {
  children: FileSystemData[];
  name: string;
  type: 'FOLDER';
}

export type FileSystemData = FileData | FolderData;


export interface FileProps {
  file: FileData;
}

export interface FolderProps {
  folder: FolderData;
  expandedFolders: string[];
  fullPath: string;
  onFolderToggle: (path: string) => void;
}

export interface FolderState {
  isOpen: boolean;
}


export interface FileBrowserProps {
  data: FileSystemData[];
  expandedFolders: string[];
}

export interface FileBrowserState {
  expandedFolders: string[];
  searchQuery: string;
}