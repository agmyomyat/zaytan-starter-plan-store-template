import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import { HomePageDemoWarning } from "."

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Demo/HomePageWarining",
  component: HomePageDemoWarning,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  //   argTypes: {
  //     backgroundColor: { control: 'color' },
  //   },
} as ComponentMeta<typeof HomePageDemoWarning>
const Template: ComponentStory<typeof HomePageDemoWarning> = (args) => (
  <HomePageDemoWarning />
)

export const Open = Template.bind({})
