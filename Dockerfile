FROM node:8-alpine
LABEL MAINTAINER="radityasurya <radityasurya@hotmail.com>"

# Set environment
ENV NODE_ENV=development

# Create app directory
RUN mkdir -p /app

# Set working directory
WORKDIR /app

# Setup dependencies
COPY package.json /app

# Install packages
RUN npm install --silent

# Copy project files
COPY . /app

# Expose app port
EXPOSE 3000

CMD ["npm", "start"]