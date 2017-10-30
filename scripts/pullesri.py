import json
import requests

def pull(service_url):
  url = "http://services.arcgis.com/v400IkDOw1ad7Yad/arcgis/rest/services/" + service_url + "/FeatureServer/0/query?"
  object_param = "objectIds="
  # TODO add additional fields / customizations?
  field_param = "&outFields=ProjectNam,Street,FundingSta"
  geom_param = "&returnGeometry=true"
  out_sr_param = "&outSR=4326"
  format_param = "&f=pgeojson"
  responses = list()
  object_id = 1
  while(True):
    r = requests.get(url + object_param + str(object_id) + field_param + geom_param + out_sr_param + format_param)
    data = r.json()
    #print(data)
    if (data['features']):
      responses.append(data)
      object_id += 1
    else:
      break
  return responses

if __name__ == "__main__":
  service_urls = ["Station_Projects", "NCDOT_Interchange_Projects", 
                  "NCDOT_Structure_Projects", "NCDOT_Transit_Projects"]
  pulled_data = list()
  for url in service_urls:
    pulled_data.append(pull(url))
  #print(json.dumps(pulled_data))
  with open("../frontend/src/resources/data.json", mode='w') as file:
    file.write(json.dumps(pulled_data))
