# Product Requirements Document (PRD)
## DevSnap - Developer Environment Snapshot & Share

---

## Document Info

| Field | Value |
|-------|-------|
| **Product Name** | DevSnap |
| **Version** | 1.0 (MVP) |
| **Last Updated** | December 15, 2024 |
| **Status** | Draft |

---

## 1. Executive Summary

DevSnap is a developer tool that captures complete development environment configurations and enables sharing them via a single link. The platform solves the persistent "works on my machine" problem and dramatically reduces developer onboarding time from days to minutes.

### 1.1 Problem Statement

Developers waste significant time on environment setup and debugging configuration differences:

- **New hire onboarding** takes 2-5 days, with much of that time spent configuring tools
- **"Works on my machine"** issues consume ~3.5 hours/week per developer (Stack Overflow Survey)
- **Knowledge silos** form when senior developers' productivity setups aren't easily transferable
- **Tutorial friction** - creators struggle to share their exact working environment
- **Debugging blind spots** - support teams can't see a user's actual configuration

### 1.2 Solution

A CLI tool + web platform that:
1. **Captures** a complete snapshot of a developer's environment in seconds
2. **Stores** snapshots securely with version history
3. **Shares** via public or private links with beautiful, interactive viewers
4. **Compares** environments to identify discrepancies
5. **Applies** configurations to new machines with generated scripts

### 1.3 Success Metrics (North Stars)

| Metric | 6-Month Target |
|--------|----------------|
| Monthly Active CLI Users | 5,000 |
| Snapshots Created | 25,000 |
| Shared Links Viewed | 100,000 |
| Paid Conversion Rate | 3% |
| MRR | $15,000 |

---

## 2. Target Users

### 2.1 Primary Personas

#### Persona 1: "Setup Sarah" - Senior Developer / Tech Lead
- **Demographics:** 5-10 years experience, leads team of 3-8 developers
- **Pain Points:** Spends hours helping new hires set up environments; repeats same setup instructions
- **Goals:** Onboard new developers in hours, not days; standardize team tooling
- **Willingness to Pay:** High - time savings directly measurable

#### Persona 2: "Tutorial Tom" - Content Creator / Educator  
- **Demographics:** Creates YouTube tutorials, courses, or technical blog posts
- **Pain Points:** Students get stuck on setup; can't replicate his environment
- **Goals:** Eliminate setup friction from tutorials; look professional
- **Willingness to Pay:** Medium - part of content creation toolkit

#### Persona 3: "Debug Dave" - Developer Seeking Help
- **Demographics:** Junior to mid-level developer, active on Discord/Stack Overflow
- **Pain Points:** Can't explain his setup when asking for help; "it just doesn't work"
- **Goals:** Get help faster by sharing exact configuration
- **Willingness to Pay:** Low (free tier) - converts to paid if stays in ecosystem

### 2.2 User Journey Map

```
Discovery → Install CLI → First Snapshot → Share Link → View Analytics → Upgrade
    │           │              │              │             │            │
    └── HN/PH   └── npm/brew   └── 30 sec     └── Slack     └── Who      └── Need
        Tweet       install        capture        team          viewed?      private
```

---

## 3. Feature Requirements

### 3.1 MVP Features (v1.0)

#### F1: CLI - Environment Capture
**Priority:** P0 (Must Have)

| Requirement | Description |
|-------------|-------------|
| F1.1 | Capture VS Code/Cursor extensions list with versions |
| F1.2 | Capture VS Code settings.json (with sensitive data redaction) |
| F1.3 | Capture shell configuration (.zshrc, .bashrc, shell type) |
| F1.4 | Capture Git global config (name, email, aliases) |
| F1.5 | Capture runtime versions (Node via nvm/asdf, Python via pyenv) |
| F1.6 | Capture global packages (npm -g list, pip list, brew list) |
| F1.7 | Capture OS and architecture info |
| F1.8 | Support macOS and Linux; Windows as stretch goal |
| F1.9 | Complete capture in < 10 seconds |
| F1.10 | Provide `--include` and `--exclude` flags for customization |

**CLI Commands:**
```bash
devsnap login                    # Authenticate with web app
devsnap capture [--name <name>]  # Create new snapshot
devsnap list                     # List my snapshots
devsnap share <snapshot-id>      # Generate share link
devsnap diff <id1> <id2>         # Compare two snapshots locally
```

#### F2: Web App - Authentication & Dashboard
**Priority:** P0 (Must Have)

| Requirement | Description |
|-------------|-------------|
| F2.1 | OAuth login (GitHub primary, Google secondary) |
| F2.2 | Dashboard showing all user's snapshots |
| F2.3 | Snapshot detail view with all captured data |
| F2.4 | Delete snapshot functionality |
| F2.5 | Rename snapshot functionality |
| F2.6 | Copy individual config items to clipboard |
| F2.7 | Generate install scripts (shell scripts for applying config) |

#### F3: Web App - Sharing
**Priority:** P0 (Must Have)

| Requirement | Description |
|-------------|-------------|
| F3.1 | Generate unique shareable URL for any snapshot |
| F3.2 | Public links viewable without authentication |
| F3.3 | Private links with password protection (Pro) |
| F3.4 | Unlisted links (URL required, not indexed) |
| F3.5 | View counter for shared links |
| F3.6 | Revoke/regenerate share links |

#### F4: Web App - Snapshot Viewer (Public)
**Priority:** P0 (Must Have)

| Requirement | Description |
|-------------|-------------|
| F4.1 | Beautiful, responsive display of environment data |
| F4.2 | Categorized sections (Editor, Shell, Git, Packages, etc.) |
| F4.3 | Search/filter within snapshot |
| F4.4 | One-click copy for individual items |
| F4.5 | "Copy all as script" button |
| F4.6 | Extension links to VS Code marketplace |
| F4.7 | Package links to npm/pypi |
| F4.8 | Export as JSON/Markdown |

#### F5: Landing Page & Marketing Site
**Priority:** P0 (Must Have)

| Requirement | Description |
|-------------|-------------|
| F5.1 | Clear value proposition above fold |
| F5.2 | Interactive demo (example snapshot viewer) |
| F5.3 | Pricing page with tier comparison |
| F5.4 | CLI installation instructions |
| F5.5 | Documentation/FAQ section |

### 3.2 Post-MVP Features (v1.1+)

#### F6: Environment Diff Tool
**Priority:** P1 (Should Have)

| Requirement | Description |
|-------------|-------------|
| F6.1 | Side-by-side comparison of two snapshots |
| F6.2 | Highlight additions, removals, and changes |
| F6.3 | Filter diff by category |
| F6.4 | Shareable diff links |

#### F7: Team Workspaces
**Priority:** P2 (Nice to Have)

| Requirement | Description |
|-------------|-------------|
| F7.1 | Create team workspace with invite system |
| F7.2 | Define "blessed" team configuration |
| F7.3 | Compare personal snapshot to team standard |
| F7.4 | Onboarding checklist showing missing items |
| F7.5 | Team admin controls |

#### F8: IDE Integrations
**Priority:** P2 (Nice to Have)

| Requirement | Description |
|-------------|-------------|
| F8.1 | VS Code extension for one-click capture |
| F8.2 | VS Code extension to apply snapshot |
| F8.3 | Cursor editor support |
| F8.4 | JetBrains plugin (stretch) |

---

## 4. Technical Specifications

### 4.1 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌─────────────┐    ┌─────────────────────────────────────┐    │
│   │   CLI Tool  │    │           Web Application           │    │
│   │  (Node.js)  │    │  Next.js 14 + React + Tailwind CSS  │    │
│   │             │    │                                     │    │
│   │ • capture   │    │  • Landing Page                     │    │
│   │ • login     │    │  • Dashboard                        │    │
│   │ • share     │    │  • Snapshot Viewer                  │    │
│   │ • diff      │    │  • Settings                         │    │
│   └──────┬──────┘    └──────────────────┬──────────────────┘    │
│          │                              │                        │
└──────────┼──────────────────────────────┼────────────────────────┘
           │           HTTPS              │
           ▼                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                          API LAYER                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│                    Next.js API Routes + tRPC                     │
│                                                                  │
│   • /api/auth/*        (NextAuth.js)                            │
│   • /api/trpc/*        (tRPC router)                            │
│   • /api/cli/*         (CLI-specific endpoints)                 │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                        DATA LAYER                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌─────────────────┐         ┌─────────────────────────────┐   │
│   │   PostgreSQL    │         │      Blob Storage           │   │
│   │   (Neon.tech)   │         │   (Cloudflare R2/S3)        │   │
│   │                 │         │                             │   │
│   │ • Users         │         │ • Large config files        │   │
│   │ • Snapshots     │         │ • Export archives           │   │
│   │ • ShareLinks    │         │                             │   │
│   │ • Teams         │         │                             │   │
│   └─────────────────┘         └─────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 4.2 Data Models

```typescript
// Core Entities

interface User {
  id: string;                  // cuid
  email: string;
  name: string;
  avatarUrl: string | null;
  githubId: string | null;
  googleId: string | null;
  plan: 'free' | 'pro' | 'team';
  createdAt: Date;
  updatedAt: Date;
}

interface Snapshot {
  id: string;                  // cuid
  userId: string;              // FK → User
  name: string;
  description: string | null;
  
  // Captured Data
  os: {
    platform: string;          // 'darwin' | 'linux' | 'win32'
    arch: string;              // 'x64' | 'arm64'
    version: string;
  };
  
  editor: {
    name: string;              // 'vscode' | 'cursor'
    version: string;
    extensions: Extension[];
    settings: object;          // Redacted settings.json
  };
  
  shell: {
    type: string;              // 'zsh' | 'bash' | 'fish'
    config: string;            // Content of rc file
    env: Record<string, string>; // Opted-in env vars
  };
  
  git: {
    userName: string;
    userEmail: string;
    aliases: Record<string, string>;
  };
  
  runtimes: Runtime[];
  globalPackages: Package[];
  
  // Metadata
  capturedAt: Date;
  cliVersion: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Extension {
  id: string;                  // e.g., 'esbenp.prettier-vscode'
  name: string;
  version: string;
  publisher: string;
}

interface Runtime {
  name: string;                // 'node' | 'python' | 'ruby' | 'go'
  version: string;
  manager: string | null;      // 'nvm' | 'asdf' | 'pyenv'
}

interface Package {
  name: string;
  version: string;
  source: string;              // 'npm' | 'pip' | 'brew' | 'cargo'
}

interface ShareLink {
  id: string;                  // cuid
  snapshotId: string;          // FK → Snapshot
  slug: string;                // URL slug (e.g., 'abc123')
  visibility: 'public' | 'unlisted' | 'private';
  password: string | null;     // Hashed, for private links
  viewCount: number;
  expiresAt: Date | null;
  createdAt: Date;
}

interface Team {
  id: string;
  name: string;
  slug: string;
  ownerId: string;             // FK → User
  blessedSnapshotId: string | null; // FK → Snapshot
  createdAt: Date;
}

interface TeamMember {
  teamId: string;              // FK → Team
  userId: string;              // FK → User
  role: 'owner' | 'admin' | 'member';
  joinedAt: Date;
}
```

### 4.3 Tech Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Frontend** | Next.js 14 (App Router) | SSR, API routes, great DX |
| **Styling** | Tailwind CSS + shadcn/ui | Rapid development, consistent design |
| **State** | TanStack Query + Zustand | Server state + minimal client state |
| **API** | tRPC | End-to-end type safety |
| **Auth** | NextAuth.js v5 | OAuth providers, session management |
| **Database** | PostgreSQL (Neon) | Serverless, branching, generous free tier |
| **ORM** | Drizzle | Type-safe, lightweight, great migrations |
| **CLI** | Node.js + Commander.js | Cross-platform, JS ecosystem |
| **Hosting** | Vercel | Zero-config Next.js deployment |
| **Storage** | Cloudflare R2 | S3-compatible, no egress fees |
| **Analytics** | PostHog | Open-source, product analytics |
| **Payments** | Stripe | Industry standard |

### 4.4 Security Considerations

| Concern | Mitigation |
|---------|------------|
| **Sensitive data in configs** | Automatic redaction of tokens, passwords, API keys using regex patterns; user confirmation before upload |
| **SSH keys exposure** | Never capture private keys; only capture ~/.ssh/config with host names |
| **Environment variables** | Opt-in only; show preview before capture; redact common secret patterns |
| **Password-protected links** | bcrypt hashing; rate limiting on attempts |
| **Data at rest** | Encryption for stored snapshots |
| **GDPR compliance** | Data export, deletion on request, EU hosting option |

---

## 5. User Interface Designs

### 5.1 Key Screens (Wireframe Descriptions)

#### Landing Page
```
┌─────────────────────────────────────────────────────────────────┐
│  [Logo]                              [Docs] [Pricing] [Login]   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│     Share your dev setup with one link.                         │
│     ════════════════════════════════════                        │
│                                                                  │
│     Stop explaining your environment.                           │
│     Start sharing it.                                           │
│                                                                  │
│     $ npm install -g devsnap                                    │
│     $ devsnap capture                                           │
│                                                                  │
│     [Get Started - It's Free]    [See Example →]               │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│     [Interactive Demo: Snapshot Viewer with real data]          │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│     Use Cases:                                                   │
│     ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐         │
│     │Onboard- │  │Tutorial │  │Debug    │  │Team     │         │
│     │ing      │  │Creators │  │Support  │  │Sync     │         │
│     └─────────┘  └─────────┘  └─────────┘  └─────────┘         │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

#### Snapshot Viewer (Share Page)
```
┌─────────────────────────────────────────────────────────────────┐
│  [DevSnap Logo]          Sarah's React Development Setup        │
│                          Captured Dec 15, 2024                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─ System ─────────────────────────────────────────────────┐   │
│  │  macOS 14.2 (Sonoma) • Apple M2 Pro • arm64              │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌─ Editor: VS Code 1.85.0 ─────────────────────────────────┐   │
│  │                                                           │   │
│  │  Extensions (24)                    [Copy Install Script] │   │
│  │  ┌────────────────────────────────────────────────────┐  │   │
│  │  │ ◉ ESLint                         v2.4.2    [Copy]  │  │   │
│  │  │ ◉ Prettier                       v10.1.0   [Copy]  │  │   │
│  │  │ ◉ GitHub Copilot                 v1.156.0  [Copy]  │  │   │
│  │  │ ◉ Tailwind CSS IntelliSense      v0.10.5   [Copy]  │  │   │
│  │  │   ... 20 more                                      │  │   │
│  │  └────────────────────────────────────────────────────┘  │   │
│  │                                                           │   │
│  │  Settings Preview                   [View Full] [Copy]   │   │
│  │  ┌────────────────────────────────────────────────────┐  │   │
│  │  │ {                                                  │  │   │
│  │  │   "editor.fontSize": 14,                           │  │   │
│  │  │   "editor.fontFamily": "JetBrains Mono",           │  │   │
│  │  │   ...                                              │  │   │
│  │  └────────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌─ Shell: zsh ─────────────────────────────────────────────┐   │
│  │  Oh My Zsh with powerlevel10k theme                      │   │
│  │  Plugins: git, zsh-autosuggestions, zsh-syntax-highlight │   │
│  │                                              [View .zshrc]│   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌─ Runtimes ───────────────────────────────────────────────┐   │
│  │  Node.js 20.10.0 (via nvm)                               │   │
│  │  Python 3.12.0 (via pyenv)                               │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌─ Global Packages ────────────────────────────────────────┐   │
│  │  npm: typescript, eslint, prettier, vercel, pnpm         │   │
│  │  brew: git, gh, jq, fzf, ripgrep, bat                    │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│                [📋 Copy All as Script]  [⬇️ Export JSON]        │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│  Create your own snapshot →  devsnap.io                         │
└─────────────────────────────────────────────────────────────────┘
```

---

## 6. Go-to-Market Strategy

### 6.1 Launch Plan

| Phase | Timeline | Activities |
|-------|----------|------------|
| **Alpha** | Weeks 1-4 | Build MVP; 10 beta users from network |
| **Private Beta** | Weeks 5-6 | 100 users via waitlist; iterate on feedback |
| **Public Launch** | Week 7 | Product Hunt, Hacker News, Twitter |
| **Growth** | Weeks 8+ | Content marketing, integrations, teams feature |

### 6.2 Distribution Channels

1. **Product Hunt** - Primary launch; target #1 Product of the Day
2. **Hacker News** - Show HN post with story about the problem
3. **Twitter/X** - Dev Twitter; threads showing use cases
4. **Dev.to / Hashnode** - "How I onboard new developers in 30 minutes"
5. **YouTube** - Partner with dev YouTubers for setup videos
6. **GitHub** - Open-source the CLI; README badge for snapshots

### 6.3 Pricing Strategy

| Tier | Monthly | Annual | Target Segment |
|------|---------|--------|----------------|
| **Free** | $0 | $0 | Individual devs, try before buy |
| **Pro** | $8 | $80 | Power users, content creators |
| **Team** | $12/user | $120/user | Engineering teams (min 3 users) |

**Free tier limits:** 3 snapshots, public links only, 30-day retention, no diff tool

---

## 7. Success Metrics & KPIs

### 7.1 Product Metrics

| Metric | Definition | Target (6 mo) |
|--------|------------|---------------|
| **CLI Installs** | Total npm downloads | 20,000 |
| **Registered Users** | Users with accounts | 8,000 |
| **MAU (CLI)** | Users who captured in last 30d | 5,000 |
| **Snapshots Created** | Total snapshots | 25,000 |
| **Share Link Views** | Total pageviews on share pages | 100,000 |
| **Viral Coefficient** | New signups / share link views | 0.05 |

### 7.2 Business Metrics

| Metric | Target (6 mo) |
|--------|---------------|
| **MRR** | $15,000 |
| **Paid Users** | 300 |
| **Free → Paid Conversion** | 3% |
| **Churn Rate (Monthly)** | < 5% |
| **CAC** | < $50 |
| **LTV** | > $150 |

---

## 8. Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| **Security breach / data leak** | Critical | Low | Security audit; encryption; redaction; SOC 2 roadmap |
| **Low adoption** | High | Medium | Strong launch; content marketing; free tier generous |
| **Competitor launches** | Medium | Medium | Move fast; build community; focus on UX |
| **CLI complexity across OS** | Medium | Medium | Start macOS/Linux; community Windows support |
| **Snapshot format changes** | Low | High | Version snapshots; migration tooling |

---

## 9. Timeline & Milestones

### Phase 1: Foundation (Weeks 1-2)
- [ ] Set up Next.js project with TypeScript
- [ ] Configure Tailwind CSS + shadcn/ui
- [ ] Set up PostgreSQL database with Drizzle ORM
- [ ] Implement authentication (GitHub OAuth)
- [ ] Create basic database schema
- [ ] Deploy to Vercel

### Phase 2: CLI Development (Weeks 3-4)
- [ ] Create Node.js CLI with Commander.js
- [ ] Implement VS Code extension capture
- [ ] Implement shell config capture
- [ ] Implement runtime detection
- [ ] Implement global package detection
- [ ] Add authentication flow (CLI → Web)
- [ ] Publish to npm

### Phase 3: Web App Core (Weeks 5-6)
- [ ] Build dashboard UI
- [ ] Create snapshot viewer page
- [ ] Implement share link generation
- [ ] Add copy-to-clipboard functionality
- [ ] Generate install scripts
- [ ] Build landing page

### Phase 4: Polish & Launch (Week 7)
- [ ] Security audit
- [ ] Performance optimization
- [ ] Documentation
- [ ] Product Hunt preparation
- [ ] Launch!

---

## 10. Open Questions

1. Should we support JetBrains IDEs in MVP or defer to v1.1?
2. What's the right retention period for free tier? (30 days vs 90 days)
3. Should CLI be Node.js (easier) or Go (faster, single binary)?
4. Do we need a VS Code extension for MVP, or is CLI sufficient?
5. How do we handle dotfile managers (chezmoi, yadm) - integrate or ignore?

---

## 11. Appendix

### A. Competitive Analysis

| Competitor | Strengths | Weaknesses | Our Differentiator |
|------------|-----------|------------|-------------------|
| **dotfiles repos** | Free, customizable | Manual, no sharing, no UI | One-click capture + beautiful viewer |
| **Homebrew Bundle** | Good for packages | Mac only, no editor/shell | Full environment capture |
| **Settings Sync (VS Code)** | Built-in, free | Editor only, no sharing | Complete env + public sharing |
| **chezmoi** | Powerful, cross-machine | Complex, steep learning curve | Simple UX, no config needed |

### B. User Research Quotes

> "Every time I onboard someone, I spend half a day walking them through my setup. I wish I could just send them a link." - Tech Lead, Series B startup

> "I get so many comments asking 'what extensions do you use?' I just want to point them somewhere." - YouTube educator (150k subs)

> "When someone asks for help on Discord, the first 10 messages are always 'what version of Node?' 'what's your tsconfig?' It's exhausting." - Open source maintainer

---

**Document Status:** Ready for Development  
**Next Steps:** Technical design review → Sprint planning → Development kickoff

