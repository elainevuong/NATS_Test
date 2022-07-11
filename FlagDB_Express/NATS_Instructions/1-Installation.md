# Walkthrough - https://docs.nats.io/nats-concepts/what-is-nats/walkthrough_setup

# 1 - Install the CLI Tool
  # brew tap nats-io/nats-tools
  # brew install nats-io/nats-tools/nats

# 2 - Install a NATS Server Locally
  # brew install nats-server

# 3 - Start a NATS Server (listens on 4222)
  # nats-server

# NATS Jetstream - Built On Top of Core NATS, but needs to be Enabled
# At-least / exactly once QoS: If you need higher qualities of service (at least once and exactly once), or functionalities such as persistent streaming, de-coupled flow control, and Key/Value Store, you can use NATS JetStream, which is built in to the NATS server (but needs to be enabled). Of course, you can also always build additional reliability into your client applications yourself with proven and scalable reference designs such as acks and sequence numbers.