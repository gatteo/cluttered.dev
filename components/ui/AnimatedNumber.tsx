'use client'

import { useEffect } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'

interface AnimatedNumberProps {
  value: number
  suffix?: string
  prefix?: string
  className?: string
  decimals?: number
}

export function AnimatedNumber({
  value,
  suffix = '',
  prefix = '',
  className,
  decimals = 0,
}: AnimatedNumberProps) {
  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 })
  const display = useTransform(spring, (current) =>
    `${prefix}${current.toFixed(decimals)}${suffix}`
  )

  useEffect(() => {
    spring.set(value)
  }, [spring, value])

  return (
    <motion.span className={className}>
      {display}
    </motion.span>
  )
}
