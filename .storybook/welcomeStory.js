import React from "react";
import { storiesOf } from "@storybook/react";
import { wInfo } from "./utils";
import holoVault from './holoVault.md'

storiesOf("Welcome", module).addWithJSX(
  "to your new Holochain🎊",
  wInfo(`
    # Storybook of Holochain hApps
    Explore the Storybook and learn about the UI Components we have built so far. Each component has a story written about it along with its Specifications
    and a running instance of the component. We use this Storybook to communicate a complete story of what we are building and designing with continuous testing
    ensuring everything always works. We don't find bugs we prevent them.

    ## Building Holochain hApps
    **This is how we do it**
    (Processes for getting to a "let's build it" and then building it are coming soon with Errand.)

    1. Write a Story in Storybook for each state of the component
      - eg Add, Edit, List
    1. Write Notes in Mark Down to describing the story.
    1. As you think of things to verify write them down with intentional test names as Specs
      - Tests run all the time in Jest
      - Tests show up as Specifications in Storybook
      - Anyone can add new tests or edit the Notes by editing the files on GitHub
      - We aim for [contravariance with tests.]('http://blog.cleancoder.com/uncle-bob/2017/10/03/TestContravariance.html')
    1. Update Notes tab with the new Sketch design of UI
      - drop a base64 image in the notes mark down
      - for now we reference the designs through Sketch
    1. Write prototype steps in Cypress
      - Would be cool to finish the loop and generate Sketch prototypes from Cypress.

  `)(() => <img src="/" alt="image goes here" width="40%" />)
);

storiesOf("HoloVault", module).addWithJSX(
  "Keep your data private",
  wInfo(holoVault)(() => <div>Image from Sketch</div>)
);
