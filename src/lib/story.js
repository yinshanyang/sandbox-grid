// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'

storiesOf('Layouts', module)
  .add('grid', () => {
    const styles = {
      grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gridGap: 8
      }
    }

    return (
      <div className='w-100 bg-background-80' style={styles.grid}>
        {
          Array(20).fill(0).map((_, index) => (
            <div key={index} className='bg-primary-10 aspect-ratio aspect-ratio--16x9'>{index}</div>
          ))
        }
      </div>
    )
  })
  .add('complex grid', () => {
    const styles = {
      application: {
        display: 'grid',
        // gridTemplateColumns: 'minmax(240px, 1fr) 4fr',
        gridTemplateColumns: 'repeat(auto-fill, minmax(64px, 1fr))',
        gridGap: 8,
        padding: 8
      },
      sidebar: {
        gridColumn: 'span 2'
      },
      grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(64px, 1fr))',
        gridAutoRows: 'minmax(64px, 64px)',
        alignContent: 'stretch',
        gridAutoFlow: 'dense',
        gridGap: 8,
        gridColumn: '3 / content-max'
      }
    }

    return (
      <div className='w-100 h-100 bg-background-100 f8 ttu tracked' style={styles.application}>
        <div className='bg-background-40 text-reversed-100 pa2' style={styles.sidebar}>
          sidebar
        </div>
        <div className='overflow-auto' style={styles.grid}>
          {
            Array(~~(Math.random() * 100) + 30).fill(0).map((_, index) => (
              <div
                key={index}
                className='bg-background-40 text-reversed-100 pa2'
                style={{
                  gridColumn: `span ${~~(Math.pow(Math.random(), 3) * 4) + 1}`,
                  gridRow: `span ${~~(Math.pow(Math.random(), 3) * 4) + 1}`
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
  .add('inline', () => (
    <div
      style={{
        padding: 8
      }}
      className='h-100 flex flex-wrap items-start content-start'
    >
      {
        Array(~~(Math.random() * 20) + 20).fill(0).map(() => (
          <div
            style={{
              padding: 8
            }}
          >
            <div
              className='bg-background-50'
              style={{
                height: 4 * 16,
                width: (~~(Math.random() * 4) + 1) * 3 * 16
              }}
            />
          </div>
        ))
      }
    </div>
  ))
  .add('two-column', () => (
    <div
      style={{
        padding: 8
      }}
      className='h-100 flex'
    >
      <div
        style={{
          padding: 8
        }}
        className='flex-none'
      >
        <div
          className='bg-background-50 h-100'
          style={{
            width: 12 * 16
          }}
        />
      </div>
      <div
        className='flex-auto'
        style={{
          padding: 8
        }}
      >
        <div
          className='bg-background-50 w-100 h-100'
        />
      </div>
    </div>
  ))
  .add('nested columns', () => (
    <div
      style={{
        padding: 8
      }}
      className='h-100 flex'
    >
      <div
        style={{
          padding: 8
        }}
        className='flex-none'
      >
        <div
          className='bg-background-50 h-100'
          style={{
            width: 12 * 16
          }}
        />
      </div>
      <div
        className='flex-auto'
        style={{
          padding: 8
        }}
      >
        <div
          className='bg-background-50 w-100 h-100'
        >
          <div className='w-100 h-100 flex flex-column'>
            <div
              style={{
                padding: 8
              }}
              className='flex-none'
            >
              <div
                className='bg-secondary-50 h-100'
                style={{
                  height: 12 * 16
                }}
              />
            </div>
            <div
              className='relative flex-auto'
              style={{
                padding: 8
              }}
            >
              <div
                className='bg-primary-50 absolute top-0 bottom-0 left-0 right-0'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  ))
