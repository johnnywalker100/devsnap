# DevSnap - Development Steps (Granular Breakdown)

Each step is atomic and verifiable. Complete one step fully before moving to the next.

---

## Phase 1: Project Setup (Day 1)

### 1.1 Initialize Project
- [ ] **Step 1:** Create Next.js 14 project with TypeScript
  ```bash
  npx create-next-app@latest devsnap --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
  ```
- [ ] **Step 2:** Verify project runs with `npm run dev`
- [ ] **Step 3:** Open http://localhost:3000 and confirm default page loads

### 1.2 Install Core Dependencies
- [ ] **Step 4:** Install shadcn/ui
  ```bash
  npx shadcn@latest init
  ```
- [ ] **Step 5:** Add first shadcn component (button) to verify it works
  ```bash
  npx shadcn@latest add button
  ```
- [ ] **Step 6:** Install Drizzle ORM + PostgreSQL driver
  ```bash
  npm install drizzle-orm postgres
  npm install -D drizzle-kit
  ```
- [ ] **Step 7:** Install authentication packages
  ```bash
  npm install next-auth@beta @auth/drizzle-adapter
  ```
- [ ] **Step 8:** Install utility packages
  ```bash
  npm install zod nanoid date-fns clsx tailwind-merge
  ```
- [ ] **Step 9:** Verify no errors with `npm run build`

### 1.3 Project Structure
- [ ] **Step 10:** Create folder structure
  ```
  src/
  ├── app/
  │   ├── (auth)/
  │   │   ├── login/
  │   │   └── signup/
  │   ├── (dashboard)/
  │   │   ├── dashboard/
  │   │   └── snapshots/
  │   ├── s/[slug]/          # Public share pages
  │   └── api/
  ├── components/
  │   ├── ui/                # shadcn components
  │   └── shared/            # custom shared components
  ├── lib/
  │   ├── db/
  │   ├── auth/
  │   └── utils/
  └── types/
  ```
- [ ] **Step 11:** Create `.env.local` file with placeholder values
  ```
  DATABASE_URL=
  NEXTAUTH_SECRET=
  NEXTAUTH_URL=http://localhost:3000
  GITHUB_CLIENT_ID=
  GITHUB_CLIENT_SECRET=
  ```
- [ ] **Step 12:** Add `.env.local` to `.gitignore` (verify it's there)

---

## Phase 2: Database Setup (Day 1-2)

### 2.1 Database Connection
- [ ] **Step 13:** Create Neon account at https://neon.tech
- [ ] **Step 14:** Create new project named "devsnap"
- [ ] **Step 15:** Copy connection string to `.env.local` as `DATABASE_URL`
- [ ] **Step 16:** Create `src/lib/db/index.ts` - database client
  ```typescript
  import { drizzle } from 'drizzle-orm/postgres-js';
  import postgres from 'postgres';
  import * as schema from './schema';

  const client = postgres(process.env.DATABASE_URL!);
  export const db = drizzle(client, { schema });
  ```
- [ ] **Step 17:** Test database connection with a simple query

### 2.2 Schema - Users Table
- [ ] **Step 18:** Create `src/lib/db/schema/users.ts`
  ```typescript
  import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
  
  export const users = pgTable('users', {
    id: text('id').primaryKey(),
    email: text('email').notNull().unique(),
    name: text('name'),
    avatarUrl: text('avatar_url'),
    plan: text('plan').default('free').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  });
  ```
- [ ] **Step 19:** Create `drizzle.config.ts` in project root
- [ ] **Step 20:** Run migration: `npx drizzle-kit push`
- [ ] **Step 21:** Verify table created in Neon dashboard

### 2.3 Schema - Snapshots Table
- [ ] **Step 22:** Create `src/lib/db/schema/snapshots.ts`
  ```typescript
  import { pgTable, text, timestamp, jsonb } from 'drizzle-orm/pg-core';
  import { users } from './users';
  
  export const snapshots = pgTable('snapshots', {
    id: text('id').primaryKey(),
    userId: text('user_id').references(() => users.id).notNull(),
    name: text('name').notNull(),
    description: text('description'),
    osData: jsonb('os_data'),
    editorData: jsonb('editor_data'),
    shellData: jsonb('shell_data'),
    gitData: jsonb('git_data'),
    runtimes: jsonb('runtimes'),
    packages: jsonb('packages'),
    cliVersion: text('cli_version'),
    capturedAt: timestamp('captured_at').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  });
  ```
- [ ] **Step 23:** Run migration: `npx drizzle-kit push`
- [ ] **Step 24:** Verify table created in Neon dashboard

### 2.4 Schema - Share Links Table
- [ ] **Step 25:** Create `src/lib/db/schema/share-links.ts`
  ```typescript
  import { pgTable, text, timestamp, integer } from 'drizzle-orm/pg-core';
  import { snapshots } from './snapshots';
  
  export const shareLinks = pgTable('share_links', {
    id: text('id').primaryKey(),
    snapshotId: text('snapshot_id').references(() => snapshots.id).notNull(),
    slug: text('slug').notNull().unique(),
    visibility: text('visibility').default('public').notNull(),
    password: text('password'),
    viewCount: integer('view_count').default(0).notNull(),
    expiresAt: timestamp('expires_at'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  });
  ```
- [ ] **Step 26:** Run migration: `npx drizzle-kit push`
- [ ] **Step 27:** Verify table created in Neon dashboard

### 2.5 Schema Index
- [ ] **Step 28:** Create `src/lib/db/schema/index.ts` to export all tables
- [ ] **Step 29:** Update `src/lib/db/index.ts` to import schema
- [ ] **Step 30:** Verify no TypeScript errors

---

## Phase 3: Authentication (Day 2-3)

### 3.1 GitHub OAuth Setup
- [ ] **Step 31:** Go to GitHub Settings → Developer Settings → OAuth Apps
- [ ] **Step 32:** Create new OAuth App:
  - Name: DevSnap (Development)
  - Homepage: http://localhost:3000
  - Callback: http://localhost:3000/api/auth/callback/github
- [ ] **Step 33:** Copy Client ID to `.env.local`
- [ ] **Step 34:** Generate Client Secret and copy to `.env.local`
- [ ] **Step 35:** Generate `NEXTAUTH_SECRET` with `openssl rand -base64 32`

### 3.2 NextAuth Configuration
- [ ] **Step 36:** Create `src/lib/auth/index.ts`
  ```typescript
  import NextAuth from 'next-auth';
  import GitHub from 'next-auth/providers/github';
  import { DrizzleAdapter } from '@auth/drizzle-adapter';
  import { db } from '@/lib/db';
  
  export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: DrizzleAdapter(db),
    providers: [GitHub],
  });
  ```
- [ ] **Step 37:** Create `src/app/api/auth/[...nextauth]/route.ts`
  ```typescript
  import { handlers } from '@/lib/auth';
  export const { GET, POST } = handlers;
  ```
- [ ] **Step 38:** Test login flow - click login, redirect to GitHub, redirect back
- [ ] **Step 39:** Verify user created in database after login

### 3.3 Auth Helpers
- [ ] **Step 40:** Create `src/lib/auth/get-session.ts` - server-side session helper
- [ ] **Step 41:** Create `src/components/shared/user-button.tsx` - shows logged in user
- [ ] **Step 42:** Test session retrieval on a page

---

## Phase 4: Landing Page (Day 3-4)

### 4.1 Layout Setup
- [ ] **Step 43:** Create `src/app/(marketing)/layout.tsx`
- [ ] **Step 44:** Create `src/components/shared/header.tsx` - navigation
- [ ] **Step 45:** Create `src/components/shared/footer.tsx`
- [ ] **Step 46:** Style header with logo, nav links, login button
- [ ] **Step 47:** Verify header appears on home page

### 4.2 Hero Section
- [ ] **Step 48:** Create `src/app/(marketing)/page.tsx`
- [ ] **Step 49:** Add hero headline: "Share your dev setup with one link"
- [ ] **Step 50:** Add subheadline text
- [ ] **Step 51:** Add CLI install command with copy button
  ```bash
  npm install -g devsnap
  ```
- [ ] **Step 52:** Add CTA buttons: "Get Started" and "See Example"
- [ ] **Step 53:** Style hero with gradients/background

### 4.3 Demo Section
- [ ] **Step 54:** Create mock snapshot data for demo
- [ ] **Step 55:** Create `src/components/snapshot/snapshot-viewer.tsx`
- [ ] **Step 56:** Display extensions list in viewer
- [ ] **Step 57:** Display shell info in viewer
- [ ] **Step 58:** Display runtimes in viewer
- [ ] **Step 59:** Add copy buttons to viewer
- [ ] **Step 60:** Embed demo viewer on landing page

### 4.4 Features Section
- [ ] **Step 61:** Create features grid component
- [ ] **Step 62:** Add feature card: "One-Click Capture"
- [ ] **Step 63:** Add feature card: "Shareable Links"
- [ ] **Step 64:** Add feature card: "Team Sync"
- [ ] **Step 65:** Add feature card: "Install Scripts"

### 4.5 Pricing Section
- [ ] **Step 66:** Create pricing table component
- [ ] **Step 67:** Add Free tier card with features
- [ ] **Step 68:** Add Pro tier card with features
- [ ] **Step 69:** Add Team tier card with features
- [ ] **Step 70:** Style pricing cards with highlighted "Popular" tier

### 4.6 Final Polish
- [ ] **Step 71:** Add responsive styles for mobile
- [ ] **Step 72:** Test on mobile viewport
- [ ] **Step 73:** Add page metadata (title, description, OG image)
- [ ] **Step 74:** Run Lighthouse audit, fix any issues

---

## Phase 5: Dashboard (Day 4-5)

### 5.1 Protected Layout
- [ ] **Step 75:** Create `src/app/(dashboard)/layout.tsx`
- [ ] **Step 76:** Add authentication check - redirect to login if not signed in
- [ ] **Step 77:** Create dashboard sidebar navigation
- [ ] **Step 78:** Add links: Dashboard, Snapshots, Settings
- [ ] **Step 79:** Verify redirect works when not logged in

### 5.2 Dashboard Home
- [ ] **Step 80:** Create `src/app/(dashboard)/dashboard/page.tsx`
- [ ] **Step 81:** Show welcome message with user name
- [ ] **Step 82:** Show "Quick Stats" cards (placeholders)
- [ ] **Step 83:** Show "Recent Snapshots" list (empty state first)
- [ ] **Step 84:** Add "Create Snapshot" CTA with CLI instructions

### 5.3 Snapshots List
- [ ] **Step 85:** Create `src/app/(dashboard)/snapshots/page.tsx`
- [ ] **Step 86:** Create database query to fetch user's snapshots
- [ ] **Step 87:** Display empty state when no snapshots
- [ ] **Step 88:** Create snapshot card component
- [ ] **Step 89:** Display list of snapshot cards
- [ ] **Step 90:** Add "View", "Share", "Delete" actions to each card

### 5.4 Snapshot Detail Page
- [ ] **Step 91:** Create `src/app/(dashboard)/snapshots/[id]/page.tsx`
- [ ] **Step 92:** Fetch snapshot by ID with ownership check
- [ ] **Step 93:** Display full snapshot viewer
- [ ] **Step 94:** Add "Generate Share Link" button
- [ ] **Step 95:** Add "Delete Snapshot" button with confirmation
- [ ] **Step 96:** Add "Edit Name" functionality

---

## Phase 6: Share Links (Day 5-6)

### 6.1 Create Share Link
- [ ] **Step 97:** Create API route `POST /api/snapshots/[id]/share`
- [ ] **Step 98:** Generate unique slug using nanoid
- [ ] **Step 99:** Insert share link into database
- [ ] **Step 100:** Return share URL to frontend
- [ ] **Step 101:** Show share link in modal with copy button
- [ ] **Step 102:** Test creating share link

### 6.2 Public Share Page
- [ ] **Step 103:** Create `src/app/s/[slug]/page.tsx`
- [ ] **Step 104:** Fetch snapshot by share link slug
- [ ] **Step 105:** Handle 404 if slug not found
- [ ] **Step 106:** Increment view count on page load
- [ ] **Step 107:** Display snapshot viewer (read-only)
- [ ] **Step 108:** Add "Create your own" CTA at bottom
- [ ] **Step 109:** Test public share page works without login

### 6.3 Install Script Generation
- [ ] **Step 110:** Create function to generate extension install commands
- [ ] **Step 111:** Create function to generate npm install commands
- [ ] **Step 112:** Create function to generate brew install commands
- [ ] **Step 113:** Combine into full install script
- [ ] **Step 114:** Add "Copy Install Script" button
- [ ] **Step 115:** Test script generation with sample data

---

## Phase 7: CLI Tool (Day 6-8)

### 7.1 CLI Setup
- [ ] **Step 116:** Create new directory `cli/` in project root
- [ ] **Step 117:** Initialize npm package: `npm init`
- [ ] **Step 118:** Set name to `devsnap` in package.json
- [ ] **Step 119:** Install dependencies:
  ```bash
  npm install commander chalk ora conf axios
  ```
- [ ] **Step 120:** Create `cli/src/index.ts` entry point
- [ ] **Step 121:** Set up TypeScript configuration
- [ ] **Step 122:** Add build script to package.json
- [ ] **Step 123:** Add bin field pointing to built output
- [ ] **Step 124:** Test `npm link` and run `devsnap --help`

### 7.2 CLI Auth Command
- [ ] **Step 125:** Create `cli/src/commands/login.ts`
- [ ] **Step 126:** Open browser to web app login page with device code
- [ ] **Step 127:** Poll API for authentication completion
- [ ] **Step 128:** Store access token locally using `conf`
- [ ] **Step 129:** Show success message
- [ ] **Step 130:** Test login flow end-to-end

### 7.3 Capture - OS Info
- [ ] **Step 131:** Create `cli/src/commands/capture.ts`
- [ ] **Step 132:** Create `cli/src/capture/os.ts`
- [ ] **Step 133:** Capture platform (darwin/linux/win32)
- [ ] **Step 134:** Capture architecture (x64/arm64)
- [ ] **Step 135:** Capture OS version
- [ ] **Step 136:** Test OS capture locally

### 7.4 Capture - VS Code Extensions
- [ ] **Step 137:** Create `cli/src/capture/vscode.ts`
- [ ] **Step 138:** Find VS Code extensions directory path
- [ ] **Step 139:** Read each extension's package.json
- [ ] **Step 140:** Extract: id, name, version, publisher
- [ ] **Step 141:** Return array of extensions
- [ ] **Step 142:** Handle Cursor editor (different path)
- [ ] **Step 143:** Test extension capture locally

### 7.5 Capture - VS Code Settings
- [ ] **Step 144:** Find VS Code settings.json path
- [ ] **Step 145:** Read and parse settings
- [ ] **Step 146:** Create redaction function for sensitive keys
- [ ] **Step 147:** Redact: API keys, tokens, passwords, paths with username
- [ ] **Step 148:** Return sanitized settings
- [ ] **Step 149:** Test settings capture and redaction

### 7.6 Capture - Shell Config
- [ ] **Step 150:** Create `cli/src/capture/shell.ts`
- [ ] **Step 151:** Detect shell type from $SHELL
- [ ] **Step 152:** Find rc file path (.zshrc, .bashrc, etc.)
- [ ] **Step 153:** Read rc file contents
- [ ] **Step 154:** Redact secrets from rc file
- [ ] **Step 155:** Test shell capture

### 7.7 Capture - Git Config
- [ ] **Step 156:** Create `cli/src/capture/git.ts`
- [ ] **Step 157:** Run `git config --global user.name`
- [ ] **Step 158:** Run `git config --global user.email`
- [ ] **Step 159:** Run `git config --global --list` for aliases
- [ ] **Step 160:** Parse aliases into object
- [ ] **Step 161:** Test git capture

### 7.8 Capture - Runtimes
- [ ] **Step 162:** Create `cli/src/capture/runtimes.ts`
- [ ] **Step 163:** Check for Node.js: `node --version`
- [ ] **Step 164:** Detect Node version manager (nvm, asdf, fnm)
- [ ] **Step 165:** Check for Python: `python3 --version`
- [ ] **Step 166:** Detect Python version manager (pyenv)
- [ ] **Step 167:** Check for Ruby: `ruby --version`
- [ ] **Step 168:** Check for Go: `go version`
- [ ] **Step 169:** Return runtimes array
- [ ] **Step 170:** Test runtime capture

### 7.9 Capture - Global Packages
- [ ] **Step 171:** Create `cli/src/capture/packages.ts`
- [ ] **Step 172:** Run `npm list -g --depth=0 --json`
- [ ] **Step 173:** Parse npm global packages
- [ ] **Step 174:** Run `brew list --versions` (if macOS)
- [ ] **Step 175:** Parse brew packages
- [ ] **Step 176:** Run `pip3 list --format=json`
- [ ] **Step 177:** Parse pip packages
- [ ] **Step 178:** Return combined packages array
- [ ] **Step 179:** Test package capture

### 7.10 Upload Snapshot
- [ ] **Step 180:** Combine all capture data into snapshot object
- [ ] **Step 181:** Show preview of what will be uploaded
- [ ] **Step 182:** Prompt user for confirmation
- [ ] **Step 183:** Create API route `POST /api/cli/snapshots`
- [ ] **Step 184:** Validate API token from CLI
- [ ] **Step 185:** Insert snapshot into database
- [ ] **Step 186:** Return snapshot ID and share URL
- [ ] **Step 187:** Display success message with link
- [ ] **Step 188:** Test full capture + upload flow

### 7.11 CLI Polish
- [ ] **Step 189:** Add `devsnap list` command - show user's snapshots
- [ ] **Step 190:** Add `devsnap logout` command - clear stored token
- [ ] **Step 191:** Add `--name` flag to capture command
- [ ] **Step 192:** Add `--exclude` flag to skip sections
- [ ] **Step 193:** Add progress spinner during capture
- [ ] **Step 194:** Add colored output for better UX
- [ ] **Step 195:** Test all CLI commands

---

## Phase 8: Testing & Polish (Day 8-9)

### 8.1 Error Handling
- [ ] **Step 196:** Add error boundary to dashboard
- [ ] **Step 197:** Add loading states to all data fetches
- [ ] **Step 198:** Add error states with retry buttons
- [ ] **Step 199:** Handle API errors gracefully in CLI
- [ ] **Step 200:** Add toast notifications for actions

### 8.2 Edge Cases
- [ ] **Step 201:** Test with user who has 0 snapshots
- [ ] **Step 202:** Test with user who has 100+ snapshots
- [ ] **Step 203:** Test share link that doesn't exist (404)
- [ ] **Step 204:** Test expired share link
- [ ] **Step 205:** Test capture on machine with minimal tools installed

### 8.3 Performance
- [ ] **Step 206:** Add database indexes for common queries
- [ ] **Step 207:** Implement pagination for snapshots list
- [ ] **Step 208:** Add caching headers to public share pages
- [ ] **Step 209:** Lazy load heavy components
- [ ] **Step 210:** Run Lighthouse, fix performance issues

### 8.4 Security Review
- [ ] **Step 211:** Verify all API routes check authentication
- [ ] **Step 212:** Verify users can only access their own snapshots
- [ ] **Step 213:** Review redaction patterns for secrets
- [ ] **Step 214:** Add rate limiting to API routes
- [ ] **Step 215:** Test for SQL injection (Drizzle prevents this)

---

## Phase 9: Deployment (Day 9-10)

### 9.1 Production Database
- [ ] **Step 216:** Create production branch in Neon
- [ ] **Step 217:** Copy production connection string
- [ ] **Step 218:** Run migrations on production database

### 9.2 Production OAuth
- [ ] **Step 219:** Create new GitHub OAuth App for production
- [ ] **Step 220:** Set callback URL to production domain
- [ ] **Step 221:** Copy Client ID and Secret

### 9.3 Vercel Deployment
- [ ] **Step 222:** Connect GitHub repo to Vercel
- [ ] **Step 223:** Add all environment variables
- [ ] **Step 224:** Deploy and verify build succeeds
- [ ] **Step 225:** Test production site loads
- [ ] **Step 226:** Test login flow on production
- [ ] **Step 227:** Test share links on production

### 9.4 Domain Setup
- [ ] **Step 228:** Purchase domain (e.g., devsnap.io)
- [ ] **Step 229:** Add domain to Vercel
- [ ] **Step 230:** Update OAuth callback URLs
- [ ] **Step 231:** Update NEXTAUTH_URL env var
- [ ] **Step 232:** Verify site works on custom domain

### 9.5 CLI Publishing
- [ ] **Step 233:** Update CLI API URL to production
- [ ] **Step 234:** Publish to npm: `npm publish`
- [ ] **Step 235:** Test `npm install -g devsnap` works
- [ ] **Step 236:** Test CLI against production API

---

## Phase 10: Launch Prep (Day 10)

### 10.1 Documentation
- [ ] **Step 237:** Write README with quick start
- [ ] **Step 238:** Add CLI usage examples
- [ ] **Step 239:** Add FAQ section to landing page
- [ ] **Step 240:** Create demo video/GIF

### 10.2 Analytics
- [ ] **Step 241:** Create PostHog account
- [ ] **Step 242:** Add PostHog to web app
- [ ] **Step 243:** Track key events: signup, capture, share
- [ ] **Step 244:** Verify events showing in PostHog

### 10.3 Monitoring
- [ ] **Step 245:** Set up error tracking (Sentry)
- [ ] **Step 246:** Add to web app
- [ ] **Step 247:** Test error capture works
- [ ] **Step 248:** Set up uptime monitoring

### 10.4 Launch Checklist
- [ ] **Step 249:** Final test of complete flow
- [ ] **Step 250:** Prepare Product Hunt assets
- [ ] **Step 251:** Write Hacker News post
- [ ] **Step 252:** Schedule launch tweets
- [ ] **Step 253:** **LAUNCH!** 🚀

---

## Quick Reference

**Total Steps:** 253

**Estimated Time:** 10 working days (80 hours)

**Dependencies:**
- Neon account (free)
- GitHub OAuth App
- Vercel account (free)
- npm account (for CLI publishing)
- Domain (~$12/year)

**If stuck on any step:**
1. Check the specific error message
2. Search for the error + tech (e.g., "drizzle push error")
3. Check the official docs
4. Ask for help with the specific step number

---

*Each checkbox represents ~15-30 minutes of work. Don't skip steps!*

