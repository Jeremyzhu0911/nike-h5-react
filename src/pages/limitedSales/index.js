/* eslint-disable jsx-a11y/alt-text */
import React, { memo } from 'react';

import { NavLink } from 'react-router-dom';
import './style.less'

export default memo(function limitedSales() {
  return (
    <div className="limitedSalesWrap">
      <div className="shopName">上海长宁来福士NIKE体验店</div>
      <div className="commodityList">
        <div className="commodityName">
          Air Jordan VI Retro<br/>
          Tech Chrome
        </div>
        <div className="commodityTime">
          10/21 上午10:00
        </div>
        <div className="commodityImg">
         <img src='assets/images/sp.jpg'/>  
        </div>
        <div className="btn">
          报名未开始
        </div>
        <div className="down-arrow">
          <i className="iconfont icon-xiangxia"/>
        </div>
        <div className="underLine"></div>
      </div>

      <div className="commodityList over">
        <div className="commodityName">
          Air Jordan VI Retro<br/>
          Tech Chrome
        </div>
        <div className="commodityTime">
          10/21 上午10:00
        </div>
        <div className="commodityImg">
         <img src='assets/images/sp.jpg'/>  
        </div>
        <div className="btn">
          报名未开始
        </div>
        <div className="down-arrow">
          <i className="iconfont icon-xiangxia"/>
        </div>
        <div className="underLine"></div>
      </div>
    </div>
  )
})