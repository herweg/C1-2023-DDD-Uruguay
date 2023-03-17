import { Controller } from "@nestjs/common";
import { EventInfraService } from "../../persistence/services/event.service";

@Controller()
export class EventEventController {

    constructor(private readonly eventService: EventInfraService) {}

}
