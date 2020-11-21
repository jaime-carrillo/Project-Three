# Project-Three

## Requirement #1: Find a problem worth solving, analyzing, or visualizing.
Our Problem: What data can we use to help reduce the number of people who use the emergency room for unurgent visits.  These are people with healthcare problems that could be solved by a primary care facility other than hospitals.

Our initial approach was to use ML to identify factors that lead to "Frequent Flyers" who abuse the ED system.

## Requirement #2: Use ML
We used supervised learning, where the goal is to learn the relationship between training inputs and training targets.

## Requirement #3: You must use: Scikit-Learn and/or another machine learning library
We tested all our inputs and targets with two differnt libraries:
- The Sequential model (tensorflow.keras)
- Scikit-Learn C-Support Vector Classification (sklearn.svm)

To explore our ML, open the "python" folder. Here you will see 3 different approaches:
- facilities
- hospitals 
- patients

The facilities models inputted aggregate patient characteristics data to classify clinics into 2 groups (above average or below the group average).  The target was a specific type of patient population (i.e., gender, insurance, age, etc.).

The hospital models inputted aggregate utilization data to classify clinics into 2 groups (above average or below the group average).  The target was the ratio between non-urgent ED visits and urgent visits (to compensate for hospitals' size).  We applied the targets to another dataset containing patient population characteristics (i.e., gender, insurance, age, etc.) 

The patients models used patient characteristics (per patient) to classify each patient as a potential frequent flyer or not. This model proved not to be supported by enough data.

## Requirement #4: Technical requirements

We used a variety of technologies and libraries, including the following:
- Python Pandas
- HTML/CSS/Bootstrap
- JavaScript Plotly
- JavaScript Leaflet
- SQL Database (sqllite)

## Requirement #5: Host application using Heroku or a tool of your choice.
We chose Heroku to host our flask app, but please be a little patient with loading the pages. It is much slower than hosting it locally!