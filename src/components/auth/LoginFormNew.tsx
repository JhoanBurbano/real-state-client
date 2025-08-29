'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '../../context/AuthContext'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react'

interface LoginFormProps {
  onSuccess?: () => void
  onError?: (error: string) => void
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onError }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const { login, isLoading } = useAuthContext()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      await login(email, password)
      onSuccess?.()
      // Redirect to dashboard after successful login
      router.push('/dashboard')
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Login failed'
      setError(errorMessage)
      onError?.(errorMessage)
    }
  }

  const handleDemoLogin = async () => {
    try {
      setError('')
      await login('sarah.johnson@millionrealestate.com', 'test1234')
      onSuccess?.()
      // Redirect to dashboard after successful demo login
      router.push('/dashboard')
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Demo login failed'
      setError(errorMessage)
      onError?.(errorMessage)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-surface-elev rounded-2xl p-8 shadow-luxury-md">
        <div className="text-center mb-8">
          <h2 className="font-playfair text-3xl font-bold text-text mb-2">
            Welcome to MILLION
          </h2>
          <p className="text-text-muted">
            Sign in to access your luxury real estate dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-text mb-2"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-muted" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="pl-10"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-text mb-2"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-muted" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="pl-10 pr-10"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text"
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
              <p className="text-error text-sm">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </Button>

          {/* Demo Login Button */}
          <Button
            type="button"
            variant="outline"
            className="w-full"
            size="lg"
            onClick={handleDemoLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Signing In...
              </>
            ) : (
              'Try Demo Account'
            )}
          </Button>
        </form>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-text-muted">
            Demo credentials: sarah.johnson@millionrealestate.com / test1234
          </p>
        </div>
      </div>
    </div>
  )
}
