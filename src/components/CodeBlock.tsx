import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/nightOwl'

export default ({ children, className }) => {
  const language = className.replace(/language-/, '')

  return (
    <Highlight
      {...defaultProps}
      code={children}
      language={language}
      theme={theme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => {
            const props = getLineProps({ line, key: i })

            if (line.length === 1 && line[0].empty && i === tokens.length - 1)
              return null

            return (
              <div {...props}>
                {line.map((token, key) => {
                  return <span {...getTokenProps({ token, key })} />
                })}
              </div>
            )
          })}
        </pre>
      )}
    </Highlight>
  )
}
