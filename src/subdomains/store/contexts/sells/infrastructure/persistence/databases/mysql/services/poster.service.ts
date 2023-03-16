import { Injectable } from "@nestjs/common";
import { IPosterDomainService, IPosterUpdateImageCommand, IPosterUpdatePriceCommand } from "src";
import { IPosterUpdateTypeCommand } from "src/subdomains/store/contexts/sells/domain/interfaces/commands/counter/poster/update-type.command";
import { PosterMySqlEntity } from "../entities/poster.entity";
import { PosterRepository } from "../repositories/poster.repository";

@Injectable()
export class PosterMySqlService
    implements IPosterDomainService<PosterMySqlEntity> {

    constructor(
        private readonly posterRepository: PosterRepository,
    ) { }

    async updateImage(poster: IPosterUpdateImageCommand): Promise<PosterMySqlEntity> {
        const posterToUpdate = await this.posterRepository.findById(poster.posterId)
        return this.posterRepository.update(poster.posterId, posterToUpdate)
    }
    async updatePosterPrice(poster: IPosterUpdatePriceCommand): Promise<PosterMySqlEntity> {
        const posterToUpdate = await this.posterRepository.findById(poster.posterId)
        return this.posterRepository.update(poster.posterId, posterToUpdate)
    }
    async updatePosterType(poster: IPosterUpdateTypeCommand): Promise<PosterMySqlEntity> {
        const posterToUpdate = await this.posterRepository.findById(poster.posterId)
        return this.posterRepository.update(poster.posterId, posterToUpdate)
    }
}