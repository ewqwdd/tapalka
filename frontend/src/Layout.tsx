import React from 'react'
import { UserContextProvider } from './contexts/userContext'
import { SocketContextProvider } from './contexts/socketContext'
import { FriendsContextProvider } from './contexts/friendsContext'
import { TasksContextProvider } from './contexts/tasksContext'
import { StatsContextProvider } from './contexts/statsContext'
import { NotifsContextProvider } from './contexts/notifsContext'
import { DemoContextProvider } from './contexts/demoContext'
import App from './App'

export default function Layout() {
  return (
    <UserContextProvider>
      <SocketContextProvider>
        <FriendsContextProvider>
          <TasksContextProvider>
            <StatsContextProvider>
              <NotifsContextProvider>
                <DemoContextProvider>
                  <App />
                </DemoContextProvider>
              </NotifsContextProvider>
            </StatsContextProvider>
          </TasksContextProvider>
        </FriendsContextProvider>
      </SocketContextProvider>
    </UserContextProvider>
  )
}
