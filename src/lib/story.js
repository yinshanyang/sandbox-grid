// @flow
import React, { PureComponent } from 'react'
import * as d3 from 'd3'
import { storiesOf } from '@storybook/react'

class Sized extends PureComponent {
  state = {
    width: null,
    height: null
  }

  componentDidMount () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize)
  }

  render () {
    const props = this.props
    const { width, height } = this.state
    return (
      <div ref='box' {...props}>
        {~~width},
        {~~height}
      </div>
    )
  }

  handleResize = () => this.setState({
    width: this.refs.box.getBoundingClientRect().width,
    height: this.refs.box.getBoundingClientRect().height
  })
}

class Resized extends PureComponent {
  state = {
    height: 0
  }

  componentDidMount () {
    window.addEventListener('resize', this.handleResize)
    setTimeout(this.handleResize, 0)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize)
  }

  render () {
    const { children, className, span, style } = this.props
    const { height } = this.state

    const rows = Math.ceil(height / span)

    return (
      <div
        style={{
          ...style,
          overflow: 'visible',
          gridRow: `span ${rows}`,
          lineHeight: '16px'
        }}
      >
        <div ref='box' className={className}>
          {children}
        </div>
      </div>
    )
  }

  handleResize = () => this.setState({ height: this.refs.box.getBoundingClientRect().height })
}

class Squarified extends PureComponent {
  state = {
    width: 1,
    height: 1
  }

  componentDidMount () {
    window.addEventListener('resize', this.handleResize)
    setTimeout(this.handleResize, 0)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize)
  }

  render () {
    const { children, className, span, style } = this.props
    const { width, height } = this.state

    const area = width * height
    const sqrt = Math.sqrt(area)
    const columns = Math.round(sqrt / span * 1.1)
    const rows = Math.round(sqrt / span)

    return (
      <div
        style={{
          ...style,
          overflow: 'visible',
          gridColumn: `span ${columns}`,
          gridRow: `span ${rows}`,
          lineHeight: '16px'
        }}
      >
        <div ref='box' className={className}>
          {children}
        </div>
      </div>
    )
  }

  handleResize = () => this.setState({
    width: this.refs.box.getBoundingClientRect().width,
    height: this.refs.box.getBoundingClientRect().height
  })
}

storiesOf('Layouts', module)
  .add('scratch', () => {
    const styles = {
      application: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(64px, 1fr))',
        gridAutoRows: '64px',
        gridAutoFlow: 'row dense',
        alignContent: 'stretch',
        gridGap: 1,
        padding: 1
      }
    }

    const n = ~~(Math.random() * 1000) + 100
    const c = d3.scaleSequential(d3.interpolateWarm).domain([0, n])

    return (
      <div className='w-100 h-100 bg-background-100 f8 ttu tracked' style={styles.application}>
        {
          Array(n).fill(0).map((_, index) =>
            Math.random() < 0.99
              ? (
                <div
                  key={index}
                  className='bg-background-40 text-reversed-100 pa2'
                  style={{
                    gridColumn: `span ${~~(Math.pow(Math.random(), 3) * 3) + 1}`,
                    gridRow: `span ${~~(Math.pow(Math.random(), 3) * 3) + 1}`,
                    color: c(index),
                    background: c(index)
                  }}
                >
                  {index}
                </div>
              )
              : (
                <Squarified
                  key={index}
                  span={64}
                  className='pa2'
                  style={{
                    gridColumn: `span ${~~(Math.random() * 3) + 3}`,
                    // gridColumn: `1 / -1`,
                    // background: getGray(c(index))
                    color: c(index),
                    background: c(index)
                  }}
                >
                  {
                    Array(~~(Math.random() * 1000) + 100).fill(0).map((_, index) => index).join(' ')
                  }
                </Squarified>
              )
          )
        }
      </div>
    )
  })
  .add('complex grid', () => {
    const styles = {
      application: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(64px, 1fr))',
        gridTemplateRows: 'repeat(auto-fill, minmax(64px, 1fr))',
        gridGap: 1,
        padding: 1
      },
      sidebar: {
        gridColumn: 'span 2',
        gridRow: '1 / span 1'
      },
      grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(64px, 1fr))',
        // gridTemplateRows: 'repeat(auto-fill, minmax(64px, max-content))',
        gridAutoRows: 'minmax(64px, max-content)',
        alignContent: 'stretch',
        gridAutoFlow: 'row dense',
        gridGap: 1,
        gridColumn: '3 / -1',
        gridRow: '1 / -1'
      }
    }

    const n = ~~(Math.random() * 5000) + 120
    const c = d3.scaleSequential(d3.interpolateWarm).domain([0, n])

    return (
      <div className='w-100 h-100 bg-background-100 f8 ttu tracked' style={styles.application}>
        <Sized className='bg-background-40 text-reversed-100 pa2' style={styles.sidebar} />
        <div className='overflow-auto' style={styles.grid}>
          {
            Array(n).fill(0).map((_, index) => (
              <div
                key={index}
                className='bg-background-40 text-reversed-100 pa2'
                style={{
                  gridColumn: `span ${~~(Math.pow(Math.random(), 3) * 4) + 1}`,
                  gridRow: `span ${~~(Math.pow(Math.random(), 3) * 4) + 1}`,
                  background: c(index)
                }}
              />
            ))
          }
          <div
            className='bg-foreground-100 text-reversed-100 pa2'
            style={{
              minHeight: '100%',
              height: '100%',
              gridColumn: '-4 / -1',
              gridRow: '1 / auto'
              // gridRow: '1 / span 10'
              // gridColumn: 'span 3 / -1',
              // gridRowStart: '1',
              // gridRow: 'span max-content'
              // gridRowEnd: '2'
              // gridRow: '1 / -2'
            }}
          >
          Is a non-negative percentage value relative to the block size of the grid container. If the block size of the grid container is indefinite, the percentage value is treated like auto.
          </div>
        </div>
      </div>
    )
  })
  .add('responsive grid (collapsing grids)', () => {
    const css = `
      .application {
        display: grid;
        grid-gap: 1px;
        padding: 1px;
      }
      .navigation {}
      .main {
        display: grid;
        grid-gap: 1px;
        grid-auto-flow: row dense;
        align-content: stretch;
        align-items: stretch;
      }

      .application {
        grid-template-columns: 1fr;
        grid-template-rows: 64px 1fr;
      }
      .navigation {}
      .main {
        overflow: auto
      }

      @media screen and (min-width: 30em) {
        .application {}
        .navigation {}
        .main {}
      }

      @media screen and (min-width: 30em) and (max-width: 60em) {
        .application {
          grid-template-columns: repeat(auto-fill, minmax(64px, 1fr));
          grid-template-rows: 1fr;
        }
        .navigation {
          grid-column: span 3;
        }
        .main {
          grid-column: 4 / max-content;
          overflow: auto;
        }
      }

      @media screen and (min-width: 60em) {
        .application {
          grid-template-columns: repeat(auto-fill, minmax(64px, 1fr));
          grid-template-rows: 1fr;
        }
        .navigation {
          grid-column: span 3;
        }
        .main {
          grid-column: 4 / max-content;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        }
        .main>div {
          overflow: auto
        }
      }
    `

    const n = ~~(Math.random() * 4) + 1
    return (
      <div className='application w-100 h-100 bg-background-100 f8 ttu tracked'>
        <style type='text/css'>{css}</style>
        <div className='navigation bg-background-40 text-reversed-100 pa2'>
          navigation: {n}
        </div>
        <div className='main'>
          {
            Array(n).fill(0)
              .map(getGrid)
          }
        </div>
      </div>
    )
  })

function getGrid () {
  const n = ~~(Math.random() * 1000) + 120
  const c = d3.scaleSequential(d3.interpolateWarm).domain([0, n])

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(64px, 1fr))',
        gridAutoRows: 'minmax(64px, 64px)',
        alignContent: 'stretch',
        gridAutoFlow: 'row dense',
        gridGap: 1
      }}
    >
      {
        Array(n).fill(0).map((_, index) => (
          Math.random() > 0.99
            ? (
              <div
                key={index}
                className='bg-background-40 text-reversed-100 pa2'
                style={{
                  gridColumn: '1 / -1',
                  // gridColumn: 'span 1',
                  // gridRow: `span ${Math.ceil((Math.random() * 400 + 64) / 64)}`,
                  // gridRow: `span ${Math.ceil((Math.random() * 400 + 64) / 64)}`,
                  // gridRow: '10 / -1',
                  // gridRowEnd: '-10',
                  overflow: 'auto',
                  // background: c(index)
                  background: getGray(c(index))
                }}
              >
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
              </div>
            )
            : (
              <div
                key={index}
                className='bg-background-40 text-reversed-100 pa2'
                style={{
                  gridColumn: `span ${~~(Math.pow(Math.random(), 3) * 4) + 1}`,
                  gridRow: `span ${~~(Math.pow(Math.random(), 3) * 4) + 1}`,
                  background: c(index)
                }}
              >
                {index}
              </div>
            )
        ))
      }
    </div>
  )
}

function getGray (color) {
  const hcl = d3.hcl(color)
  hcl.c = 0
  return hcl.toString()
}
