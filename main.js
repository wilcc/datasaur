/********************
 * HELPER FUNCTIONS *
 ********************/
const makeDino = function(name,period,diet,extinct=false){
  const newDino = {
    species: name,
    period: period,
    carnivore: diet,
    extinct: extinct
  }
  return newDino
}
const makeSingular = function(fakeDino){
  const dino = makeDino(fakeDino.species,fakeDino.period,fakeDino.carnivore,fakeDino.extinct)
if (dino.species.endsWith('us')){
  dino.species = dino.species.slice(0,dino.species.length-2)
}
return dino
}

const truncateSpecies = function(fakeDino){
  const dino = makeDino(fakeDino.species,fakeDino.period,fakeDino.carnivore,fakeDino.extinct)
if (dino.species.length > 8){
dino.species= dino.species.slice(0,7)+'...'
}
return dino
}

const makeExtinct = function(fakeDino){
  const dino = makeDino(fakeDino.species,fakeDino.period,fakeDino.carnivore,fakeDino.extinct)
dino.extinct = true
return dino
}
const isCarnivore = function(fakeDino){
  const dino = makeDino(fakeDino.species,fakeDino.period,fakeDino.carnivore,fakeDino.extinct)
  return dino.carnivore
}
const isExtinct = function(fakeDino){
  const dino = makeDino(fakeDino.species,fakeDino.period,fakeDino.carnivore,fakeDino.extinct)
  return dino.extinct
}
const isTriassic = function(fakeDino){
  const dino = makeDino(fakeDino.species,fakeDino.period,fakeDino.carnivore,fakeDino.extinct)
  return dino.period === 'Triassic'
}
const isJurassic = function(fakeDino){
  const dino = makeDino(fakeDino.species,fakeDino.period,fakeDino.carnivore,fakeDino.extinct)
  return dino.period === 'Jurassic'
}
const isCretaceous = function(fakeDino){
  const dino = makeDino(fakeDino.species,fakeDino.period,fakeDino.carnivore,fakeDino.extinct)
  return dino.period === 'Cretaceous'
}
const isFirstAlphabeticallyBySpecies = function(x,y){
  return y.species > x.species ? -1 : (y.species < x.species ? 1 : 0)
}
const extinctIsLast = function(x,y){
  return y.extinct > x.extinct ? -1 : (y.extinct < x.extinct ? 1 : 0)
}
const carnivoreIsFirst = function(x,y){
  return y.carnivore < x.carnivore ? -1 : (y.carnivore > x.carnivore ? 1 : 0)
}
const isInPeriodOrder = function(x,y){
  return y.period > x.period ? 1 : (y.period < x.period ? -1 : 0)

}
/***********************
 * ITERATION FUNCTIONS *
 **********************/
const singularizeDinos = function(dino){
  const result = [...dino].map(makeSingular)
  return result
}
const truncateDinos = function(dino){
  const result = [...dino].map(truncateSpecies)
  return result
}
const makeAllExtinct = function(dino){
  const result = [...dino].map(makeExtinct)
  return result
}
const carnivoresOnly = function(dino){
  const result = [...dino].filter(isCarnivore)
  return result
}
const herbivoresOnly = function(dino){
  const result = [...dino].filter(no =>!isCarnivore(no))
  return result
}
const extinctOnly = function(dino){
  const result = [...dino].filter(isExtinct)
  return result
}
const notExtinct= function(dino){
  const result = [...dino].filter(no =>!isExtinct(no))
  return result
}
const triassicOnly = function(dino){
  const result = [...dino].filter(isTriassic)
  return result
}
const notTriassic= function(dino){
  const result = [...dino].filter(no =>!isTriassic(no))
  return result
}
const bySpecies = function(dino){
  const result = [...dino].sort(isFirstAlphabeticallyBySpecies)
  return result
}
const byExtinctLast = function(dino){
  const result = [...dino].sort(extinctIsLast)
  return result
}
const byCarnivoresFirst = function(dino){
  const result = [...dino].sort(carnivoreIsFirst)
  return result
}
const  byPeriod = function(dino){
  const result = [...dino].sort(isInPeriodOrder)
  return result
}
/*********************************
 * TEST SETUP CODE - DON'T TOUCH!*
 ********************************/

  if (typeof makeDino === 'undefined') {
    makeDino = undefined
  }

  if (typeof makeSingular === 'undefined') {
    makeSingular = undefined
  }

  if (typeof truncateSpecies === 'undefined') {
    truncateSpecies = undefined
  }

  if (typeof makeExtinct === 'undefined') {
    makeExtinct = undefined
  }

  if (typeof isCarnivore === 'undefined') {
    isCarnivore = undefined
  }

  if (typeof isExtinct === 'undefined') {
    isExtinct = undefined
  }

  if (typeof isTriassic === 'undefined') {
    isTriassic = undefined
  }

  if (typeof isJurassic === 'undefined') {
    isJurassic = undefined
  }

  if (typeof isCretaceous === 'undefined') {
    isCretaceous = undefined
  }

  if (typeof isFirstAlphabeticallyBySpecies === 'undefined') {
    isFirstAlphabeticallyBySpecies = undefined
  }

  if (typeof extinctIsLast === 'undefined') {
    extinctIsLast = undefined
  }

  if (typeof carnivoreIsFirst === 'undefined') {
    carnivoreIsFirst = undefined
  }

  if (typeof isInPeriodOrder === 'undefined') {
    isInPeriodOrder = undefined
  }

  if (typeof singularizeDinos === 'undefined') {
    singularizeDinos = undefined
  }

  if (typeof truncateDinos === 'undefined') {
    truncateDinos = undefined
  }

  if (typeof makeAllExtinct === 'undefined') {
    makeAllExtinct = undefined
  }

  if (typeof carnivoresOnly === 'undefined') {
    carnivoresOnly = undefined
  }

  if (typeof herbivoresOnly === 'undefined') {
    herbivoresOnly = undefined
  }

  if (typeof extinctOnly === 'undefined') {
    extinctOnly = undefined
  }

  if (typeof notExtinct === 'undefined') {
    notExtinct = undefined
  }

  if (typeof triassicOnly === 'undefined') {
    triassicOnly = undefined
  }

  if (typeof notTriassic === 'undefined') {
    notTriassic = undefined
  }

  if (typeof bySpecies === 'undefined') {
    bySpecies = undefined
  }

  if (typeof byExtinctLast === 'undefined') {
    byExtinctLast = undefined
  }

  if (typeof byCarnivoresFirst === 'undefined') {
    byCarnivoresFirst = undefined
  }

  if (typeof byPeriod === 'undefined') {
    byPeriod = undefined
  }



module.exports = {
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
}
