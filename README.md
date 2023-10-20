# Wardrobify

Team:

* Kim Reyes - hats microservice
* Angelina Huang - shoes microservice

## Excuting the page Scripts

In the project directory, you must be able to run the following commands in your terminal to create, build and start running the containers:

docker volume create
docker -compose build
docker -compose up

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


Hats has 5 values(fabric, style, color, picture_URL and location). User will input into the values that will be stored in Hats Microservice and will be shown in the webpage.

Hats Microservice will run on http://localhost:8090/api/hats/ to complete the following RESTful API request ("GET", "POST", "DELETE", "PUT").

**LOCATION**

A. Input, URL and preview in POSTING, GETTING a Location are as follows:

1. URL - http://localhost:8100/api/locations/

2. Input as JSON(For POST request only) -
{
	"closet_name": "Cotton Closet",
	"section_number": 1,
	"shelf_number": 1
}

3. Preview -
{
	"href": "/api/locations/2/",
	"id": 2,
	"closet_name": "Cotton Closet",
	"section_number": 1,
	"shelf_number": 1
}

B. Delete a location using this URL http://localhost:8100/api/locations/ plus the specific ID at the end of the URL

**HATS**

A. Input, URL and preview in POSTING, GETTING a Hat are as follows:

1. URL - http://localhost:8090/api/hats/

2. Input as JSON(For POST request only) -
{
	"fabric": "Cotton",
	"style": "Plain",
	"color": "White",
	"location": "/api/locations/2/"
}

3. Preview -
{
	"href": "/api/hats/7/",
	"fabric": "Cotton",
	"style": "Plain",
	"color": "White",
	"picture_url": null,
	"location": {
		"closet_name": "Cotton Closet",
		"section_number": 1,
		"shelf_number": 1,
		"import_href": "/api/locations/2/"
	},
	"id": 7
}

D. Input, URL and preview in editing a detail of a Hat are as follows:

1. URL - http://localhost:8090/api/hats/ plus the specific ID at the end of the URL.

2. Input as JSON -
{
    "fabric": "Cotton"
}

3. Preview -
{
	"href": "/api/hats/3/",
	"fabric": "Leather",
	"style": "Fedora",
	"color": "Brown",
	"picture_url": "https://img.freepik.com/free-photo/old-fedora-hat_1101-692.jpg?w=996&t=st=1697729169~exp=1697729769~hmac=7f690a041976d4001f8ad7eb96f9e4972bc5ad2474d21e8b67c0dd5657db52bf",
	"location": {
		"closet_name": "Leather Closet",
		"section_number": 1,
		"shelf_number": 1,
		"import_href": "/api/locations/1/"
	},
	"id": 3
}


C. Delete a hat using this URL http://localhost:8090/api/hats/ plus the specific ID at the end of the URL



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
