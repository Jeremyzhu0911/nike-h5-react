import exclusiveConsultant from "@/pages/exclusiveConsultant"
import fashionableProducts from "@/pages/fashionableProducts"
import latestLaunch from "@/pages/latestLaunch"
import limitedSales from "@/pages/limitedSales"
import limitedSalesDetails from "@/pages/limitedSalesDetails"
import limitedSalesInformation from "@/pages/limitedSalesInformation"
import limitedSalesSuccess from "@/pages/limitedSalesSuccess"
import myActivities from "@/pages/myActivities"
import myAppointment from "@/pages/myAppointment"
import storeActivities from "@/pages/storeActivities"

const routes = [
  {
    // 专属顾问
    path:"/content-ambassador",
    component:exclusiveConsultant
  },
  {
    // 流行潮品
    path:"/commodity/fashion",
    component:fashionableProducts
  },
  {
    // 最新上市
    path:"/commodity/index",
    component:latestLaunch
  },
  {
    // 限量发售
    path:"/commodity/limitList",
    component:limitedSales,
    exact:true
  },
  {
    // 限量发售详情
    path:"/commodity/limitList/details",
    component:limitedSalesDetails
  },
  {
    // 限量发售输入信息
    path:"/commodity/limitList/info",
    component:limitedSalesInformation
  },
  {
    // 限量发售成功
    path:"/commodity/limitList/success",
    component:limitedSalesSuccess
  },
  {
    // 我的活动
    path:"/appointment/activities",
    component:myActivities
  },
  {
    // 我的预约
    path:"/appointment/index",
    component:myAppointment
  },
  {
    // 店铺活动
    path:"/content-activities",
    component:storeActivities
  }
];
export default routes;