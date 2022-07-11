# NATS Jetstream

# NATS - PubSub Walkthrough - https://docs.nats.io/nats-concepts/core-nats/pubsub/pubsub_walkthrough

# Enabled Jetstream
# Start the nats-server with the command
# nats-server -js

# Adding a New Stream
  # nats stream add test_stream
  # nats stream add ORDERS
   # --subjects "ORDERS.*"
   # --ack
   # --max-msgs
   # --max-age=1y
   # --storage file
   # --retention limits