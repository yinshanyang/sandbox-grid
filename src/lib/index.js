// @flow
import React from 'react'
import type { Node } from 'react'
import type { Data } from './types'

export type Props = {
  children: ?Node,
  data: Data
}
const Content = ({ children, width }) => (
  <div
    className='bg-background-50'
    style={{
      height: 4 * 16,
      width: width * 16
    }}
  >
    {children}
  </div>
)

const Element = ({ children }) => (
  <div style={{margin: 8}}>{children}</div>
)

const Component = () => (
  <div style={{margin: 8}} className='h-100 flex flex-wrap items-start content-start'>
    {
      Array(20).fill(0).map(() => (
        <Element>
          <Content width={(~~(Math.random() * 4) + 1) * 3} />
        </Element>
      ))
    }
  </div>
)

Component.defaultProps = {
  data: {
    id: null,
    value: null
  }
}

Component.displayName = 'Component'

export default Component
