const element = `
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
  border-top-width: 3px;
  border-bottom-width: 3px;
  border-right-width: 3px;
  border-left-width: 3px;
  border-top-style: solid;
  border-bottom-style: solid;
  border-right-style: solid;
  border-left-style: solid;
  border-top-color: var(--background-color);
  border-bottom-color: var(--background-color);
  border-right-color: var(--background-color);
  border-left-color: var(--background-color);
  grid-row-start: var(--grid-area);
  grid-row-end: var(--grid-area);
  grid-column-start: var(--grid-area);
  grid-column-end: var(--grid-area);

  --background-color: hsl(var(--hue), var(--saturation), 50%);
`

const button = `
  ${element}
  color: white;
  min-height: 3em;
  background-color: var(--background-color);
`

export default {
  _start: `
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
      margin-top: 0;
      margin-bottom: 0;
      margin-right: 0;
      margin-left: 0;
      padding-top: 0;
      padding-bottom: 0;
      padding-right: 0;
      padding-left: 0;
      max-width: 100%;
    }

    html {
      height: 100%;
    }
  `,
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
    margin-top: auto;
    margin-bottom: auto;
    margin-right: auto;
    margin-left: auto;
    width: 20em;
    padding-top: 1em;
    padding-bottom: 1em;
    padding-right: 1em;
    padding-left: 1em;
    gap: 0.25em;
    grid-template-columns: repeat(4, 1fr);
    grid-template-areas:
      'output  output   output  output'
      'clear   plus     minus   times'
      'seven   eight    nine    divide'
      'four    five     six     equals'
      'one     two      three   equals'
      'zero    decimal  sign    equals';

    --hue: 200;
    --saturation: 5%;
  `,
  button,
  output: `
    ${element}
    display: flex;
    padding-top: 1em;
    padding-bottom: 1em;
    padding-right: 1em;
    padding-left: 1em;
    grid-row-start: output;
    grid-row-end: output;
    grid-column-start: output;
    grid-column-end: output;
    justify-content: flex-end;
    line-height: 1;
    height: 3em;
    color: var(--background-color);
  `,
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
