"use client";

import type { ReactNode } from 'react';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge';
import { Card } from '@/Components/ui/card';
import { GlassLogoBackground } from '@/Components/ui/glass-logo';
import { motion } from 'framer-motion';

interface LiquidMetalHeroProps {
  badge?: string;
  /** Plain text, or JSX to highlight a word. */
  title: ReactNode;
  subtitle: string;
  primaryCtaLabel: string;
  secondaryCtaLabel?: string;
  onPrimaryCtaClick: () => void;
  onSecondaryCtaClick?: () => void;
  features?: string[];
  /** What sits behind the copy. Defaults to the glass Dreekk logo. */
  background?: ReactNode;
}

export default function LiquidMetalHero({
  badge,
  title,
  subtitle,
  primaryCtaLabel,
  secondaryCtaLabel,
  onPrimaryCtaClick,
  onSecondaryCtaClick,
  features = [],
  background = <GlassLogoBackground />,
}: LiquidMetalHeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1
    }
  };

  return (
    <section className="relative isolate min-h-screen flex items-center justify-center overflow-hidden bg-background py-24">
      <div className="absolute inset-0 -z-10">{background}</div>

      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        <motion.div
          className="text-center space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {badge && (
            <motion.div
              className="flex justify-center"
              variants={itemVariants}
            >
              <Badge
                variant="secondary"
                className="bg-primary/15 text-foreground border-primary/40 hover:bg-primary/25 transition-colors duration-300 backdrop-blur-sm px-4 py-1.5 tracking-[0.18em] uppercase"
              >
                {badge}
              </Badge>
            </motion.div>
          )}

          <motion.div
            className="space-y-6"
            variants={itemVariants}
          >
            <motion.h1
              className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-foreground leading-[1.05] tracking-tight [text-shadow:0_4px_40px_rgba(0,0,0,.55)]"
              variants={itemVariants}
            >
              {title}
            </motion.h1>

            <motion.p
              className="max-w-3xl mx-auto text-lg sm:text-2xl text-foreground/85 leading-relaxed [text-shadow:0_2px_20px_rgba(0,0,0,.6)]"
              variants={itemVariants}
            >
              {subtitle}
            </motion.p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={buttonVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={onPrimaryCtaClick}
                size="lg"
                className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-[0_18px_50px_-12px_rgba(229,50,43,.75)] text-lg px-8 py-6 font-semibold"
              >
                {primaryCtaLabel}
              </Button>
            </motion.div>

            {secondaryCtaLabel && onSecondaryCtaClick && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={onSecondaryCtaClick}
                  variant="outline"
                  size="lg"
                  className="rounded-full bg-foreground/5 border-foreground/25 text-foreground hover:bg-foreground/10 hover:text-foreground hover:border-foreground/50 transition-all duration-300 backdrop-blur-sm text-lg px-8 py-6 font-semibold"
                >
                  {secondaryCtaLabel}
                </Button>
              </motion.div>
            )}
          </motion.div>

          {features.length > 0 && (
            <motion.div
              className="pt-12"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="mx-auto max-w-4xl rounded-2xl bg-foreground/[0.06] border-foreground/15 text-foreground backdrop-blur-md shadow-2xl">
                  <div className="p-6 sm:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:divide-x md:divide-foreground/10">
                      {features.map((feature, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center justify-center gap-3 text-center"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.6,
                            delay: 0.8 + (index * 0.1)
                          }}
                        >
                          <span className="h-2 w-2 shrink-0 rounded-full bg-primary shadow-[0_0_12px_2px_rgba(229,50,43,.8)]" />
                          <p className="text-foreground/90 font-medium text-lg">
                            {feature}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
