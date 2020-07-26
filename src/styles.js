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

export const styles = {
  app: `
    display: grid;
    height: 100%;
    background: hsl(200, 5%, 60%);
    font: 24px/1.5 Consolas, monaco, monospace;
  `,
  form: `
    display: grid;
    gap: 0.25em;
    grid-template-columns: repeat(5, 1fr);
    grid-auto-rows: 3em;
    width: 20em;
    margin: auto;
    padding: 1em;
    background: white;
    border: 3px solid white;
    box-shadow: 3px 3px 9px #222;
  `,
  output: `
    ${element}

    grid-column: 1 / span 5;
    display: grid;
    justify-content: end;
    align-content: center;
    padding: 1em;
    margin-bottom: 0.25em;
    border: 2px solid var(--color);
    color: var(--color);
  `,
  button: `
    ${element}

    background-color: var(--color);
    color: white;

    :focus, :active {
      filter: brightness(1.1);
    }
  `,
  operator: (styles) => `
    ${styles.button}

    --saturation: 60%;
  `,
  clear: (styles) => `
    ${styles.button}

    --hue: 350;
    --saturation: 60%;
  `,
  equals: (styles) => `
    ${styles.operator}

    grid-row: 3 / span 3;
    grid-column: 5;
  `
}
