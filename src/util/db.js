import Sequelize from 'sequelize';
import { DATABASE_URL } from './config.js';
import { Umzug, SequelizeStorage } from 'umzug';

export const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
});

const runMigrations = async () => {  
  const migrator = new Umzug({    
    migrations: {      
      glob: 'src/migrations/*.js',    
    },    
    storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),    
    context: sequelize.getQueryInterface(),    
    logger: console,  
  })  
  const migrations = await migrator.up()  
  console.log('Migrations up to date', {    
    files: migrations.map((mig) => mig.name),  
  })
}

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    await runMigrations()
    console.log('database connected')
  } catch (err) {
    console.log('connecting database failed')
    console.log(err)
    return process.exit(1)
  }

  return null
}
