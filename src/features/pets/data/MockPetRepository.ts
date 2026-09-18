import { delay } from '@/core/utils/delay'
import type { NewPet, Pet } from '../domain/Pet'
import { matchesFilter, type PetFilter } from '../domain/PetFilter'
import type { PetRepository } from '../domain/PetRepository'
import { PETS_MOCK } from './pets.mock'

/** Repositório em memória. Trocar por Firestore/REST = nova classe + novo registro no DI. */
export class MockPetRepository implements PetRepository {
  private pets: Pet[]
  private readonly latencyMs: number

  constructor(seed: Pet[] = PETS_MOCK, latencyMs = 250) {
    this.pets = [...seed]
    this.latencyMs = latencyMs
  }

  async findAll(filter?: PetFilter) {
    await delay(this.latencyMs)
    return this.pets
      .filter((pet) => matchesFilter(pet, filter))
      .sort((a, b) => b.reportedAt.localeCompare(a.reportedAt))
  }

  async findById(id: string) {
    await delay(this.latencyMs)
    return this.pets.find((pet) => pet.id === id) ?? null
  }

  async save(newPet: NewPet) {
    await delay(this.latencyMs)
    const pet: Pet = { ...newPet, id: `p${Date.now()}`, reportedAt: new Date().toISOString() }
    this.pets = [pet, ...this.pets]
    return pet
  }
}
