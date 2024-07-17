import { Request, Response } from "express";
import bookingsService from "../services/bookingsService";
import { DtoAppointment } from "../dto/dtos";
import { Appointment } from "../entities/Appointment";
import errHandler from "../utils/errManager";

const bookingsController = {
    getAllBookings: async (req: Request, res: Response): Promise<void> => {
        try {
            const bookings: Appointment[] = await bookingsService.getBookings();
            if (bookings.length < 1) throw { message: "No se encontró ninguna reserva", status: 404 };

            res.status(200).json(bookings);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            const { statusCode, errorMessage } = errHandler(error);
            res.status(statusCode).json({ error: errorMessage });
        }
    },
    createBooking: async (req: Request, res: Response): Promise<void> => {
        try {
            const userId: string = req.body.user_id;
            const newBooking: DtoAppointment = req.body;
            const createdBooking: Appointment = await bookingsService.addBooking(newBooking, userId);
            if (!createdBooking) throw { message: "Error al crear la reserva" }

            res.status(201).json(createdBooking);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            const { statusCode, errorMessage } = errHandler(error);
            res.status(statusCode).json({ error: errorMessage });
        }
    },
    getBookingById: async (req: Request<{ id: string }, Appointment>, res: Response): Promise<void> => {
        try {
            const id: string = req.params.id;
            if (id.length !== 36) throw { message: "El ID es inválido", status: 400 };

            const booking: Appointment | null = await bookingsService.findBookingById(id);
            if (!booking) throw { message: "La reserva no fue encontrada", status: 404 };

            res.status(200).json(booking);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            const { statusCode, errorMessage } = errHandler(error);
            res.status(statusCode).json({ error: errorMessage });
        }
    },
    changeBookingStatus: async (req: Request<{ id: string }, Appointment>, res: Response): Promise<void> => {
        try {
            const booking_id: string = req.params.id;
            if (booking_id.length !== 36) throw { message: "El ID es inválido", status: 400 };
            const { status } = req.body;

            const updatedBookingStatus: Appointment = await bookingsService.changeBookingStatus(booking_id, status);
            if (!updatedBookingStatus) throw { message: "Hubo un error en la cancelación de la reserva" };

            res.status(201).json(`El recurso con id ${updatedBookingStatus.id} ha cambiado su status a ${updatedBookingStatus.status}`)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            const { statusCode, errorMessage } = errHandler(error);
            res.status(statusCode).json({ error: errorMessage });
        }
    },
    deleteOneBooking: async (req: Request<{ id: string }, Appointment>, res: Response): Promise<void> => {
        try {
            const booking_id: string = req.params.id;
            if (booking_id.length !== 36) throw { message: "El ID es inválido", status: 400 };

            const deletedBooking: Appointment = await bookingsService.deleteBooking(booking_id);
            if (!deletedBooking) throw { message: "La reserva no fue encontrada", status: 404 };

            res.status(202).json(deletedBooking);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            const { statusCode, errorMessage } = errHandler(error);
            res.status(statusCode).json({ error: errorMessage });
        }
    }
};

export default bookingsController;