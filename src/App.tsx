import FileBrowser from './Components/FileSystem/FileBrowser/FileBrowser';
import { FileSystemData } from './types';
import data from './data/data.json';

import './App.css';

const expandedFolders = ['/Common7', '/Common7/IDE', '/DIA SDK'];

function App() {
  return (
    <div className="App">
      <FileBrowser data={data as FileSystemData[]} expandedFolders={expandedFolders} />
    </div>
  );
}

export default App;
