#!/bin/bash

# Check if Scribus is installed
if ! command -v scribus &> /dev/null; then
    echo "Installing Scribus..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        brew install --cask scribus
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        sudo apt-get update
        sudo apt-get install -y scribus
    else
        echo "Unsupported OS. Please install Scribus manually from https://www.scribus.net/downloads/"
        exit 1
    fi
fi

# Create downloads directory if it doesn't exist
mkdir -p downloads

# Create Scribus template
cat > downloads/brochure_template.sla << 'EOL'
<?xml version="1.0" encoding="UTF-8"?>
<SCRIBUSUTF8NEW>
  <DOCUMENT>
    <PAGE>
      <PAGEOBJECT>
        <StoryText>
          <ITEXT CH="Mayuracoirs" CFONT="Helvetica Bold" CSIZE="36"/>
          <para PARENT="Normal"/>
          <ITEXT CH="Premium Coir Products" CFONT="Helvetica" CSIZE="24"/>
          <para PARENT="Normal"/>
          <ITEXT CH="Sustainable Solutions for Agriculture" CFONT="Helvetica" CSIZE="18"/>
        </StoryText>
      </PAGEOBJECT>
    </PAGE>
  </DOCUMENT>
</SCRIBUSUTF8NEW>
EOL

echo "Scribus template created. Please open downloads/brochure_template.sla in Scribus to complete the brochure design." 