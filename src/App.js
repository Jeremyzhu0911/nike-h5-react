import React, { memo } from 'react'

import { renderRoutes } from "react-router-config"
import routes from "./router"

import NikeHeader from '@/components/app-header'
import NikeFooter from '@/components/app-footer'
import { HashRouter } from 'react-router-dom'
 
export default memo(function App() {
  return (
    <HashRouter>
      {/* <NikeHeader/> */}
      {renderRoutes(routes)}
      {/* <NikeFooter/> */}
    </HashRouter>
  )
})
