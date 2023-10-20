# Epines
L'extension qui vous enlève les épines du pied (et des sites de l'epita) !


# Table of content

* ### [Installation](#installation-1)
* ### [Functionnalities](#functionnalities-1)
    * [intra.forge.epita.fr](#intra.forge.epita.fr)
    * [ionisx.com](#ionisx.com)
    * [debug-pro.com](#debug-pro.com)
    * [moodle.epita.com](#moodle.epita.com)
    * [past-exams.epidocs.eu](#past-exams.epidocs.eu)
* ### [Documentation](#documentation-1)
* ### [How to contribute](#how-to-contribute-1)
* ### [Contributors](#contributors-1)

# Installation

## From official store
  * [Firefox](https://addons.mozilla.org/fr/firefox/addon/epines/)
  * Chrome (Currently from source only because of the manifest)

## From source

### Chrome based browsers:
1. Download the [latest release](https://github.com/Hugueprime/epines/releases)
2. Unzip the downloaded file
3. Go to `chrome://extensions` in chrome and active the developpeur mode (top right)
4. Click "Load unpacked extension" and select the previously unziped folder

:warning: the extension will show an error, this is normal as it still uses the manifest v2 for blocking the default media player of ionisx.

### Firefox based browsers:
1. You will need to seach for yourself on that one.

# Functionnalities 

## [intra.forge.epita.fr](https://intra.forge.epita.fr) <span id="intra.forge.epita.fr">

1. Move assignement on top of assistants' picture (avoiding scroll)
2. Create an animation for the copy button of the git url 

## [ionisx.com](https://ionisx.com) <span id="ionisx.com">

1. Make the header more compact on the modules list
2. Make the course progress container fixed on the side
3. Make module description more compact 

(the removal of theses epines (^) allows the user to see more than 3 modules at the same time)

4. Allow the user to access blocked modules (because the previous one isn't finished which could be the case because it is not in our program...)
5. Create a summary when hovering the button summary in a module because there is not point of a summary in a different page
6. Add deadline for each module because having the information concerning a website on the concerned website is more efficient
7. Add a number to each answer in the module test for a better communication

## [debug-pro.com](http://debug-pro.com) <span id="debug-pro.com">

1. Create a copy button which parses the test commands and the given file
2. Create a copy button which creates the commands to build the architecture
3. Create a copy button which creates the commands to build the AUTHORS file
4. Create a summary when the url is invalid

## [moodle.epita.fr](moodle.epita.fr) <span id="moodle.epita.fr">

1. Make links clickable in feedbacks (why links aren't clickable by default ? just why ?)
2. Create sub categories in courses to have the ability to see where we are on the page
3. Create link to open pdf in a new tab instead on the integrated reader
4. Resize all courses' header (generated images) as it takes a lot of space for nothing
5. Remove all activities the current user has no access
6. Hide description of activities
7. Allow the user to continue navigate the page even when a section/tile is open

## [past-exams.epidocs.eu](past-exams.epidocs.eu) <span id="past-exams.epidocs.eu">

1. Add a popup to see the result of each mcq directly into the pdf

# Documentation

## Video Player

You have the possibility to change the default video player.
Any [invidious instance](https://api.invidious.io/) and [https://youtube.com] should work.

:warning: It's not impossible the amount of time spend on watching videos isn't comptabilize.

## Dates

To have the deadline dates presented on the module list, you have to insert an url.

This url for the **SPE** is ``https://raw.githubusercontent.com/Hugueprime/epines/master/data/s3.json``.

You can click the "fetch" button to update the dates, the last version loaded should be shown below this button on the right, and the left the last time it was updated (theoretically if you go on ionisx and it has been one week, it should auto update).

---
If you want to load your own dates, you can create a json file and heberge it somewhere.

The classes keys in the ``dates`` section are matching the url name when being in the page showing the list of module of a certain field.

Each time you modifiy it you have to increment the version number.


# Contributing to Epines

There is a small thing you would like to see improved on a site you use with epita, **don't be afraid of submitting a new "epines"** (issue).
 
Don't hesitate to create pull request to improve/create some functionnalities, design, or even correct some typo.

## How to contribute

The preferred and easiest way to contribute changes to the project is to fork it on github, and then create a pull request to ask us to pull your changes into our repo (https://help.github.com/articles/using-pull-requests/).

    
You should include reference to the issue(s) related to you PR.

If you add a feature you should include a small description in your PR and in this readme under [Functionnalities](#functionnalities-1). 

# Contributors

@Tim-xd for the amazing copy functionnality on debug pro

@Tim-xd for adding the possibility to change the media player

@Laurane67 for the name, full of meaning, of this extension

@Mzzay for making moodle stop to auto download files
