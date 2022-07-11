# NATS Jetstream

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
   

  nats stream add ORDERS --subjects "ORDERS.*" --ack --max-msgs=-1 --max-bytes=-1 --max-age=1y --storage file --retention limits --max-msg-size=-1 --discard=old
nats consumer add ORDERS NEW --filter ORDERS.received --ack explicit --pull --deliver all --max-deliver=-1 --sample 100
nats consumer add ORDERS DISPATCH --filter ORDERS.processed --ack explicit --pull --deliver all --max-deliver=-1 --sample 100
nats consumer add ORDERS MONITOR --filter '' --ack none --target monitor.ORDERS --deliver last --replay instant