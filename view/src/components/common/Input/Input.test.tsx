import React from 'react'
import { render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './Input.stories'

const { Default } = composeStories(stories)

test('render Input with default args', () => {
  render(<Default>Input</Default>)
  const InputElement = screen.getByText(/Input/i)
  expect(InputElement).not.toBeNull()
})
