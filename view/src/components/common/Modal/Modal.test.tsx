import React from "react";
import { render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './Modal.stories'

const { Default } = composeStories(stories)

test('render Modal with default args', () => {
  render(<Default>Modal</Default>)
  const ModalElement = screen.getByText(/Modal/i)
  expect(ModalElement).not.toBeNull()
})
