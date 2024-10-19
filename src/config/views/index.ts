import { listEpicrisis } from "./list-epicrisis/list-epicrisis";
import { errors } from "./misellaneous/errors";

export const views = {
    views: {
        ...listEpicrisis,
        ...errors
    }
}
