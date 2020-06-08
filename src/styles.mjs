export const _start = `
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    max-width: 100%;
    border-radius: 3px;
    font: 24px/1.5 Consolas, monaco, monospace;
  }

  html {
    height: 100%;
  }
`

const element = `
  border: 2px solid var(--color);

  --color: hsl(var(--hue), var(--saturation), 50%);
  --hue: 200;
  --saturation: 10%;
`

export const styles = {
  app: `
    display: flex;
    height: 100%;
    background: hsl(200, 5%, 60%);
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

    display: flex;
    grid-column: 1 / span 5;
    justify-content: flex-end;
    padding: 1em;
    margin-bottom: 0.25em;
    color: var(--color);
    align-items: center;
    line-height: 1;
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
    ${styles.button}

    grid-row: 3 / span 3;
    grid-column: 5;
  `
}
