# Wardrobify

Team:

* Kim Reyes - hats microservice
* Angelina Huang - shoes microservice

## Excuting the page

## Design


## Shoes microservice

The shoes microservice can create a shoe and view shoes list.
It also includes the manufacturer, model, color, photo and bin of the shoe.
Uses poller to grab data for bin from wardrobe microservice.


## Hats microservice

There are 2 classes in models.py named LocationVO and Hats.
LocationVO is an instance of the class in Wardrobe API with the equivalent
values to store the created hats in a specific location through poller.py after
polling and it has all the data from Wardrobe Microservice. Hats has 5 values
(fabric, style, color, picture_URL and location). User will input into the
values that will bestored in Hats Microservice and will be shown in the webpage.


## POST new bin
    URL: http://localhost:8100/api/bins/

    INPUT:
    {
	    "id": 1,
        "closet_name": "Sneakers",
        "bin_number": 1,
        "bin_size": 5
    }

    OUTPUT:
    {
        "href": "/api/bins/1/",
        "id": 1,
        "closet_name": "Sneakers",
        "bin_number": 1,
        "bin_size": 5
    }

## GET bin list
    URL: http://localhost:8100/api/bins/
    OUTPUT:

## GET bin detail
    URL: http://localhost:8100/api/bins/1/
    OUTPUT:
    {
        "href": "/api/bins/1/",
        "id": 1,
        "closet_name": "Sneakers",
        "bin_number": 1,
        "bin_size": 5
    }

## DELETE bin
    URL: http://localhost:8100/api/bins/1/
    OUTPUT:
    {
        "id": null,
        "closet_name": "Sneakers",
        "bin_number": 1,
        "bin_size": 5
    }

## POST new shoe
    URL: http://localhost:8080/api/shoes/

    INPUT:
    {
        "manufacturer": "Nike",
        "model_name": "Air Max",
        "color": "white",
        "picture_url": "<URL>",
        "wardrobe_bin": "/api/bins/1/"
    }

    OUTPUT:
    {
        "manufacturer": "Nike",
        "model_name": "Air Max",
        "color": "white",
        "picture_url": "<URL>",
        "wardrobe_bin": {
            "closet_name": "Sneakers",
            "bin_number": 1,
            "bin_size": 5,
            "import_href": "/api/bins/1/"
        }
    }

## GET shoe list
    URL: http://localhost:8080/api/shoe/
    OUTPUT:

## GET shoe detail
    URL: http://localhost:8080/api/shoe/1/
    OUTPUT:
    {
        "manufacturer": "Nike",
        "model_name": "Air Max",
        "color": "white",
        "picture_url": "<URL>",
        "wardrobe_bin": {
            "closet_name": "Sneakers",
            "bin_number": 1,
            "bin_size": 5,
            "import_href": "/api/bins/1/"
        }
    }

## DELETE shoe
    URL: http://localhost:8080/api/shoe/1/
    OUTPUT:
    {
        "deleted": true
    }

## Backend Diagram
