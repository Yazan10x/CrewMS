import FLASK_HTTPS from "./FLASK_API";
import {ObjectID} from "bson";
import {User} from "../Models/User";
import { Incident } from "../Models/Incident";

export namespace IncidentsAPI {

    let route_name = "/incidents"

    export const get_incident = async (incident_id: ObjectID) => {
        return FLASK_HTTPS.get(route_name + "/get_incident/" + incident_id.toString())
            .then((res) => {
                return res.data as Incident
            })
            .catch((res) => {
                console.log(res)
            })
    }

    export const get_incidents_by = async (query: Map<string, string>) => {
        return FLASK_HTTPS.post(route_name + "/get_incidents_by",
            query)
            .then((res) => {
                return res.data as Array<Incident>
            }).catch((res) => {
                console.log(res)
            })
    }

    export const create_incident = async (incident: Incident) => {
        return FLASK_HTTPS.post(route_name + "/create_incident_log",
            {
                create_incident: incident
            })
            .then((res) => {
                return res.data as Array<Incident>
            }).catch((res) => {
                console.log(res)
            })
        }
        export const delete_incident = async (incident_id: ObjectID) => {
            return FLASK_HTTPS.delete(route_name + "/delete_incident/" + incident_id.toString())
                .then((res) => {
                    return res.data as Boolean
                })
                .catch((res) => {
                    console.log(res)
                })
        }     



}
