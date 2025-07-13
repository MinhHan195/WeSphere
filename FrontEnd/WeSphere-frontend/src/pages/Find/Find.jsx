import React from 'react'
import { useEffect } from 'react'
const Find = () => {
  useEffect(() => {
      document.title = "Tìm kiếm • WeSphere"
    }, []);
  return (
    <div>FindPage</div>
  )
}

export default Find