import bcrypt from "bcryptjs";
import { Credential } from "../entities/Credential";
import { CredentialModel } from "../config/data-source";
import { QueryRunner } from "typeorm";
import { DtoOnlyCredential } from "../dto/dtos";

const credentialService = {
    addCredential: async (queryRunner: QueryRunner, credential: DtoOnlyCredential): Promise<Credential> => {
        await queryRunner.startTransaction();
        try {
            const { username, password }: DtoOnlyCredential = credential;

            if (!username || !password) throw new Error("Esta faltando el Usuario o la Contraseña");

            const hashedPassword: string = bcrypt.hashSync(password, 10);

            const newCredential: DtoOnlyCredential = {
                username,
                password: hashedPassword
            };
            const createdCredential: Credential = CredentialModel.create(newCredential);
            await queryRunner.manager.save(createdCredential);
            await queryRunner.commitTransaction();
            return createdCredential;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
    },
    validateCredentials: async (credential: DtoOnlyCredential): Promise<Credential["id"]> => {
        try {
            const  foundCredential: Credential | null = await CredentialModel.findOneBy( { username: credential.username } );
            if(!foundCredential) throw { message: "Credenciales incorrectas", status: 403 }
            const checkPassword: boolean = bcrypt.compareSync(
                credential.password, foundCredential.password
            );

            if(checkPassword) return foundCredential.id
            else  throw { message:"Credenciales incorrectas", status: 403 }

        } catch (error) {
            throw error;
        }
    },
};

export default credentialService;