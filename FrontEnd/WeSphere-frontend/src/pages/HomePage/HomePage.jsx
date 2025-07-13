import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'


const HomePage = () => {
  useEffect(() => {
    document.title = "Trang chủ - WeSphere"
  }, []);
  return (
    <div>HomePage
      <Link to="/find">Go to Find Page</Link>
      <Link to="/auth">Go to Auth Page</Link>
    </div>
  )
}

export default HomePage