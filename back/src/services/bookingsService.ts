import { DtoAppointment } from "../dto/dtos";
import { Appointment } from "../entities/Appointment";
import { BookingModel, UserModel } from "../config/data-source";
import { User } from "../entities/User";

const bookingsService = {
    getBookings: async (): Promise<Appointment[]> => {
        try {
            const bookings: Appointment[] = await BookingModel.find({
                relations: {
                    // user: true
                }
            });
            return bookings;
        } catch (error) {
            throw error;
        }
    },
    addBooking: async (dataBooking: DtoAppointment, user_id: string): Promise<Appointment> => {
        try {
            if (!user_id) {
                throw new Error(
                    "Para crear un nuevo turno es necesario el ID del usuario"
                )
            };
            const newBooking: Omit<Appointment, "user" | "id"> = {
                stadium: dataBooking.stadium,
                date: dataBooking.date,
                time: dataBooking.time,
                status: "Active",
            };
            const createdBooking: Appointment = BookingModel.create(newBooking);

            const user: User | null = await UserModel.findOneBy({ id: user_id });
            if (user) {
                createdBooking.user = user
                await BookingModel.save(createdBooking);
                return createdBooking;
            } else {
                throw { message: "No existe un usuario para asociar la reserva", status: 400 }
            }
        } catch (error) {
            throw error;
        }
    },
    findBookingById: async (id: Appointment["id"]): Promise<Appointment | null> => {
        try {
            const foundBooking: Appointment | null = await BookingModel.findOneBy({ id });
            return foundBooking;
        } catch (error) {
            throw error;
        }
    },
    changeBookingStatus: async (id: Appointment["id"], status: Appointment["status"]): Promise<Appointment> => {
        try {
            const newStatus = status;

            const bookingToUpdate: Appointment | null = await BookingModel.findOneBy({ id });

            if (bookingToUpdate) {
                BookingModel.merge(bookingToUpdate, { status: newStatus });
                const updatedBooking: Appointment = await BookingModel.save(bookingToUpdate);
                return updatedBooking;
            } else {
                throw Error("Recurso no encontrado")
            }
        } catch (error) {
            throw error;
        }
    },
    deleteBooking: async (id: Appointment["id"]): Promise<Appointment> => {
        try {
            const bookingToDelete: Appointment | null = await BookingModel.findOneBy({id});
            if (!bookingToDelete) {
                throw Error("Recurso a eliminar no encontrado")
            }
            await BookingModel.remove(bookingToDelete);

            return bookingToDelete;
        } catch (error) {
            throw(error);
        }
    }
};

export default bookingsService;
