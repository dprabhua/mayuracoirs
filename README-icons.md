# App Icons Generation

This guide explains how to generate app icons for the Mayuracoirs website.

## Prerequisites

1. Install ImageMagick:
   - macOS: `brew install imagemagick`
   - Ubuntu/Debian: `sudo apt-get install imagemagick`
   - Windows: Download from [ImageMagick website](https://imagemagick.org/script/download.php)

2. Ensure you have the logo file:
   - Place your logo at `images/logo.png`
   - The logo should be in PNG format
   - Recommended minimum size: 512x512 pixels

## Generating Icons

1. Make the script executable:
   ```bash
   chmod +x generate-icons.sh
   ```

2. Run the script:
   ```bash
   ./generate-icons.sh
   ```

3. The script will generate the following files:
   - `images/icon-72x72.png`
   - `images/icon-96x96.png`
   - `images/icon-128x128.png`
   - `images/icon-144x144.png`
   - `images/icon-152x152.png`
   - `images/icon-192x192.png`
   - `images/icon-384x384.png`
   - `images/icon-512x512.png`
   - `images/apple-touch-icon.png`
   - `images/favicon.ico`

## Manual Generation (Alternative)

If you prefer to generate icons manually, you can use any image editing software:

1. Open your logo in the image editor
2. Create a new square canvas for each size
3. Resize the logo to fit within the canvas
4. Center the logo
5. Save as PNG with transparency
6. For favicon.ico, save as ICO format

## Icon Specifications

- Format: PNG (except favicon.ico)
- Color Space: RGB
- Transparency: Yes (except apple-touch-icon)
- Background: Transparent (except apple-touch-icon which has white background)
- Minimum Size: 512x512 pixels
- Recommended Aspect Ratio: 1:1 (square)

## Testing Icons

1. Test the icons on different devices:
   - iOS devices
   - Android devices
   - Desktop browsers
   - Mobile browsers

2. Verify the icons appear correctly in:
   - Browser tabs
   - Home screen shortcuts
   - App launchers
   - Bookmarks

## Troubleshooting

If icons don't appear correctly:

1. Check file permissions
2. Verify file paths in manifest.json
3. Clear browser cache
4. Check file sizes and formats
5. Verify image dimensions

## Additional Resources

- [PWA Icon Guidelines](https://web.dev/pwa-checklist/#icons)
- [Apple Touch Icon Guidelines](https://developer.apple.com/design/human-interface-guidelines/ios/icons-and-images/app-icon/)
- [Favicon Generator](https://realfavicongenerator.net/) 