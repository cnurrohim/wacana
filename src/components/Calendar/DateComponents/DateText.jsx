import React from "react"

/**
 * data style wrapper
 * @param children children
 * @param isOutDated Boolean
 * @returns JSX.Element
 */
export const DateText = ({ children }) => {
  let content = <span className={` text-sm`}>{children}</span>

  return <>{content}</>
}
