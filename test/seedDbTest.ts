import { Categories } from 'src/models';

export const SeedDatabaseForTesting = async () => {
  await Categories.sequelize.query('DROP TABLE IF EXISTS categories;');
  await Categories.sequelize.query(
    'CREATE TABLE IF NOT EXISTS categories (id serial, name text,parent_id integer);',
    { logging: false },
  );
  await Categories.sequelize.query(
    `INSERT INTO public.categories(
         name, parent_id)
        VALUES ('root_1', 0);`,
    { logging: false },
  );
  await Categories.sequelize.query(
    `INSERT INTO public.categories(
            name, parent_id)
           VALUES ('root_2', 0);`,
    { logging: false },
  );
  await Categories.sequelize.query(
    `INSERT INTO public.categories(
            name, parent_id)
           VALUES ('child_1.1', 1);`,
    { logging: false },
  );
  await Categories.sequelize.query(
    `INSERT INTO public.categories(
            name, parent_id)
           VALUES ('child_1.1.1', 3);`,
    { logging: false },
  );
  await Categories.sequelize.query(
    `INSERT INTO public.categories(
            name, parent_id)
           VALUES ('child_2.1', 2);`,
    { logging: false },
  );
};
