import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'motion/react';

interface AnimatedCounterProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 1.5,
  className = '',
}) => {
  const [displayValue, setDisplayValue] = useState<string>(
    `${prefix}${value.toFixed(decimals)}${suffix}`
  );

  const spring = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  const transformed = useTransform(spring, (current) =>
    `${prefix}${current.toFixed(decimals)}${suffix}`
  );

  useEffect(() => {
    spring.set(value);
    const unsubscribe = transformed.on('change', (latest) => {
      setDisplayValue(latest);
    });
    return () => unsubscribe();
  }, [value, spring, transformed, prefix, suffix, decimals]);

  return <motion.span className={className}>{displayValue}</motion.span>;
};
