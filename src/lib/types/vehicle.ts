import { VehicleCollection, VehicleFuel, VehicleStatus } from "../enums/vehicle.enum";

export interface Vehicle {
    _id: string;
    vehicleStatus: VehicleStatus;
    vehicleCollection: VehicleCollection;
    vehicleName: string;
    vehiclePrice: number;
    vehicleFuel: VehicleFuel;
    vehicleDoor: number;
    vehicleSeat: number;
    vehicleMile?: number;
    vehicleRating: number;
    vehicleImages: string[];
    vehicleViews: number;
}

export interface VehicleInquiry {
    book?: string;
    page: number;
    limit: number;
    vehicleCollection?: VehicleCollection;
    vehicleFuel?: VehicleFuel;
    search?: string;
}