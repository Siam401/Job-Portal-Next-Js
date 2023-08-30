import configHandler from '@/config/handler'
import React from 'react'

const AppConfiguration = () => {
  configHandler()
  return (
    <div>Application Configuration Updated</div>
  )
}

export default AppConfiguration