import FLASK_HTTPS from "./FLASK_API";
import {ObjectID} from "bson";
import { Health } from "../Models/Health";

export namespace HealthsAPI {

    let route_name = "/health_report"

    export const get_health = async (health_id: ObjectID) => {
        return FLASK_HTTPS.get(route_name + "/get_health/" + health_id.toString())
            .then((res) => {
                return res.data as Health
            })
            .catch((res) => {
                console.log(res)
            })
    }

    export const get_records_by = async (query: Map<string, string>) => {
        return FLASK_HTTPS.post(route_name + "/get_health_records_by",
            query)
            .then((res) => {
                return res.data as Array<Health>
            }).catch((res) => {
                console.log(res)
            })
    }

    export const create_health_rec = async (health: Health) => {
    return FLASK_HTTPS.post(route_name + "/create_health_log",
        {
            create_health: health
        })
        .then((res) => {
            return res.data as Array<Health>
        }).catch((res) => {
            console.log(res)
        })
    }

}
