import { createToken } from '@/core/di/container'
import type { UseCase } from '@/core/types/UseCase'
import type { Pet } from './Pet'
import type { PetFilter } from './PetFilter'
import type { PetRepository } from './PetRepository'
import type { PetStats } from './usecases/GetPetStats'

export const PET_REPOSITORY = createToken<PetRepository>('PetRepository')
export const LIST_PETS = createToken<UseCase<PetFilter | undefined, Pet[]>>('ListPets')
export const GET_PET = createToken<UseCase<string, Pet | null>>('GetPet')
export const GET_PET_STATS = createToken<UseCase<void, PetStats>>('GetPetStats')
