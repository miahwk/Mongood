import { monaco, ControlledEditor, Monaco } from '@monaco-editor/react'

let _monaco: Monaco | undefined

monaco.init().then((_m) => {
  _monaco = _m
  _monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
    diagnosticCodesToIgnore: [1005, 1128, 7028],
  })
})

export async function colorize(text: string): Promise<string> {
  return _monaco?.editor.colorize(text, 'javascript', { tabSize: 2 }) || ''
}

export { ControlledEditor }