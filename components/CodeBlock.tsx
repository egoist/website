export const CodeBlock: React.FC<{ code: string; language: string }> = ({
  code,
  language,
}) => {
  return (
    <pre className={`language-${language}`}>
      <code dangerouslySetInnerHTML={{ __html: code }}></code>
    </pre>
  )
}
