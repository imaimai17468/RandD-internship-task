import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Textarea } from './Textarea'

export default {
  title: 'Textarea',
  component: Textarea,
} as ComponentMeta<typeof Textarea>

const Template: ComponentStory<typeof Textarea> = (args) => (
  <Textarea {...args}>{args.children}</Textarea>
)

export const Default = Template.bind({})
Default.args = {
  children: 'Textarea',
}
