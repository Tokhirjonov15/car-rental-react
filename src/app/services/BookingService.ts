import axios from "axios";
import { serverApi } from "../../lib/config";
import { Booking, BookingInquiry } from "../../lib/types/booking";

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

    public async createBooking(bookingData: any): Promise<Booking> {
        try {
            const url = `${this.path}/bookings`;
            const result = await axios.post(url, bookingData, { 
                withCredentials: true 
            });
            
            console.log("createBooking:", result.data);
            return result.data;
        } catch (err) {
            console.log("Error createBooking:", err);
            throw err;
        }
    }

    public async getBookingById(bookingId: string): Promise<Booking> {
        try {
            const url = `${this.path}/bookings/${bookingId}`;
            const result = await axios.get(url, { 
                withCredentials: true 
            });
            
            console.log("getBookingById:", result.data);
            return result.data;
        } catch (err) {
            console.log("Error getBookingById:", err);
            throw err;
        }
    }
}

export default MyBookingsService;