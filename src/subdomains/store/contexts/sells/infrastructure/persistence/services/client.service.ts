import { Injectable } from "@nestjs/common";
import { ClientMySqlService } from "../databases/mysql/services/client.service";

@Injectable()
export class ClientService extends ClientMySqlService { }