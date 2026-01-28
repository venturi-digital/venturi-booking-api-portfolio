import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import { createBookingSchema, updateBookingSchema } from '../utils/validation';
import prisma from '../utils/prisma';

export const createBooking = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const data = createBookingSchema.parse(req.body);

    const booking = await prisma.booking.create({
      data: {
        userId: req.userId,
        title: data.title,
        description: data.description,
        startTime: new Date(data.startTime),
        endTime: new Date(data.endTime),
      },
    });

    res.status(201).json({
      message: 'Booking created successfully',
      booking,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

export const getBookings = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const bookings = await prisma.booking.findMany({
      where: { userId: req.userId },
      orderBy: { startTime: 'asc' },
    });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getBookingById = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const bookingId = parseInt(req.params.id, 10);
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      res.status(404).json({ error: 'Booking not found' });
      return;
    }

    if (booking.userId !== req.userId) {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateBooking = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const bookingId = parseInt(req.params.id, 10);
    const data = updateBookingSchema.parse(req.body);

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      res.status(404).json({ error: 'Booking not found' });
      return;
    }

    if (booking.userId !== req.userId) {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        title: data.title,
        description: data.description,
        startTime: data.startTime ? new Date(data.startTime) : undefined,
        endTime: data.endTime ? new Date(data.endTime) : undefined,
      },
    });

    res.status(200).json({
      message: 'Booking updated successfully',
      booking: updatedBooking,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

export const deleteBooking = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const bookingId = parseInt(req.params.id, 10);

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      res.status(404).json({ error: 'Booking not found' });
      return;
    }

    if (booking.userId !== req.userId) {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }

    await prisma.booking.delete({
      where: { id: bookingId },
    });

    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
