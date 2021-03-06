import React from 'react'
import CopyIcon from 'react-icons/lib/md/content-copy'

const Copy = ({ color, size = 15, ...props }) => {
  return <CopyIcon color={color} size={size} {...props} />
}

export default Copy
