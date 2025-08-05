![Zennety Light](./art/app-preview.png)

# [Zennety](https://zennety.vercel.app)

A collaborative project management platform where teams can organize tasks, track progress, and work together efficiently using Kanban boards.

## Demo account

- **Login** - demo@zennety.com
- **Password** - Demo123@

## ✨ Features

- **Workspace Management**: Create and manage multiple workspaces for different projects
- **Kanban Boards**: Visual task management with drag-and-drop functionality
- **Task Cards**: Create cards with priorities, assignees, deadlines, and descriptions
- **Status Columns**: Customize workflow stages to match your team's process
- **Team Collaboration**: Invite members with role-based permissions
- **Real-time Updates**: Track changes and activities across all boards
- **Comments & Activities**: Discuss tasks and track progress history
- **Notifications**: Stay updated on important changes and mentions
- **File Attachments**: Upload and share files with your team
- **Responsive Design**: Work seamlessly across desktop and mobile devices
- **Dark/Light Theme**: Choose your preferred interface theme
- **Multi-language Support (coming soon)**: Internationalization for global teams

## ⚡ Technologies Used

### Frontend

- **Next.js 13** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Smooth animations and transitions
- **React Query** - Server state management
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation
- **i18next** - Internationalization
- **DND Kit** - Drag and drop functionality

### Backend

- **Laravel 10** - PHP framework
- **Laravel Sanctum** - API authentication
- **Spatie Laravel Permission** - Role and permission management
- **Spatie Laravel Activity Log** - Activity tracking
- **Spatie Laravel Media Library** - File management
- **SQLite** - Database (development)
- **Pest** - Testing framework

## ⚒️ Installation

### Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Zennety
   ```

2. **Install dependencies**

   ```bash
   # Install root dependencies
   npm install

   # Install frontend dependencies
   cd www
   npm install

   # Install backend dependencies
   cd ../api
   composer install
   ```

3. **Environment setup**

   ```bash
   # Frontend environment
   cd www
   cp .env.example .env.local
   # Edit .env.local with your configuration

   # Backend environment
   cd ../api
   cp .env.example .env
   # Edit .env with your database and app configuration
   ```

4. **Database setup**

   ```bash
   cd api
   php artisan migrate
   php artisan db:seed
   ```

5. **Start development servers**

   ```bash
   # Start frontend (from www directory)
   npm run dev

   # Start backend (from api directory)
   php artisan serve
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

### Development Scripts

```bash
# Frontend (from www directory)
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run test         # Run tests

# Backend (from api directory)
php artisan serve    # Start development server
php artisan test     # Run tests
```
