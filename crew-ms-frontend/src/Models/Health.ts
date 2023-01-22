import {ObjectID} from "bson";

export interface Health {
    _id: ObjectID
    user_id: string
    bpm: number
    blood_pressure: number
    blood_oxygen: number
    temperature: number
    timestamp: Date
    weight: number
    symptoms: string
    hygiene: string[]
    workspace: Record<string, number>
    diet: number
    rest: number
    mental_health: Record<string, number>
}


