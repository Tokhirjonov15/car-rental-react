import axios from "axios";
import { serverApi } from "../../lib/config";
import { Vehicle, VehicleInquiry } from "../../lib/types/vehicle";

class VehicleService {
    private readonly path: string;

    constructor () {
        this.path = serverApi;
    }

    public async getVehicles(input: VehicleInquiry): Promise<Vehicle[]> {
        try {
            let url = `${this.path}/vehicle/all?page=${input.page}&limit=${input.limit}`;
            if (input.vehicleCollection)
                url += `&vehicleCollection=${input.vehicleCollection}`;
            if (input.search) 
                url += `&search=${input.search}`;

            const result = await axios.get(url);
            console.log("getVehicles:", result);

            return result.data;
        } catch (err) {
            console.log("ERROR, getVehicles", err);
            throw err;
        }
    }

    public async getVehicle(vehicleId: string): Promise<Vehicle> {
        try {
            const url = `${this.path}/vehicle/${vehicleId}`;
            const result = await axios.get(url, { withCredentials: true });
            console.log("getVehicle:", result);
            return result.data;
        } catch (err) {
            console.log("ERROR, getVehicle:", err);
            throw err;
        }
    }
}

export default VehicleService;