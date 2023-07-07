# Import the dependencies.
import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///countries.sqlite")

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(autoload_with=engine)

# Save references to each table
Country = Base.classes.countries

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################

@app.route('/')
def welcome():
    """List all available routes"""
    return(
        f'Availabe routes:<br>'
        f'/api/v1.0/countries<br>'
        f'/api/v1.0/countrymetadata/<country>'
    )

@app.route('/api/v1.0/countries')
def countries():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all countries available in the data"""
    #Query data
    query_results = session.query(Country.country).all()
    
    session.close()
    
    # Convert list of tuples into normal list
    all_countries = list(np.ravel(query_results))

    return jsonify(all_countries)

@app.route('/api/v1.0/countrymetadata/<name>')
def metadata(name):
     # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return country metadata: country, area, cca2, cca3, growthRate, density, pop1980, pop2000,
    pop2010, pop2022, pop2023, pop2030, pop2050"""
    # Query all countries
    query_results = session.query(Country.country, Country.area, Country.cca2, Country.cca3,
                                  Country.growthRate, Country.density, Country.pop1980,
                                  Country.pop2000, Country.pop2010, Country.pop2022,
                                  Country.pop2023, Country.pop2030, 
                                  Country.pop2050) \
    .filter(func.lower(Country.country) == func.lower(name)).all()

    session.close()
    
    # Create a dictionary to hold data
    country_data = []

    for country, area, cca2, cca3, growthRate, density, pop1980, pop2000, pop2010, \
    pop2022, pop2023, pop2030, pop2050 in query_results:
        country_dict = {}
        country_dict["country"] = country
        country_dict["area"] = area
        country_dict["cca2"] = cca2
        country_dict["cca3"] = cca3
        country_dict["growthRate"] = growthRate
        country_dict["density"] = density
        country_dict["pop1980"] = pop1980
        country_dict["pop2000"] = pop2000
        country_dict["pop2010"] = pop2010
        country_dict["pop2022"] = pop2022
        country_dict["pop2023"] = pop2023
        country_dict["pop2030"] = pop2030
        country_dict["pop2050"] = pop2050
        country_data.append(country_dict)

    return jsonify(country_data)

if __name__ == "__main__":
    app.run(debug=True)

