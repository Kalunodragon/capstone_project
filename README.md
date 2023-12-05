# RADS

## Ramp Agent Digital Scheduling

>Welcome! If you have stumbled upon this project then you have come across my Capstone Project for Flatirons Full-Stack Development.

### App Information / Background information
This is the Ramp Agent Digital Scheduling application (RADS for short). This application was built as a solution to a complex problem that I encountered often in my career with the Airlines, schedule bidding. This application is intended to simplify the whole process for both Admin members as well as Ramp Agent Employees. In this application I implemented the use of the Twilio-Ruby gem allowing the application the ability to notify Employees via SMS message once a schedule bid had been awarded with pertinent information such as schedule time frame, shift times for each day of the week, as well as a notification if they were not awarded a line due to insufficient lines added to the bid.

## Installation

* Fork and Clone Repo down to local environment
* Navigate into that directory
* `bundle install`
* `npm install && npm start --prefix client/`

>This should open the project in the Browser, if it doesn't navigate to [localhost:4000](http:localhost:4000).

Backend:
* Create database using postgresql, can switch to sqlite3 if needed (some work required)
* once done `sudo service postgresql start`
* `rails db:create db:migrate`
    * if using seed data `rails db:seed` change the names and passwords in the `db/seeds.rb` file to have different login info.
    * _**IMPORTANT:** Must have an admin member before login to create new employees. Sample seed data should already exist_
* `rails s` to start server

Project should be fully live at this point.

## Landing Page

The Application will open on a login screen Login as Admin or Employee uses the same page.

>Admin members will see RADS-ADMIN across the top of the page

Admin can navigate to Employees, Shifts, Schedules, App Info, and Main page from left drawer.

>Employees will see RADS across the top of the page

Employees can navigate to Bidding, Schedule, App Info, and Main. Calendar will be a future add.

Both Admin and Employees on the Right drawer can access their own profile. Further once in their profile they can edit their profile from the same drawer. They will also notice the logout section in this same drawer.

## Video Demo Walkthrough

Here is a video walkthrough of how to use all current features of the app for version ALPHA of the App. As the app updates some of these features may change. Notes of those changes will follow this section.

## Changes Since ALPHA

None to note at this time.

## Additional Information

### Admin Client Side (RADS-ADMIN)

Admin members when Logged in have the abilities listed below:
* Creation of:
    * Shifts
    * Employees
    * Schedules
* Update ability for:
    * Changing Employee information
    * Changing Employee to Admin Member

### Employee Client Side (RADS)

Employee members when logged in have the abilities 
* Creation of Bids
* Update and change phone number and email

### Future Implimentations

Admin future goals:
* General messaging system - Admin <-> Admin / Admin <-> Employee
* Creation of:
    * Awarded Line after Bid close
* Update ability for:
    * Changing Schedule Lines
    * Have Schedules have different shifts in one line
* Auto generated Daily Workforce
* Instantaneous updates to workforce due to trades or call-outs

Employees future goals:
* General messaging system
* Shift Trading
    * Individual shifts
    * Buddy Bids
    * Vacations
* Digital call-out

More ideas to follow as well.

## Thank you!

Thank you for stopping by! Copywrite 2023 Andrew Onulak

<!-- ###### END OF LINE -->


<!-- Comments on where to pick back up -->
<!--
    -Test full application
    -Record video
    -Create better README for the full application
    -Start Cleaning up code.
        -Create new components if needed to help break apart larger components (single functionality mindset)
    -DRY out Backend
-->