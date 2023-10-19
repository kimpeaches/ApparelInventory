# Wardrobify

Team:

* Kim Reyes - hats microservice
* Angelina Huang - shoes microservice

## Excuting the page

## Design


## Shoes microservice

The shoes microservice can create a shoe and view a shoe.
It also includes the manufacturer, model, color, photo and bin of the shoe.
Uses poller to grab data for bin from wardrobe microservice.

## Hats microservice


There are 2 classes in models.py named LocationVO and Hats.

LocationVO is an instance of the class in Wardrobe API with the equivalent values to store the created hats in a specific location through poller.py after polling and it has all the data from Wardrobe Microservice.

Hats has 5 values(fabric, style, color, picture_URL and location). User will input into the values that will be stored in Hats Microservice and will be shown in the webpage.
