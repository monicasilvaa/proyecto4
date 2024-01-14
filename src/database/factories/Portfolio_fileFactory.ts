import { faker } from "@faker-js/faker";
import { BaseFactory } from "./BaseFactory";
import { Portfolio_file } from "../../models/Portfolio_file";

export class Portfolio_fileFactory extends BaseFactory<Portfolio_file> {
   protected generateSpecifics(portfolio_file: Portfolio_file): Portfolio_file {

    portfolio_file.name = faker.image.url();
    portfolio_file.created_at = faker.date.past(); 
1   
      return portfolio_file;
   }
}


