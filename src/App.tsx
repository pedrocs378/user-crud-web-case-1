import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import { Routes } from './routes';

import GlobalStyles from './styles/global'

export function App() {
  return (
    <BrowserRouter>
      <Routes />

      <Toaster />
      <GlobalStyles />
    </BrowserRouter>
  );
}
