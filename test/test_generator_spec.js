import { expect } from 'chai'
import generator from '../src/core/generator'
import { noSolution, solutionByFunction } from '../src/core/solutions'

describe.only('Test generator', () => {

  describe('Titles to describe (no solution)', () => {

    const generatorWithOutSolution = model => generator(model, noSolution)

    it('a single title generates a single describe with no content', () => {
      const model = {
        title: 'Lists',
        children: []
      }
      const test = generatorWithOutSolution(model)
      expect(test.title).to.be.equal('Lists')
    })

    it('a title with a nested title generates describe with a nested describe', () => {
      const model = {
        title: 'Lists',
        children: [
          {
            title: 'map()',
            children: []
          }
        ]
      }
      const test = generatorWithOutSolution(model)
      expect(test.suites).not.to.be.equal(undefined)
      expect(test.suites.length).to.be.equal(1)
      expect(test.suites[0].title).to.be.equal('map()')
    })

    it('a title with test, generates a describe() { it }', () => {
      const model = {
        title: 'Sum',
        children: [],
        tests: [
          { code: 'expect(1 + 1).to.be.equal(2)' }
        ]
      }
      const test = generatorWithOutSolution(model)
      expect(test.tests).not.to.be.equal(undefined)
      expect(test.tests.length).to.be.equal(1)
      expect(test.tests[0].type).to.be.equal('test')
      expect(test.tests[0].title).to.be.equal('test #1')
    })

  })

  describe('Tests using solutions', () => {

    it('a test can acccess a solution variable', () => {
      const model = {
        title: 'Sum + 1',
        children: [],
        tests: [
          { code: 'expect(solution(6)).to.be.equal(7)' }
        ]
      }
      const solution = a => a + 1
      const test = generator(model, solutionByFunction(solution))
      expect(test.tests).not.to.be.equal(undefined)
      expect(test.tests.length).to.be.equal(1)
      expect(test.tests[0].type).to.be.equal('test')
      expect(test.tests[0].title).to.be.equal('test #1')
    })

  })

})