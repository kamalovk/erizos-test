import { Component } from 'react';
import { FolderProps, FolderState } from '../../../types';
import File from '../File';
import './style.css'

export default class Folder extends Component<FolderProps, FolderState> {
  constructor(props: FolderProps) {
    super(props);

    const fullPath = this.getFullPath(props.fullPath, props.folder.name);
    this.state = {
      isOpen: props.expandedFolders.includes(fullPath)
    };
  }

  componentDidUpdate(prevProps: FolderProps) {
    const fullPath = this.getFullPath(this.props.fullPath, this.props.folder.name);
    if (prevProps.expandedFolders !== this.props.expandedFolders) {
      this.setState({
        isOpen: this.props.expandedFolders.includes(fullPath)
      });
    }
  }

  getFullPath = (parentPath: string, folderName: string): string => {
    return `${parentPath}/${folderName}`.replace('//', '/');
  }

  handleClick = () => {
    const fullPath = this.getFullPath(this.props.fullPath, this.props.folder.name);
    this.setState({ isOpen: !this.state.isOpen }, () => {
      this.props.onFolderToggle(fullPath);
    });
  };

  render() {
    const { expandedFolders, fullPath, onFolderToggle } = this.props;

    const { name, children } = this.props.folder;
    const { isOpen } = this.state;

    const currentFullPath = this.getFullPath(fullPath, name);

    return (
      <div className="folder">
        <div className="folder-header" onClick={this.handleClick}>
          <span>{name}</span>
          {isOpen ? <span className="arrow">&#9660;</span> : <span className="arrow">&#9654;</span>}
        </div>
        {isOpen && children && (
          <div className="folder-content">
            {children.map((item, index) => (
              item.type === 'FOLDER' ? (
                <Folder key={index} folder={item} expandedFolders={expandedFolders} fullPath={currentFullPath} onFolderToggle={onFolderToggle} />
              ) : (
                <File key={index} file={item} />
              )
            ))}
          </div>
        )}
      </div>
    );
  }
}
