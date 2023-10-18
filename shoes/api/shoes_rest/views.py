import json
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
from .models import BinVO, Shoes

# Create your views here.
class BinVODetailEncoder(ModelEncoder):
    model = BinVO
    properties = [
        "closet_name",
        "bin_number",
        "bin_size"
        "import_href"
    ]

class ShoesListEncoder(ModelEncoder):
    model = Shoes
    properties = [
        "manufacturer",
        "model_name",
    ]
    # def get_extra_data(self, o):
    #     return {"bin_number": o.wardrobe_bin.bin_number, "closet_name": o.wardrobe_bin.closet_name} #wardrobe_bin is from shoes_rest/models.py, how is it getting the bin_number and closet_name


class ShoesDetailEncoder(ModelEncoder):
    model = Shoes
    properties = [
        "manufacturer",
        "model_name",
        "color",
        "picture_url",
        "bin"
    ]

    encoders = {
        "bin": BinVODetailEncoder(),
    }

@require_http_methods(["GET", "POST"])
def api_list_shoes(request, bin_vo_id=None):
    if request.method == "GET":
        if bin_vo_id is not None:
            shoes = Shoes.objects.filter(bin=bin_vo_id)
        else:
            shoes = Shoes.objects.all()
        return JsonResponse(
            {"shoes": shoes},
            encoder=ShoesListEncoder,
        )
    else:
        content = json.loads(request.body)

        try:
            bin_href = content["bin"]
            wardrobe_bin = BinVO.objects.get(import_href=bin_href["import_href"])
            content["bin"] = wardrobe_bin
        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid bin"},
                status=400,
            )
        shoes = Shoes.objects.create(**content)
        return JsonResponse(
            shoes,
            encoder=ShoesDetailEncoder,
            safe=False,
        )


@require_http_methods(["GET", "DELETE"])
def api_show_shoes(request, pk):
    if request.method == "GET":
        shoes = Shoes.objects.get(id=pk)
        return JsonResponse(
            shoes,
            encoder=ShoesDetailEncoder,
            safe=False,
        )
    else:
        count, _ = Shoes.objects.filter(id=pk).delete()
        return JsonResponse({"deleted":count > 0 })
