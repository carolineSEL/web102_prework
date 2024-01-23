# WEB102 Prework - *Seamonster Games*

Submitted by: **Caroline Lamb**

**Seamonster Games** is a website for the company Sea Monster Crowdfunding that displays information about the games they have funded.

Time spent: **5** hours spent in total

## Required Features

The following **required** functionality is completed:

* [ ] The introduction section explains the background of the company and how many games remain unfunded.
* [ ] The Stats section includes information about the total contributions and dollars raised as well as the top two most funded games.
* [ ] The Our Games section initially displays all games funded by Sea Monster Crowdfunding
* [ ] The Our Games section has three buttons that allow the user to display only unfunded games, only funded games, or all games.

The following **optional** features are implemented:

* [ ] A search bar at the top of the page where users can search for specific games on the site.
* [ ] An animated, gradient background that fits with the "Seamonster" theme of the company.
* [ ] Hover effects on the stats boxes and the game cards that enhances the size of the box and adds a glow around each individual box.
* [ ] Styling on the heading title, "Seamonster Crowdfunding" to draw attention to the title of the company.
* [ ] Color change on the "Show Unfunded Only", "Show Funded Only", and "Show All Games" buttons when the button is selected.
* [ ] A gray color for the H3 and H2 elements to make them stand out against other text. 

## Video Walkthrough

Here's a walkthrough of implemented features:

[Video Walkthrough](https://youtu.be/kBG9nyfFMk4)

video created with [ScreenToGif](https://www.screentogif.com/) for Windows and posted on YouTube. 

## Notes

    While building this app, one of the biggest challenges I faced came when I started implementing new design features. Adding a more complex background design caused some of the functionality of the site to break. For example, the animation that I added to the background overrode the functionality of the "Show Unfunded Only", "Show Funded Only", and "Show All Games" buttons, so that when the buttons were clicked, they no longer had any functionality. I solved this issue by giving the background animation class a negative z index value in css and gave the buttons' css class a higher z index value. 
    I also had some issues when trying to implement the functionality of the buttons to display the correct game cards, because I originally added the "deleteChildElements()" function outside of the function for the buttons, which caused no game cards to display at all. I fixed this issue by only deleting the child elements at the start of the function before adding the code to display the game cards, this way, the previously shown game cards were erased from the UI before displaying the game cards that we wanted to display. 

## License

    Copyright [yyyy] [name of copyright owner]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
