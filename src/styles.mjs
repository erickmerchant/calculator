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
    font: inherit;
    margin: 0;
    padding: 0;
    max-width: 100%;
    border-radius: 3px;
  }

  html {
    height: 100%;
  }
`

const element = `
  border-style: solid;
  border-color: var(--background-color);
  grid-row-start: var(--grid-area);
  grid-row-end: var(--grid-area);
  grid-column-start: var(--grid-area);
  grid-column-end: var(--grid-area);

  --background-color: hsl(var(--hue), var(--saturation), 50%);
  --hue: 200;
  --saturation: 5%;
`

const button = `
  ${element}
  color: white;
  min-height: 3em;
  background-color: var(--background-color);
`

export const styles = {
  app: `
    justify-content: center;
    font-family: 'PT Mono', monospace;
    font-size: 24px;
    line-height: 1.5;
    color: #222;
    display: flex;
    height: 100%;
  `,
  form: `
    display: grid;
    margin: auto;
    width: 20em;
    padding: 1em;
    gap: 0.25em;
    grid-template-columns: repeat(4, 1fr);
    grid-template-areas:
      'output  output   output  output'
      'clear   plus     minus   times'
      'seven   eight    nine    divide'
      'four    five     six     equals'
      'one     two      three   equals'
      'zero    decimal  sign    equals';
  `,
  output: `
    ${element}
    display: flex;
    padding: 1em;
    justify-content: flex-end;
    line-height: 1;
    height: 3em;
    color: var(--background-color);

    --grid-area: output;
  `,
  button,
  operator: `
    ${button}
    --saturation: 60%;
  `,
  clear: `
    ${button}
    --hue: 350;
    --saturation: 60%;
  `
}
