import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import './index.css'
import App from './components/App/App.jsx'
import HomePage from './components/Pages/HomePage.jsx'
import PageNotFound from './components/Pages/PageNotFound.jsx'
import LoginForm from './components/Forms/LoginForm.jsx'
import SignupForm from './components/Forms/SignupForm.jsx'
import store from './store/store.js'
import Account from './components/Account/Account.jsx'
import ProtectedRoute from './util/ProtectedRoute.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />}/>
            <Route path="login" element={<LoginForm />}/>
            <Route path="signup" element={<SignupForm />}/>
            <Route path="account" element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<PageNotFound />}/>
          </Route>
        </Routes>
      </BrowserRouter> 
    </Provider>
  </StrictMode>,
)
