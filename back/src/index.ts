import app from "./app";
import { AppDataSource } from "./config/data-source";
import { PORT } from "./config/envs";
import "reflect-metadata";

const connectToDb = async (): Promise<void> => {
    try {
        await AppDataSource.initialize();
        console.log("Conectado correctamente a la DB");
        
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en puerto ${PORT}`);
        });
    } catch (error) {
        console.error(`Hubo un error conectandose a la DB: ${error}`);
    }
};
connectToDb();