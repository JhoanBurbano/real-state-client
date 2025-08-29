import { useState, useCallback } from 'react'
import { millionAPI } from '@/lib/api/million-api'
import type {
  OwnerDto,
  AgentProfile,
  AgentAvailability,
  AgentTestimonial,
  CreateOwnerRequest,
  UpdateOwnerRequest,
} from '@/types'

export function useAgents() {
  const [agents, setAgents] = useState<OwnerDto[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Get all agents (owners)
  const getAgents = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const owners = await millionAPI.getOwners()
      // Filter owners who are agents (you can adjust this logic based on your needs)
      const agents = owners.filter(
        owner => owner.role === 'Agent' || owner.isActive
      )
      setAgents(agents)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch agents')
    } finally {
      setLoading(false)
    }
  }, [])

  // Get agent profile by ID
  const getAgentProfile = useCallback(
    async (agentId: string): Promise<AgentProfile | null> => {
      setLoading(true)
      setError(null)

      try {
        const profile = await millionAPI.getAgentProfile(agentId)
        return profile
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to fetch agent profile'
        )
        return null
      } finally {
        setLoading(false)
      }
    },
    []
  )

  // Get agent availability
  const getAgentAvailability = useCallback(
    async (agentId: string): Promise<AgentAvailability | null> => {
      setLoading(true)
      setError(null)

      try {
        const availability = await millionAPI.getAgentAvailability(agentId)
        return availability
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to fetch agent availability'
        )
        return null
      } finally {
        setLoading(false)
      }
    },
    []
  )

  // Get agent testimonials
  const getAgentTestimonials = useCallback(
    async (agentId: string): Promise<AgentTestimonial[]> => {
      setLoading(true)
      setError(null)

      try {
        const testimonials = await millionAPI.getAgentTestimonials(agentId)
        return testimonials
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to fetch agent testimonials'
        )
        return []
      } finally {
        setLoading(false)
      }
    },
    []
  )

  // Create new agent
  const createAgent = useCallback(
    async (agentData: CreateOwnerRequest): Promise<OwnerDto | null> => {
      setLoading(true)
      setError(null)

      try {
        const newAgent = await millionAPI.createOwner({
          ...agentData,
          role: 'Agent',
        })
        setAgents(prev => [...prev, newAgent])
        return newAgent
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to create agent')
        return null
      } finally {
        setLoading(false)
      }
    },
    []
  )

  // Update agent profile
  const updateAgent = useCallback(
    async (
      agentId: string,
      updates: UpdateOwnerRequest
    ): Promise<OwnerDto | null> => {
      setLoading(true)
      setError(null)

      try {
        const updatedAgent = await millionAPI.updateOwnerProfile(updates)
        setAgents(prev =>
          prev.map(agent => (agent.id === agentId ? updatedAgent : agent))
        )
        return updatedAgent
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to update agent')
        return null
      } finally {
        setLoading(false)
      }
    },
    []
  )

  // Clear error
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    agents,
    loading,
    error,
    getAgents,
    getAgentProfile,
    getAgentAvailability,
    getAgentTestimonials,
    createAgent,
    updateAgent,
    clearError,
  }
}

// Hook for single agent management
export function useAgent(agentId: string) {
  const [agent, setAgent] = useState<AgentProfile | null>(null)
  const [availability, setAvailability] = useState<AgentAvailability | null>(
    null
  )
  const [testimonials, setTestimonials] = useState<AgentTestimonial[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load agent data
  const loadAgentData = useCallback(async () => {
    if (!agentId) return

    setLoading(true)
    setError(null)

    try {
      const [profile, availabilityData, testimonialsData] = await Promise.all([
        millionAPI.getAgentProfile(agentId),
        millionAPI.getAgentAvailability(agentId),
        millionAPI.getAgentTestimonials(agentId),
      ])

      setAgent(profile)
      setAvailability(availabilityData)
      setTestimonials(testimonialsData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load agent data')
    } finally {
      setLoading(false)
    }
  }, [agentId])

  // Update agent availability
  const updateAvailability = useCallback(
    async (newAvailability: Partial<AgentAvailability>) => {
      if (!agentId) return

      setLoading(true)
      setError(null)

      try {
        // Note: This would need a backend endpoint to update agent availability
        // For now, we'll just update the local state
        setAvailability(prev => (prev ? { ...prev, ...newAvailability } : null))
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to update agent availability'
        )
      } finally {
        setLoading(false)
      }
    },
    [agentId]
  )

  // Add testimonial
  const addTestimonial = useCallback(
    async (testimonial: Omit<AgentTestimonial, 'id' | 'date'>) => {
      if (!agentId) return

      setLoading(true)
      setError(null)

      try {
        // Note: This would need a backend endpoint to add testimonials
        // For now, we'll just update the local state
        const newTestimonial: AgentTestimonial = {
          ...testimonial,
          id: `temp-${Date.now()}`,
          date: new Date().toISOString(),
        }
        setTestimonials(prev => [...prev, newTestimonial])
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to add testimonial'
        )
      } finally {
        setLoading(false)
      }
    },
    [agentId]
  )

  // Clear error
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    agent,
    availability,
    testimonials,
    loading,
    error,
    loadAgentData,
    updateAvailability,
    addTestimonial,
    clearError,
  }
}
