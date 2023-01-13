import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';

import HomePage from 'pages/HomePage';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
		
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;