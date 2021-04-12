## FLASHCARDS 
Create flashcards and study them using spaced reptiton 

Spaced repetition is a technique for efficient memorization which uses repeated review of content following a schedule determined by a spaced repetition algorithm to improve long-term retention.


### How It Works 

The FlashCards App creates 5 different blocks to store your flashcards. Those 5 blocks determine the chance of a flashcard appearing. Percentages are determined 
by following the space reptition algorithm and setting up a percentage based on how often you should be studying based off questions you find easy to the most difficult. 

- Block 1: 50% >  Don't Know
- Block 2: 26% >  Slightly Know
- Block 3: 14% >  Know 
- Block 4: 7%  >  Know Well Enough 
- Block 5: 3%  >  Superior 


### Example 
Test out the application at 




# SET UP 

Clone the repoistry 
```bash
  git clone https://github.com/andypineda/flashcard-with-spaced-repetition-algorithm
```

Go into the flashcard-app folder and install the application 
```bash
  cd flashcard-app 
  npm install 
```

Start the application 
```bash
  npm run dev 
``` 



## Limitations 

#### FlashCard Creation 
- When creating a flashcard there are no conditions to make sure the user has entered text in the textbox and there is no condition to check if the user 
  has selected an answer for the radio button.
  
- There is not an option to delete a question once it has been added 

#### Timer 
- The timer for the enitre quiz is presented once the quiz starts. So the user has no real idea when the flashcard quiz is over 
- Countdown for each question does not take into account the remaining quiz timer so it doesn't present you with more time than you actually have





