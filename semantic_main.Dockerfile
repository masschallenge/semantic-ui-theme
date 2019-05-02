FROM 997386117669.dkr.ecr.us-east-1.amazonaws.com/semantic_base:latest

WORKDIR /gulp/semantic

RUN git pull && npm install

ENTRYPOINT ["/usr/bin/gulp"]
