import {APILoader} from '@uiw/react-baidu-map';
const wxAppId = process.env.REACT_APP_PROXY_TAG;

const MapSDK = () => {
    // axios.get("https://api.map.baidu.com/location/ip?ak=39472cf879ad8fe94bbab76dfbdca31a&ip=您的IP&coor=bd09ll")
    APILoader.defaultProps.akay = "39472cf879ad8fe94bbab76dfbdca31a";

    console.log(wxAppId)
    if (navigator.geolocation) {
    }

};

export default MapSDK