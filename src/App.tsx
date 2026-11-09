import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { MenuProvider } from './components/MenuOverlay'
import Archive from './pages/Archive'
import Heroes from './pages/Heroes'
import Home from './pages/Home'
import Story from './pages/Story'
import StoryDetail from './pages/StoryDetail'
import World from './pages/World'

export default function App() {
  return (
    <BrowserRouter>
      <MenuProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/story" element={<Story />} />
          <Route path="/story/:id" element={<StoryDetail />} />
          <Route path="/hero" element={<Heroes />} />
          <Route path="/world" element={<World />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MenuProvider>
    </BrowserRouter>
  )
}
