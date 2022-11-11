import React from 'react'
import { render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './Room.stories'

const { Default } = composeStories(stories)

test('render Room with default args', () => {
  render(<Default>Room</Default>)
  const RoomElement = screen.getByText(/Room/i)
  expect(RoomElement).not.toBeNull()
})
