import { Injectable } from "@nestjs/common";
import { EventService } from "../databases/mysql/services/event.service";

@Injectable()
export class EventInfraService extends EventService { }