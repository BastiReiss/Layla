DROP TABLE IF EXISTS profile CASCADE;
DROP TABLE IF EXISTS mood CASCADE;
DROP TABLE IF EXISTS message CASCADE;
DROP TABLE IF EXISTS response CASCADE;
DROP TABLE IF EXISTS responeLib CASCADE;

CREATE TABLE profile(
    user_id INTEGER,
    u_name VARCHAR(30)  NOT NULL,
    u_email VARCHAR(50)   NOT NULL,
    u_password VARCHAR(20)    NOT NULL,
    u_firstName VARCHAR(20)   NOT NULL,
    u_lastName VARCHAR(20)    NOT NULL,
    PRIMARY KEY ( user_id )
);

CREATE TABLE mood(
    mood_id INTEGER    NOT NULL,
    userID INTEGER   NOT NULL,
    m_sad INTEGER    NOT NULL,
    m_happy INTEGER    NOT NULL,
    m_neutral INTEGER    NOT NULL,
    m_scared INTEGER    NOT NULL,
    date TIMESTAMP    NOT NULL,
    PRIMARY KEY ( mood_id ),
    FOREIGN KEY ( userID ) REFERENCES profile (user_id)
);

CREATE TABLE message(
    msg_id INTEGER    NOT NULL,
    userID INTEGER   NOT NULL,
    msg_receivedAt TIMESTAMP    NOT NULL,
    msg_readAT TIMESTAMP    NOT NULL,
    m_neutral INTEGER    NOT NULL,
    m_scared INTEGER    NOT NULL,
    date TIMESTAMP    NOT NULL,
    PRIMARY KEY ( msg_id ),
    FOREIGN KEY ( userID ) REFERENCES profile (user_id)
);

CREATE TABLE response(
    r_id INTEGER    NOT NULL,
    userID INTEGER   NOT NULL,
    r_lib_id INTEGER   NOT NULL,
    msg_receivedAt TIMESTAMP    NOT NULL,
    msg_readAT TIMESTAMP    NOT NULL,
    date TIMESTAMP    NOT NULL,
    PRIMARY KEY ( r_id ),
    FOREIGN KEY ( userID ) REFERENCES profile (user_id)
);

CREATE TABLE responseLib(
    r_Lib_id INTEGER    NOT NULL,
    r_lib_msg_body TEXT   NOT NULL,
    PRIMARY KEY ( r_Lib_id )
);
