import React, { memo } from 'react'

import './style.less'

export default memo(function limitedSalesInformation() {
  return (
    <div className="limitedSalesInformationWrap">
      <div className="shopName">上海长宁来福士NIKE体验店</div>
      <div className="InforDetails">
        <div className="InforTitle">
          Air Jordan VI Retro<br/>
          Tech Chrome
        </div>
        <div className="sellingPrice">
          发售价 ¥1599
        </div>
        <div className="selectSize">
          <p>选择尺寸</p>
          <ul className="Size">
            <li>5</li>
            <li className="active">5</li>
            <li>5</li>
            <li>5</li>
            <li>5</li>
            <li>5</li>
            <li>5</li>
            <li>5</li>
            <li>5</li>
            <li>5</li>
            <li>5</li>
            <li>5</li>
          </ul>
        </div>
        <div className="InfoEnter">
          <div className="items">
            <label for="name">姓名</label>
            <input type="text" id="name" name="name"/>
          </div>
          <div className="items">
            <label for="ID">身份证号码</label>
            <input type="tel" id="ID" name="ID" placeholder="输入后四位" maxlength="4"/>
          </div>
          <div className="items">
            <label for="phone">电话</label>
            <input type="tel" id="phone" name="phone"/>
          </div>
          <div className="items">
            <label for="code">验证码</label>
            <div className="itemsRight">
              <input type="text" id="code" name="code"/>
              <div className="getCodeBtn">
                获取验证码
              </div>
            </div> 
          </div>
        </div>
        <div className="warning">
          如您无法正常收到短信验证码，请点击微信菜单“个人服务-在线客服”留言进行询问。
        </div>
        <div className="exemption">
          <div className="exemption-left">
            <i className="iconfont icon-BAI-danxuankuang"/>
            <i className="iconfont icon-BAI-danxuankuangs"/>
          </div>
          <div className="exemption-right">
            我已仔细阅读并同意《<span>隐私信息授权条款</span>》及《<span>免责声明</span>》内容
          </div>
        </div>
        <div className="btn">
          提交
        </div>
      </div>
    </div>
  )
})
