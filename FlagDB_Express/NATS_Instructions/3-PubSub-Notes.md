# NATS PubSub (CORE) - https://docs.nats.io/nats-concepts/core-nats/pubsub

# How it Works
# NATS implements a publish-subscribe message distribution model for one-to-many communication. 
# A publisher sends a message on a subject and any active subscriber listening on that subject receives the message. If the subscriber is not actively listening on the subject, the message is not received. Subscribers can use the wildcard tokens such as * and > to match a single token or to match the tail of a subject.Wildcard subjects work a bit like a regular expression. This one-to-many pattern is sometimes called a fan-out.

# Messages
# Messages are composed of:
  # A subject.
  # A payload in the form of a byte array.
  # Any number of header fields.
  # An optional 'reply' address field.

# Message Size
  # Default is 1MB
  # Maximum is 64MB
  # Recommended is 8MB or Less