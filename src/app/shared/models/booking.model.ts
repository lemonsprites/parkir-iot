export interface BookingModel {
    key?: string
    otpKey: string
    user_id: string
    start_time?: number
    end_time?: number
    area_id: string
    expired: string
    nama?: string
    timestamp: number
}