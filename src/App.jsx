import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { AppShell } from '@mantine/core';
import Navbar from './components/common/Navbar'
import Header from './components/common/Header'
import Board from './pages/Board'
import { WorkspaceProvider } from './contexts/workspace'
import { BoardProvider } from './contexts/board'
import Signup from './pages/Signup'
import auth, { AuthProvider } from './contexts/authentication/auth'
import Login from './pages/Login'
import { onAuthStateChanged } from 'firebase/auth'
import { ListProvider } from './contexts/list'

function App() {
  const [user, setUser] = useState({})

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }
    })
  }, [])

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <WorkspaceProvider>
            <BoardProvider>
              <ListProvider>
                <AppShell
                  padding={0}
                  m={0}
                  navbar={user?.emailVerified && <Navbar width={{ base: 300 }} height={500} />}
                  header={user?.emailVerified && <Header />}
                  styles={(theme) => ({
                    main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : 'white' },
                  })}
                >

                  <Routes>
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/b/:board_id' element={<Board />} />
                    <Route path='/w/:workspace_id' element={<Home />} />
                  </Routes>

                </AppShell>
              </ListProvider>
            </BoardProvider>
          </WorkspaceProvider>
        </AuthProvider>
      </BrowserRouter>

    </>
  )
}

export default App
