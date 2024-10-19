import { auth } from "./auth";
import { engine } from "./engine";


export const microservices = {
    microservice: {
        ...engine,
        ...auth,
    }
}