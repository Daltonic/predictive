# Importing necessary libraries
import uvicorn
import pickle
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Initializing the fast API module
app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Loading trained prediction model
model = pickle.load(open('../model/hireable.pkl', 'rb'))

# Defining model interface class
class Candidate(BaseModel):
    gender: int
    bsc: float
    workex: int
    etest_p: float
    msc: int

# The home route and response
@app.get("/")
def read_root():
    return {"data": "Welcome to online employee hirability prediction model"}

# The prediction route
@app.post("/prediction/")
async def get_predict(data: Candidate):
    sample = [[
        data.gender,
        data.bsc,
        data.workex,
        data.etest_p,
        data.msc
    ]]

    hired = model.predict(sample).tolist()[0]

    return {
        "data": {
            'prediction': hired,
            'interpretation': 'Candidate can be hired.' if hired == 1 else 'Candidate can not be hired.'
        }
    }

if __name__ == '__main__':
    uvicorn.run(app, port=8080, host='0.0.0.0')