import React from 'react'
import { useAuthContext } from '../context/AuthContext'
import { ProtectedRoute } from '../components/auth/ProtectedRoute'

// Example of how to use the authentication system

export const AuthExample: React.FC = () => {
  const { isAuthenticated, isLoading, user, login, logout } = useAuthContext()

  const handleLogin = async () => {
    try {
      await login('sarah.johnson@millionrealestate.com', 'test1234')
      console.log('Login successful!')
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      console.log('Logout successful!')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  if (isLoading) {
    return <div>Loading authentication...</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Authentication Example</h1>

      {isAuthenticated ? (
        <div>
          <p className="mb-4">You are logged in!</p>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <p className="mb-4">You are not logged in.</p>
          <button
            onClick={handleLogin}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Login with Demo Account
          </button>
        </div>
      )}

      {/* Example of protected content */}
      <ProtectedRoute>
        <div className="mt-8 p-4 bg-green-100 rounded">
          <h2 className="text-lg font-semibold mb-2">Protected Content</h2>
          <p>This content is only visible to authenticated users.</p>
        </div>
      </ProtectedRoute>
    </div>
  )
}

// Example of a protected component
export const ProtectedComponent: React.FC = () => {
  return (
    <ProtectedRoute>
      <div className="p-4 bg-blue-100 rounded">
        <h3 className="font-semibold">Protected Component</h3>
        <p>This component is wrapped with ProtectedRoute.</p>
      </div>
    </ProtectedRoute>
  )
}
