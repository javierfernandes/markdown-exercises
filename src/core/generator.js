import chai from 'chai'
import winston from 'winston'
import { solutionResolverByFile } from './solutions'

const processTest = (path, solutionResolver) => (test, i) => {
  winston.log('debug', 'Processing test with path', path, 'and solution resolver', solutionResolver);
  const solution = solutionResolver(path)
  solution.it(`test #${i + 1}`, () => {
    // TODO: sandbox tests ?
    const expect = chai.expect
    eval(test.code)
  })
}

const processHeading = (heading, path, solutionResolver) => describe(heading.title, () => {
  winston.log('debug', 'Processing Heading with path', path, 'and solution resolver', solutionResolver);
  (heading.children || []).forEach(c => processHeading(c, path.concat([c.title]), solutionResolver));
  (heading.tests || []).forEach(processTest(path, solutionResolver));
})

const generateTest = (model, solutionResolver = solutionResolverByFile) => processHeading(model, [model.title], solutionResolver)

export default generateTest