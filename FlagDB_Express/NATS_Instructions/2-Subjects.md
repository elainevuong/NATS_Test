# NATS - https://docs.nats.io/nats-concepts/subjects
  # fundamentally, NATS is about publishing and listening for messages
  # NATS does this via **SUBJECTS**
  # What is a Subject?
  # a subject is just a string of characters that form a name which the publisher and subscriber can use to find each other. It helps scope messages into streams or topics.
  # Use ASCII Characters (a-z, A-Z, 0-9), case sensitive and no white-space

# Wildcard Subjects
  # NATS provides two wildcards that can take the place of one or more elements in a dot-separated subject. Subscribers can use these wildcards to listen to multiple subjects with a single subscription but Publishers will always use a fully specified subject, without the wildcard.

# Publisher Subjects
# time.us
# time.us.east
# time.us.east.atlanta
# time.eu.east
# time.eu.warsaw

# Subscriber/Consumer Subject Matches
  # * Wildcard - matches a SINGLE Token 
   # time.*.east => matches both time.us.east and time.eu.east
  # > Wildcard - matches ONE OR MORE Tokens, only at the END
   # time.us.> => matches time.us.east and time.us.east.atlanta
   # time.us.* => matches only with time.us.east
  # Wildcard Mixing
   # # *.*.east.> => matches time.eu.east.atlanta

# Subject Tokens

