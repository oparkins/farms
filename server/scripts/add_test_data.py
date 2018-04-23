#!/usr/bin/python

import base64
import requests
from faker import Faker

# Change this depending on which port you have decided to run the server on.
server_address = "http://localhost:3000"

# Create faker class
faker = Faker()

# Add a OS Type
r = requests.post(server_address + "/v1/os_types?name=" + faker.company())
if r.status_code != 201:
    print("OS TYPE: Status code was " + str(r.status_code))
    exit()
os_type_id = str(r.json()['id'])


for x in range(0,5):
    # Add a company
    r = requests.post(server_address + "/v1/companies?name=" + faker.company())
    if r.status_code != 201:
        print("Companies: Status code was " + str(r.status_code))
        exit()
    company_id = str(r.json()['id'])

    # Add Divisions
    for y in range(0, 3):
        r = requests.post(server_address + "/v1/companies/" + company_id + "/divisions?name=" + faker.color_name())
        if r.status_code != 201:
            print("Divisions: Status code was " + str(r.status_code))
            exit()
        division_id = str(r.json()['id'])

        # Add Projects
        for z in range(0, 2):
            r = requests.post(server_address + "/v1/companies/" + company_id + "/divisions/" + division_id + "/projects?name=" + faker.job())
            if r.status_code != 201:
                print("Projects: Status code was " + str(r.status_code))
                exit()
            project_id = str(r.json()['id'])

            # Add Version Type
            r = requests.post(server_address + "/v1/companies/" + company_id + "/divisions/" + division_id + "/projects/" + project_id + "/version_types?name=Release")
            if r.status_code != 201:
                print("Version Type: Status code was " + str(r.status_code))
                print(r.text)
                exit()
            version_type_id = str(r.json()['id'])
            
            # Add Versions
            for xx in range(0, 2):
                r = requests.post(server_address + "/v1/companies/" + company_id + "/divisions/" + division_id + "/projects/" + project_id + "/versions?buildDate=" + str(faker.date_time_this_month()) + "&version_type_id=" + version_type_id)
                if r.status_code != 201:
                    print("Versions: Status code was " + str(r.status_code))
                    exit()
                version_id = str(r.json()['id'])

                # Add Operating Systems
                for yy in range(0, 3):
                    r = requests.post(server_address + "/v1/companies/" + company_id + "/divisions/" + division_id + "/projects/" + project_id + "/versions/" + version_id + "/operating_systems?os_type_id=" + os_type_id)
                    if r.status_code != 201:
                        print("Operating Systems: Status code was " + str(r.status_code))
                        exit()
                    operating_systems_id = str(r.json()['id'])

                    # Add Libs
                    for zz in range(0, 2):
                        r = requests.post(server_address + "/v1/companies/" + company_id + "/divisions/" + division_id + "/projects/" + project_id + "/versions/" + version_id + "/operating_systems/" + operating_systems_id + "/libs?name=" + faker.job())
                        if r.status_code != 201:
                            print("Libs: Status code was " + str(r.status_code))
                            exit()

                    # Add Files
                    for xxx in range(0, 3):
                        r = requests.post(server_address + "/v1/companies/" + company_id + "/divisions/" + division_id + "/projects/" + project_id + "/versions/" + version_id + "/operating_systems/" + operating_systems_id + "/filedata?name=" + faker.color_name() + "&data=SOMETHING&dataHash= " + faker.sha256())
                        if r.status_code != 201:
                            print("Files: Status code was " + str(r.status_code))
                            print(r.text)
                            exit()