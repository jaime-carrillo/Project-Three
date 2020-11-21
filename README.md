# Project-Three

## Requirement #1: Find a problem worth solving, analyzing, or visualizing.
Our Problem: What are the features that lead to a “frequent flyer”? Based on some research in our previous project, we hypnotized that some of the features stem from age, race, gender, income, insurance, social support, convenience, cost, and access to care.

## Requirement #2: Use ML
We used supervised learning, where the goal is to learn the relationship between training inputs and training targets.

## Requirement #3: You must use: Scikit-Learn and/or another machine learning library
We tested all our inputs and targets with two differnt libraries:
- The Sequential model (tensorflow.keras)
- Scikit-Learn C-Support Vector Classification (sklearn.svm)

To explore our ML, open the "python" folder. Here you will see 3 different approaches:
- patients
- hospitals
- facilities

The patient models used patient characteristics (per patient) to classify each patient as a potential frequent flyer or not. This model proved not to be supported by enough data.
 
The hospital models inputted aggregate utilization data to classify clinics into 2 groups (above average or below the group average).  The target was the ratio between non-urgent ED visits and urgent visits (to compensate for hospitals' size).  We applied the targets to another dataset containing patient population characteristics (i.e., gender, insurance, age, etc.) 

Both the Sequential model and the Vector Classification were unimpressive, around in the 60s. The precision heavily favored the true targets, while the recall favored the false targets.  So, the model was sold on in identifying the patient characteristics to predict if an ED is above the average with non-admissions. However, the model was better at predicting EDs that were below the average with non-admissions. On the graph that the larger the hospital, the less accurate BUT, the smaller the hospital, the more accurate it is.

The facilities models inputted aggregate patient characteristics data to classify clinics into 2 groups (above average or below the group average).  The target was a specific type of patient population (i.e., gender, insurance, age, etc.).

The Sequential model outperformed the Vector Classification with an accuracy consitantly in the low 80s compared to high 70s.  The model was much better at finding actual false targets with the precision, recall, and f1-scores in the mid 80s.  Meaning, the model is better at predicting those facitilies who are below average in supporting the targeted patient characteristics.

## Requirement #4: Technical requirements

We used a variety of technologies and libraries, including the following:
- Python Pandas
- Seaborn
- HTML/CSS/Bootstrap
- JavaScript Plotly
- JavaScript Leaflet
- SQL Database (sqllite)

## Requirement #5: Host application using Heroku or a tool of your choice.
We chose Heroku to host our flask app, but please be a little patient with loading the pages. It is much slower than hosting it locally!