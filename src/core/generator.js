import chai from 'chai'
import { solutionResolverByFile } from './solutions'

const processTest = (test, i, path, solutionResolver) => {
  console.log('Processing test with path', path)
  const solution = solutionResolver(path)
  solution.it(`test #${i + 1}`, () => {
    // TODO: sandbox tests ?
    const expect = chai.expect
    eval(test.code)
  })
}

const processHeading = (heading, path, solutionResolver) => describe(heading.title, () => {
  (heading.children || []).forEach(c => processHeading(c, path.concat([c.title], solutionResolver)));
  (heading.tests || []).forEach((t, i) => processTest(t, i, path, solutionResolver));
})

const generateTest = (model, solutionResolver = solutionResolverByFile) => {
  return processHeading(model, [model.title], solutionResolver)
}

export default generateTest