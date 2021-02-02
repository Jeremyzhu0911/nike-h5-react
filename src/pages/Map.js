import React from "react";
import {Map, Marker, APILoader} from '@uiw/react-baidu-map';
import {getUrlData} from "../util/getUrlData";

const MapIndex = (props) => {
    return (
        <div className="map">
            <div className={"iconfont icon-withdraw-fill"} onClick={()=>{
                props.history.goBack()
            }}/>
            <APILoader akay="39472cf879ad8fe94bbab76dfbdca31a">
                <Map widget={['GeolocationControl','NavigationControl']} zoom={16} center={{lng: getUrlData('lng'), lat: getUrlData('lat')}}>
                    <Marker animation={2} position={{ lng: getUrlData('lng'), lat: getUrlData('lat') }} />
                </Map>
            </APILoader>
        </div>
    );
}

export default MapIndex;
