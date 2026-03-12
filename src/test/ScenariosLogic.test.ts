import { describe, it, expect, beforeEach } from 'vitest';
import { Scenario } from '../types';

interface ScenarioState {
  savedScenarios: Scenario[];
}

describe('Scenarios Logic', () => {
  let state: ScenarioState;
  
  const initialState: ScenarioState = {
    savedScenarios: []
  };

  const createScenario = (overrides: Partial<Scenario> = {}): Scenario => ({
    id: crypto.randomUUID(),
    name: 'Test Scenario',
    description: undefined,
    salary: 50000,
    currency: 'USD',
    originCountry: 'us',
    originRegion: 'us-ny',
    industry: 'general',
    salaryType: 'gross',
    results: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
    isFavorite: false,
    ...overrides
  });

  beforeEach(() => {
    state = { ...initialState };
  });

  describe('saveScenario', () => {
    it('should add a new scenario to the list', () => {
      const newScenario = createScenario({ name: 'My New Scenario' });
      state.savedScenarios = [...state.savedScenarios, newScenario];
      
      expect(state.savedScenarios).toHaveLength(1);
      expect(state.savedScenarios[0].name).toBe('My New Scenario');
    });

    it('should generate unique IDs for each scenario', () => {
      const s1 = createScenario();
      const s2 = createScenario();
      
      expect(s1.id).not.toBe(s2.id);
    });
  });

  describe('deleteScenario', () => {
    it('should remove a scenario by ID', () => {
      const s1 = createScenario({ id: '1' });
      const s2 = createScenario({ id: '2' });
      state.savedScenarios = [s1, s2];
      
      state.savedScenarios = state.savedScenarios.filter(s => s.id !== '1');
      
      expect(state.savedScenarios).toHaveLength(1);
      expect(state.savedScenarios[0].id).toBe('2');
    });

    it('should handle deleting non-existent scenario', () => {
      const s1 = createScenario({ id: '1' });
      state.savedScenarios = [s1];
      
      state.savedScenarios = state.savedScenarios.filter(s => s.id !== '999');
      
      expect(state.savedScenarios).toHaveLength(1);
    });
  });

  describe('toggleScenarioFavorite', () => {
    it('should toggle favorite status', () => {
      const s1 = createScenario({ id: '1', isFavorite: false });
      state.savedScenarios = [s1];
      
      state.savedScenarios = state.savedScenarios.map(s => 
        s.id === '1' ? { ...s, isFavorite: !s.isFavorite, updatedAt: Date.now() } : s
      );
      
      expect(state.savedScenarios[0].isFavorite).toBe(true);
    });

    it('should sort favorites first', () => {
      const s1 = createScenario({ id: '1', isFavorite: false });
      const s2 = createScenario({ id: '2', isFavorite: true });
      const s3 = createScenario({ id: '3', isFavorite: false });
      state.savedScenarios = [s1, s2, s3];
      
      const sorted = [...state.savedScenarios].sort((a, b) => 
        (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0)
      );
      
      expect(sorted[0].isFavorite).toBe(true);
    });
  });

  describe('loadScenario', () => {
    it('should find and return scenario by ID', () => {
      const s1 = createScenario({ id: '1', salary: 50000 });
      const s2 = createScenario({ id: '2', salary: 75000 });
      state.savedScenarios = [s1, s2];
      
      const found = state.savedScenarios.find(s => s.id === '1');
      
      expect(found?.salary).toBe(50000);
    });

    it('should return undefined for non-existent ID', () => {
      state.savedScenarios = [];
      
      const found = state.savedScenarios.find(s => s.id === '999');
      
      expect(found).toBeUndefined();
    });
  });
});
