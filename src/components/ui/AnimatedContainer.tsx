'use client'

import { motion, Variants } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedContainerProps {
  children: ReactNode
  className?: string
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'scaleIn' | 'bounceIn'
  delay?: number
  duration?: number
  stagger?: boolean
  staggerChildren?: number
}

const animations: Record<string, Variants> = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideUp: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  },
  slideLeft: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  },
  bounceIn: {
    initial: { opacity: 0, scale: 0.3 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
      },
    },
    exit: { opacity: 0, scale: 0.3 },
  },
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function AnimatedContainer({
  children,
  className = '',
  animation = 'fadeIn',
  delay = 0,
  duration = 0.5,
  stagger = false,
  staggerChildren = 0.1,
}: AnimatedContainerProps) {
  const selectedAnimation = animations[animation]

  if (stagger) {
    return (
      <motion.div
        className={className}
        variants={containerVariants}
        initial="hidden"
        animate="show"
        transition={{ staggerChildren }}
      >
        {React.Children.map(children, (child, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            transition={{ delay: index * staggerChildren }}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
    )
  }

  return (
    <motion.div
      className={className}
      variants={selectedAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        duration,
        delay,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  )
}

// Componentes específicos para casos de uso comunes
export function FadeInContainer({
  children,
  className = '',
  delay = 0,
}: Omit<AnimatedContainerProps, 'animation'>) {
  return (
    <AnimatedContainer className={className} animation="fadeIn" delay={delay}>
      {children}
    </AnimatedContainer>
  )
}

export function SlideUpContainer({
  children,
  className = '',
  delay = 0,
}: Omit<AnimatedContainerProps, 'animation'>) {
  return (
    <AnimatedContainer className={className} animation="slideUp" delay={delay}>
      {children}
    </AnimatedContainer>
  )
}

export function StaggerContainer({
  children,
  className = '',
  staggerChildren = 0.1,
}: Omit<AnimatedContainerProps, 'animation' | 'delay'>) {
  return (
    <AnimatedContainer
      className={className}
      stagger={true}
      staggerChildren={staggerChildren}
    >
      {children}
    </AnimatedContainer>
  )
}
