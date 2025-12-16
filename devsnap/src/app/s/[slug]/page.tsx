"use client";

import { motion } from "framer-motion";
import {
  Camera,
  Terminal,
  Code2,
  Sparkles,
  Copy,
  Check,
  Download,
  ExternalLink,
  Clock,
  Eye,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import Link from "next/link";

// Sample snapshot data (would come from API in production)
const snapshotData = {
  id: "abc123",
  name: "Sarah's React Development Setup",
  description: "Complete React + TypeScript development environment optimized for productivity",
  createdAt: "December 15, 2024",
  viewCount: 1247,
  author: {
    name: "Sarah Chen",
    initial: "S",
  },
  os: {
    platform: "darwin",
    version: "14.2 (Sonoma)",
    arch: "arm64",
    chip: "Apple M2 Pro",
  },
  editor: {
    name: "VS Code",
    version: "1.85.0",
  },
  shell: {
    type: "zsh",
    theme: "powerlevel10k",
    plugins: ["git", "zsh-autosuggestions", "zsh-syntax-highlighting", "fzf"],
  },
  extensions: [
    { id: "dbaeumer.vscode-eslint", name: "ESLint", version: "2.4.2", publisher: "dbaeumer" },
    { id: "esbenp.prettier-vscode", name: "Prettier", version: "10.1.0", publisher: "esbenp" },
    { id: "github.copilot", name: "GitHub Copilot", version: "1.156.0", publisher: "github" },
    { id: "bradlc.vscode-tailwindcss", name: "Tailwind CSS IntelliSense", version: "0.10.5", publisher: "bradlc" },
    { id: "eamodio.gitlens", name: "GitLens", version: "14.7.0", publisher: "eamodio" },
    { id: "formulahendry.auto-rename-tag", name: "Auto Rename Tag", version: "0.1.10", publisher: "formulahendry" },
    { id: "christian-kohler.path-intellisense", name: "Path Intellisense", version: "2.8.5", publisher: "christian-kohler" },
    { id: "usernamehw.errorlens", name: "Error Lens", version: "3.16.0", publisher: "usernamehw" },
    { id: "rangav.vscode-thunder-client", name: "Thunder Client", version: "2.17.2", publisher: "rangav" },
    { id: "ms-vscode.vscode-typescript-next", name: "TypeScript Next", version: "5.3.0", publisher: "ms-vscode" },
    { id: "prisma.prisma", name: "Prisma", version: "5.8.0", publisher: "prisma" },
    { id: "biomejs.biome", name: "Biome", version: "2.0.0", publisher: "biomejs" },
  ],
  runtimes: [
    { name: "Node.js", version: "20.10.0", manager: "nvm" },
    { name: "Python", version: "3.12.0", manager: "pyenv" },
    { name: "Go", version: "1.21.5", manager: null },
    { name: "Rust", version: "1.74.0", manager: "rustup" },
  ],
  packages: {
    npm: [
      { name: "typescript", version: "5.3.3" },
      { name: "eslint", version: "8.56.0" },
      { name: "prettier", version: "3.2.4" },
      { name: "pnpm", version: "8.14.0" },
      { name: "vercel", version: "33.0.1" },
      { name: "turbo", version: "1.11.3" },
    ],
    brew: [
      { name: "git", version: "2.43.0" },
      { name: "gh", version: "2.42.0" },
      { name: "jq", version: "1.7.1" },
      { name: "fzf", version: "0.45.0" },
      { name: "ripgrep", version: "14.1.0" },
      { name: "bat", version: "0.24.0" },
      { name: "eza", version: "0.17.0" },
      { name: "zoxide", version: "0.9.2" },
    ],
  },
};

function CopyButton({ text, className = "" }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={`p-1.5 rounded-md hover:bg-muted transition-colors ${className}`}
    >
      {copied ? (
        <Check className="w-4 h-4 text-neon" />
      ) : (
        <Copy className="w-4 h-4 text-muted-foreground" />
      )}
    </button>
  );
}

function ExtensionsList() {
  const installScript = snapshotData.extensions
    .map((ext) => `code --install-extension ${ext.id}`)
    .join(" && ");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{snapshotData.extensions.length} extensions</Badge>
        </div>
        <Button size="sm" variant="outline">
          <Copy className="w-3 h-3 mr-2" />
          Copy Install Script
        </Button>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {snapshotData.extensions.map((ext) => (
          <motion.div
            key={ext.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50 hover:border-primary/30 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">{ext.name}</p>
                <p className="text-xs text-muted-foreground">{ext.publisher}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                v{ext.version}
              </Badge>
              <CopyButton
                text={`code --install-extension ${ext.id}`}
                className="opacity-0 group-hover:opacity-100"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function RuntimesList() {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {snapshotData.runtimes.map((runtime) => (
        <div
          key={runtime.name}
          className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Code2 className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="font-medium">{runtime.name}</p>
              {runtime.manager && (
                <p className="text-xs text-muted-foreground">via {runtime.manager}</p>
              )}
            </div>
          </div>
          <Badge variant="secondary">{runtime.version}</Badge>
        </div>
      ))}
    </div>
  );
}

function PackagesList() {
  return (
    <div className="space-y-6">
      {/* npm packages */}
      <div>
        <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
          <Badge variant="outline">npm</Badge>
          Global packages
        </h4>
        <div className="flex flex-wrap gap-2">
          {snapshotData.packages.npm.map((pkg) => (
            <div
              key={pkg.name}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/30 border border-border/50 text-sm"
            >
              <span>{pkg.name}</span>
              <span className="text-muted-foreground">@{pkg.version}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Homebrew packages */}
      <div>
        <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
          <Badge variant="outline">brew</Badge>
          Homebrew packages
        </h4>
        <div className="flex flex-wrap gap-2">
          {snapshotData.packages.brew.map((pkg) => (
            <div
              key={pkg.name}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/30 border border-border/50 text-sm"
            >
              <span>{pkg.name}</span>
              <span className="text-muted-foreground">{pkg.version}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ShellConfig() {
  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
          <p className="text-sm text-muted-foreground mb-1">Shell</p>
          <p className="font-medium">{snapshotData.shell.type}</p>
        </div>
        <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
          <p className="text-sm text-muted-foreground mb-1">Theme</p>
          <p className="font-medium">{snapshotData.shell.theme}</p>
        </div>
      </div>

      <div>
        <p className="text-sm font-medium mb-3">Plugins</p>
        <div className="flex flex-wrap gap-2">
          {snapshotData.shell.plugins.map((plugin) => (
            <Badge key={plugin} variant="secondary">
              {plugin}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SharePage() {
  return (
    <div className="min-h-screen">
      {/* Background */}
      <div className="fixed inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="fixed inset-0 bg-radial-gradient pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Camera className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">DevSnap</span>
            </Link>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              Create Your Own
            </Button>
          </div>
        </div>
      </header>

      <main className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Snapshot Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold text-primary-foreground shrink-0">
                    {snapshotData.author.initial}
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                      {snapshotData.name}
                    </h1>
                    <p className="text-muted-foreground mb-4">
                      {snapshotData.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {snapshotData.createdAt}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Eye className="w-4 h-4" />
                        {snapshotData.viewCount.toLocaleString()} views
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Script
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* System Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid sm:grid-cols-2 gap-4 mb-8"
        >
          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Terminal className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">System</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">OS</span>
                  <span>macOS {snapshotData.os.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Chip</span>
                  <span>{snapshotData.os.chip}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Architecture</span>
                  <span>{snapshotData.os.arch}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Code2 className="w-5 h-5 text-accent" />
                <h3 className="font-semibold">Editor</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Editor</span>
                  <span>{snapshotData.editor.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Version</span>
                  <span>{snapshotData.editor.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Extensions</span>
                  <span className="text-primary">{snapshotData.extensions.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs for different sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-card/50 border-border/50">
            <Tabs defaultValue="extensions" className="w-full">
              <CardHeader className="pb-0">
                <TabsList className="grid w-full grid-cols-4 bg-muted/50">
                  <TabsTrigger value="extensions">Extensions</TabsTrigger>
                  <TabsTrigger value="runtimes">Runtimes</TabsTrigger>
                  <TabsTrigger value="packages">Packages</TabsTrigger>
                  <TabsTrigger value="shell">Shell</TabsTrigger>
                </TabsList>
              </CardHeader>
              <CardContent className="pt-6">
                <TabsContent value="extensions" className="mt-0">
                  <ExtensionsList />
                </TabsContent>
                <TabsContent value="runtimes" className="mt-0">
                  <RuntimesList />
                </TabsContent>
                <TabsContent value="packages" className="mt-0">
                  <PackagesList />
                </TabsContent>
                <TabsContent value="shell" className="mt-0">
                  <ShellConfig />
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <Card className="bg-gradient-to-r from-primary/10 via-card to-accent/10 border-primary/20">
            <CardContent className="py-8">
              <h3 className="text-xl font-semibold mb-2">
                Want to share your own setup?
              </h3>
              <p className="text-muted-foreground mb-4">
                Create your DevSnap in seconds and share it with the world.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="bg-terminal rounded-lg px-4 py-2 flex items-center gap-3">
                  <span className="text-neon">$</span>
                  <code className="text-sm">npm install -g devsnap</code>
                  <CopyButton text="npm install -g devsnap" />
                </div>
                <Link href="/login">
                  <Button className="bg-primary hover:bg-primary/90">
                    Get Started Free
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-border py-8 mt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Camera className="w-3 h-3 text-primary-foreground" />
              </div>
              <span className="font-semibold">DevSnap</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Share your dev setup with one link
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

