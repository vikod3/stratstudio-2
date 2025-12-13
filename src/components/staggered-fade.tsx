import { cn } from '@/lib/utils';
import { motion, useInView } from 'framer-motion';
import * as React from 'react';

type StaggeredFadeProps = {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
};

export const StaggeredFade: React.FC<StaggeredFadeProps> = ({
  text,
  className = '',
  as = 'span',
}) => {
  const variants = {
    hidden: { opacity: 0 },
    show: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: { delay: i * 0.07 },
    }),
  };

  const letters = text.split('');
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  const MotionComponent = motion[as];

  return (
    <MotionComponent
      ref={ref}
      initial="hidden"
      animate={isInView ? 'show' : ''}
      variants={variants}
      viewport={{ once: true }}
      className={cn(className)}
    >
      {letters.map((letter, i) => (
        <motion.span key={`${letter}-${i}`} variants={variants} custom={i}>
          {letter}
        </motion.span>
      ))}
    </MotionComponent>
  );
};
