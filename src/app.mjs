import {classes} from './css/styles.mjs'
import {createDomView, createApp, html} from '@erickmerchant/framework'

const defaultState = {
  output: null,
  left: null,
  operator: null,
  right: null,
  done: false
}

const app = createApp(Object.assign({}, defaultState))

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

const clear = () => button({
  onclick() {
    app.commit(Object.assign({}, defaultState))
  },
  classes: classes.clear,
  area: 'clear',
  text: 'AC'
})

const equals = () => button({
  onclick() {
    app.commit((state) => {
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

const operator = (operator, area) => button({
  onclick() {
    app.commit((state) => {
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

const character = (character, area) => button({
  onclick() {
    app.commit((state) => {
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

const sign = () => button({
  onclick() {
    app.commit((state) => {
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

const target = document.querySelector('body')

const view = createDomView(target, (state) => html`
  <body class=${classes.app}>
    <form class=${classes.form}>
      <output class=${classes.output}>${state.output ? format(state[state.output]) : '0'}</output>

      ${character('7', 'seven')}
      ${character('8', 'eight')}
      ${character('9', 'nine')}
      ${operator('÷', 'divide')}
      ${clear()}

      ${character('4', 'four')}
      ${character('5', 'five')}
      ${character('6', 'six')}
      ${operator('×', 'times')}
      ${equals()}

      ${character('1', 'one')}
      ${character('2', 'two')}
      ${character('3', 'three')}
      ${operator('−', 'minus')}

      ${character('0', 'zero')}
      ${character('.', 'decimal')}
      ${sign()}
      ${operator('+', 'plus')}

    </form>
  </body>`)

app.render(view)
