Install node js and git.
Git bash on a desired folder and clone repository into it.
Run "npx cypress run" command on the bash terminal window you have been working.


CREATOR NOTES:
 1) There is a comented line with a TODO. There is an issue with the Search button and cypress that makes the whole thing to fail without any particular error (it just doesn't work for me). 
Therefore i set a hardcoded URL on a cy.visit to represent the expected navigation behaivor of the app and i continue with the test as it is expected
2) There are some waits in the test to let page to properly load when scrolling down to get all posible results on the search. This is mainly for the asked resolution for this challenge
3) Some times the final price assertion fails cause the products change prices from run to run (i did my best to try to calculate it properly for each run); Just rerun the test and see if it works fine on a second run
