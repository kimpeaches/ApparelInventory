import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "hats_project.settings")
django.setup()

from hats_rest.models import LocationVO
# Import models from hats_rest, here.
# from hats_rest.models import Something

def get_location():
    url = "http://wardrobe-api:8000/api/locations"
    response = requests.get(url)
    data = json.loads(response.content)
    for location in data["locations"]:
        LocationVO.objects.update_or_create(
            import_href=location["href"],
            defaults = {
            'closet_name': location['closet_name'],
            'shelf_number': location['shelf_number'],
            'section_number': location['section_number']
                }
        )

def poll():
    while True:
        print('Hats poller polling for data')
        try:
            get_location()
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
