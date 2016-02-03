## MeteoSound

## What?

MeteoSound is a mobile first website that offers a playlist for you depending on the weather in your chosen location

## Why?

There doesn't seem to currently be anything offering this capability and it could be a useful tool for getting you in the right mood for what's going on outside

## How?

We are going to use api requests from Soundcloud, Google Maps and the Open Weather Map to "GET" data for our site

The user will be able to specify the location they would like to get a recommended playlist for
The first prototype will take in the users input for their city (eg. London)
(we could also use their current location if they have their geo location switched on)

This will then be sent to Open Weather Map which will send back the weather id. (eg. 521 = raining)

The id will be linked to a number of tags which will then be sent to Soundcloud which will send us a track based on the sent tags.
