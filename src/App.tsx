import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import { Routes } from './routes';
import { AuthProvider } from './contexts/AuthContext';

import GlobalStyles from './styles/global'

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes />
      </AuthProvider>

      <Toaster />
      <GlobalStyles />
    </BrowserRouter>
  );
}
