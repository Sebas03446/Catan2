const mysqlx = require('@mysql/xdevapi');

//const config = { collection: 'cards', schema: 'Catan', user: 'root', password: '12' };
//const config2 = { collection:'decks'};
/* mysqlx.getSession({ user: config.user, password: config.password  })
    .then(session => {
        const schema = session.getSchema(config.schema);

        return schema.existsInDatabase()
            .then(exists => {
                if (exists) {
                    return schema;
                }

                return session.createSchema(config.schema);
            })
            .then(schema => {
                return schema.createCollection(config.collection, { reuseExisting: true }), schema.createCollection(config2.collection, { reuseExisting: true});
            })
            .then(collection =>{
                return collection.a
            })
            .then(() => {
                return session.close();
            });
            
    });     */
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
                                    , card_id INTEGER UNSIGNED)`)
                       .execute()
            })
            .then(() => {
                return session.close();
            });
});    
module.exports= {
    mysqlx: mysqlx,
    config:config,
    config2:config2
}     

