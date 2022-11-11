import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Room from './Room'

export default {
  title: 'Room',
  component: Room,
} as ComponentMeta<typeof Room>

const Template: ComponentStory<typeof Room> = (args) => <Room {...args} />

export const Default = Template.bind({})
Default.args = {
  title: 'title',
  description: 'description',
  created_at: '2021/10/10 10:10:10',
}
