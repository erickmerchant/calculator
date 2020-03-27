import {classes} from './out/styles.mjs'
import {render, domUpdate, html, raw} from '@erickmerchant/framework'

const target = document.querySelector('body')

const update = domUpdate(target)

const button = (commit, options) => html`<button
    type="button"
    class=${options.classes || classes.button}
    style=${`--grid-area: ${options.area}`}
    onclick=${() => {
      commit(options.onclick)
    }}>${options.text}</button>`

const defaultState = {
  output: null,
  left: null,
  operator: null,
  right: null,
  done: false
}

const state = Object.assign({}, defaultState)

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
        return state
      }

      state.output = 'left'

      const left = Number(state.left)
      const right = Number(state.right)

      switch (state.operator) {
        case '+':
          state.left = left + right
          break

        case '-':
          state.left = left - right
          break

        case '*':
          state.left = left * right
          break

        case '/':
          state.left = left / right
          break
      }

      state.done = true

      return state
    },
    area: 'equals',
    text: raw('&equals;')
  }
)

const operator = (commit, operator, area, text) => button(
  commit,
  {
    onclick(state) {
      if (state.left == null) {
        return state
      }

      if (state.output === 'right') {
        equals(state)
      }

      state.right = null

      state.operator = operator

      state.done = false

      return state
    },
    classes: classes.operator,
    area,
    text
  }
)

const character = (commit, character, area, text) => button(
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

      return state
    },
    area,
    text
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

      return state
    },
    area: 'sign',
    text: raw('&plusmn;')
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
        ${operator(commit, '+', 'plus', raw('&plus;'))}
        ${operator(commit, '-', 'minus', raw('&minus;'))}
        ${operator(commit, '*', 'times', raw('&times;'))}
        ${character(commit, '7', 'seven', 7)}
        ${character(commit, '8', 'eight', 8)}
        ${character(commit, '9', 'nine', 9)}
        ${operator(commit, '/', 'divide', raw('&divide;'))}
        ${character(commit, '4', 'four', 4)}
        ${character(commit, '5', 'five', 5)}
        ${character(commit, '6', 'six', 6)}
        ${equals(commit)}
        ${character(commit, '1', 'one', 1)}
        ${character(commit, '2', 'two', 2)}
        ${character(commit, '3', 'three', 3)}
        ${character(commit, '0', 'zero', 0)}
        ${character(commit, '.', 'decimal', '.')}
        ${sign(commit)}
      </form>
    </body>`
  }
})
