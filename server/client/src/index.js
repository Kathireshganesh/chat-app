

import React from 'react';
import ReactDOM from 'react-dom/client'; // ✅ React 18 syntax
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; // ✅ Bootstrap styles

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
