# Weather Microservice

A microservice for managing weather data built with Node.js using the [Pip.Services](http://www.pipservices.org) toolkit.

## Key Features

- Support for various weather types (current, hourly, daily, historical, alert)
- Weather data by location
- Temperature and humidity tracking
- Weather descriptions and icons
- REST API

## Installation and Running

```bash
# Install dependencies
npm install

# Build
npm run build

# Run
npm start

# Docker
docker-compose -f ./docker/docker-compose.yml up -d
```

## API and Examples

### Get Weather List

```bash
curl -X GET "http://localhost:8080/api/v1/weather?filter=type:current"
```

### Get Weather by ID

```bash
curl -X GET "http://localhost:8080/api/v1/weather/weather_id_here"
```

### Get Weather by Location

```bash
curl -X GET "http://localhost:8080/api/v1/weather/location/New%20York"
```

### Create Weather Entry

```bash
curl -X POST "http://localhost:8080/api/v1/weather" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "current",
    "location": "London",
    "temperature": 15.5,
    "humidity": 72,
    "weather_description": "Partly cloudy",
    "weather_icon": "partly_cloudy",
    "forecast_time": "2023-03-30T12:00:00Z"
  }'
```

### Update Weather Entry

```bash
curl -X PUT "http://localhost:8080/api/v1/weather/weather_id_here" \
  -H "Content-Type: application/json" \
  -d '{
    "temperature": 16.2,
    "humidity": 75,
    "weather_description": "Mostly cloudy"
  }'
```

### Delete Weather Entry

```bash
curl -X DELETE "http://localhost:8080/api/v1/weather/weather_id_here"
```

## Testing

```bash
npm test
```
