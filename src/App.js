import Header from './components/Header';
import Library from './components/Library';
import { DataProvider } from './contexts/DataContext';

function App() {
  return (
    <div className="app">
      <Header/>
      <DataProvider>
        <Library
        />
      </DataProvider>
    </div>
  );
}

export default App;
