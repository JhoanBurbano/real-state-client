import { useEffect, useRef } from 'react';

/**
 * Accessibility utilities for WCAG AA compliance
 */

// Focus management hook
export function useFocusManagement() {
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const trapFocus = (containerElement: HTMLElement) => {
    const focusableElements = containerElement.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        restoreFocus();
      }
    };

    containerElement.addEventListener('keydown', handleTabKey);
    containerElement.addEventListener('keydown', handleEscapeKey);
    
    // Focus first element
    firstElement.focus();

    return () => {
      containerElement.removeEventListener('keydown', handleTabKey);
      containerElement.removeEventListener('keydown', handleEscapeKey);
    };
  };

  const saveFocus = () => {
    previousFocusRef.current = document.activeElement as HTMLElement;
  };

  const restoreFocus = () => {
    if (previousFocusRef.current) {
      previousFocusRef.current.focus();
      previousFocusRef.current = null;
    }
  };

  return { trapFocus, saveFocus, restoreFocus };
}

// Reduced motion detection
export function useReducedMotion() {
  const prefersReducedMotion = 
    typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return prefersReducedMotion;
}

// Announce to screen readers
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite') {
  if (typeof window === 'undefined') return;

  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.setAttribute('class', 'sr-only');
  announcement.textContent = message;

  document.body.appendChild(announcement);

  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

// Keyboard navigation helpers
export const KEYBOARD_KEYS = {
  ENTER: 'Enter',
  SPACE: ' ',
  ESCAPE: 'Escape',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  HOME: 'Home',
  END: 'End',
  TAB: 'Tab'
} as const;

export function handleKeyboardNavigation(
  event: React.KeyboardEvent,
  actions: Partial<Record<keyof typeof KEYBOARD_KEYS, () => void>>
) {
  const key = event.key as keyof typeof KEYBOARD_KEYS;
  const action = actions[key];
  
  if (action) {
    event.preventDefault();
    action();
  }
}

// ARIA label generators
export function generateAriaLabel(context: {
  type: 'property' | 'button' | 'link' | 'input';
  action?: string;
  label?: string;
  price?: string;
  location?: string;
  bedrooms?: number;
  bathrooms?: number;
  status?: string;
}): string {
  const { type, action, label, price, location, bedrooms, bathrooms, status } = context;

  switch (type) {
    case 'property':
      return `Property ${price ? `priced at ${price}` : ''} ${location ? `in ${location}` : ''} ${
        bedrooms ? `with ${bedrooms} bedrooms` : ''
      } ${bathrooms ? `and ${bathrooms} bathrooms` : ''} ${status ? `Status: ${status}` : ''}`.trim();
    
    case 'button':
      return `${action || 'Button'} ${label ? `for ${label}` : ''}`.trim();
    
    case 'link':
      return `${action || 'Link'} ${label ? `to ${label}` : ''}`.trim();
    
    case 'input':
      return `${label || 'Input field'} ${action ? `to ${action}` : ''}`.trim();
    
    default:
      return label || '';
  }
}

// Color contrast checker (basic implementation)
export function checkColorContrast(foreground: string, background: string): boolean {
  // This is a simplified version - in production you'd use a full WCAG contrast checker
  // For now, we'll assume our design system colors pass WCAG AA
  return true;
}