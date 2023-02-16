import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"

import QrCodeModal from "@modules/kbz-payment/components/qr-code"
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "KBZ-Qr-Modal",
  component: QrCodeModal,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  //   argTypes: {
  //     backgroundColor: { control: 'color' },
  //   },
} as ComponentMeta<typeof QrCodeModal>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof QrCodeModal> = (args) => (
  <QrCodeModal {...args} />
)

export const Modal = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Modal.args = {
  open: true,
  qrCode: "amm",
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
