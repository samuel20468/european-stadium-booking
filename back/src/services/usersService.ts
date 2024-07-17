import { DtoOnlyCredential, DtoUser } from "../dto/dtos";
import { User } from "../entities/User";
import { Credential } from "../entities/Credential";
import { AppDataSource, UserModel } from "../config/data-source";
import credentialService from "./credentialsService";

const usersService = {
    getAll: async (): Promise<User[]> => {
        try {
            const users: User[] = await UserModel.find();
            return users;
        } catch (error) {
            throw error;
        }
    },
    findUserById: async (user_id: User["id"]): Promise<User | null> => {
        try {
            const foundUser: User | null = await UserModel.findOne({ where: { id: user_id }, relations: ["appointments"] });
            return foundUser;
        } catch (error) {
            throw error;
        }
    },
    createUser: async (dataUser: DtoUser): Promise<User> => {
        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        try {
            await queryRunner.startTransaction();
            const { username, password }: Omit<Credential, "id"> = dataUser;
            const credential: Credential = await credentialService.addCredential(queryRunner, { username, password });

            const newUser = new User();
            newUser.name = dataUser.name
            newUser.email = dataUser.email
            newUser.birthdate = dataUser.birthdate
            newUser.nDni = dataUser.nDni
            newUser.credential = credential

            const createdUser: User = UserModel.create(newUser);

            // Verificar si la creación del usuario falla
            const savedUser = await queryRunner.manager.save(createdUser);
            if (!savedUser) throw { message: "Error al crear el usuario", status: 400 };

            await queryRunner.commitTransaction();
            return savedUser;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    },
    processLogin: async (credentials: DtoOnlyCredential): Promise<User> => {
        const { username, password }: DtoOnlyCredential = credentials
        const credentialId: string = await credentialService.validateCredentials({ username, password });

        const userToLoggin: User | null = await UserModel.findOneBy({ credential: { id: credentialId } })
        if (!userToLoggin) throw { message: "Este usuario no se encuentra registrado", status: 403 }

        return userToLoggin
    },
};

export default usersService;