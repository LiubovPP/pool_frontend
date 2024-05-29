import type React from "react"
import { useAppSelector } from "@app/hooks/hooks"
import type { RootState } from "@app/store"
import "@styles/Home.css"

const Home: React.FC = () => {
  const { user } = useAppSelector((state: RootState) => state.auth)

  return (
    <div className="home-container">
      <span className="welcome-message">
        Добро пожаловать {user?.firstName} {user?.lastName} !
      </span>
    </div>
  )
}

export default Home
