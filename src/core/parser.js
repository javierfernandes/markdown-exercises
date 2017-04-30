import marked from 'marked'
import winston from 'winston'

winston.level = 'debug'

const HEADING = 'heading'
const CODE = 'code'
const types = [HEADING, CODE]

const last = array => array[array.length - 1]

class ParsingStack {
  constructor() {
    this.stack = [{
      title: 'Root',
      children: [],
      depth: 0
    }]
  }
  process(e) {
    winston.log('debug', 'Processing element', e)
    switch (e.type) {
      case HEADING: this.processTitle(e); break
      case CODE: this.processCode(e); break
    }
    return this
  }
  processTitle(e) {
    const newOne = {
      title: e.text,
      children: [],
      depth: e.depth
    }
    
    winston.log('debug', 'Processing heading depth', e.depth, 'current depth', this.depth())
    if (e.depth <= this.depth()) {
      this.pop(e.depth)
    }
    this.push(newOne, e.depth)
  }
  processCode(e) {
    winston.log('debug', 'Processing code', e)
    this.withCurrent(c => {
      const tests = c.tests || []
      tests.push({
        lang: e.lang,
        code: e.text
      })
      c.tests = tests
    })
  }
  push(newOne, depth) {
    winston.log('debug', 'Pushing ', newOne.title, '(level', depth, ') into current depth', this.depth(), 'and stack', this.stack)
    this.current().children.push(newOne)
    this.stack.push(newOne)
  }
  current() {
    return last(this.stack)
  }
  withCurrent(fn) { fn(this.current()) }
  pop(toDepth) {
    winston.log('debug', 'Poping ( level', toDepth, '), current depth', this.depth(), 'and stack', this.stack)
    while(this.depth() >= toDepth ) {
      this.stack.pop()
    }
  }
  depth() { return this.current().depth }
  content() {
    const removeDepth = list => {
      list.forEach(e => {
        delete e.depth
        removeDepth(e.children)
      })
      return list
    }

    removeDepth(this.stack)
    return this.stack[0]
  }
}

const excersiceParser = content => {
  const ast = marked.lexer(content)
  winston.log('debug', 'Will process AST', ast)
  const filtered = ast.filter(e => types.find(t => t === e.type))
  return filtered.reduce((acc, e) => acc.process(e), new ParsingStack()).content()
}

export default excersiceParser