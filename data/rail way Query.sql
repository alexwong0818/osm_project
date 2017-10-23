select osm_id, name, operator, ST_AsGeoJSON(ST_Transform(way, 4326)) as geojson
from planet_osm_point
where railway = 'station'
UNION
select osm_id, name, operator, ST_AsGeoJSON(ST_Transform(way, 4326)) as geojson
from planet_osm_polygon
where railway = 'station'
UNION
select osm_id, name, operator, ST_AsGeoJSON(ST_Transform(way, 4326)) as geojson
from planet_osm_line
where railway = 'rail'
UNION
select osm_id, name, operator, ST_AsGeoJSON(ST_Transform(way, 4326)) as geojson
from planet_osm_line
where railway = 'subway'

