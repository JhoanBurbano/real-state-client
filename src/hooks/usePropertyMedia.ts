'use client'

import { useState, useCallback } from 'react'
import { millionAPI } from '@/lib/api/million-api'
import { useToast } from '@/context/ToastContext'
import type { PropertyDetailDto } from '@/types'

interface MediaItem {
  url: string
  type: 'Image' | 'Video'
  index: number
  featured: boolean
  poster?: string
}

interface PropertyMediaState {
  isLoading: boolean
  error: string | null
}

export function usePropertyMedia() {
  const [state, setState] = useState<PropertyMediaState>({
    isLoading: false,
    error: null,
  })

  const toast = useToast()

  // Update property cover
  const updateCover = useCallback(
    async (
      propertyId: string,
      coverData: {
        url: string
        type: 'Image' | 'Video'
        poster?: string
      }
    ): Promise<PropertyDetailDto | null> => {
      try {
        setState(prev => ({ ...prev, isLoading: true, error: null }))

        const updatedProperty = await millionAPI.updatePropertyCover(
          propertyId,
          coverData
        )

        setState(prev => ({ ...prev, isLoading: false }))
        if (toast) {
          toast.showSuccess(
            'Portada actualizada',
            'La imagen de portada se actualizó correctamente'
          )
        }

        return updatedProperty
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Error al actualizar la portada'
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }))
        if (toast) {
          toast.showError('Error al actualizar la portada', errorMessage)
        }
        return null
      }
    },
    [] // Remove toast dependency
  )

  // Update property gallery
  const updateGallery = useCallback(
    async (
      propertyId: string,
      galleryData: {
        gallery: MediaItem[]
      }
    ): Promise<PropertyDetailDto | null> => {
      try {
        setState(prev => ({ ...prev, isLoading: true, error: null }))

        const updatedProperty = await millionAPI.updatePropertyGallery(
          propertyId,
          galleryData
        )

        setState(prev => ({ ...prev, isLoading: false }))
        if (toast) {
          toast.showSuccess(
            'Galería actualizada',
            'La galería se actualizó correctamente'
          )
        }

        return updatedProperty
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Error al actualizar la galería'
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }))
        if (toast) {
          toast.showError('Error al actualizar la galería', errorMessage)
        }
        return null
      }
    },
    [] // Remove toast dependency
  )

  // Add media item
  const addMedia = useCallback(
    async (
      propertyId: string,
      media: MediaItem
    ): Promise<PropertyDetailDto | null> => {
      try {
        setState(prev => ({ ...prev, isLoading: true, error: null }))

        const updatedProperty = await millionAPI.updatePropertyMedia(
          propertyId,
          {
            action: 'Add',
            media,
          }
        )

        setState(prev => ({ ...prev, isLoading: false }))
        if (toast) {
          toast.showSuccess(
            'Media agregado',
            'Se agregó el elemento a la galería correctamente'
          )
        }

        return updatedProperty
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Error al agregar el elemento'
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }))
        if (toast) {
          toast.showError('Error al agregar el elemento', errorMessage)
        }
        return null
      }
    },
    [] // Remove toast dependency
  )

  // Update media item
  const updateMedia = useCallback(
    async (
      propertyId: string,
      mediaId: string,
      updates: {
        featured?: boolean
        index?: number
        enabled?: boolean
      }
    ): Promise<PropertyDetailDto | null> => {
      try {
        setState(prev => ({ ...prev, isLoading: true, error: null }))

        const updatedProperty = await millionAPI.updatePropertyMedia(
          propertyId,
          {
            action: 'Update',
            mediaId,
            updates,
          }
        )

        setState(prev => ({ ...prev, isLoading: false }))
        if (toast) {
          toast.showSuccess(
            'Media actualizado',
            'El elemento se actualizó correctamente'
          )
        }

        return updatedProperty
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Error al actualizar el elemento'
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }))
        if (toast) {
          toast.showError('Error al actualizar el elemento', errorMessage)
        }
        return null
      }
    },
    [] // Remove toast dependency
  )

  // Delete media item
  const deleteMedia = useCallback(
    async (
      propertyId: string,
      mediaId: string
    ): Promise<PropertyDetailDto | null> => {
      try {
        setState(prev => ({ ...prev, isLoading: true, error: null }))

        const updatedProperty = await millionAPI.updatePropertyMedia(
          propertyId,
          {
            action: 'Delete',
            mediaId,
          }
        )

        setState(prev => ({ ...prev, isLoading: false }))
        if (toast) {
          toast.showSuccess(
            'Media eliminado',
            'El elemento se eliminó correctamente'
          )
        }

        return updatedProperty
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Error al eliminar el elemento'
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }))
        if (toast) {
          toast.showError('Error al eliminar el elemento', errorMessage)
        }
        return null
      }
    },
    [] // Remove toast dependency
  )

  // Toggle media enabled/disabled
  const toggleMedia = useCallback(
    async (
      propertyId: string,
      mediaId: string
    ): Promise<PropertyDetailDto | null> => {
      try {
        setState(prev => ({ ...prev, isLoading: true, error: null }))

        const updatedProperty = await millionAPI.updatePropertyMedia(
          propertyId,
          {
            action: 'Toggle',
            mediaId,
          }
        )

        setState(prev => ({ ...prev, isLoading: false }))
        if (toast) {
          toast.showSuccess(
            'Estado cambiado',
            'El estado del elemento se cambió correctamente'
          )
        }

        return updatedProperty
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Error al cambiar el estado'
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }))
        if (toast) {
          toast.showError('Error al cambiar el estado', errorMessage)
        }
        return null
      }
    },
    [] // Remove toast dependency
  )

  // Get property media
  const getMedia = useCallback(
    async (propertyId: string) => {
      try {
        setState(prev => ({ ...prev, isLoading: true, error: null }))

        const media = await millionAPI.getPropertyMedia(propertyId)

        setState(prev => ({ ...prev, isLoading: false }))
        return media
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Error al cargar el media'
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }))
        if (toast) {
          toast.showError('Error al cargar el media', errorMessage)
        }
        return null
      }
    },
    [] // Remove toast dependency
  )

  return {
    ...state,
    updateCover,
    updateGallery,
    addMedia,
    updateMedia,
    deleteMedia,
    toggleMedia,
    getMedia,
  }
}
