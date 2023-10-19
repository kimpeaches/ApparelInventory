from django.db import models
from django.urls import reverse

# Create your models here.
class BinVO(models.Model):
    closet_name = models.CharField(max_length=100)
    bin_number = models.PositiveSmallIntegerField()
    bin_size = models.PositiveSmallIntegerField()
    import_href = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return f"{self.closet_name} - {self.bin_number}/{self.bin_size}"

    class Meta:
        ordering = ("closet_name", "bin_number", "bin_size")


class Shoes(models.Model):
    manufacturer = models.CharField(max_length=200)
    model_name = models.CharField(max_length=200)
    color = models.CharField(max_length=200)
    picture_url = models.URLField(max_length=500, null=True)
    wardrobe_bin = models.ForeignKey(
        BinVO,
        related_name="bin",
        on_delete=models.CASCADE,
    )
    def get_api_url(self):
        return reverse("api_list_shoes", kwargs={"pk": self.pk})

    class Meta:
        verbose_name_plural = "Shoes"
