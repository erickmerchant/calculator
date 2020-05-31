import {html} from '@erickmerchant/framework'

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

export const defaultState = {
  output: null,
  left: null,
  operator: null,
  right: null,
  done: false
}

export const createComponent = (app, classes) => {
  const button = (options) => html`
    <button
      type="button"
      class=${options.classes || classes.button}
      onclick=${options.onclick}
    >
      ${options.text}
    </button>
  `

  const clearButton = button({
    onclick: () => app.commit(Object.assign({}, defaultState)),
    classes: classes.clear,
    text: 'AC'
  })

  const equalsButton = button({
    onclick: () =>
      app.commit((state) => {
        if (
          state.left == null ||
          state.operator == null ||
          state.right == null
        ) {
          return
        }

        calc(state)

        state.done = true
      }),
    classes: classes.equals,
    text: '='
  })

  const operatorButton = (operator) =>
    button({
      onclick: () =>
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
        }),
      classes: classes.operator,
      text: operator === '.' ? '' : operator
    })

  const characterButton = (character) =>
    button({
      onclick: () =>
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
        }),
      text: character
    })

  const signButton = button({
    onclick: () =>
      app.commit((state) => {
        const target = state.output

        if (state[target] != null) {
          const number = Number(state[target])

          state[target] = number * -1
        }
      }),
    text: '±'
  })

  return (state) => html`
    <body class=${classes.app}>
      <form class=${classes.form}>
        <output class=${classes.output}>
          ${state.output ? format(state[state.output]) : '0'}
        </output>

        ${[
          characterButton('7'),
          characterButton('8'),
          characterButton('9'),
          operatorButton('÷'),
          clearButton,
          characterButton('4'),
          characterButton('5'),
          characterButton('6'),
          operatorButton('×'),
          equalsButton,
          characterButton('1'),
          characterButton('2'),
          characterButton('3'),
          operatorButton('−'),
          characterButton('0'),
          characterButton('.'),
          signButton,
          operatorButton('+')
        ]}
      </form>
    </body>
  `
}
