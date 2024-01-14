import { faker } from "@faker-js/faker";
import { Portfolio } from "../../models/Portfolio";
import { BaseFactory } from "./BaseFactory";

export class PortfolioFactory extends BaseFactory<Portfolio> {
   protected generateSpecifics(portfolio: Portfolio): Portfolio {

      portfolio.created_at = faker.date.past(); 
1   
      return portfolio;
   }
}


