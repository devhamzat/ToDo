FROM nginx:latest

WORKDIR /Users/USER/OneDrive/Documents/To-do application
COPY . /usr/share/nginx/html
COPY To-do.html .
COPY To-do.css .
COPY To-do.js . 

EXPOSE 8088

CMD [ "nginx","-g", "daemon off;" ]
# the docker image has a tag of "v1.0.0",so to run a container use 'mytodo:v1.0.0'