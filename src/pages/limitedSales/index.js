import React, { memo } from 'react';

import { NavLink } from 'react-router-dom';
import { LimitSalesWrapper } from './style'

export default memo(function limitedSales() {
  return (
    <LimitSalesWrapper>
      <h2>limitedSales</h2>
    </LimitSalesWrapper>
  )
})