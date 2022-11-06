import React from 'react'
import { render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './Chat.stories'

const { Default } = composeStories(stories)

test('render Chat with default args', () => {
  render(<Default>Chat</Default>)
  const ChatElement = screen.getByText(/Chat/i)
  expect(ChatElement).not.toBeNull()
})
