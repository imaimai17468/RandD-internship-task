import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Chat from './Chat'

export default {
  title: 'Chat',
  component: Chat,
} as ComponentMeta<typeof Chat>

const Template: ComponentStory<typeof Chat> = (args) => <Chat {...args} />

export const Default = Template.bind({})
Default.args = {
  position: 'left',
  message:
    'Everyone has the right to an effective remedy by the competent national tribunals for acts violating the fundamental rights granted him by the constitution or by law.',
  name: 'John Doe',
  time: '2021/01/01 00:00:00',
}
