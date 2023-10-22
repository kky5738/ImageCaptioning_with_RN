from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import json
import requests
import base64
from pydantic import BaseModel
from PIL import Image
from io import BytesIO

app = FastAPI()

class Item(BaseModel):
    prompt: str
    steps: int
    guidance: float
    modelID: str

@app.post("/api")
async def inference(item: Item):
    print("check")
    if "dallinmackay" in item.modelID:
        prompt = "lvngvncnt, " + item.prompt
    if "nousr" in item.modelID:
        prompt = "nousr robot, " + item.prompt
    if "nitrosocke" in item.modelID:
        prompt = "arcane, " + item.prompt
    if "dreamlike" in item.modelID:
        prompt = "photo, " + item.prompt
    if "prompthero" in item.modelID:
        prompt = "mdjrny-v4 style, " + item.prompt
    data = {"inputs":prompt, "options":{"wait_for_model": True, "use_cache": False}}
    API_URL = "https://api-inference.huggingface.co/models/" + item.modelID

    headers = {"Authorization": f"Bearer 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"}
    api_data = json.dumps(data)
    response = requests.request("POST", API_URL, headers=headers, data=api_data)

    image_stream = BytesIO(response.content)
    image = Image.open(image_stream)
    image.save("response.png")
    with open('response.png', 'rb') as f:
        base64image = base64.b64encode(f.read())
    
    return {"output": base64image}

app.mount("/", StaticFiles(directory="web-build", html=True), name="build")

@app.get('/')
def homepage() -> FileResponse:
    return FileResponse(path="/app/build/index.html", media_type="text/html")

