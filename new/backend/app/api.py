import torch
import fastapi
import base64
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from diffusers import StableDiffusionPipeline
from transformers import pipeline

origins = ["http://127.0.0.1:19006",
"http://127.0.0.1:19006/api",
"http://localhost:19006",
"http://localhost:19006/api",
"http://127.0.0.1:8080",
"http://127.0.0.1:8080/api",
"http://localhost:8080",
"http://localhost:8080/api",
"10.20.104.13:8080/api"
]

middleware = [
    Middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=['*'],
        allow_headers=['*']
    )
]

# pipe = pipeline("image-to-text", model="C:\\Users\\kky57\\Documents\\1.smu\\2023\\2nd_seme\\mobileSW\\react-native-serve-ml\\assets\\vit-gpt2-image-captioning")
pipe = pipeline("image-to-text", model="..\\assets\\vit-gpt2-image-captioning")

app = FastAPI(middleware=middleware)

class Item(BaseModel):
    image: object
    modelID: str
    

@app.post("/api")
async def inference(item: Item):
    
    caption = "somethine wrong in server"
    
    # Start Image Captioning
    print("captioning.....\n")
    caption = pipe(item.image['uri'])
    
    
    print(f"Captioning is finished : {caption}\n")
    print(f"The type of caption is {type(caption)}\n")
    caption = caption[0]['generated_text']
    
    return {"output": caption}