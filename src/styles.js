export const _start = `
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    max-width: 100%;
    border-radius: 3px;
    font: inherit;
  }

  html {
    height: 100%;
  }
`

const element = `
  border: none;

  --color: hsl(var(--hue, 200), var(--saturation, 10%), 50%);
`

const button = `
  ${element}

  background-color: var(--color);
  color: #fff;

  :focus, :active {
    filter: brightness(1.1);
  }
`

const operator = `
  ${button}

  --saturation: 60%;
`

export const classes = {
  app: `
    display: grid;
    height: 100%;
    background-color: hsl(200, 5%, 60%);
    font: 24px/1.5 Consolas, monaco, monospace;
  `,
  form: `
    display: grid;
    gap: 0.25em;
    grid-auto-rows: 3em;
    width: 20em;
    margin: auto;
    padding: 1em;
    background-color: #fff;
    border: 3px solid #fff;
    box-shadow: 3px 3px 9px #222;
  `,
  output: `
    ${element}

    grid-column: span 5;
    display: grid;
    justify-content: end;
    align-content: center;
    padding: 1em;
    margin-bottom: 0.25em;
    border: 2px solid currentColor;
    color: var(--color);
  `,
  button,
  operator,
  clear: `
    ${button}

    --hue: 350;
    --saturation: 60%;
  `,
  equals: `
    ${operator}

    grid-row: span 3;
  `
}
