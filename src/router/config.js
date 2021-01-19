import ErrorPage from '../pages/ErrorPage';
import Map from "../pages/Map";

import AmbassadorContent from '../pages/ambassador/AmbassadorContent';
import AmbassadorDetails from '../pages/ambassador/AmbassadorDetails';
import AmbassadorForm from "../pages/ambassador/AmbassadorAppointment";
import AmbassadorSuccess from "../pages/ambassador/AmbassadorSuccess";

import AppointmentIndex from "../pages/appointment/AppointmentIndex";
import AppointmentActivities from "../pages/appointment/activities";
import AppointmentDetails from "../pages/appointment/AppointmentDetails";
import AppointmentLuckydraw from "../pages/appointment/AppointmentLuckydraw";
import AppointmentAdviser from "../pages/appointment/adviser";

import ActivitiesContent from "../pages/activities/ActivitiesContent";
import ActivitiesDetails from "../pages/activities/details";

import CommodityIndex from "../pages/commodity/CommodityIndex";
import CommodityList from "../pages/commodity/CommodityList";
import CommodityDetails from "../pages/commodity/CommodityDetails";
import CommodityAppointment from "../pages/commodity/appointment";
import Fashion from "../pages/commodity/fashion/fashion";

import Limit from "../pages/limit/LimitIndex";
import LimitDetails from "../pages/limit/LimitDetails";
import LimitAppointment from "../pages/limit/LimitAppointment";
import Limitsuccess from "../pages/limit/success";
import LimitList from "../pages/limit/LimitList";

import HistoricalRecord from '../pages/Historical';

const routes = [
    {
        path: '/Off',
        component: ErrorPage,
        apiData: '',
        title: 'Nike'  //您访问的活动已下线   参数activities   ambassador   limit
    },
    {
        path: '/404',
        component: ErrorPage,
        title: '页面不存在'  //404
    },
    {
        path: '/500',
        component: ErrorPage,
        title: 'Nike'   //500
    },
    {
        path: '/content-ambassador',    //store_id
        component: AmbassadorContent,
        apiData: '',
        title: '专属顾问'  // 顾问列表
    },
    {
        path: '/details-ambassador',    //store_id
        component: AmbassadorDetails,
        title: '专属顾问详情'  // 顾问详情
    },
    {
        path: '/appointment',
        component: AmbassadorForm,
        exact: true,
        title: '预约'  // 顾问预约 and 活动预约
    },
    {
        path: '/success',
        component: AmbassadorSuccess,
        title: 'Nike'  // 顾问预约 成功
    },
    {
        path: '/content-activities',
        component: ActivitiesContent,
        title: '活动'  // 品牌活动：未知
    },
    {
        path: '/details-activities',
        component: ActivitiesDetails,
        title: '活动详情'  // or 我的活动的详情
    },
    {
        path: '/map',   //参数 lng  lat
        component: Map,
        meta: {
            title: '门店地址'
        }
    },
    {
        path: '/appointment/index', //参数 store_id
        component: AppointmentIndex,
        apiData: '',
        title: '我的预约'  //我的预约列表
    },
    {
        path: '/appointment/details', //参数 store_id  booking_id   type
        component: AppointmentDetails,
        title: '详细信息'   //我的预约详情
    },
    {
        path: '/adviser',   //参数 store_id  booking_id
        component: AppointmentAdviser,
        title: '我的预约'  // 我的预约-预约专家已结束后点击跳转的评价
    },
    {
        path: '/appointment/activities',
        component: AppointmentActivities,
        title: '我的活动'   // 我的活动  ## 内页默认跳转活动详情
    },
    {
        path: '/commodity/index',   // store_id
        component: CommodityIndex,
        apiData: '',
        title: '最新上市'  //首页
    },
    {
        path: '/commodity/list',    // store_id
        component: CommodityList,
        apiData: '可以数据请求api',
        title: '最新上市'  // 最新上市列表
    },
    {
        path: '/commodity/details', // store_id  product_code
        component: CommodityDetails,
        apiData: '可以数据请求api',
        title: '商品详情'  // 最新上市 商品详情
    },
    {
        path: '/commodity/appointment',
        component: CommodityAppointment,
        title: '最新上市' // 最新上市 预留产品 预约试穿 切换状态上一步
    },
    {
        path: '/commodity/limit',  // 参数 store_id
        component: Limit,
        title: '限量发售'  // 和limitlist一样  测试用
    },
    {
        path: '/commodity/limitlist', // 参数 store_id
        component: LimitList,
        title: '限量发售' // 列表
    },
    {
        path: '/commodity/limitdetails',
        component: LimitDetails,
        title: '限量发售' // 详情
    },
    {
        path: '/commodity/limitdetailspreview',
        component: LimitDetails,
        title: '限量发售(预览)'
    },
    {
        path: '/commodity/limitappointment',
        component: LimitAppointment,
        title: '限量发售'  // 表单
    },
    {
        path: '/commodity/limitsuccess',
        component: Limitsuccess,
        title: '限量发售'  // 报名成功
    },
    {
        path: '/commodity/detailsLuckydraw',
        component: AppointmentLuckydraw,
        title: '活动详情'   // 我的预约列表页-抽鞋抽号详情，取消/成功
    },
    {
        path: '/commodity/fashion',
        component: Fashion,
        title: '潮流新品'
    },
    {
        path: '/historical-record',
        component: HistoricalRecord,
        title: '删除记录'  //多功能页面
    }
];

export default routes