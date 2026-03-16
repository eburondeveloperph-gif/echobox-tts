#!/bin/bash

# Eburon TTS - Single Run Bootstrap Script
# Developed for Eburon AI by Master E

set -e

echo "============================================"
echo "  Eburon TTS - Starting..."
echo "============================================"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check Python
if ! command -v python3 &> /dev/null; then
    echo -e "${YELLOW}Python 3 not found. Installing...${NC}"
    brew install python3
fi

# Create virtual environment
if [ ! -d "venv" ]; then
    echo -e "${GREEN}Creating virtual environment...${NC}"
    python3 -m venv venv
fi

# Activate venv
source venv/bin/activate

# Install dependencies
echo -e "${GREEN}Installing dependencies...${NC}"
pip install --upgrade pip
pip install -r requirements.txt

# Create directories
mkdir -p output models voice_clones

# Start server
echo -e "${GREEN}Starting Eburon TTS server...${NC}"
echo "Server will be available at: http://localhost:8000"
echo "API docs at: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop"
echo "============================================"

python3 eburon_tts_server.py
