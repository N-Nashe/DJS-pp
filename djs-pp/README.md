# 🎙️ Podcast App

A modern, responsive podcast discovery and playback application built with React and Vite. Browse, search, filter, and enjoy your favorite podcasts with an intuitive audio player and favorites system.

![React](https://img.shields.io/badge/React-19.1.1-blue.svg)
![Vite](https://img.shields.io/badge/Vite-7.1.7-green.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

## 🌐 Live Demo

**[View Live Demo →](https://djs-portfolio-piece.vercel.app/)**

Experience the app live on Vercel! Click the link above to explore all features including audio playback, favorites management, and responsive design.

## ✨ Features

### 🎵 Audio Player
- **Play/Pause Controls**: Smooth audio playback with responsive controls
- **Seek Functionality**: Click anywhere on the progress bar to jump to specific time
- **Time Display**: Current time and total duration display
- **Audio Context**: Global audio state management across the app

### ❤️ Favorites System
- **Save Favorites**: Add podcasts to your personal favorites collection
- **Persistent Storage**: Favorites are saved locally and persist across sessions
- **Dedicated Page**: Browse all your favorite podcasts in a clean grid layout
- **Easy Management**: Add/remove favorites with a single click

### 🔍 Search & Discovery
- **Real-time Search**: Instant search across podcast titles and descriptions
- **Genre Filtering**: Filter by 9 different genres including Comedy, True Crime, History, and more
- **Smart Sorting**: Sort by newest, A-Z, Z-A, or no sorting
- **Responsive Grid**: Clean card-based layout that adapts to screen size

### 🎨 User Experience
- **Dark/Light Theme**: Toggle between themes with persistent preference
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Clean UI**: Modern interface with smooth animations and transitions
- **Loading States**: Proper loading and error handling throughout

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/N-Nashe/DJS-pp.git
   cd DJS-pp/djs-pp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the app

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🏗️ Project Structure

```
src/
├── components/
│   └── common/
│       ├── podcast/
│       │   └── audio/
│       │       └── AudioControls.jsx
│       └── ThemeToggleButton.jsx
├── context/
│   ├── AudioContext.jsx
│   └── FavoritesContext.jsx
├── pages/
│   ├── Home.jsx
│   ├── ShowDetails.jsx
│   └── Favorites.jsx
├── services/
│   └── api.js
├── utils/
│   └── formatUtils.js
├── general styles/
│   └── styles.css
└── main.jsx
```

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.7
- **Routing**: React Router DOM 7.9.4
- **State Management**: React Context API
- **Styling**: CSS3 with Custom Properties
- **Audio**: HTML5 Audio API
- **Storage**: localStorage for persistence

## 📱 Responsive Design

The app is fully responsive with breakpoints at:
- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: 767px and below

## 🎯 Key Components

### AudioContext
Global state management for audio playback with methods for:
- Playing/pausing episodes
- Seeking to specific timestamps
- Managing audio state across components

### FavoritesContext  
Manages favorites functionality including:
- Adding/removing favorites
- localStorage persistence
- Favorites count tracking

### Home Page
Main dashboard featuring:
- Podcast grid display
- Search and filtering controls
- Genre-based organization

### Favorites Page
Dedicated page for saved podcasts with:
- Grid layout of favorite podcasts
- Empty state handling
- Navigation back to home

## 🔧 Configuration

The app uses Vite for fast development and building. Configuration can be found in:
- `vite.config.js` - Vite configuration
- `eslint.config.js` - ESLint rules

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with React and Vite for optimal performance
- Uses modern web APIs for audio playback
- Responsive design principles for cross-device compatibility


