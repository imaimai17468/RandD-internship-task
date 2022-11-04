import React from "react";
import { render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './Header.stories'

const { Default } = composeStories(stories)

test('render Header with default args', () => {
  render(<Default>Header</Default>)
  const HeaderElement = screen.getByText(/Header/i)
  expect(HeaderElement).not.toBeNull()
})
