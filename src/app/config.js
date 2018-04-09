import { configure } from '@storybook/react'
import 'ui-tachyons-light'

const req = require.context('../lib', true, /story\.js$/)

const loadStories = () => {
  req.keys().forEach(req)
}

configure(loadStories, module)
