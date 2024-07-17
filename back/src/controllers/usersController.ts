import { Request, Response } from "express";
import usersService from "../services/usersService";
import { DtoUser } from "../dto/dtos";
import { User } from "../entities/User";
import errHandler from "../utils/errManager";

const usersController = {
  getAllUsers: async (req: Request, res: Response): Promise<void> => {
    try {
      const users: User[] = await usersService.getAll();
      if (users.length < 1)
        throw { message: "No se encontró ningún usuario", status: 404 };

      res.status(200).json(users);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const { statusCode, errorMessage } = errHandler(error);
      res.status(statusCode).json({ error: errorMessage });
    }
  },
  getUserById: async (
    req: Request<{ id: string }, User>,
    res: Response
  ): Promise<void> => {
    try {
      const userId: string = req.params.id;
      if (userId.length !== 36)
        throw { message: "El ID es inválido", status: 400 };

      const user: User | null = await usersService.findUserById(userId);
      if (!user) throw { message: "El usuario no fue encontrado", status: 404 };

      res.status(200).json(user);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const { statusCode, errorMessage } = errHandler(error);
      res.status(statusCode).json({ error: errorMessage });
    }
  },
  postUser: async (req: Request, res: Response): Promise<void> => {
    try {
      const userCredential: DtoUser = req.body;
      const createdUser: User = await usersService.createUser(userCredential);
      if (!createdUser)
        throw { message: "Error al crear el usuario", status: 500 };

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { credential, ...userWithoutCredential } = createdUser;

      res.status(201).json(userWithoutCredential);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const { statusCode, errorMessage } = errHandler(error);
      res.status(statusCode).json({ error: errorMessage });
    }
  },
  loginUser: async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, password }: DtoUser = req.body;
      const user: User | null = await usersService.processLogin({
        username,
        password,
      });
      if (!user) throw { message: "Credenciales Inválidas", status: 403 };

      res.status(200).json({ login: true, user });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const { statusCode, errorMessage } = errHandler(error);
      res.status(statusCode).json({ error: errorMessage });
    }
  },
};

export default usersController;
