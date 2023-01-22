import {ObjectID} from "bson";


export interface Profile {
    first_name: string
    last_name: string
    email: string
    crew_position: string
    bio: string
    profile_picture: string
}

export interface Demographics {
    gender: string
    race: string
    age: string
    sex: string
    blood_type: string
    health_conditions: string
}

export interface User {
    _id: ObjectID
    username: string
    has_admin: boolean
    profile: Profile
    demographics: Demographics
}
