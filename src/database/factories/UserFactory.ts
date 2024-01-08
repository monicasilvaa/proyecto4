import { faker } from "@faker-js/faker";
import { User } from "../../models/User";
import bcrypt from "bcrypt";
import { BaseFactory } from "./BaseFactory";


export class UserFactory extends BaseFactory<User> {
    protected generateSpecifics(user: User): User{
    
    user.username = faker.internet.userName();
    user.password_hash = bcrypt.hashSync("12345678", 10);
    user.email = faker.internet.email({
        firstName: user.first_name,
        lastName: user.last_name,
        allowSpecialCharacters: true,
     });
    user.first_name = faker.person.firstName();
    user.last_name = faker.person.lastName();
    user.phone = faker.phone.number();
    user.birthday_date = faker.date.birthdate({ min: 18, max: 120, mode: 'age' })

    return user;
  }


  
}
