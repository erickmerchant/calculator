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

const button = (commit, options) => html`<button
    type="button"
    class=${options.classes || classes.button}
    style=${`--grid-area: ${options.area}`}
    onclick=${() => {
      commit(options.onclick)
    }}>${options.text}</button>`

const clear = (commit) => button(
  commit,
  {
    onclick() {
      return Object.assign({}, defaultState)
    },
    classes: classes.clear,
    area: 'clear',
    text: 'AC'
  }
)

const equals = (commit) => button(
  commit,
  {
    onclick(state) {
      if (state.left == null || state.operator == null || state.right == null) {
        return
      }

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

      state.done = true
    },
    area: 'equals',
    classes: classes.operator,
    text: '='
  }
)

const operator = (commit, operator, area) => button(
  commit,
  {
    onclick(state) {
      if (state.left == null) {
        return
      }

      if (state.output === 'right') {
        equals(state)
      }

      state.right = null

      state.operator = operator

      state.done = false
    },
    classes: classes.operator,
    area,
    text: operator === '.' ? '' : operator
  }
)

const character = (commit, character, area) => button(
  commit,
  {
    onclick(state) {
      if (state.done) {
        state = clear()
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
    },
    area,
    text: character
  }
)

const sign = (commit) => button(
  commit,
  {
    onclick(state) {
      const target = state.output

      if (state[target] != null) {
        const number = Number(state[target])

        state[target] = number * -1
      }
    },
    area: 'sign',
    text: '±'
  }
)

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
        ${clear(commit)}
        ${equals(commit)}

        ${operator(commit, '÷', 'divide')}
        ${operator(commit, '×', 'times')}
        ${operator(commit, '−', 'minus')}
        ${operator(commit, '+', 'plus')}

        ${character(commit, '0', 'zero')}
        ${character(commit, '1', 'one')}
        ${character(commit, '2', 'two')}
        ${character(commit, '3', 'three')}
        ${character(commit, '4', 'four')}
        ${character(commit, '5', 'five')}
        ${character(commit, '6', 'six')}
        ${character(commit, '7', 'seven')}
        ${character(commit, '8', 'eight')}
        ${character(commit, '9', 'nine')}

        ${character(commit, '.', 'decimal')}
        ${sign(commit)}
      </form>
    </body>`
  }
})
