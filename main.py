from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles

app = FastAPI()


answer = "SUNNY"

# 정답 확인 코드
@app.get("/answer")
def get_answer():
  return answer

app.mount("/", StaticFiles(directory="static", html=True), name="static")