from django.db import models
from django.urls import reverse

class LocationVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    closet_name = models.CharField(max_length=100)
    section_number = models.PositiveSmallIntegerField(blank=True, null=True)
    shelf_number = models.PositiveSmallIntegerField(blank=True, null=True)

    def __str__(self):
        return self.closet_name

    class Meta:
        ordering = ("closet_name", "section_number", "shelf_number", "import_href")


class Hats(models.Model):
    fabric = models.CharField(max_length=200)
    style = models.CharField(max_length=200)
    color = models.CharField(max_length=200)
    picture_url = models.URLField(max_length=500, null=True)

    location = models.ForeignKey (
        LocationVO,
        related_name="location",
        on_delete=models.PROTECT,
    )

    def get_api_url(self):
        return reverse("api_show_hats", kwargs={"pk": self.pk})
