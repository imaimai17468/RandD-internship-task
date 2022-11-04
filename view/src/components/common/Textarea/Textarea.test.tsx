import React from 'react'
import { render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './Textarea.stories'

const { Default } = composeStories(stories)

test('render Textarea with default args', () => {
  render(<Default>Textarea</Default>)
  const TextareaElement = screen.getByText(/Textarea/i)
  expect(TextareaElement).not.toBeNull()
})
