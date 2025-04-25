#!/bin/bash

# Create icons directory if it doesn't exist
mkdir -p images/icons

# Define sizes
sizes=(72 96 128 144 152 192 384 512)

# Convert logo to different sizes
for size in "${sizes[@]}"; do
    convert images/logo.png -resize ${size}x${size} images/icon-${size}x${size}.png
    echo "Generated icon-${size}x${size}.png"
done

# Create apple-touch-icon
convert images/logo.png -resize 180x180 -background white -gravity center -extent 180x180 images/apple-touch-icon.png
echo "Generated apple-touch-icon.png"

# Create favicon
convert images/logo.png -resize 32x32 images/favicon.ico
echo "Generated favicon.ico"

echo "All icons generated successfully!" 