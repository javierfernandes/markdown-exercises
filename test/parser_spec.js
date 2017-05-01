import marked from 'marked'
import excersiceParser from '../src/core/parser'
import chai, { expect } from 'chai'

chai.config.truncateThreshold = 0

describe('Excercises markdown parser', () => {

  const withRoot = children => ({ title: 'Root', children })

  describe('Parsing headings', () => {

    it('basic parsing with marked to understand AST', () => {
      const content = 
`# Lists
This sections is about Lists

## Map
We will se now the map() method

\`\`\`assertion
const a = [1, 2, 3]
\`\`\`

  `.toString()
      const parsed = marked.lexer(content)
      expect(parsed[0]).to.deep.equal({ type: "heading", depth: 1, text: "Lists" })
      expect(parsed[1]).to.deep.equal({ type: "paragraph", text: "This sections is about Lists" })
      expect(parsed[2]).to.deep.equal({ type: "heading", depth: 2, text: "Map" })
      expect(parsed[3]).to.deep.equal({ type: "paragraph", text: "We will se now the map() method" })
      expect(parsed[4]).to.deep.equal({ type: "code", lang: "assertion", text: "const a = [1, 2, 3]" })
    })

    describe('excersiceParser()', () => {

      it('should assemble a simple one level depth tree of headings', () => {
        const content = 
  `
  # Collections
  blaha
  `
        expect(excersiceParser(content)).to.deep.equal(withRoot([
          {
            title: 'Collections', children: []
          }
        ]))
      })

      it('should assemble two simple 1 level depth tree of headings', () => {
        const content = 
  `
  # Collections
  blaha

  # Objects
  blaha
  `
        expect(excersiceParser(content)).to.deep.equal(withRoot([
          { title: 'Collections', children: [] },
          { title: 'Objects', children: [] }
        ]))
      })

      it('should assemble a simple 2 level depth tree of headings', () => {
        const content = 
  `
  # Collections
  blaha

  ## Lists
  blaha
  `
        expect(excersiceParser(content)).to.deep.equal(withRoot([
          { 
            title: 'Collections', 
            children: [
              { title: 'Lists', children: [] }
            ]
          }
        ]))
      })

          it('should support a 1st level heading after a 2nd level', () => {
        const content = 
  `
  # Collections
  blaha

  ## Lists
  blaha

  # IO
  really
  `
        expect(excersiceParser(content)).to.deep.equal(withRoot([
          { 
            title: 'Collections', 
            children: [
              { title: 'Lists', children: [] }
            ]
          },
          { title: 'IO', children: [] }
        ]))
      })

      it('should support a 1st level heading after a 3nd level', () => {
        const content = 
  `
  # Collections
  blaha

  ## Lists
  blaha

  ### Filter
  filtering blah

  # IO
  really
  `
        expect(excersiceParser(content)).to.deep.equal(withRoot([
          { 
            title: 'Collections', 
            children: [
              { title: 'Lists', children: [
                { title: 'Filter', children: [] }    
              ] }
            ]
          },
          { title: 'IO', children: [] }
        ]))
      })

      it('should support skipping a heading level, from 1 to 3', () => {
        const content = 
  `
  # Collections
  blaha

  ### Filter
  filtering blah
  `
        expect(excersiceParser(content)).to.deep.equal(withRoot([
          { 
            title: 'Collections', 
            children: [
              { title: 'Filter', children: [] }
            ]
          }
        ]))
      })

        it('should support skipping heading 1 => 2 => 3, then => 2 again, => 3, and 1', () => {
        const content = 
  `
  # Collections
  blaha

  ## Lists

  ### Filter
  filtering blah

  ## Stacks

  ### Map

  # IO
  `
        expect(excersiceParser(content)).to.deep.equal(withRoot([
          { 
            title: 'Collections', 
            children: [
              { title: 'Lists', children: [
                { title: 'Filter', children: [] }
              ] },
              { title: 'Stacks', children: [
                { title: 'Map', children: [] }
              ] }
            ]
          },
          { title: 'IO', children: [] }
        ]))
      })

      it('should assemble a 3 level depth tree of headings', () => {
        const content = 
  `
  # Collections
  blaha
  ## Lists
  blaha basic
  ### Map
  adsad
  ### Filter
  adsad
  ### Reduce
  adsad
  `
        expect(excersiceParser(content)).to.deep.equal(withRoot([
          {
            title: 'Collections', children: [
              { 
                title: 'Lists', children: [
                  { title: 'Map', children: [] },
                  { title: 'Filter', children: [] },
                  { title: 'Reduce', children: [] }
                ]
              }
            ]
          }
        ]))
      })

    })

  })

  describe('parsing assertions code', () => {

    it('should parse a simple test from a code snippet', () => {
      const content = 
`
# Map

\`\`\`js
expect(fn([1, 2, 3, 4])).to.deep.equal([2, 4, 6, 8])
\`\`\`
`
      // expect(excersiceParser(content)[0]).to.deep.equal({})
      expect(excersiceParser(content)).to.deep.equal(withRoot([
        {
          title: 'Map', 
          children: [],
          tests: [
            { lang: 'js', code: 'expect(fn([1, 2, 3, 4])).to.deep.equal([2, 4, 6, 8])' }
          ]
        }
      ]))
    })

  })

})