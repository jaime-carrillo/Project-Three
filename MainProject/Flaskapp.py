import numpy as np
import pandas as pd

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

import datetime as dt
from datetime import date, timedelta

from flask import Flask, jsonify

from flask_cors import CORS



#################################################
# Database Setup
#################################################

# Connect to file
engine = create_engine("sqlite:///data/Facilities.sqlite")

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Hospitals = Base.classes.hospitals
Licensed  = Base.classes.LosAnglesCountyLicData
Encounters = Base.classes.encounters
# Hospitals_Encounters = Base.classes.hospitals_avg_encounters
Ed = Base.classes.LA_ed_data
Food = Base.classes.Food_Pantry
Access = Base.classes.AccessToCare
Profiles = Base.classes.Health_Profiles
Enrolled = Base.classes.Enrolled_MediCal

#################################################
# Flask Setup
#################################################
app = Flask(__name__)
CORS(app)

#################################################
# Flask Routes
#################################################
# / Home page.
# List all routes that are available.

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/hospitals<br/>"
        f"/api/v1.0/facilities<br/>"
        f"/api/v1.0/encounters<br/>"
        f"/api/v1.0/hospitals&encounters<br/>"
        f"/api/v1.0/ed<br/>"
        f"/api/v1.0/food<br/>"
        f"/api/v1.0/hd<br/>"
        f"/api/v1.0/profiles<br/>"
        f"/api/v1.0/enrolled<br/>"
    )


#################################################
# /api/v1.0/precipitation
# Convert the query results to a dictionary using date as the key and prcp as the value.
# Return the JSON representation of your dictionary.
#################################################


@app.route("/api/v1.0/hospitals")
def hospitals():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of dates for each prcp value"""
    # Query all dates and tobs
    results = session.query(Hospitals.OSHPD_ID, Hospitals.LATITUDE, Hospitals.LONGITUDE, Hospitals.FACILITY_NAME, Hospitals.DBA_ADDRESS1,Hospitals.DBA_CITY, Hospitals.DBA_ZIP_CODE).\
        order_by(Hospitals.OSHPD_ID).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_hospitals
    all_hospitals = []
    for id, lat, lon, name, address, city, zip in results:
        hoptial_dict = {}
        hoptial_dict["ID"] = id
        hoptial_dict["LATITUDE"] = lat
        hoptial_dict["LONGITUDE"] = lon
        hoptial_dict["FACILITY_NAME"] = name
        hoptial_dict["DBA_ADDRESS1"] = address
        hoptial_dict["DBA_CITY"] = city
        hoptial_dict["DBA_ZIP_CODE"] = zip
        all_hospitals.append(hoptial_dict)

    return jsonify(all_hospitals)


# @app.route("/api/v1.0/hospitals&encounters")
# def hos_enc():
#     # Create our session (link) from Python to the DB
#     session = Session(engine)

#     """Return a list of dates for each prcp value"""
#     # Query all dates and tobs
#     results = session.query(Hospitals_Encounters.OSHPD_ID, Hospitals_Encounters.LATITUDE, Hospitals_Encounters.LONGITUDE, Hospitals_Encounters.FAC_NAME, Hospitals_Encounters.DBA_ADDRESS1,Hospitals_Encounters.DBA_CITY, Hospitals_Encounters.DBA_ZIP_CODE, Hospitals_Encounters.TOTAL_NUMBER_BEDS, Hospitals_Encounters.NET_TOT, Hospitals_Encounters.AvgAdmits, Hospitals_Encounters.AvgVisits).\
#         order_by(Hospitals_Encounters.OSHPD_ID).all()

#     # results = session.query(Hospitals_Encounters.OSHPD_ID, Hospitals_Encounters.LATITUDE).\
#     #     order_by(Hospitals_Encounters.OSHPD_ID).all()


#     session.close()

    # Create a dictionary from the row data and append to a list of all_hospitals
    all_hospitals = []

    for id, lat, lon, name, address, city, zip, bed, net, admit, visit in results:
        hoptial_dict = {}
        hoptial_dict["ID"] = id
        hoptial_dict["LATITUDE"] = lat
        hoptial_dict["LONGITUDE"] = lon
        hoptial_dict["FACILITY_NAME"] = name
        hoptial_dict["DBA_ADDRESS1"] = address
        hoptial_dict["DBA_CITY"] = city
        hoptial_dict["DBA_ZIP_CODE"] = zip
        hoptial_dict["TOTAL_NUMBER_BEDS"] = bed
        hoptial_dict["NET_TOT"] = net
        hoptial_dict["AvgAdmits"] = admit
        hoptial_dict["AvgVisits"] = visit
        all_hospitals.append(hoptial_dict)

    return jsonify(all_hospitals)

@app.route("/api/v1.0/facilities")
def facilities():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of dates for each prcp value"""
    # Query all dates and tobs
    results = session.query(Licensed.OSHPD_ID, Licensed.FACILITY_NAME, Licensed.LATITUDE, Licensed.LONGITUDE, Licensed.LICENSE_CATEGORY_DESC ).\
        filter(Licensed.LICENSE_CATEGORY_DESC == "Community Clinic").\
        order_by(Licensed.OSHPD_ID).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_facilities
    all_facilities = []
    for id, name, lat, lon, type in results:
        facilities_dict = {}
        facilities_dict["Id"] = id
        facilities_dict["Name"] = name
        facilities_dict["LATITUDE"] = lat
        facilities_dict["LONGITUDE"] = lon
        facilities_dict["Type"] = type
        all_facilities.append(facilities_dict)

    return jsonify(all_facilities)


@app.route("/api/v1.0/encounters")
def encounters():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of dates for each prcp value"""
    # Query all dates and tobs
    results = session.query(Encounters.oshpd_id, Encounters.facility_name, Encounters.year, Encounters.type,  Encounters.count).\
        order_by(Encounters.year).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_facilities
    all_encounters = []
    for id, name, year, type, count in results:
        encounters_dict = {}
        encounters_dict["oshpd_id"] = id
        encounters_dict["facility_name"] = name
        encounters_dict["Year"] = year
        encounters_dict["Type"] = type
        encounters_dict["Count"] = count
        all_encounters.append(encounters_dict)

    return jsonify(all_encounters)

@app.route("/api/v1.0/ed")
def ed():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of dates for each prcp value"""
    # Query all dates and tobs
    results = session.query(Ed.oshpd_id, Ed.facility_name, Ed.DBA_ADDRESS1,Ed.DBA_CITY, Ed.DBA_ZIP_CODE, Ed.licensed_bed_size, Ed.control_type_desc, Ed.ED_Visit, Ed.Medi_Cal, Ed.Medicare, Ed.Other_Payer, Ed.SelfPay, Ed.DX_Symptoms, Ed.HispanicorLatino, Ed.NonHis).\
        order_by(Ed.oshpd_id).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_hospitals
    all_hospitals = []

    for id, name, address, city, zip, bed, type, visits, medical, medicare, other, self, dx, his, non in results:
        hoptial_dict = {}
        hoptial_dict["oshpd_id"] = id
        hoptial_dict["facility_name"] = name
        hoptial_dict["DBA_ADDRESS1"] = address
        hoptial_dict["DBA_CITY"] = city
        hoptial_dict["DBA_ZIP_CODE"] = zip
        hoptial_dict["licensed_bed_size"] = bed
        hoptial_dict["control_type_desc"] = type
        hoptial_dict["ED_Visit"] = visits
        hoptial_dict["Medi_Cal"] = medical
        hoptial_dict["Medicare"] = medicare
        hoptial_dict["Other_Payer"] = other
        hoptial_dict["SelfPay"] = self
        hoptial_dict["DX_Symptoms"] = dx
        hoptial_dict["HispanicorLatino"] = his
        hoptial_dict["Non-HispanicorNon-Latino"] = non

        all_hospitals.append(hoptial_dict)

    return jsonify(all_hospitals)

@app.route("/api/v1.0/food")
def food():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of dates for each prcp value"""
    # Query all dates and tobs
    results = session.query(Food.Name, Food.Description, Food.Latitude, Food.Longitude, Food.Type, Food.StreetAddress, Food.City, Food.State, Food.ZipCode).\
        order_by(Food.Name).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_facilities
    all_food_pantries = []
    for name, desc, lat, lon, tyoe, address, city, st, zip in results:
        food_pantries_dict = {}
        food_pantries_dict["name"] = name
        food_pantries_dict["Description"] = desc
        food_pantries_dict["Latitude"] = lat
        food_pantries_dict["Longitude"] = lon
        food_pantries_dict["Type"] = tyoe
        food_pantries_dict["StreetAddress"] = address
        food_pantries_dict["City"] = city
        food_pantries_dict["State"] = st
        food_pantries_dict["ZipCode"] = zip
        
        # food_pantries_dict["Count"] = count
        all_food_pantries.append(food_pantries_dict)

    return jsonify(all_food_pantries)

@app.route("/api/v1.0/hd")
def hd():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of dates for each prcp value"""
    # Query all dates and tobs
    results = session.query(Access.HealthDistrict, Access.Percent, Access.Estimated).\
        order_by(Access.HealthDistrict).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_facilities
    all_access = []
    for name, per, est in results:
        access_dict = {}
        access_dict["HealthDistrict"] = name
        access_dict["Percent"] = per
        access_dict["Estimated"] = est

        all_access.append(access_dict)

    return jsonify(all_access)


@app.route("/api/v1.0/profiles")
def profiles():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of dates for each prcp value"""
    # Query all dates and tobs
    results = session.query(Profiles.GEONAME, Profiles.Pop_Tot, Profiles.Pop_Tot_Per, Profiles.Prop_65y, Profiles.Prop_65y_rank, Profiles.Poverty, Profiles.Poverty_rank,Profiles.Median_incoms, Profiles.MI_rank, Profiles.Farmers_market,Profiles.Farmers_market_rank, Profiles.Food_insecurity, Profiles.Food_insecurity_rank, Profiles.School_Meals, Profiles.School_Meals_rank, Profiles.Health_index, Profiles.Health_index_rank ).\
        order_by(Profiles.Health_index).all()
        
    session.close()

    # Create a dictionary from the row data and append to a list of all_proflies
    all_proflies = []
    for name, tot, totP, age, age_r, poverty, povertyR, mi, mirank, market, marketrank, food, foorank, meal, mealrank, idx, idxrank in results:
        profile_dict = {}
        profile_dict["GEONAME"] = name
        profile_dict["Pop_Tot"] = tot
        profile_dict["Pop_Tot_Per"] = totP
        profile_dict["Prop_65y"] = age
        profile_dict["Prop_65y_rank"] = age_r
        profile_dict["Poverty"] = poverty
        profile_dict["Poverty_rank"] = povertyR
        profile_dict["Median_incoms"] = mi
        profile_dict["MI_rank"] = mirank
        profile_dict["Farmers_market"] = market
        profile_dict["Farmers_market_rank"] = marketrank
        profile_dict["Food_insecurity"] = food
        profile_dict["Food_insecurity_rank"] = foorank
        profile_dict["School_Meals"] = meal
        profile_dict["School_Meals_rank"] = mealrank
        profile_dict["Health_index"] = idx
        profile_dict["Health_index_rank"] = idxrank

        all_proflies.append(profile_dict)

    return jsonify(all_proflies)


@app.route("/api/v1.0/enrolled")
def enrolled():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of dates for each prcp value"""
    # Query all dates and tobs
    results = session.query(Enrolled.Latitude, Enrolled.Longitude, Enrolled.Provider_Legal_Name, Enrolled.Provider_Type_Code_Desc).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_facilities
    all_enrolled = []
    for lat, lon, name, type in results:
        enrolled_dict = {}
        enrolled_dict["Name"] = name
        enrolled_dict["LATITUDE"] = lat
        enrolled_dict["LONGITUDE"] = lon
        enrolled_dict["Type"] = type
        all_enrolled.append(enrolled_dict)

    return jsonify(all_enrolled)

#################################################
# Code to run app
#################################################
if __name__ == '__main__':
    app.run(debug=True)





