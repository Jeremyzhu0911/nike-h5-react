import Off from '../pages/Off';
import Undefined from '../pages/Undefined';
import ErrorPage from '../pages/ErrorPage';
import Map from "../pages/Map";

import AmbassadorContent from  '../pages/ambassador';
import AmbassadorDetails from  '../pages/ambassador/details';
import AmbassadorForm from "../pages/ambassador/appointment";
import AmbassadorSuccess from "../pages/ambassador/success";
import AppointmentIndex from  "../pages/appointment";

import AppointmentActivities from  "../pages/appointment/Activities";
import AppointmentDetails from  "../pages/appointment/details";
import Luckydraw from "../pages/appointment/luckydraw";
import Adviser from "../pages/appointment/adviser";

import ActivitiesContent from  "../pages/activities";
import ActivitiesDetails from "../pages/activities/details";

import CommodityIndex from "../pages/commodity";
import CommodityList from "../pages/commodity/list";
import CommodityDetails from "../pages/commodity/details";
import CommodityAppointment from "../pages/commodity/appointment/appointment";
import Fashion from "../pages/commodity/fashion/fashion";

import Limit from "../pages/limit";
import Limit_details from "../pages/limit/details";
import Limitappointment from "../pages/limit/appointment";
import Limitsuccess from "../pages/limit/success";
import Limitlist from "../pages/limit/list";

import HistoricalRecord from  '../pages/historical';

const routes = [
    {
        path: '/Off',
        component: Off,
        meta: {
            title: ''
        }
    },
    {
        path: '/404',
        component: Undefined,
        meta: {
            title: '页面不存在'
        }
    },
    {
        path: '/500',
        component: ErrorPage,
        meta: {
            title: 'Nike'
        }
    },
    {
        path: '/content-ambassador',
        component: AmbassadorContent,
        meta: {
            title: '专属顾问'
        }
    },
    {
        path: '/details-ambassador',
        component: AmbassadorDetails,
        meta: {
            title: '专属顾问详情'
        }
    },
    {
        path: '/appointment',
        component: AmbassadorForm,
        meta: {
            title: '预约'
        }
    },
    {
        path: '/success',
        component: AmbassadorSuccess,
        meta: {
            title: 'Nike'
        }
    },
    {
        path: '/content-activities',
        component: ActivitiesContent,
        meta: {
            title: '活动'
        }
    },
    {
        path: '/details-activities',
        component: ActivitiesDetails,
        meta: {
            title: '活动详情'
        }
    },
    {
        path: '/map',
        component: Map,
        meta: {
            title: '门店地址'
        }
    },
    {
        path: '/appointment/index',
        component: AppointmentIndex,
        meta: {
            title: '我的预约'
        }
    },
    {
        path: '/appointment/details',
        component: AppointmentDetails,
        meta: {
            title: '我的预约详情'
        }
    },
    {
        path: '/appointment/activities',
        component: AppointmentActivities,
        meta: {
            title: '我的活动'
        }
    },
    {
        path: '/commodity/index',
        component: CommodityIndex,
        title: '最新上市'  //首页
    },
    {
        path: '/commodity/list',
        component: CommodityList,
        meta: {
            title: '最新上市'
        }
    },
    {
        path: '/commodity/details',
        component: CommodityDetails,
        meta: {
            title: '商品详情'
        }
    },
    {
        path: '/commodity/appointment',
        component: CommodityAppointment,
        meta: {
            title: '最新上市' //商品预约
        }
    },
    {
        path: '/commodity/limit',
        component: Limit,
        meta: {
            title: '限量发售'
        }
    },
    {
        path: '/commodity/limitlist',
        component: Limitlist,
        title: '限量发售' // 列表
    },
    {
        path: '/commodity/limitdetails',
        component: Limit_details,
        title: '限量发售' // 详情
    },
    {
        path: '/commodity/limitdetailspreview',
        component: Limit_details,
        title: '限量发售(预览)'
    },
    {
        path: '/commodity/limitappointment',
        component: Limitappointment,
        meta: {
            title: '限量发售'
        }
    },
    {
        path: '/commodity/limitsuccess',
        component: Limitsuccess,
        meta: {
            title: '报名成功'
        }
    },
    {
        path: '/commodity/detailsLuckydraw',
        component: Luckydraw,
        meta: {
            title: '活动详情'
        }
    },
    {
        path: '/commodity/fashion',
        component: Fashion,
        title: '潮流新品'
    },
    {
        path: '/adviser',
        component: Adviser,
        meta: {
            title: '我的预约'
        }
    },
    {
        path: '/historical-record',
        component: HistoricalRecord,
        title: '删除记录'  //多功能页面
    }
];

export default routes