# Friend Finder - Node and Express Servers

## Overview

This is a compatibility-based "Friend Finder" application. It will take in the results of a short 10 question survey from the user, then compare the answers with those from other users. The app will then display the name and picture of the user with the best overall match.

This application uses Express to handle routing. And is deployed on Heroku.

## Technologies
  * HTML5
  * CSS + Bootstrap
  * Javascript
  * Node.js
  * npm - Chosen
  * npm - Express
  * Heroku

## Match Magic
This application compares the difference between the current user's suvery score against those from previous users, question by question. Then add up the difference to calculate the **Total Difference**. This is then used as the **compatibility score**. Lower score signals superior compatibility.
```
Example:
  * Current user: [5, 1, 4, 4, 5, 1, 2, 5, 4, 1]
  * User 1: [3, 2, 6, 4, 5, 1, 2, 5, 4, 1]`
  * Differences: [2, 1, 2, 0, 0, 0, 0, 0, 0, 0]
  * Total Difference: 2 + 1 + 2 = 5 //Compatibility score
```  
**Accounting for Multiples**
>There is always a possiblity where the current user is equally compatible with two or more previoius users. This application deals with that possiblity by serving back one of the matches at random.

## Improvements
  * Add validation for photo URL - either RegEx or see if URL is actually active as image src
  * Improve look
