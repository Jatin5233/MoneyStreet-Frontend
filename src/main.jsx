// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './AuthContext'; // ✅ your context file path

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
     <AuthProvider> {/* ✅ Must wrap your app */}
      <App />
    </AuthProvider>
    </BrowserRouter>
   
  </React.StrictMode>
);
