import chai, { expect } from 'chai'
import excersiceParser from '../../src/core/parser'
import generator from '../../src/core/generator'
import { solutionByFunction } from '../../src/core/solutions'

chai.config.truncateThreshold = 0

describe('Parsing and generating', () => {

  it('should correctly execute a sum 2 test', () => {
    const content = 
`
# Plus 2

Write a function that given an input number it returns that number plus 2
\`\`\`js
expect(solution(3)).to.deep.equal(5)
\`\`\`
`
    const solution = a => a + 2
    generator(excersiceParser(content), solutionByFunction(solution))
  })

})