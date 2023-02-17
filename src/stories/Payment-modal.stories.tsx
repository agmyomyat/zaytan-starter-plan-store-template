import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import PaymentModal from "@modules/payment/components/payment-modal"
import { QRCodeSVG } from "qrcode.react"

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Payment Modal",
  component: PaymentModal,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  //   argTypes: {
  //     backgroundColor: { control: 'color' },
  //   },
} as ComponentMeta<typeof PaymentModal>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof PaymentModal> = (args) => (
  <PaymentModal {...args}>
    <div className="w-full p-4 rounded-t shadow-[0px_5px_10px_-7px_rgba(0,0,0,0.3)] border-gray-400">
      <h3 className="text-start text-sm sm:text-lg text-gray-900">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="mr-2 inline w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        Scan With Mobile App
      </h3>
    </div>
    <QRCodeSVG value={"amm"} className="w-96 h-96 p-10 max-w-full" />
  </PaymentModal>
)

export const Modal = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Modal.args = {
  open: true,
}

// export const Secondary = Template.bind({});
// Secondary.args = {

// };

// export const Large = Template.bind({});
// Large.args = {
//   size: 'large',
//   label: 'Button',
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: 'small',
//   label: 'Button',
// };
