import { BookingStatus } from "../enums/booking.enum";
import { Vehicle } from "./vehicle";

export interface BookingItemInput {
    vehiclePrice: number;
    vehicleId: string;
    bookingId: string;
}

export interface BookingItem {
    _id: string;
    vehiclePrice: number;
    bookingId: string;
    vehicleId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Booking {
    _id: string;
    bookingTotal: number;
    bookingStatus: BookingStatus;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    /** from aggregations */
    bookingItem: BookingItem[];
    vehicleData: Vehicle[];
}

export interface BookingInquiry {
    page: number;
    limit?: number;
    bookingStatus?: BookingStatus;
}