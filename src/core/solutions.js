//
// Solves the solutions from files
//

const pendingSolution = file => {
   const p = () => { throw new Error('Pending ! should not be ran') }
   p.it = (name, fn) => it.skip(`${name} (missing impl: ${file})`, fn)
   return p
}

const fileNotFoundRE = /^Cannot find module/
export const solutionResolverByFile = (...path) => {
  try {
    // TODO: path is hardcoded (?)
    const solution = require(`${__dirname}/../../src/${path.join('/')}`)
    solution.it = it
    return solution
  } catch(error) {
    if (fileNotFoundRE.test(error.message)) {
      return pendingSolution(`src/${path.join('/')}`)
    }
    throw error
  }
}

//
// Dummy no solution
//

export const noSolution = () => ({ it })