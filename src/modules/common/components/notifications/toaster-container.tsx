import clsx from "clsx"
import React from "react"

type ToasterContainerProps = {
  visible: boolean
} & React.HTMLAttributes<HTMLDivElement>

const ToasterContainer: React.FC<ToasterContainerProps> = ({
  children,
  visible,
  className,
  ...rest
}) => {
  return (
    <div
      className={clsx(
        "flex items-start bg-gray-700 p-3 border rounded-lg mb-2",
        {
          "animate-enter": visible,
        },
        {
          "animate-leave": !visible,
        },
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

export default ToasterContainer
