# base image
FROM node:alpine

# Create working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# COPY source files
COPY . /usr/src/

# Install dependencies
RUN npm install 

# start app
RUN npm run build
EXPOSE 3030
# CMD npm run start
# ENTRYPOINT ["npm", "run"]