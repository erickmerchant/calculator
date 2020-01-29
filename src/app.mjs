import {classes} from './out/styles.mjs'
import {render, domUpdate, view, raw} from '@erickmerchant/framework'

const target = document.querySelector('body')

const update = domUpdate(target)

const {app, btn} = view()

const button = (commit, onclick, area, txt) => {
  let className = classes.button

  if (['plus', 'minus', 'times', 'divide', 'equals'].includes(area)) {
    className = classes.operator
  }

  if (area === 'clear') {
    className = classes.clear
  }

  return btn`<button
    type="button"
    class=${className}
    style=${`--grid-area: ${area}`}
    onclick=${() => {
      commit(onclick)
    }}>${txt}</button>`
}

const clear = () => {
  return {
    output: null,
    left: null,
    operator: null,
    right: null,
    done: false
  }
}

const state = clear()

const equals = (state) => {
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
}

const operator = (operator) => (state) => {
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
}

const character = (character) => (state) => {
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
}

const sign = (state) => {
  const target = state.output

  if (state[target] != null) {
    const number = Number(state[target])

    state[target] = number * -1
  }

  return state
}

const format = (val) => {
  if (typeof val === 'number') return val

  const index = val.indexOf('.')
  const number = Number(val)

  if (index < 0) {
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
    return app`
    <body class=${classes.app}>
      <form class=${classes.form}>
        <output class=${classes.output}>${state.output ? format(state[state.output]) : '0'}</output>
        ${button(commit, clear, 'clear', 'AC')}
        ${button(commit, operator('+'), 'plus', raw('&plus;'))}
        ${button(commit, operator('-'), 'minus', raw('&minus;'))}
        ${button(commit, operator('*'), 'times', raw('&times;'))}
        ${button(commit, character('7'), 'seven', 7)}
        ${button(commit, character('8'), 'eight', 8)}
        ${button(commit, character('9'), 'nine', 9)}
        ${button(commit, operator('/'), 'divide', raw('&divide;'))}
        ${button(commit, character('4'), 'four', 4)}
        ${button(commit, character('5'), 'five', 5)}
        ${button(commit, character('6'), 'six', 6)}
        ${button(commit, equals, 'equals', raw('&equals;'))}
        ${button(commit, character('1'), 'one', 1)}
        ${button(commit, character('2'), 'two', 2)}
        ${button(commit, character('3'), 'three', 3)}
        ${button(commit, character('0'), 'zero', 0)}
        ${button(commit, character('.'), 'decimal', '.')}
        ${button(commit, sign, 'sign', raw('&plusmn;'))}
      </form>
    </body>`
  }
})
