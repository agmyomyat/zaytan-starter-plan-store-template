import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import PinModalStory from "./Aya-Pin-Modal"

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Aya Pin Modal",
  component: PinModalStory,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  //   argTypes: {
  //     backgroundColor: { control: 'color' },
  //   },
} as ComponentMeta<typeof PinModalStory>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof PinModalStory> = (args) => (
  <PinModalStory {...args} />
)

export const StepOne = Template.bind({})
export const StepTwo = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
StepOne.args = {
  open: true,
  loading: false,
  paymentSteps: "phone_info",
}
StepTwo.args = {
  open: true,
  loading: true,
  paymentSteps: "waiting_for_payment",
}
