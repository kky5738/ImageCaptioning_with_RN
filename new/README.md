# React Native App with Expo

This repository contains a React Native application built using Expo, FastApi and Docker. This is an example app, intended to demonstrate deployment strategies for web and mobile ML applications. It's deployed with diffusion models but can be configured to serve any ML workload.  Expo builds the application for web or mobile as static content with the included backends hostable in containers. An explanation of some of the componenets and deployment architectures: [Cloud Bound](https://medium.com/@HatmanStack/cloud-bound-react-native-and-fastapi-ml-684a658f967a).  For Cloud specific architecture see the included sub-folders.

## Preview

To preview the application visit the hosted version on the Hugging Face Spaces platform [here](https://huggingface.co/spaces/Hatman/react-native-serve-ml).  It uses the huggingface [inference-api](https://huggingface.co/docs/api-inference/index) and is running in a single container. 

## Prerequisites

Before running this application locally, ensure that you have the following dependencies installed on your machine:

### Frontend

- Node
- npm (Node Package Manager)

### Backend

- Pytorch for cpu is installed by default for a cuda install refer to the pytorch [download helper](https://pytorch.org/get-started/locally/)

## Installation

To install and run the application, follow these steps:

### Frontend
   
   ```shell
   git clone https://github.com/hatmanstack/react-native-serve-ml.git
   cd react-native-serve-ml
   npm install -g yarn
   yarn
   npm start
   ```

The app will be running locally at http://localhost:19006. For different environments you can switch the port at startup, use 'npm start -- --port 8080' to start Metro(Expo's Compiler) on port 8080.

### Backend
   
   ```shell
   cd backend
   python -m venv venv

   WINDOWS
   cd venv\scripts
   .\activate

   LINUX | MAC
   cd venv\bin
   source activate

   cd ..\..
   pip install -r requirements.txt
   python main.py
   ```

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- This application is built with Expo, a powerful framework for building cross-platform mobile applications. Learn more about Expo: [https://expo.io](https://expo.io)

