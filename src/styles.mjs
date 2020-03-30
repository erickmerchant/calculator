export const _start = `
  @font-face {
    font-display: swap;
    font-family: 'PT Mono';
    font-style: normal;
    font-weight: 400;
    src:
      local('PT Mono'),
      local('PTMono-Regular'),
      url('/fonts/pt-mono-v7-latin-regular.woff2') format('woff2'),
      url('/fonts/pt-mono-v7-latin-regular.woff') format('woff');
  }

  * {
    box-sizing: border-box;
    font: 24px/1.5 'PT Mono', monospace;
    margin: 0;
    padding: 0;
    max-width: 100%;
    border-radius: 3px;
  }

  html {
    height: 100%;
  }
`

export const styles = {
  app: `
    justify-content: center;
    color: #222;
    display: flex;
    height: 100%;
    background: hsl(200, 5%, 50%);
  `,
  form: `
    display: grid;
    margin: auto;
    width: 20em;
    height: 20em;
    padding: 1em;
    gap: 0.25em;
    grid-template-columns: repeat(5, 1fr);
    grid-template-areas:
      'output  output   output  output  output'
      'seven   eight    nine    divide  clear'
      'four    five     six     times   equals'
      'one     two      three   minus   equals'
      'zero    decimal  sign    plus    equals';
    border: 3px solid white;
    background: white;
    box-shadow: 3px 3px 9px #222;
  `,
  element: `
    grid-area: var(--grid-area);
    border: 2px solid var(--color);

    --color: hsl(var(--hue), var(--saturation), 50%);
    --hue: 200;
    --saturation: 15%;
  `,
  output: (styles) => `
    ${styles.element}

    display: flex;
    padding: 1em;
    justify-content: flex-end;
    line-height: 1;
    height: 3em;
    color: var(--color);

    --grid-area: output;
  `,
  button: (styles) => `
    ${styles.element}

    color: white;
    min-height: 3em;
    background-color: var(--color);
  `,
  operator: (styles) => `
    ${styles.button(styles)}

    --saturation: 60%;
  `,
  clear: (styles) => `
    ${styles.button(styles)}

    --hue: 350;
    --saturation: 60%;
  `
}
