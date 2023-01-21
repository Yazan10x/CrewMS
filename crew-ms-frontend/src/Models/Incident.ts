import {ObjectID} from "bson";


export interface Incident {
    _id: ObjectID
    user_id: string
    incident_type: string
    associated_users: Array<string>
    date: Date
    status: string
    description: string
}
