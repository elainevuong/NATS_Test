# Link: https://itnext.io/secure-pub-sub-with-nats-fcda983d0612

Let’s imagine we have a web application used by several customers. When a customer uses a browser to access the application it is automatically subscribed to a WebSocket to receive event notifications of any kind. In order to harden the process and not rely too heavily on WebSockets, especially if a lot of events are generated, we decide to setup a Publish / Subscribe using NATS messaging system. The requirements are pretty simple:

the connection to this system must be secured with TLS
all users connecting to the messaging system must be authenticated
the application must use a special user account giving the right to publish messages of any kind
the application publishes customer’s related events on the “customers.NAME.events” NATS’ subject, NAME being the customer name
a customer can only subscribe to the “customers.NAME.>” subject so it can receive messages published on “customers.NAME.events” but also all the messages down the “customers.NAME” hierarchy (just in case this is needed in the future)

# Adding an Operator
# nsc add operator -n op

# Describing an Operator and getting Additional Information
# nsc describe operator op

# Adding an Account
# nsc add account -n admin

# Describing an Operator and getting Additional Information
# nsc describe account admin