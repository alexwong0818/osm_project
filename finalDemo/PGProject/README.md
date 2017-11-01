Routing on Openstreetmap !
======

Demo : http://routingonosm-brandboat.rhcloud.com/

## Environment :
- os: Ubuntu 12.04
- nodejs: 0.10
- postgresql: 9.1
- pgrouting: 9.1 (based on postgresql)
- postGIS: 2.0

## How to use :
1. install nodejs 0.10 , postgresql9.1, postGIS2.0, pgrouting
2. psql -U username -d dbname
3. CREATE EXTENSION postgis;
4. CREATE EXTENSION pgrouting;
5. download map data from openstreetmap
6. osm2pgrouting -file "sampledata.osm" \
                          -conf "/usr/share/osm2pgrouting/mapconfig.xml" \
                          -dbname DBNAME \
                          -user USERNAMWE \
                          -clean
7. node server.js

for further information, please go to : http://brandboat.github.io/2014-08-16-Routing_on_OSM/ (Chinese)
