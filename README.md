# BlockVote – Blockchain-Based Voting Platform  
*A secure, transparent, and decentralized voting system built using React, TypeScript, Supabase, and Ethereum.*

---

## 🚀 Features

- **Secure Voting:** MetaMask and Ledger hardware wallet integration  
- **Transparent Results:** All votes immutably stored on the Ethereum blockchain  
- **Real-time Updates:** Live vote counts and election results  
- **Admin Panel:** Tools for election creation, voter verification, and result monitoring  
- **Multi-language Support:** Interface in both English and Hindi  
- **Responsive Design:** Optimized for all screen sizes – desktop, tablet, and mobile  

---

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript, Vite  
- **Styling:** Tailwind CSS, shadcn/ui  
- **Backend:** Supabase (Database, Authentication, Real-time Sync)  
- **Blockchain:** Ethereum, MetaMask & Ledger  
- **State Management:** React Query (TanStack Query), custom hooks  
- **Validation:** Zod for schema validation  

---

## 📋 Prerequisites

Make sure you have the following installed/configured:

- **Node.js** (v18 or higher)  
- **npm** or **bun**  
- **MetaMask** extension or **Ledger** device  
- **Supabase** account and project setup  

### For Ledger Users:

- Ledger Live (installed & updated)  
- Ethereum app installed on device  
- Latest firmware installed  

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <YOUR_GIT_URL>
cd blockvote
```
### 2. Install Dependencies
```bash
npm install
# or
bun install
```
### 3. Environment Setup
- Supabase configuration is available in : src/integrations/supabase/client.ts
- Supabase Project URL : https://qnsrksjsbeoivpozknot.supabase.co

### 4. Start the Development Server
```bash
npm run dev
# or
bun dev
```
Visit http://localhost:8080 in your browser.

---

## 🔧 Available Scripts

- npm run dev: Start development server
- npm run build: Create production build
- npm run preview: Preview build locally
- npm run lint: Check code style with ESLint

---

## 🗳️ How to Use

For Voters:

- Register or log in
- Connect MetaMask or Ledger
- Enter election code
- Cast vote and sign transaction
- Verify transaction on blockchain explorer

For Admins:

- Log in to admin panel
- Create elections and register candidates
- Manage/verify voters
- View analytics and vote counts in real time

---

## 🔐 Security Features

### Wallet Authentication
- Secure vote signing using MetaMask or Ledger
- Cryptographically signed and verified transactions

### Blockchain Integrity
- Immutable vote storage
- Chain ID validation
- Smart contract verification

### Backend Security
- Supabase Auth for login and roles
- Row Level Security (RLS) for data access control
- Admin-only operations for election control

--- 

## 📊 Database Schema

### Tables:
- elections – Election metadata
- candidates – Candidate profiles
- votes – Vote records with blockchain hash
- voters – User registration and verification
- vote_details – Additional voting metadata

### Policies:
- Row Level Security (RLS) enabled
- Access based on user role (admin/voter)

---

## 🤝 Contributing
```bash
# Fork and clone
git checkout -b feature/my-feature
git commit -m "Add my feature"
git push origin feature/my-feature
```
Then open a Pull Request on GitHub.

---

### Built with ❤️ by me — from design to deployment.


