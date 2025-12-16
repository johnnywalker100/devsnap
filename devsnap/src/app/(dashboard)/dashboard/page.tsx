"use client";

import { motion } from "framer-motion";
import {
  Camera,
  Share2,
  Eye,
  TrendingUp,
  Plus,
  ArrowRight,
  Terminal,
  Copy,
  Check,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import Link from "next/link";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

// Sample data for demo
const stats = [
  {
    title: "Total Snapshots",
    value: "12",
    change: "+3 this week",
    icon: Camera,
    color: "text-primary",
  },
  {
    title: "Share Links",
    value: "8",
    change: "+2 this week",
    icon: Share2,
    color: "text-accent",
  },
  {
    title: "Total Views",
    value: "1,247",
    change: "+156 this week",
    icon: Eye,
    color: "text-chart-4",
  },
  {
    title: "Avg. Views",
    value: "156",
    change: "+12%",
    icon: TrendingUp,
    color: "text-chart-3",
  },
];

const recentSnapshots = [
  {
    id: "1",
    name: "React Development Setup",
    createdAt: "2 hours ago",
    views: 47,
    extensions: 24,
  },
  {
    id: "2",
    name: "Python ML Environment",
    createdAt: "1 day ago",
    views: 123,
    extensions: 18,
  },
  {
    id: "3",
    name: "Full Stack Node.js",
    createdAt: "3 days ago",
    views: 89,
    extensions: 31,
  },
];

function QuickStartCard() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("devsnap capture --name 'My Setup'");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="bg-gradient-to-br from-primary/10 via-card to-accent/10 border-primary/20">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">Create Your First Snapshot</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Run this command in your terminal to capture your dev environment.
            </p>
            <div className="flex items-center gap-2">
              <div className="bg-terminal rounded-lg px-4 py-2 flex items-center gap-3 group">
                <Terminal className="w-4 h-4 text-neon" />
                <code className="text-sm">devsnap capture --name &apos;My Setup&apos;</code>
                <button
                  onClick={handleCopy}
                  className="p-1.5 rounded-md hover:bg-muted transition-colors"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-neon" />
                  ) : (
                    <Copy className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="hidden sm:block">
            <div className="w-20 h-20 rounded-xl bg-primary/20 flex items-center justify-center">
              <Camera className="w-10 h-10 text-primary" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Welcome Header */}
      <motion.div variants={fadeInUp}>
        <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
        <p className="text-muted-foreground">
          Here&apos;s an overview of your DevSnap activity.
        </p>
      </motion.div>

      {/* Quick Start Card */}
      <motion.div variants={fadeInUp}>
        <QuickStartCard />
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={fadeInUp} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-card/50 border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <Badge variant="secondary" className="text-xs">
                  {stat.change}
                </Badge>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Recent Snapshots */}
      <motion.div variants={fadeInUp}>
        <Card className="bg-card/50 border-border/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Snapshots</CardTitle>
            <Link href="/snapshots">
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSnapshots.map((snapshot, index) => (
                <motion.div
                  key={snapshot.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Camera className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{snapshot.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {snapshot.createdAt} • {snapshot.extensions} extensions
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <p className="text-sm font-medium">{snapshot.views} views</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </motion.div>
              ))}

              {recentSnapshots.length === 0 && (
                <div className="text-center py-12">
                  <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No snapshots yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Create your first snapshot to get started.
                  </p>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Snapshot
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

