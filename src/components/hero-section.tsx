import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlowBadge } from "@/components/glow-badge";
import { StaggeredFade } from "@/components/staggered-fade";
import { BlurInHeading } from "@/components/blur-in-heading";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useToast } from "@/hooks/use-toast";

import img1 from "@/assets/hero-bg/img-1.avif";
import img2 from "@/assets/hero-bg/img-2.avif";
import img3 from "@/assets/hero-bg/img-3.avif";

export const HeroSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Request submitted!",
      description: "We'll send your free audit to " + email,
    });
    setEmail("");
  };

  return (
    <section className="relative min-h-screen px-6 md:px-12 lg:px-24 overflow-hidden flex items-center justify-center">
      {/* Background Decorative Layer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          perspective: "1200px",
          transform: "perspective(1200px) rotateX(15deg)",
          transformOrigin: "center bottom",
          top: "20%",
        }}
      >
        {/* Image 3 (Back) - spins clockwise */}
        <div className={prefersReducedMotion ? "" : "animate-spin-slow"}>
          <div
            className="absolute top-1/2 left-1/2"
            style={{
              width: "2000px",
              height: "2000px",
              transform: "translate(-50%, -50%) rotate(279.05deg)",
              zIndex: 0,
            }}
          >
            <img
              src={img3}
              alt=""
              className="w-full h-full object-cover opacity-50"
            />
          </div>
        </div>

        {/* Image 2 (Middle) - spins counter-clockwise */}
        <div className={prefersReducedMotion ? "" : "animate-spin-slow-reverse"}>
          <div
            className="absolute top-1/2 left-1/2"
            style={{
              width: "1000px",
              height: "1000px",
              transform: "translate(-50%, -50%) rotate(304.42deg)",
              zIndex: 1,
            }}
          >
            <img
              src={img2}
              alt=""
              className="w-full h-full object-cover opacity-60"
            />
          </div>
        </div>

        {/* Image 1 (Front) - spins clockwise */}
        <div className={prefersReducedMotion ? "" : "animate-spin-slow"}>
          <div
            className="absolute top-1/2 left-1/2"
            style={{
              width: "800px",
              height: "800px",
              transform: "translate(-50%, -50%) rotate(48.33deg)",
              zIndex: 2,
            }}
          >
            <img
              src={img1}
              alt=""
              className="w-full h-full object-cover opacity-80"
            />
          </div>
        </div>
      </motion.div>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: `linear-gradient(to top, hsl(var(--background)) 10%, hsl(var(--background) / 0.8) 40%, transparent 100%)`,
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Hero Content */}
        <div className="relative z-20 flex-col text-center gap-7 my-0 flex items-center justify-end py-0 pt-[240px] pb-20">
          {/* Badge */}
          <GlowBadge>
            <StaggeredFade text="AI-powered social media marketing" />
          </GlowBadge>

          {/* Heading and Subtext */}
          <div className="flex flex-col items-center gap-4">
            <BlurInHeading as="h1" className="max-w-[800px] text-foreground font-medium leading-none text-[69px]">
               Meet your new AI <br className="hidden lg:block" />
               <span className="block font-source-serif font-medium italic -mt-6">Social Media Agency</span>
             </BlurInHeading>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.9, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="max-w-[684px] text-foreground text-lg md:text-xl font-normal leading-8"
            >
              We partner with ambitious brands to craft viral content, build engaged communities, and scale your social presence with strategy.
            </motion.p>
          </div>

          {/* Email CTA Form */}
          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center gap-0 w-full max-w-md mb-8"
          >
            <div className="flex w-full rounded-2xl overflow-hidden backdrop-blur-md bg-background/10 border border-white/20 shadow-lg">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-14 px-6 bg-transparent border-0 text-foreground placeholder:text-foreground/50 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none"
              />
              <Button 
                type="submit" 
                variant="glass" 
                size="lg" 
                className="h-14 px-6 rounded-none rounded-r-2xl text-base shrink-0"
              >
                Get Free Audit
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </motion.form>
        </div>
      </div>

      {/* Bottom Fade Effect */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-48 z-20 pointer-events-none"
        style={{
          background: `linear-gradient(to top, hsl(var(--background)) 0%, transparent 100%)`,
        }}
      />
    </section>
  );
};
