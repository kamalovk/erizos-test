import { Component } from 'react';
import { FileProps } from '../../../types';
import './style.css'

export default class File extends Component<FileProps> {
  render() {
    const { name } = this.props.file;
    return (
      <div className="file">
        <span className="file">{name}</span>
      </div>
    );
  }
}