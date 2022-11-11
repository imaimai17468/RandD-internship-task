import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Modal from './Modal'

export default {
  title: 'Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>

const Template: ComponentStory<typeof Modal> = (args) => (
  <Modal {...args}>{args.children}</Modal>
)

export const Default = Template.bind({})
Default.args = {
  children: <div>TEST</div>,
  setisOpen: () => {},
}
