import {classes} from './css/styles.mjs'
import {render, domUpdate, html} from '@erickmerchant/framework'

const defaultState = {
  output: null,
  left: null,
  operator: null,
  right: null,
  done: false
}

const state = Object.assign({}, defaultState)

const target = document.querySelector('body')

const update = domUpdate(target)

const button = (options) => html`<button
    type="button"
    class=${options.classes || classes.button}
    style=${`--grid-area: ${options.area}`}
    onclick=${options.onclick}>${options.text}</button>`

const calc = (state) => {
  state.output = 'left'

  const left = Number(state.left)
  const right = Number(state.right)

  switch (state.operator) {
    case '+':
      state.left = left + right
      break

    case '−':
      state.left = left - right
      break

    case '×':
      state.left = left * right
      break

    case '÷':
      state.left = left / right
      break
  }
}

const clear = (commit) => button({
  onclick() {
    commit(Object.assign({}, defaultState))
  },
  classes: classes.clear,
  area: 'clear',
  text: 'AC'
})

const equals = (commit) => button({
  onclick() {
    commit((state) => {
      if (state.left == null || state.operator == null || state.right == null) {
        return
      }

      calc(state)

      state.done = true
    })
  },
  area: 'equals',
  classes: classes.operator,
  text: '='
})

const operator = (commit, operator, area) => button({
  onclick() {
    commit((state) => {
      if (state.left == null) {
        return
      }

      if (state.output === 'right') {
        calc(state)
      }

      state.done = false

      state.right = null

      state.operator = operator
    })
  },
  classes: classes.operator,
  area,
  text: operator === '.' ? '' : operator
})

const character = (commit, character, area) => button({
  onclick() {
    commit((state) => {
      if (state.done) {
        state = Object.assign({}, defaultState)
      }

      let target = 'right'

      if (state.operator == null) {
        target = 'left'
      }

      if (state[target] == null) {
        state[target] = character === '.' ? '0.' : character
      } else if (character !== '.' || !state[target].includes('.')) {
        state[target] += character
      }

      state.output = target

      return state
    })
  },
  area,
  text: character
})

const sign = (commit) => button({
  onclick() {
    commit((state) => {
      const target = state.output

      if (state[target] != null) {
        const number = Number(state[target])

        state[target] = number * -1
      }
    })
  },
  area: 'sign',
  text: '±'
})

const format = (val) => {
  if (typeof val === 'number') return val

  const index = val.indexOf('.')
  const number = Number(val)

  if (index === -1) {
    return number
  }

  const digits = val.length - index - 1

  if (digits) {
    return number.toFixed(digits)
  }

  return number.toFixed(1)
}

render({
  state,
  update,
  component({state, commit}) {
    return html`
    <body class=${classes.app}>
      <form class=${classes.form}>
        <output class=${classes.output}>${state.output ? format(state[state.output]) : '0'}</output>

        ${character(commit, '7', 'seven')}
        ${character(commit, '8', 'eight')}
        ${character(commit, '9', 'nine')}
        ${operator(commit, '÷', 'divide')}
        ${clear(commit)}

        ${character(commit, '4', 'four')}
        ${character(commit, '5', 'five')}
        ${character(commit, '6', 'six')}
        ${operator(commit, '×', 'times')}
        ${equals(commit)}

        ${character(commit, '1', 'one')}
        ${character(commit, '2', 'two')}
        ${character(commit, '3', 'three')}
        ${operator(commit, '−', 'minus')}

        ${character(commit, '0', 'zero')}
        ${character(commit, '.', 'decimal')}
        ${sign(commit)}
        ${operator(commit, '+', 'plus')}

      </form>
    </body>`
  }
})
