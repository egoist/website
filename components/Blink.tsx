import { useEffect, useState } from "react"

export const Blink: React.FC<
  { value: string; internal?: number } & React.HTMLAttributes<HTMLSpanElement>
> = ({ value, internal, ...props }) => {
  const [actualValue, setActualValue] = useState(value)

  useEffect(() => {
    const id = setInterval(() => {
      setActualValue((actualValue) => {
        return actualValue ? "" : value
      })
    }, internal || 600)
    return () => {
      clearInterval(id)
    }
  }, [value, internal])

  return <span {...props}>{actualValue}</span>
}
