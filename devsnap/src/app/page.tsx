"use client";

import { motion } from "framer-motion";
import {
  Camera,
  Share2,
  Users,
  Download,
  Terminal,
  Code2,
  Sparkles,
  ArrowRight,
  Check,
  Github,
  Zap,
  Shield,
  Clock,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

// Header Component
function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Camera className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">DevSnap</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              How it Works
            </a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

// Terminal Demo Component
function TerminalDemo() {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText("npm install -g devsnap");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="relative"
    >
      {/* Glow effect behind terminal */}
      <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur-2xl opacity-50" />
      
      <div className="relative terminal rounded-xl overflow-hidden shadow-2xl">
        {/* Terminal header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-terminal-muted border-b border-border">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs text-muted-foreground ml-2">terminal</span>
        </div>

        {/* Terminal content */}
        <div className="p-4 space-y-3">
          {/* Install command */}
          <div className="flex items-center justify-between group">
            <div className="flex items-center gap-2">
              <span className="text-neon">$</span>
              <span className="text-foreground">npm install -g devsnap</span>
            </div>
            <button
              onClick={handleCopy}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md hover:bg-muted"
            >
              {copied ? (
                <Check className="w-4 h-4 text-neon" />
              ) : (
                <Copy className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
          </div>

          {/* Capture command with animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-2"
          >
            <span className="text-neon">$</span>
            <span className="text-foreground">devsnap capture</span>
          </motion.div>

          {/* Output */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="space-y-1 text-sm"
          >
            <div className="text-muted-foreground">
              <span className="text-primary">→</span> Capturing VS Code extensions...{" "}
              <span className="text-neon">24 found</span>
            </div>
            <div className="text-muted-foreground">
              <span className="text-primary">→</span> Capturing shell config...{" "}
              <span className="text-neon">zsh + oh-my-zsh</span>
            </div>
            <div className="text-muted-foreground">
              <span className="text-primary">→</span> Capturing runtimes...{" "}
              <span className="text-neon">node 20.10.0, python 3.12</span>
            </div>
            <div className="text-muted-foreground">
              <span className="text-primary">→</span> Capturing packages...{" "}
              <span className="text-neon">47 global packages</span>
            </div>
          </motion.div>

          {/* Success message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="pt-2 border-t border-border/50"
          >
            <div className="flex items-center gap-2 text-neon">
              <Sparkles className="w-4 h-4" />
              <span>Snapshot created!</span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-muted-foreground">Share link:</span>
              <a href="#" className="text-primary hover:underline">
                devsnap.io/s/abc123
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// Hero Section
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-16">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute inset-0 bg-radial-gradient" />
      
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column - Text */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.div variants={fadeInUp}>
              <Badge variant="outline" className="mb-6 border-primary/50 text-primary">
                <Sparkles className="w-3 h-3 mr-1" />
                Now in public beta
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Share your dev setup{" "}
              <span className="gradient-text">with one link</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Capture your complete development environment in seconds. 
              Stop explaining your setup. Start sharing it.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground group">
                Get Started Free
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="border-border hover:bg-muted">
                <Terminal className="w-4 h-4 mr-2" />
                View Demo
              </Button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              variants={fadeInUp}
              className="mt-10 flex items-center gap-6 justify-center lg:justify-start"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium"
                    style={{ backgroundColor: `hsl(${i * 60}, 50%, 30%)` }}
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="text-foreground font-medium">2,500+</span> developers already using DevSnap
              </div>
            </motion.div>
          </motion.div>

          {/* Right column - Terminal */}
          <div className="lg:pl-8">
            <TerminalDemo />
          </div>
        </div>
      </div>
    </section>
  );
}

// Features Section
function FeaturesSection() {
  const features = [
    {
      icon: Camera,
      title: "One-Click Capture",
      description: "Capture your entire dev environment in seconds. VS Code extensions, shell config, runtimes, and more.",
      color: "text-primary",
    },
    {
      icon: Share2,
      title: "Instant Sharing",
      description: "Generate a beautiful, shareable link that showcases your complete setup to anyone.",
      color: "text-accent",
    },
    {
      icon: Users,
      title: "Team Sync",
      description: "Keep your team aligned with blessed configurations and onboarding checklists.",
      color: "text-chart-3",
    },
    {
      icon: Download,
      title: "Install Scripts",
      description: "Generate ready-to-run scripts that replicate your environment on any machine.",
      color: "text-chart-4",
    },
    {
      icon: Shield,
      title: "Secure by Default",
      description: "Automatic redaction of secrets, API keys, and sensitive data before sharing.",
      color: "text-chart-5",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Capture completes in under 10 seconds. Share in one click. No configuration needed.",
      color: "text-primary",
    },
  ];

  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">Features</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Everything you need to share your setup
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            DevSnap captures every aspect of your development environment and makes it instantly shareable.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div key={feature.title} variants={fadeInUp}>
              <Card className="bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 h-full">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-4 ${feature.color}`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// How it Works Section
function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      title: "Install the CLI",
      description: "One command to install DevSnap globally on your machine.",
      code: "npm install -g devsnap",
    },
    {
      step: "02",
      title: "Capture Your Setup",
      description: "Run capture to snapshot your entire development environment.",
      code: "devsnap capture --name 'My Setup'",
    },
    {
      step: "03",
      title: "Share the Link",
      description: "Get an instant shareable link to your beautiful snapshot page.",
      code: "→ devsnap.io/s/abc123",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">How it Works</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Three steps to share your setup
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            No configuration. No complex setup. Just capture and share.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-primary/50 to-transparent z-0" />
              )}
              
              <div className="relative z-10">
                <div className="text-6xl font-bold text-primary/20 mb-4">{step.step}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground mb-4">{step.description}</p>
                <div className="terminal rounded-lg p-3 text-sm">
                  <code className="text-neon">{step.code}</code>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Snapshot Preview Section
function SnapshotPreviewSection() {
  const extensions = [
    { name: "ESLint", version: "2.4.2", publisher: "dbaeumer" },
    { name: "Prettier", version: "10.1.0", publisher: "esbenp" },
    { name: "GitHub Copilot", version: "1.156.0", publisher: "github" },
    { name: "Tailwind CSS IntelliSense", version: "0.10.5", publisher: "bradlc" },
    { name: "GitLens", version: "14.7.0", publisher: "eamodio" },
    { name: "Thunder Client", version: "2.17.2", publisher: "rangav" },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">Preview</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Beautiful snapshot pages
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your environment, displayed beautifully. Every extension, config, and tool in one place.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-3xl blur-2xl" />
          
          <Card className="relative bg-card border-border/50 overflow-hidden">
            {/* Header */}
            <div className="border-b border-border p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-lg font-bold text-primary-foreground">
                    S
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Sarah&apos;s React Setup</h3>
                    <p className="text-sm text-muted-foreground">Captured Dec 15, 2024</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">
                    <Clock className="w-3 h-3 mr-1" />
                    1,247 views
                  </Badge>
                </div>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* System Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Terminal className="w-4 h-4 text-primary" />
                    System
                  </div>
                  <div className="terminal rounded-lg p-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">OS</span>
                      <span>macOS 14.2 (Sonoma)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Arch</span>
                      <span>arm64 (Apple M2 Pro)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shell</span>
                      <span className="text-neon">zsh + oh-my-zsh</span>
                    </div>
                  </div>
                </div>

                {/* Runtimes */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Code2 className="w-4 h-4 text-accent" />
                    Runtimes
                  </div>
                  <div className="terminal rounded-lg p-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Node.js</span>
                      <span>20.10.0 <span className="text-primary">(nvm)</span></span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Python</span>
                      <span>3.12.0 <span className="text-primary">(pyenv)</span></span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Go</span>
                      <span>1.21.5</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Extensions */}
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Sparkles className="w-4 h-4 text-chart-4" />
                    VS Code Extensions
                    <Badge variant="secondary" className="ml-2">24</Badge>
                  </div>
                  <Button size="sm" variant="outline" className="text-xs">
                    <Copy className="w-3 h-3 mr-1" />
                    Copy Install Script
                  </Button>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {extensions.map((ext) => (
                    <div
                      key={ext.name}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border/50 hover:border-primary/50 transition-colors"
                    >
                      <div>
                        <div className="font-medium text-sm">{ext.name}</div>
                        <div className="text-xs text-muted-foreground">{ext.publisher}</div>
                      </div>
                      <Badge variant="outline" className="text-xs">v{ext.version}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

// Pricing Section
function PricingSection() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for trying out DevSnap",
      features: [
        "3 snapshots",
        "Public links only",
        "30-day retention",
        "Basic support",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$8",
      period: "/month",
      description: "For power users and content creators",
      features: [
        "Unlimited snapshots",
        "Private & password links",
        "1-year retention",
        "Diff tool",
        "Export options",
        "Priority support",
      ],
      cta: "Start Pro Trial",
      popular: true,
    },
    {
      name: "Team",
      price: "$12",
      period: "/user/month",
      description: "For engineering teams",
      features: [
        "Everything in Pro",
        "Team workspaces",
        "Blessed configurations",
        "Onboarding checklists",
        "Admin controls",
        "SSO (coming soon)",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">Pricing</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start free, upgrade when you need more. No hidden fees.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={`relative h-full ${
                  plan.popular
                    ? "border-primary shadow-lg shadow-primary/10"
                    : "border-border/50"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      {plan.period && (
                        <span className="text-muted-foreground">{plan.period}</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {plan.description}
                    </p>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-neon" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-primary hover:bg-primary/90"
                        : "bg-secondary hover:bg-secondary/80"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Ready to share your setup?
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of developers who&apos;ve already simplified their environment sharing.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <div className="terminal rounded-lg px-4 py-3 flex items-center gap-3">
            <span className="text-neon">$</span>
            <code className="text-foreground">npm install -g devsnap</code>
          </div>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Get Started Free
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </motion.div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Camera className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">DevSnap</span>
          </div>

          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Docs</a>
            <a href="#" className="hover:text-foreground transition-colors">Blog</a>
            <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
            <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          </nav>

          <p className="text-sm text-muted-foreground">
            © 2024 DevSnap. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// Main Page Component
export default function Home() {
  return (
    <main className="relative">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <SnapshotPreviewSection />
      <PricingSection />
      <CTASection />
      <Footer />
      </main>
  );
}
