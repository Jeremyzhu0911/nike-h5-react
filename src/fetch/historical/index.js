import {get} from "../get";
import { getUrlData } from "../../server/config";

export function getHistoricalData(storeId){
    const result = get("/fans/delete-history?store_id=" + getUrlData('store_id', window.location.search));
    return result;
}