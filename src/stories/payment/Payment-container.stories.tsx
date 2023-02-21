import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import OptionsContainer from "@modules/common/components/payment-options/components/options-container"
import PaymentPageStory from "./components/payment-page"
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
function QrIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="black"
      className="w-9 h-9 sm:w-28 sm:h-28 max-w-full"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z"
      />
    </svg>
  )
}
export default {
  title: "Payment Container",
  component: PaymentPageStory,
  // decorators: [
  //   (Story) => (
  //     <MockPaymentProvider>
  //       <Story />
  //     </MockPaymentProvider>
  //   ),
  // ],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   paymentMethod:{}
  // },
} as ComponentMeta<typeof PaymentPageStory>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof PaymentPageStory> = (args) => (
  <PaymentPageStory {...args} />
)

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  total: "15000",
  updatingPaymentSession: false,
}
Primary.argTypes = {
  paymentMethod: {
    options: ["QR", "APP"],
    control: { type: "radio" },
  },
}
