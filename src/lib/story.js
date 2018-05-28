// @flow
import React from 'react'
import * as d3 from 'd3'
import hsluv from 'hsluv'
import { storiesOf } from '@storybook/react'

storiesOf('Layouts', module)
  .add('complex grid', () => {
    const styles = {
      application: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(64px, 1fr))',
        gridGap: 1,
        padding: 1
      },
      sidebar: {
        gridColumn: 'span 2'
      },
      grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(64px, 1fr))',
        gridAutoRows: 'minmax(64px, 64px)',
        alignContent: 'stretch',
        gridAutoFlow: 'row dense',
        gridGap: 1,
        gridColumn: '3 / content-max'
      }
    }

    const n = ~~(Math.random() * 5000) + 120
    const c = d3.scaleSequential(d3.interpolateWarm).domain([0, n])

    return (
      <div className='w-100 h-100 bg-background-100 f8 ttu tracked' style={styles.application}>
        <div className='bg-background-40 text-reversed-100 pa2' style={styles.sidebar}>
          sidebar
        </div>
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
              >
                {index}
              </div>
            ))
          }
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
                  gridColumn: '1 /-1',
                  gridRow: `span ${Math.ceil((Math.random() * 400 + 64) / 64)}`,
                  // background: c(index)
                  background: getGray(c(index))
                }}
              >
                {index}
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
  // const rgb = d3.rgb(color)
  // const interim = hsluv.rgbToHsluv([rgb.r / 255, rgb.g / 255, rgb.b / 255])
  // interim[1] = 0
  // const output = hsluv.hsluvToRgb(interim).map((d) => d * 255)
  // return `rgb(${output.join(', ')})`
  const hcl = d3.hcl(color)
  hcl.c = 0
  return hcl.toString()
}
