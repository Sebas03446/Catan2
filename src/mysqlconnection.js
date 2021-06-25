const mysqlx = require('@mysql/xdevapi');

const config = { schema: 'Catan', table: 'cards', user: 'root', password: '12' }
const config2 = { table: 'decks'   }

mysqlx.getSession({ user: config.user , password: config.password})
    .then(session => {
        return session.sql(`create database if not exists ${config.schema}`)
            .execute()
            .then(() => {
                    
                return session.sql(`create table if not exists ${config.schema}.${config.table} (card_id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT
                                    , card_description VARCHAR(100) NOT NULL, 
                                    card_number INTEGER UNSIGNED NOT NULL)`)
                       .execute()
            })
            .then(() => {
                return session.close();
            });
    });
mysqlx.getSession({ user: config.user , password: config.password})
    .then(session => {
        return session.sql(`create database if not exists ${config.schema}`)
            .execute()
            .then(() => {
                
                return session.sql(`create table if not exists ${config.schema}.${config2.table} (deck_id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT
                                    , card_id JSON)`)
                       .execute()
            })
            .then(() => {
                return session.close();
            });
});
function createDatabase (){ mysqlx.getSession({ user: config.user , password: config.password})
                            .then(session => {
                                return session.sql(`create database if not exists ${config.schema}`)
                                    .execute()
                                    .then(() => {
                                        
                                        return session.sql(`create table if not exists ${config.schema}.${config2.table} (deck_id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT
                                                            , card_id JSON)`)
                                            .execute()
                                    })
                                    .then(() => {
                                        return session.close();
                                    });
                            });
                        }
module.exports= {
    mysqlx: mysqlx,
    config:config,
    config2:config2,
    createDatabase
}     

