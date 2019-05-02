FROM donnex/assets
ARG SSH_PRIVATE_KEY

USER root

WORKDIR /gulp/semantic

RUN apt-get -y install openssh-client git sudo && \
    curl -sL https://deb.nodesource.com/setup_8.x | bash - && \
    apt-get install -y nodejs && \
    mkdir ~/.ssh/ && \
    echo "${SSH_PRIVATE_KEY}" >> ~/.ssh/id_rsa && chmod 0600 ~/.ssh/id_rsa && \
    touch ~/.ssh/known_hosts && \
    ssh-keyscan github.com >> ~/.ssh/known_hosts && \
    git clone -b development git@github.com:masschallenge/semantic-ui-theme.git .

RUN npm install

ENTRYPOINT ["/usr/bin/gulp"]