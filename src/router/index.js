import exclusiveConsultant from "@/pages/exclusiveConsultant"
import fashionableProducts from "@/pages/fashionableProducts"
import latestLaunch from "@/pages/latestLaunch"
import limitedSales from "@/pages/limitedSales"
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
    component:limitedSales
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