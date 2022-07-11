DROP TABLE IF EXISTS flags;
DROP TABLE IF EXISTS apps;

CREATE TABLE apps (
  id serial,
  name varchar(50) UNIQUE NOT NULL,
  sdk varchar(25) UNIQUE NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE flags (
  id serial,
  app_id integer NOT NULL,
  name varchar(50) NOT NULL,
  type varchar(50) NOT NULL,
  state boolean NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (app_id)
      REFERENCES apps(id)
      ON DELETE CASCADE
);

INSERT INTO apps(name, sdk)
  VALUES 
    ('Mobile', 'mobile123'),
    ('Web', 'web123');

INSERT INTO flags(app_id, name, type, state) 
  VALUES 
    (1, 'Login', 'Boolean', false),
    (1, 'Add to Cart', 'Percentage', true),
    (1, 'Payment Processing', 'Boolean', false),
    (2, 'Login', 'Boolean', false),
    (2, 'Add to Cart', 'Percentage', true),
    (2, 'Payment Processing', 'Boolean', false);

-- SELECT * FROM flags WHERE app_id = 1
-- SELECT * FROM flags WHERE app_id = 2