import { expect } from 'chai'

const pendingSolution = file => {
   const p = () => { throw new Error('Pending ! should not be ran') }
   p.it = (name, fn) => it.skip(`${name} (missing impl: ${file})`, fn)
   return p
}

const fileNotFoundRE = /^Cannot find module/
const excercise = (...path) => {
  try {
    const solution = require(`${__dirname}/../src/${path.join('/')}`)
    solution.it = it
    return solution
  } catch(error) {
    if (fileNotFoundRE.test(error.message)) {
      return pendingSolution(`src/${path.join('/')}`)
    }
    throw error
  }
}

describe('Lists', () => {

  describe('map()', () => {
    
    describe('doubles', () => {
      const solution = excercise('lists', 'map', 'doubles')

      solution.it('returns a list of doubles for three numbers', () => {
        expect(solution([1, 2, 3, 4])).to.deep.equal([2, 4, 6, 8])
      })

    })

  })

})