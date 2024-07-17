interface CustomError {
    message: string;
    status: number;
}

const errHandler = (error: CustomError): { errorMessage: string; statusCode: number } => {
    const errorMessage = error.message || "Error interno del servidor";
    const statusCode = error.status || 500;

    console.error(`Error: ${errorMessage}`);

    return { errorMessage, statusCode };
};

export default errHandler;
