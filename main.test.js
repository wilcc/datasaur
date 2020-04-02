const {
  makeDino,
  makeSingular,
  truncateSpecies,
  makeExtinct,
  isCarnivore,
  isExtinct,
  isTriassic,
  isJurassic,
  isCretaceous,
  isFirstAlphabeticallyBySpecies,
  extinctIsLast,
  carnivoreIsFirst,
  isInPeriodOrder,
  singularizeDinos,
  truncateDinos,
  makeAllExtinct,
  carnivoresOnly,
  herbivoresOnly,
  extinctOnly,
  notExtinct,
  triassicOnly,
  notTriassic,
  bySpecies,
  byExtinctLast,
  byCarnivoresFirst,
  byPeriod,
} = require('./main.js')

const dinos = require('./dinos.js');

let originalDinos = [];

beforeEach(() => {
  originalDinos = [
    {
      species: 'Archaeopteryx',
      period: 'Jurassic',
      carnivore: true,
      extinct: false
    },
    {
      species: 'Eoraptor',
      period: 'Triassic',
      carnivore: true,
      extinct: false
    },
    {
      species: 'Brachiosaurus',
      period: 'Jurassic',
      carnivore: false,
      extinct: true
    },
    {
      species: 'Herrerasaurus',
      period: 'Triassic',
      carnivore: false,
      extinct: false
    },
    {
      species: 'T-Rex',
      period: 'Cretaceous',
      carnivore: true,
      extinct: true
    },
    {
      species: 'Styracosaurus',
      period: 'Cretaceous',
      carnivore: false,
      extinct: true
    },
  ]
})


describe('makeDino', () => {
  it(`given a species name, a period, and a diet, returns a dinosaur object with those values, as well as a default status of 'not extinct'`, () => {
    const expectedDino = {
      species: 'Eoraptor',
      period: 'Triassic',
      carnivore: true,
      extinct: false
    }

    expect(makeDino('Eoraptor', 'Triassic', true)).toEqual(expectedDino)
  });

  it(`allows us to create a dinosaur with status extinct`, () => {
    const expectedDino = {
      species: 'Brachiosaurus',
      period: 'Jurassic',
      carnivore: false,
      extinct: true
    }

    expect(makeDino('Brachiosaurus', 'Jurassic', false, true)).toEqual(expectedDino)
  })
})

describe('makeSingular', () => {
  it(`given a dinosaur object, returns a new dinosaur object with the "us" suffix removed from its species`, () => {
    const dino = {
      species: 'Brachiosaurus',
      period: 'Jurassic',
      carnivore: false,
      extinct: true
    };

    const expectedDino = {
      species: 'Brachiosaur',
      period: 'Jurassic',
      carnivore: false,
      extinct: true
    };

    expect(makeSingular(dino)).toEqual(expectedDino)
  })

  it(`returns the dinosaur species intact if it does not end with 'us'`, () => {
    const dino = {
      species: 'Eoraptor',
      period: 'Triassic',
      carnivore: true,
      extinct: false
    }

    expect(makeSingular(dino)).toEqual(dino)
  })

  it(`does not mutate the original dinosaur object`, () => {
    const dinoTemplate = {
      species: 'Brachiosaurus',
      period: 'Jurassic',
      carnivore: false,
      extinct: true
    };

    const dino = {
      species: 'Brachiosaurus',
      period: 'Jurassic',
      carnivore: false,
      extinct: true
    };

    makeSingular(dino);
    expect(dino).toEqual(dinoTemplate);
  })
})

describe('truncateSpecies', () => {
  it(`returns a new dinosaur with its species truncated to 7 characters`, () => {
    const dino = {
      species: 'Brachiosaurus',
      period: 'Jurassic',
      carnivore: false,
      extinct: true
    };

    const truncatedDino = {
      species: 'Brachio...',
      period: 'Jurassic',
      carnivore: false,
      extinct: true
    };
    expect(truncateSpecies(dino)).toEqual(truncatedDino);
  })

  it(`returns the dinosaur unchanged if its species name length is 10 or less`, () => {
    const dino = {
      species: 'T-Rex',
      period: 'Cretaceous',
      carnivore: true,
      extinct: true
    };
    
    expect(truncateSpecies(dino)).toEqual(dino);
  })

  it(`does not mutate the original object`, () => {
    const dinoTemplate = {
      species: 'T-Rex',
      period: 'Cretaceous',
      carnivore: true,
      extinct: true
    };

    const dino = {
      species: 'T-Rex',
      period: 'Cretaceous',
      carnivore: true,
      extinct: true
    };

    truncateSpecies(dino)
    
    expect(dino).toEqual(dinoTemplate);
  })
})

describe('makeExtinct', () => {
  it(`returns a new dinosaur with its extinct set to true`, () => {
    const dino = {
      species: 'Brachiosaurus',
      period: 'Jurassic',
      carnivore: false,
      extinct: false
    };

    const extinctDino = {
      species: 'Brachiosaurus',
      period: 'Jurassic',
      carnivore: false,
      extinct: true
    };
    expect(makeExtinct(dino)).toEqual(extinctDino);
  })

  it(`does not mutate the original object`, () => {
    const dinoTemplate = {
      species: 'T-Rex',
      period: 'Cretaceous',
      carnivore: true,
      extinct: true
    };

    const dino = {
      species: 'T-Rex',
      period: 'Cretaceous',
      carnivore: true,
      extinct: true
    };

    makeExtinct(dino)
    
    expect(dino).toEqual(dinoTemplate);
  })
})

describe('isCarnivore', () => {
  it(`returns whether the given dinosaur is a carnivore`, () => {
    const dino1 = {
      species: 'T-Rex',
      period: 'Cretaceous',
      carnivore: true,
      extinct: true
    };

    const dino2 = {
      species: 'Brachiosaurus',
      period: 'Jurassic',
      carnivore: false,
      extinct: false
    };

    expect(isCarnivore(dino1)).toBe(true)
    expect(isCarnivore(dino2)).toBe(false);
  })
})

describe('isExtinct', () => {
  it(`returns whether the given dinosaur is extinct`, () => {
    const dino1 = {
      species: 'T-Rex',
      period: 'Cretaceous',
      carnivore: true,
      extinct: true
    };

    const dino2 = {
      species: 'Brachiosaurus',
      period: 'Jurassic',
      carnivore: false,
      extinct: false
    };

    expect(isExtinct(dino1)).toBe(true)
    expect(isExtinct(dino2)).toBe(false);
  })
})

describe('isTriassic', () => {
  it(`returns whether the given dinosaur is from the Triassic period`, () => {
    const dino1 = {
      species: 'T-Rex',
      period: 'Cretaceous',
      carnivore: true,
      extinct: true
    };

    const dino2 = {
      species: 'Brachiosaurus',
      period: 'Jurassic',
      carnivore: false,
      extinct: false
    };

    const dino3 = {
      species: 'Eoraptor',
      period: 'Triassic',
      carnivore: true,
      extinct: false
    }

    expect(isTriassic(dino1)).toBe(false)
    expect(isTriassic(dino2)).toBe(false);
    expect(isTriassic(dino3)).toBe(true);
  })
})

describe('isJurassic', () => {
  it(`returns whether the given dinosaur is from the Jurassic period`, () => {
    const dino1 = {
      species: 'T-Rex',
      period: 'Cretaceous',
      carnivore: true,
      extinct: true
    };

    const dino2 = {
      species: 'Brachiosaurus',
      period: 'Jurassic',
      carnivore: false,
      extinct: false
    };

    const dino3 = {
      species: 'Eoraptor',
      period: 'Triassic',
      carnivore: true,
      extinct: false
    }

    expect(isJurassic(dino1)).toBe(false)
    expect(isJurassic(dino2)).toBe(true);
    expect(isJurassic(dino3)).toBe(false);
  })
})

describe('isCretaceous', () => {
  it(`returns whether the given dinosaur is from the Cretaceous period`, () => {
    const dino1 = {
      species: 'T-Rex',
      period: 'Cretaceous',
      carnivore: true,
      extinct: true
    };

    const dino2 = {
      species: 'Brachiosaurus',
      period: 'Jurassic',
      carnivore: false,
      extinct: false
    };

    const dino3 = {
      species: 'Eoraptor',
      period: 'Triassic',
      carnivore: true,
      extinct: false
    }

    expect(isCretaceous(dino1)).toBe(true)
    expect(isCretaceous(dino2)).toBe(false);
    expect(isCretaceous(dino3)).toBe(false);
  })
})

describe('isFirstAlphabeticallyBySpecies', () => {
  it(`returns a positive number if the second species is first alphabetically`, () => {
    const dino1 = {
      species: 'T-Rex',
      period: 'Cretaceous',
      carnivore: true,
      extinct: true
    };

    const dino2 = {
      species: 'Brachiosaurus',
      period: 'Jurassic',
      carnivore: false,
      extinct: false
    };

    const dino3 = {
      species: 'Eoraptor',
      period: 'Triassic',
      carnivore: true,
      extinct: false
    }

    expect(isFirstAlphabeticallyBySpecies(dino1, dino2) > 0).toBe(true)
    expect(isFirstAlphabeticallyBySpecies(dino3, dino2) > 0).toBe(true)
  })

  it(`returns a negative number if the first species is first alphabetically`, () => {
    const dino1 = {
      species: 'T-Rex',
      period: 'Cretaceous',
      carnivore: true,
      extinct: true
    };

    const dino2 = {
      species: 'Brachiosaurus',
      period: 'Jurassic',
      carnivore: false,
      extinct: false
    };

    const dino3 = {
      species: 'Eoraptor',
      period: 'Triassic',
      carnivore: true,
      extinct: false
    }

    expect(isFirstAlphabeticallyBySpecies(dino2, dino3) < 0).toBe(true)
    expect(isFirstAlphabeticallyBySpecies(dino3, dino1) < 0).toBe(true)
  })

  it(`returns 0 if the species are the same`, () => {
    const dino1 = {
      species: 'T-Rex',
      period: 'Cretaceous',
      carnivore: true,
      extinct: true
    };

    const dino2 = {
      species: 'Brachiosaurus',
      period: 'Jurassic',
      carnivore: false,
      extinct: false
    };

    const dino3 = {
      species: 'Eoraptor',
      period: 'Triassic',
      carnivore: true,
      extinct: false
    }

    expect(isFirstAlphabeticallyBySpecies(dino1, dino1)).toBe(0)
    expect(isFirstAlphabeticallyBySpecies(dino2, dino2)).toBe(0)
  })
})

describe('extinctIsLast', () => {
  it(`returns a positive number if the first dino is extinct and the second isn't`, () => {
    const dino1 = {
      species: 'T-Rex',
      period: 'Cretaceous',
      carnivore: true,
      extinct: true
    };

    const dino2 = {
      species: 'Brachiosaurus',
      period: 'Jurassic',
      carnivore: false,
      extinct: false
    };

    const dino3 = {
      species: 'Eoraptor',
      period: 'Triassic',
      carnivore: true,
      extinct: false
    }

    const dino4 = {
      species: 'Eoraptor',
      period: 'Triassic',
      carnivore: true,
      extinct: true,
    }

    expect(extinctIsLast(dino1, dino2) > 0).toBe(true)
    expect(extinctIsLast(dino4, dino3) > 0).toBe(true)
  })

  it(`returns a negative number if the first dino isn't extinct and the second is`, () => {
    const dino1 = {
      species: 'T-Rex',
      period: 'Cretaceous',
      carnivore: true,
      extinct: true
    };

    const dino2 = {
      species: 'Brachiosaurus',
      period: 'Jurassic',
      carnivore: false,
      extinct: false
    };

    const dino3 = {
      species: 'Eoraptor',
      period: 'Triassic',
      carnivore: true,
      extinct: false
    }

    const dino4 = {
      species: 'Eoraptor',
      period: 'Triassic',
      carnivore: true,
      extinct: true,
    }

    expect(extinctIsLast(dino2, dino1) < 0).toBe(true)
    expect(extinctIsLast(dino3, dino1) < 0).toBe(true)
  })

  it(`returns 0 if the extinction statuses are the same`, () => {
    const dino1 = {
      species: 'T-Rex',
      period: 'Cretaceous',
      carnivore: true,
      extinct: true
    };

    const dino2 = {
      species: 'Brachiosaurus',
      period: 'Jurassic',
      carnivore: false,
      extinct: false
    };

    const dino3 = {
      species: 'Eoraptor',
      period: 'Triassic',
      carnivore: true,
      extinct: false
    }

    expect(extinctIsLast(dino1, dino1)).toBe(0)
    expect(extinctIsLast(dino3, dino2)).toBe(0)
  })
})

describe('carnivoreIsFirst', () => {
  it(`returns a positive number if the first dino is an herbivore and the second is a carnivore.`, () => {
    const dino1 = {
      species: 'T-Rex',
      period: 'Cretaceous',
      carnivore: true,
      extinct: true
    };

    const dino2 = {
      species: 'Brachiosaurus',
      period: 'Jurassic',
      carnivore: false,
      extinct: false
    };

    const dino3 = {
      species: 'Eoraptor',
      period: 'Triassic',
      carnivore: true,
      extinct: false
    }

    const dino4 = {
      species: 'Eoraptor',
      period: 'Triassic',
      carnivore: false,
      extinct: true,
    }

    expect(carnivoreIsFirst(dino2, dino1) > 0).toBe(true)
    expect(carnivoreIsFirst(dino4, dino3) > 0).toBe(true)
  })

  it(`returns a negative number if the first dino is a carnivore and the second is a herbivore.`, () => {
    const dino1 = {
      species: 'T-Rex',
      period: 'Cretaceous',
      carnivore: true,
      extinct: true
    };

    const dino2 = {
      species: 'Brachiosaurus',
      period: 'Jurassic',
      carnivore: false,
      extinct: false
    };

    const dino3 = {
      species: 'Eoraptor',
      period: 'Triassic',
      carnivore: true,
      extinct: false
    }

    const dino4 = {
      species: 'Eoraptor',
      period: 'Triassic',
      carnivore: false,
      extinct: true,
    }

    expect(carnivoreIsFirst(dino1, dino2) < 0).toBe(true)
    expect(carnivoreIsFirst(dino3, dino4) < 0).toBe(true)
  })

  it(`returns 0 if the diets are the same`, () => {
    const dino1 = {
      species: 'T-Rex',
      period: 'Cretaceous',
      carnivore: true,
      extinct: true
    };

    const dino2 = {
      species: 'Brachiosaurus',
      period: 'Jurassic',
      carnivore: false,
      extinct: false
    };

    const dino3 = {
      species: 'Eoraptor',
      period: 'Triassic',
      carnivore: true,
      extinct: false
    }

    const dino4 = {
      species: 'Eoraptor',
      period: 'Triassic',
      carnivore: false,
      extinct: true,
    }

    expect(carnivoreIsFirst(dino1, dino3)).toBe(0)
    expect(carnivoreIsFirst(dino4, dino2)).toBe(0)
  })
})

// Note: the period order is:
// Triassic, THEN
// Jurassic, THEN
// Creataceous.
// TIL dinosaur eras.
// yw
describe('isInPeriodOrder', () => {
  it(`returns a positive number if the first dino is from the Jurassic and the second is from the Triassic.`, () => {
    const dino1 = {
      species: 'T-Rex',
      period: 'Triassic',
      carnivore: true,
      extinct: true
    };

    const dino2 = {
      species: 'Brachiosaurus',
      period: 'Jurassic',
      carnivore: false,
      extinct: false
    };

    const dino3 = {
      species: 'Eoraptor',
      period: 'Jurassic',
      carnivore: true,
      extinct: false
    }

    const dino4 = {
      species: 'Eoraptor',
      period: 'Triassic',
      carnivore: false,
      extinct: true,
    }

    expect(isInPeriodOrder(dino2, dino1) > 0).toBe(true)
    expect(isInPeriodOrder(dino3, dino4) > 0).toBe(true)
  })

  it(`returns a positive number if the first dino is from the Cretaceous and the second is from the Triassic.`, () => {
    const dino1 = {
      species: 'T-Rex',
      period: 'Cretaceous',
      carnivore: true,
      extinct: true
    };

    const dino2 = {
      species: 'Brachiosaurus',
      period: 'Triassic',
      carnivore: false,
      extinct: false
    };

    const dino3 = {
      species: 'Eoraptor',
      period: 'Triassic',
      carnivore: true,
      extinct: false
    }

    const dino4 = {
      species: 'Eoraptor',
      period: 'Cretaceous',
      carnivore: false,
      extinct: true,
    }

    expect(isInPeriodOrder(dino1, dino2) > 0).toBe(true)
    expect(isInPeriodOrder(dino4, dino3) > 0).toBe(true)
  })

  it(`returns a positive number if the first dino is from the Cretaceous and the second is from the Jurassic.`, () => {
    const dino1 = {
      species: 'T-Rex',
      period: 'Cretaceous',
      carnivore: true,
      extinct: true
    };

    const dino2 = {
      species: 'Brachiosaurus',
      period: 'Jurassic',
      carnivore: false,
      extinct: false
    };

    const dino3 = {
      species: 'Eoraptor',
      period: 'Jurassic',
      carnivore: true,
      extinct: false
    }

    const dino4 = {
      species: 'Eoraptor',
      period: 'Cretaceous',
      carnivore: false,
      extinct: true,
    }

    expect(isInPeriodOrder(dino1, dino2) > 0).toBe(true)
    expect(isInPeriodOrder(dino4, dino3) > 0).toBe(true)
  })

  it(`returns a negative number if the first dino is from the Jurassic and the second is from the Cretaceous.`, () => {
    const dino1 = {
      species: 'T-Rex',
      period: 'Cretaceous',
      carnivore: true,
      extinct: true
    };

    const dino2 = {
      species: 'Brachiosaurus',
      period: 'Jurassic',
      carnivore: false,
      extinct: false
    };

    const dino3 = {
      species: 'Eoraptor',
      period: 'Jurassic',
      carnivore: true,
      extinct: false
    }

    const dino4 = {
      species: 'Eoraptor',
      period: 'Cretaceous',
      carnivore: false,
      extinct: true,
    }

    expect(isInPeriodOrder(dino2, dino1) < 0).toBe(true)
    expect(isInPeriodOrder(dino3, dino4) < 0).toBe(true)
  })

  it(`returns a negative number if the first dino is from the Triassic and the second is from the Cretaceous.`, () => {
    const dino1 = {
      species: 'T-Rex',
      period: 'Triassic',
      carnivore: true,
      extinct: true
    };

    const dino2 = {
      species: 'Brachiosaurus',
      period: 'Cretaceous',
      carnivore: false,
      extinct: false
    };

    const dino3 = {
      species: 'Eoraptor',
      period: 'Cretaceous',
      carnivore: true,
      extinct: false
    }

    const dino4 = {
      species: 'Eoraptor',
      period: 'Triassic',
      carnivore: false,
      extinct: true,
    }

    expect(isInPeriodOrder(dino1, dino2) < 0).toBe(true)
    expect(isInPeriodOrder(dino4, dino3) < 0).toBe(true)
  })

  it(`returns a negative number if the first dino is from the Triassic and the second is from the Jurassic.`, () => {
    const dino1 = {
      species: 'T-Rex',
      period: 'Triassic',
      carnivore: true,
      extinct: true
    };

    const dino2 = {
      species: 'Brachiosaurus',
      period: 'Jurassic',
      carnivore: false,
      extinct: false
    };

    const dino3 = {
      species: 'Eoraptor',
      period: 'Jurassic',
      carnivore: true,
      extinct: false
    }

    const dino4 = {
      species: 'Eoraptor',
      period: 'Triassic',
      carnivore: false,
      extinct: true,
    }

    expect(isInPeriodOrder(dino1, dino2) < 0).toBe(true)
    expect(isInPeriodOrder(dino4, dino3) < 0).toBe(true)
  })

  it(`returns 0 if the diets are the same`, () => {
    const dino1 = {
      species: 'T-Rex',
      period: 'Cretaceous',
      carnivore: true,
      extinct: true
    };

    const dino2 = {
      species: 'Brachiosaurus',
      period: 'Jurassic',
      carnivore: false,
      extinct: false
    };

    const dino3 = {
      species: 'Eoraptor',
      period: 'Triassic',
      carnivore: true,
      extinct: false
    }

    const dino4 = {
      species: 'Eoraptor',
      period: 'Triassic',
      carnivore: false,
      extinct: true,
    }

    expect(isInPeriodOrder(dino1, dino1)).toBe(0)
    expect(isInPeriodOrder(dino2, dino2)).toBe(0)
    expect(isInPeriodOrder(dino3, dino4)).toBe(0)
  })
})

describe('singularizeDinos',() => {
  it(`returns an array of all dinos where the dinos have had their names made singular`, () => {
    const singularDinos = [
      {
        species: 'Archaeopteryx',
        period: 'Jurassic',
        carnivore: true,
        extinct: false
      },
      {
        species: 'Eoraptor',
        period: 'Triassic',
        carnivore: true,
        extinct: false
      },
      {
        species: 'Brachiosaur',
        period: 'Jurassic',
        carnivore: false,
        extinct: true
      },
      {
        species: 'Herrerasaur',
        period: 'Triassic',
        carnivore: false,
        extinct: false
      },
      {
        species: 'T-Rex',
        period: 'Cretaceous',
        carnivore: true,
        extinct: true
      },
      {
        species: 'Styracosaur',
        period: 'Cretaceous',
        carnivore: false,
        extinct: true
      },
    ]

    expect(singularizeDinos(dinos)).toEqual(singularDinos);
  })

  it(`doesn't mutate the original array`, () => {
    singularizeDinos(dinos);
    expect(dinos).toEqual(originalDinos);
  })
})

describe('truncateDinos',() => {
  it(`returns an array of all dinos where the dinos have had their names truncated`, () => {
    const truncatedDinos = [
      {
        species: 'Archaeo...',
        period: 'Jurassic',
        carnivore: true,
        extinct: false
      },
      {
        species: 'Eoraptor',
        period: 'Triassic',
        carnivore: true,
        extinct: false
      },
      {
        species: 'Brachio...',
        period: 'Jurassic',
        carnivore: false,
        extinct: true
      },
      {
        species: 'Herrera...',
        period: 'Triassic',
        carnivore: false,
        extinct: false
      },
      {
        species: 'T-Rex',
        period: 'Cretaceous',
        carnivore: true,
        extinct: true
      },
      {
        species: 'Styraco...',
        period: 'Cretaceous',
        carnivore: false,
        extinct: true
      },
    ]

    expect(truncateDinos(dinos)).toEqual(truncatedDinos);
  })

  it(`doesn't mutate the original array`, () => {
    truncateDinos(dinos);
    expect(dinos).toEqual(originalDinos);
  })
})

describe('makeAllExtinct',() => {
  it(`returns an array of all dinos where the dinos have all been made extinct`, () => {
    const extinctDinos = [
    {
      species: 'Archaeopteryx',
      period: 'Jurassic',
      carnivore: true,
      extinct: true
    },
    {
      species: 'Eoraptor',
      period: 'Triassic',
      carnivore: true,
      extinct: true
    },
    {
      species: 'Brachiosaurus',
      period: 'Jurassic',
      carnivore: false,
      extinct: true
    },
    {
      species: 'Herrerasaurus',
      period: 'Triassic',
      carnivore: false,
      extinct: true
    },
    {
      species: 'T-Rex',
      period: 'Cretaceous',
      carnivore: true,
      extinct: true
    },
    {
      species: 'Styracosaurus',
      period: 'Cretaceous',
      carnivore: false,
      extinct: true
    },
  ]

    expect(makeAllExtinct(dinos)).toEqual(extinctDinos);
  })

  it(`doesn't mutate the original array`, () => {
    makeAllExtinct(dinos);
    expect(dinos).toEqual(originalDinos);
  })
})

describe('carnivoresOnly',() => {
  it(`returns an array of only the carnivorous `, () => {
    const carnivores = [
  {
    species: 'Archaeopteryx',
    period: 'Jurassic',
    carnivore: true,
    extinct: false
  },
  {
    species: 'Eoraptor',
    period: 'Triassic',
    carnivore: true,
    extinct: false
  },
  {
    species: 'T-Rex',
    period: 'Cretaceous',
    carnivore: true,
    extinct: true
  },
]

    expect(carnivoresOnly(dinos)).toEqual(carnivores);
  })

  it(`doesn't mutate the original array`, () => {
    carnivoresOnly(dinos);
    expect(dinos).toEqual(originalDinos);
  })
})

describe('herbivoresOnly',() => {
  it(`returns an array of only the herbivorous`, () => {
    const herbivores = [
      {
        species: 'Brachiosaurus',
        period: 'Jurassic',
        carnivore: false,
        extinct: true
      },
      {
        species: 'Herrerasaurus',
        period: 'Triassic',
        carnivore: false,
        extinct: false
      },
      {
        species: 'Styracosaurus',
        period: 'Cretaceous',
        carnivore: false,
        extinct: true
      },
    ]

    expect(herbivoresOnly(dinos)).toEqual(herbivores);
  })

  it(`doesn't mutate the original array`, () => {
    herbivoresOnly(dinos);
    expect(dinos).toEqual(originalDinos);
  })
})

describe('extinctOnly',() => {
  it(`returns an array of only extinct dinosaurs`, () => {
    const extinct = [
      {
        species: 'Brachiosaurus',
        period: 'Jurassic',
        carnivore: false,
        extinct: true
      },
      {
        species: 'T-Rex',
        period: 'Cretaceous',
        carnivore: true,
        extinct: true
      },
      {
        species: 'Styracosaurus',
        period: 'Cretaceous',
        carnivore: false,
        extinct: true
      },
    ]

    expect(extinctOnly(dinos)).toEqual(extinct);
  })

  it(`doesn't mutate the original array`, () => {
    extinctOnly(dinos);
    expect(dinos).toEqual(originalDinos);
  })
})

describe('notExtinct',() => {
  it(`returns an array of only extinct dinosaurs`, () => {
    const stillAlive = [
      {
        species: 'Archaeopteryx',
        period: 'Jurassic',
        carnivore: true,
        extinct: false
      },
      {
        species: 'Eoraptor',
        period: 'Triassic',
        carnivore: true,
        extinct: false
      },
      {
        species: 'Herrerasaurus',
        period: 'Triassic',
        carnivore: false,
        extinct: false
      },
    ]

    expect(notExtinct(dinos)).toEqual(stillAlive);
  })

  it(`doesn't mutate the original array`, () => {
    notExtinct(dinos);
    expect(dinos).toEqual(originalDinos);
  })
})

describe('triassicOnly',() => {
  it(`returns an array of only Triassic dinosaurs`, () => {
    const triassic = [
      {
        species: 'Eoraptor',
        period: 'Triassic',
        carnivore: true,
        extinct: false
      },
      {
        species: 'Herrerasaurus',
        period: 'Triassic',
        carnivore: false,
        extinct: false
      },
    ]

    expect(triassicOnly(dinos)).toEqual(triassic);
  })

  it(`doesn't mutate the original array`, () => {
    triassicOnly(dinos);
    expect(dinos).toEqual(originalDinos);
  })
})

describe('notTriassic',() => {
  it(`returns an array of only extinct dinosaurs`, () => {
    const jurassicOrCretaceous = [
      {
        species: 'Archaeopteryx',
        period: 'Jurassic',
        carnivore: true,
        extinct: false
      },
      {
        species: 'Brachiosaurus',
        period: 'Jurassic',
        carnivore: false,
        extinct: true
      },
      {
        species: 'T-Rex',
        period: 'Cretaceous',
        carnivore: true,
        extinct: true
      },
      {
        species: 'Styracosaurus',
        period: 'Cretaceous',
        carnivore: false,
        extinct: true
      },
    ]

    expect(notTriassic(dinos)).toEqual(jurassicOrCretaceous);
  })

  it(`doesn't mutate the original array`, () => {
    notTriassic(dinos);
    expect(dinos).toEqual(originalDinos);
  })
})

describe('bySpecies', () => {
  it(`sorts dinosaurs alphabetically by species name`, () => {
    const dinos1 = [
      {
        species: 'T-Rex',
        period: 'Cretaceous',
        carnivore: true,
        extinct: true
      },

      {
        species: 'Brachiosaurus',
        period: 'Jurassic',
        carnivore: false,
        extinct: false
      },

      {
        species: 'Eoraptor',
        period: 'Triassic',
        carnivore: true,
        extinct: false
      }
    ]

    const sortedDinos1 = [
      {
        species: 'Brachiosaurus',
        period: 'Jurassic',
        carnivore: false,
        extinct: false
      },

      {
        species: 'Eoraptor',
        period: 'Triassic',
        carnivore: true,
        extinct: false
      },

      {
        species: 'T-Rex',
        period: 'Cretaceous',
        carnivore: true,
        extinct: true
      },
    ]

    const dinos2 = [
      {
        species: 'Pterosaur',
        period: 'Cretaceous',
        carnivore: true,
        extinct: true
      },

      {
        species: 'Pterodactyl',
        period: 'Jurassic',
        carnivore: false,
        extinct: false
      },

      {
        species: 'Allosaur',
        period: 'Triassic',
        carnivore: true,
        extinct: false
      }
    ]

    const sortedDinos2 = [
      {
        species: 'Allosaur',
        period: 'Triassic',
        carnivore: true,
        extinct: false
      },
      {
        species: 'Pterodactyl',
        period: 'Jurassic',
        carnivore: false,
        extinct: false
      },
      {
        species: 'Pterosaur',
        period: 'Cretaceous',
        carnivore: true,
        extinct: true
      },
    ]

    expect(bySpecies(dinos1)).toEqual(sortedDinos1)
    expect(bySpecies(dinos2)).toEqual(sortedDinos2)
  })

  it(`doesn't mutate the original array`, () => {
    bySpecies(dinos);
    expect(dinos).toEqual(originalDinos);
  })
})

describe('byExtinctLast', () => {
  it(`sorts dinosaurs by extinct dinosaurs after non-extinct`, () => {
    const dinos1 = [
      {
        species: 'T-Rex',
        period: 'Cretaceous',
        carnivore: true,
        extinct: true
      },

      {
        species: 'Brachiosaurus',
        period: 'Jurassic',
        carnivore: false,
        extinct: false
      },

      {
        species: 'Eoraptor',
        period: 'Triassic',
        carnivore: true,
        extinct: false
      }
    ]

    const sortedDinos1 = [
      {
        species: 'Brachiosaurus',
        period: 'Jurassic',
        carnivore: false,
        extinct: false
      },

      {
        species: 'Eoraptor',
        period: 'Triassic',
        carnivore: true,
        extinct: false
      },

      {
        species: 'T-Rex',
        period: 'Cretaceous',
        carnivore: true,
        extinct: true
      },
    ]

    const dinos2 = [
      {
        species: 'Pterosaur',
        period: 'Cretaceous',
        carnivore: true,
        extinct: true
      },

      {
        species: 'Pterodactyl',
        period: 'Jurassic',
        carnivore: false,
        extinct: false
      },

      {
        species: 'Allosaur',
        period: 'Triassic',
        carnivore: true,
        extinct: false
      }
    ]

    const sortedDinos2 = [
      {
        species: 'Pterodactyl',
        period: 'Jurassic',
        carnivore: false,
        extinct: false
      },
      {
        species: 'Allosaur',
        period: 'Triassic',
        carnivore: true,
        extinct: false
      },
      {
        species: 'Pterosaur',
        period: 'Cretaceous',
        carnivore: true,
        extinct: true
      },
    ]

    expect(byExtinctLast(dinos1)).toEqual(sortedDinos1)
    expect(byExtinctLast(dinos2)).toEqual(sortedDinos2)
  })

  it(`doesn't mutate the original array`, () => {
    byExtinctLast(dinos);
    expect(dinos).toEqual(originalDinos);
  })
})

describe('byCarnivoresFirst', () => {
  it(`sorts dinosaurs by extinct dinosaurs after non-extinct`, () => {
    const dinos1 = [
      {
        species: 'T-Rex',
        period: 'Cretaceous',
        carnivore: true,
        extinct: true
      },

      {
        species: 'Brachiosaurus',
        period: 'Jurassic',
        carnivore: false,
        extinct: false
      },

      {
        species: 'Eoraptor',
        period: 'Triassic',
        carnivore: true,
        extinct: true
      },

      {
        species: 'Eoraptor',
        period: 'Triassic',
        carnivore: false,
        extinct: false
      }
    ]

    const sortedDinos1 = [
      {
        species: 'T-Rex',
        period: 'Cretaceous',
        carnivore: true,
        extinct: true
      },

      {
        species: 'Eoraptor',
        period: 'Triassic',
        carnivore: true,
        extinct: true
      },

      {
        species: 'Brachiosaurus',
        period: 'Jurassic',
        carnivore: false,
        extinct: false
      },

      {
        species: 'Eoraptor',
        period: 'Triassic',
        carnivore: false,
        extinct: false
      }
    ]

    const dinos2 = [
      {
        species: 'Pterosaur',
        period: 'Cretaceous',
        carnivore: true,
        extinct: true
      },

      {
        species: 'Pterodactyl',
        period: 'Jurassic',
        carnivore: false,
        extinct: false
      },

      {
        species: 'Pterodactyl',
        period: 'Jurassic',
        carnivore: false,
        extinct: false
      },

      {
        species: 'Allosaur',
        period: 'Triassic',
        carnivore: true,
        extinct: false
      }
    ]

    const sortedDinos2 = [
      {
        species: 'Pterosaur',
        period: 'Cretaceous',
        carnivore: true,
        extinct: true
      },

      {
        species: 'Allosaur',
        period: 'Triassic',
        carnivore: true,
        extinct: false
      },

      {
        species: 'Pterodactyl',
        period: 'Jurassic',
        carnivore: false,
        extinct: false
      },

      {
        species: 'Pterodactyl',
        period: 'Jurassic',
        carnivore: false,
        extinct: false
      },
    ]

    expect(byCarnivoresFirst(dinos1)).toEqual(sortedDinos1)
    expect(byCarnivoresFirst(dinos2)).toEqual(sortedDinos2)
  })

  it(`doesn't mutate the original array`, () => {
    byCarnivoresFirst(dinos);
    expect(dinos).toEqual(originalDinos);
  })
})

// Again: the period order is:
// Triassic, THEN
// Jurassic, THEN
// Creataceous.
describe('byPeriod', () => {
  it(`sorts dinosaurs by period`, () => {
    const dinos1 = [
      {
        species: 'T-Rex',
        period: 'Cretaceous',
        carnivore: true,
        extinct: true
      },

      {
        species: 'Brachiosaurus',
        period: 'Jurassic',
        carnivore: false,
        extinct: false
      },

      {
        species: 'Eoraptor',
        period: 'Triassic',
        carnivore: true,
        extinct: true
      },

      {
        species: 'Eoraptor',
        period: 'Triassic',
        carnivore: false,
        extinct: false
      }
    ]

    const sortedDinos1 = [
      {
        species: 'Eoraptor',
        period: 'Triassic',
        carnivore: true,
        extinct: true
      },

      {
        species: 'Eoraptor',
        period: 'Triassic',
        carnivore: false,
        extinct: false
      },

      {
        species: 'Brachiosaurus',
        period: 'Jurassic',
        carnivore: false,
        extinct: false
      },

      {
        species: 'T-Rex',
        period: 'Cretaceous',
        carnivore: true,
        extinct: true
      },

    ]

    const dinos2 = [
      {
        species: 'Pterosaur',
        period: 'Cretaceous',
        carnivore: true,
        extinct: true
      },

      {
        species: 'Pterodactyl',
        period: 'Jurassic',
        carnivore: true,
        extinct: false
      },

      {
        species: 'Pterodactyl',
        period: 'Jurassic',
        carnivore: false,
        extinct: false
      },

      {
        species: 'Allosaur',
        period: 'Triassic',
        carnivore: true,
        extinct: false
      }
    ]

    const sortedDinos2 = [
      {
        species: 'Allosaur',
        period: 'Triassic',
        carnivore: true,
        extinct: false
      },

      {
        species: 'Pterodactyl',
        period: 'Jurassic',
        carnivore: true,
        extinct: false
      },

      {
        species: 'Pterodactyl',
        period: 'Jurassic',
        carnivore: false,
        extinct: false
      },

      {
        species: 'Pterosaur',
        period: 'Cretaceous',
        carnivore: true,
        extinct: true
      },

    ]

    expect(byPeriod(dinos1)).toEqual(sortedDinos1)
    expect(byPeriod(dinos2)).toEqual(sortedDinos2)
  })

  it(`doesn't mutate the original array`, () => {
    byPeriod(dinos);
    expect(dinos).toEqual(originalDinos);
  })
})
