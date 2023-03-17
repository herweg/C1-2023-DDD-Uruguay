import { BadRequestException, Injectable } from "@nestjs/common";
import { ICounterCreatePosterCommand, IPosterDomainService, IPosterUpdateImageCommand, IPosterUpdatePriceCommand, PosterDomainEntity } from "src";
import { IPosterUpdateTypeCommand } from "src/subdomains/store/contexts/sells/domain/interfaces/commands/counter/poster/update-type.command";
import { PosterMySqlEntity } from "../entities/poster.entity";
import { PosterRepository } from "../repositories/poster.repository";

@Injectable()
export class PosterMySqlService
    implements IPosterDomainService<PosterMySqlEntity> {

    constructor(
        private readonly posterRepository: PosterRepository,
    ) { }

    async createPoster(poster: PosterMySqlEntity): Promise<PosterMySqlEntity> {
        console.log("POSTER: "+ poster);
        
        return await this.posterRepository.create(poster)
    }

    async updateImage(poster: PosterMySqlEntity): Promise<PosterMySqlEntity> {
        return this.posterRepository.update(poster.posterId, poster)
    }

    async updatePosterPrice(poster: PosterMySqlEntity): Promise<PosterMySqlEntity> {
        return this.posterRepository.update(poster.posterId.valueOf(), poster)
    }

    async updatePosterType(poster: PosterMySqlEntity): Promise<PosterMySqlEntity> {
        return this.posterRepository.update(poster.posterId, poster)
    }

    async getPoster(posterId: string): Promise<PosterMySqlEntity> {
        return this.posterRepository.findById(posterId)
    }
}