import { Component } from 'react';
import File from '../File';
import Folder from '../Folder';
import SearchBar from '../../SearchBar';
import { FileBrowserState, FileBrowserProps, FileSystemData } from '../../../types';



export default class FileBrowser extends Component<FileBrowserProps, FileBrowserState> {
  constructor(props: FileBrowserProps) {
    super(props);
    this.state = {
      expandedFolders: props.expandedFolders,
      searchQuery: ''
    };
  }

  handleFolderToggle = (path: string) => {
    this.setState(prevState => {
      const isExpanded = prevState.expandedFolders.includes(path);
      return {
        expandedFolders: isExpanded
          ? prevState.expandedFolders.filter(p => p !== path)
          : [...prevState.expandedFolders, path]
      };
    });
  };

  handleSearch = () => {
    const { searchQuery } = this.state;

    const expandedFolders = this.searchAndExpand(this.props.data, searchQuery, '');
    this.setState({ expandedFolders });
  };

  searchAndExpand = (data: FileSystemData[], query: string, path: string): string[] => {
    let expandedFolders: string[] = [];

    const expandPath = (currentPath: string) => {
      const parts = currentPath.split('/').filter(Boolean);
      return parts.map((_, index) => '/' + parts.slice(0, index + 1).join('/'));
    };

    for (const item of data) {
      if (item.type === 'FOLDER') {
        const currentFullPath = `${path}/${item.name}`;
        if (item.name.toLowerCase().includes(query.toLowerCase())) {
          expandedFolders.push(...expandPath(currentFullPath));
        }
        expandedFolders = [
          ...expandedFolders,
          ...this.searchAndExpand(item.children, query, currentFullPath)
        ];
      } else if (item.type === 'FILE') {
        if (item.name.toLowerCase().includes(query.toLowerCase())) {
          expandedFolders.push(...expandPath(path));
        }
      }
    }
    return expandedFolders;
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: e.target.value });
  };
  
  render() {
    const { data } = this.props
    const { expandedFolders, searchQuery } = this.state;

    return (
      <div>
        <SearchBar
          searchQuery={searchQuery}
          onSearch={this.handleSearch}
          onInputChange={this.handleInputChange}
        />
        <div className="file-system">
          {data.map((item, index) => (
            'children' in item ? (
              <Folder key={index} folder={item} expandedFolders={expandedFolders} fullPath='/' onFolderToggle={this.handleFolderToggle} />
            ) : (
              <File key={index} file={item} />
            )
          ))}
        </div>
      </div>
    );
  }
}