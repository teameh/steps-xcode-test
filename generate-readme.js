const YAML = require('yamljs');
const json2md = require("json2md")
const fs = require('fs');

const formatOptions = options => options.reduce((res, {opts, ...input}) => {
  const { title, description, category, is_required, value_options, summary, ...rest } = opts;
  return [...res, ...Object.entries(input).slice(0,1).map(([key, value]) => ([
    { 'h3': `${key} = \`${value}\`` },
    { 'h5': title },
    ...(summary ? [{ 'h5': 'Summary' }, { 'p': summary }] : []),
    ...(description ? [{ 'p': description }] : []),
    ...(category ? [{ 'h5': 'Category' }, { 'p': category }] : []),
    { 'h5': 'Required' }, { 'p': `${is_required ? '`true`' : '`false`'}` },
    ...(value_options ? [
      { 'h5': `Value options:` },
      { 'p': `${opts.value_options.map(v => `\`${v}\``).join(' ')}` },
    ] : []),
    ...(Object.keys(rest).length > 0 ? [{ 
      "code": {
        language: "js", 
        content: [ JSON.stringify(rest) ]
      }
    }] : [])
  ]))];
}, [])

const step = YAML.load('step.yml');
// console.log('step', step);

const json = [
  { h1: step.title },
  { h2: step.summary },
  { p: step.description },
  { h3: "Inputs:" },
  ...formatOptions(step.inputs),
  { h3: "Output:" },
  ...formatOptions(step.outputs),
];
// console.log('json', json);

const readme = json2md(json)

fs.writeFile("README.md", readme, function(err) {
  if(err) {
    return console.log(err);
  }
  console.log("README.md generated");
}); 