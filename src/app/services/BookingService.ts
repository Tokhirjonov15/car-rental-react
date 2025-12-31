import axios from "axios";
import { serverApi } from "../../lib/config";
import { Booking, BookingInput, BookingInquiry } from "../../lib/types/booking";

class MyBookingsService {
    private readonly path: string;

    constructor() {
        this.path = serverApi;
    }
    
    public async getMyBookings(input: BookingInquiry): Promise<Booking[]> {
        try {
            const url = `${this.path}/booking/all`;
            const params = new URLSearchParams();
            params.append('page', input.page.toString());
            params.append('limit', input.limit.toString());
            
            if (input.bookingStatus) {
                params.append('bookingStatus', input.bookingStatus);
            }

            const result = await axios.get(`${url}?${params.toString()}`, { 
                withCredentials: true 
            });
            
            console.log("getMyBookings:", result.data);
            
            return result.data;
        } catch (err) {
            console.log("Error getMyBookings:", err);
            throw err;
        }
    }

    public async createBooking(input: BookingInput): Promise<Booking> {
        try {
            const url = `${this.path}/booking/create`;
            const result = await axios.post(url, input, {
            withCredentials: true,
            });
            return result.data;
        } catch (err) {
            console.log("Error createBooking:", err);
            throw err;
        }
    }
}

export default MyBookingsService;