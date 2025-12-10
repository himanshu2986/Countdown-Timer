Project Title: Countdown Timer
Technologies Used: HTML, CSS, JavaScript

Objective:
The project creates a web-based countdown timer. Users can set a specific future date and time, and the app displays the remaining time in days, hours, minutes, and seconds. The timer updates in real time.

Main Features:

Input fields for event title and target date & time (datetime-local).

“Start Countdown” button to create a timer.

Live countdown display in the format DDd HHh MMm SSs.

When the target time is reached, the timer shows 00d 00h 00m 00s, the card gets a green border, and a pulse animation highlights that the time is up.

Users can create multiple countdowns on the same page (optional enhancement).

Each timer can be individually removed with a Remove button.

Stylish, responsive UI using custom CSS (optional enhancement with animations).

How It Works (JavaScript logic):

When the form is submitted, JavaScript reads the title and date-time.

It converts the date-time into milliseconds (new Date(...).getTime()).

A timer object is stored in an array, and a card is created in the DOM.

A single setInterval runs every second and updates all timers:

It computes the difference between the current time and target time.

It converts this difference into days, hours, minutes, and seconds.

It updates the text inside each timer card.

If the difference is zero or negative, the timer is marked as finished and animated.