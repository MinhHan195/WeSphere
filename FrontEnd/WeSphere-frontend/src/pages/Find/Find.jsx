import React from 'react'
import { useEffect } from 'react'
import DefaultLayout from '../../layouts/DefaultLayout/DefaultLayout';
const Find = () => {
  useEffect(() => {
    document.title = "Tìm kiếm • WeSphere"
  }, []);
  return (
    <DefaultLayout>
      <div>FindPage</div>
    </DefaultLayout>
  )
}

export default Find