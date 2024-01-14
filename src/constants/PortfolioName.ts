import { User } from "../models/User";

export const PortfolioName = {
    GALLERY: (user: User) => `${user.username} Gallery`,
 };