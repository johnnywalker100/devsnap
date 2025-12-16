"use client";

import { motion } from "framer-motion";
import {
  Camera,
  Share2,
  Eye,
  MoreVertical,
  Trash2,
  ExternalLink,
  Copy,
  Filter,
  Search,
  Plus,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

// Sample data
const snapshots = [
  {
    id: "1",
    name: "React Development Setup",
    description: "My main React development environment with all essential tools",
    createdAt: "Dec 15, 2024",
    views: 47,
    extensions: 24,
    runtimes: ["Node 20.10.0", "Python 3.12"],
    hasShareLink: true,
  },
  {
    id: "2",
    name: "Python ML Environment",
    description: "Machine learning setup with PyTorch, TensorFlow, and Jupyter",
    createdAt: "Dec 14, 2024",
    views: 123,
    extensions: 18,
    runtimes: ["Python 3.11", "Node 18.19.0"],
    hasShareLink: true,
  },
  {
    id: "3",
    name: "Full Stack Node.js",
    description: "Complete Node.js environment for backend development",
    createdAt: "Dec 12, 2024",
    views: 89,
    extensions: 31,
    runtimes: ["Node 20.10.0", "Go 1.21"],
    hasShareLink: false,
  },
  {
    id: "4",
    name: "Rust Systems Programming",
    description: "Low-level systems programming setup with Rust toolchain",
    createdAt: "Dec 10, 2024",
    views: 34,
    extensions: 12,
    runtimes: ["Rust 1.74", "Node 18.19.0"],
    hasShareLink: true,
  },
  {
    id: "5",
    name: "DevOps & Cloud",
    description: "Docker, Kubernetes, and cloud infrastructure tools",
    createdAt: "Dec 8, 2024",
    views: 67,
    extensions: 15,
    runtimes: ["Node 20.10.0", "Python 3.12", "Go 1.21"],
    hasShareLink: false,
  },
];

function SnapshotCard({ snapshot, index }: { snapshot: typeof snapshots[0]; index: number }) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.05 }}
    >
      <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <Camera className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{snapshot.name}</h3>
                <p className="text-sm text-muted-foreground">{snapshot.createdAt}</p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Copy className="w-4 h-4 mr-2" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:text-destructive">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {snapshot.description}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1.5 text-sm">
              <Eye className="w-4 h-4 text-muted-foreground" />
              <span>{snapshot.views} views</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <Camera className="w-4 h-4 text-muted-foreground" />
              <span>{snapshot.extensions} extensions</span>
            </div>
          </div>

          {/* Runtimes */}
          <div className="flex flex-wrap gap-2 mb-4">
            {snapshot.runtimes.map((runtime) => (
              <Badge key={runtime} variant="secondary" className="text-xs">
                {runtime}
              </Badge>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 pt-4 border-t border-border/50">
            <Button variant="outline" size="sm" className="flex-1">
              <ExternalLink className="w-4 h-4 mr-2" />
              View
            </Button>
            <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function SnapshotsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold mb-2">Snapshots</h1>
          <p className="text-muted-foreground">
            Manage and share your development environment snapshots.
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          New Snapshot
        </Button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search snapshots..."
            className="pl-10 bg-muted/50 border-border/50"
          />
        </div>
        <Button variant="outline" className="sm:w-auto">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </motion.div>

      {/* Snapshots Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {snapshots.map((snapshot, index) => (
          <SnapshotCard key={snapshot.id} snapshot={snapshot} index={index} />
        ))}
      </motion.div>

      {/* Empty State */}
      {snapshots.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
          <h3 className="text-xl font-semibold mb-2">No snapshots yet</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Create your first snapshot by running the CLI command in your terminal.
          </p>
          <div className="inline-flex items-center gap-2 bg-terminal rounded-lg px-4 py-2 mb-6">
            <code className="text-sm text-neon">$ devsnap capture</code>
          </div>
          <div>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Learn How
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

