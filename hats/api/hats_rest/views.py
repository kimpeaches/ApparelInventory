from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import LocationVO, Hats

# Create your views here.
class LocationVODetailEncoder(ModelEncoder):
    model = LocationVO
    properties = ["closet_name", "section_number", "shelf_number", "import_href"]


class HatsListEncoder(ModelEncoder):
    model = Hats
    properties = ["fabric", "style", "color", "picture_url", "id", "location"]
    encoders = {"location": LocationVODetailEncoder()}
    # def get_extra_data(self, o):
    #     return {"location": o.location.closet_name}

class HatsDetailEncoder(ModelEncoder):
    model = Hats
    properties = ["fabric", "style", "color", "picture_url", "location", "id"]
    encoders = {"location": LocationVODetailEncoder()}


@require_http_methods(["GET", "POST"])
def api_list_hats(request, location_vo_id=None):
    if request.method == "GET":
        if location_vo_id is not None:
            hats = Hats.objects.filter(location=location_vo_id)
        else:
            hats = Hats.objects.all()

        return JsonResponse(
            {"hats": hats},
            encoder=HatsListEncoder,
        )
    else:
        content = json.loads(request.body)

        try:
            location_href = content["location"]
            location = LocationVO.objects.get(import_href=location_href)
            content["location"] = location
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid location id"},
                status=400,
            )

        hats = Hats.objects.create(**content)
        return JsonResponse(
            hats,
            encoder=HatsDetailEncoder,
            safe=False,
        )

@require_http_methods(["GET", "DELETE", "PUT"])
def api_show_hats(request, pk):
    if request.method == "GET":
        hats = Hats.objects.get(id=pk)
        return JsonResponse (
            {"hats": hats},
            encoder=HatsDetailEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = Hats.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})

    else:
        content = json.loads(request.body)
        try:
            if "location"in content:
                location = LocationVO.objects.get(href=content["location"])
                content["location"] = location
        except LocationVO.DoesNotExist:
                return JsonResponse(
                    {"message": "Invalid location id"},
                    status=400,
                )

        Hats.objects.filter(id=pk).update(**content)
        hats = Hats.objects.get(id=pk)
        return JsonResponse(
            hats,
            encoder=HatsDetailEncoder,
            safe=False,
        )
