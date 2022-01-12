INSERT INTO member(id, firstName, lastName, email, password) VALUES
    (101, 'steve', 'chen', 'steve.chen@mail.fr', 'friday'),
    (15, 'nicolas', 'van heusden', 'nicolas.vanheusden@mail.fr', 'friday');

INSERT INTO event(id, title, description, startDate, endDate, location, idMember, allDay, repeat, label, origin) VALUES
    (101, 'school', 'class', '2021-12-16 14:00:00', '2021-12-16 16:00:00', 'Gustave Eiffel University', 15, true, 'Never', 'indigo', 'App'),
    (102, 'sport', 'running', '2021-12-16 14:00:00', '2021-12-20 16:00:00', '26 rue du General de Gaulle 75008 Paris', 101, false, 'Never', 'green', 'App'),
    (103, 'shopping', 'buy clothes', '2021-12-16 14:00:00', '2021-12-20 16:00:00', '26 rue du General de Gaulle 75008 Paris', 15, false, 'Never', 'green', 'Google'),
    (104, 'movie', 'watch spider man', '2021-12-16 10:00:00', '2021-12-20 14:00:00', '26 rue du General de Gaulle 75008 Paris', 101, false, 'Never', 'green', 'App');
