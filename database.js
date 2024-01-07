// database.js
import { Database, SQLiteDatabase } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { Post } from './Users';
import { mySchema } from './Schema';
import Migration from './Migration';
import { Platform } from 'react-native';
const adapter = new SQLiteAdapter({
  dbName: 'myDatabase',
  schema: mySchema,
  Migration,
  onSetUpError:((error)=>{
console.log('error==>',error)
  }),
//   jsi:Platform.OS
});

const databaseWatermelon = new Database({
  adapter,
  modelClasses: [Post],
  actionsEnabled: true,
});

export { databaseWatermelon };
