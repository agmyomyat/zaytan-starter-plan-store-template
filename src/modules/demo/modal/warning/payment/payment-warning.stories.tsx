import { ComponentStory, ComponentMeta } from "@storybook/react"
import { PaymentWarning } from "."

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Demo/PaymentWarning",
  component: PaymentWarning,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  //   argTypes: {
  //     backgroundColor: { control: 'color' },
  //   },
} as ComponentMeta<typeof PaymentWarning>
const Template: ComponentStory<typeof PaymentWarning> = (args) => (
  <PaymentWarning {...args} />
)

export const Open = Template.bind({})
Open.args = {
  open: true,
  continueAction: () => alert("do not pay Please do not pay"),
}
