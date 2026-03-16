# Eburon TTS

**Developed for Eburon AI by Master E**  
*Head of Eburon AI Development Team*

Eburon AI Text-to-Speech system with Itawit language support, voice cloning, and fine-tuning capabilities.

## Features

- **TTS (Text-to-Speech)**: Multiple backends supported
  - Qwen3-TTS (MLX - Apple Silicon)
  - Coqui XTTS v2 (Cross-platform, cloud-ready)
- **STT (Speech-to-Text)**: Faster Whisper for transcription
- **Voice Cloning**: Coqui XTTS v2 for voice cloning
- **Fine-tuning**: Train custom voice models with XTTS
- **Itawit Language**: Native Itawit language support with lexicon

## Quick Start

### Local Deployment

```bash
# Clone the repo
git clone https://github.com/eburondeveloperph-gif/echobox-tts.git
cd echobox-tts

# Install dependencies
pip install -r requirements.txt

# Run the server
python eburon_tts_server.py
```

### Docker Deployment (Railway/Render/Fly.io)

```bash
# Build the image
docker build -t eburon-tts .

# Run locally
docker run -p 8000:8000 eburon-tts
```

### Deploy to Railway

```bash
railway deploy
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | API info |
| `/health` | GET | Health check |
| `/generate` | POST | Generate TTS audio |
| `/clone` | POST | Clone voice |
| `/transcribe` | POST | STT transcription |

## Itawit Language Support

Verified Itawit lexicon:
- "Ma-ngo" = Hello
- "Mabbalat" = Thank you  
- "Oon" = Yes
- "Awan" = No
- "Jehova i Dios" = Jehovah is God

## License

Proprietary - All rights reserved © 2026 Eburon
