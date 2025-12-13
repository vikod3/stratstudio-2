import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import Hls from "hls.js";
import { Button } from "@/components/ui/button";
import { GlowBadge } from "@/components/glow-badge";
import { BlurInHeading } from "@/components/blur-in-heading";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
const HLS_VIDEO_URL = "https://customer-cbeadsgr09pnsezs.cloudflarestream.com/3dd32fd909c65a8d1218e727da59f1d2/manifest/video.m3u8";
export const HeroSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersReducedMotion) return;
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(HLS_VIDEO_URL);
      hls.attachMedia(video);
      return () => hls.destroy();
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = HLS_VIDEO_URL;
    }
  }, [prefersReducedMotion]);
  return <section className="relative min-h-screen px-6 md:px-12 lg:px-24 overflow-hidden flex items-center justify-center">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {prefersReducedMotion ? <div className="absolute inset-0 bg-gradient-to-b from-muted/20 to-background" /> : <video ref={videoRef} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover grayscale" />}
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-background/60" />
        {/* Bottom Fade Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Hero Content */}
        <div className="relative z-20 flex-col text-center gap-7 my-0 flex items-center justify-end py-0 pt-[240px]">
          {/* Badge */}
          <GlowBadge>Design studio for AI, SaaS & Tech</GlowBadge>

          {/* Heading and Subtext */}
          <div className="flex flex-col items-center gap-4">
            <BlurInHeading as="h1" className="max-w-[800px] text-foreground font-medium leading-[0.95] text-[69px]">
              Meet your new AI <span className="font-source-serif font-medium italic">Design Agency</span>
            </BlurInHeading>
            <p className="max-w-[684px] opacity-90 text-foreground text-lg md:text-xl font-normal leading-8">
              We collaborate with forward-thinking teams to create unique brands, launch intelligent products, and grow with intention.
            </p>
          </div>

          {/* CTA Button */}
          <Link to="/contact">
            <Button variant="glass" size="lg" className="h-14 px-8 py-4 rounded-2xl text-lg">
              Schedule a 1:1 Meeting
              <ArrowRight className="w-6 h-6" />
            </Button>
          </Link>
        </div>
      </div>
    </section>;
};