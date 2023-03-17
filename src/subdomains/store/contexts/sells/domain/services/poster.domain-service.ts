import { PosterDomainEntity } from "../entities/poster/poster.domain-entity";

export interface IPosterDomainService<T extends PosterDomainEntity = PosterDomainEntity> {
    createPoster(poster: T): Promise<T>
    updateImage(poster: T): Promise<T>
    updatePosterPrice(poster: T): Promise<T>
    updatePosterType(poster: T): Promise<T>
    getPoster(posterId: string): Promise<T>
}